import { useParams } from "react-router-dom"
import { useAuth } from '../hook/useAuth'
import { IoIosContact } from 'react-icons/io'
import CalendarProfile from '../components/CalendarProfile'
import { useState, useMemo } from 'react'
import UpdateScale from "../components/modals/UpdateScale"
import AddEmployeeCard from '../components/modals/AddEmployee'
import { getRestDaysDisplay, formatCurrentMonthHolidays } from '../utils/RestDays'
import UpdateEmployee from '../components/modals/UpdateEmployee'
import UpdateTurn from '../components/modals/UpdateTurn'

function Employee() {

  const { employees, user, teams, scales, regions, turns, holidays } = useAuth()
  const { id } = useParams()

  

  const [isOpenScaleUpdate, setIsOpenScaleUpdate] = useState(false)
  const [isOpenEmployeeAdd, setIsOpenEmployeeAdd] = useState(false)
  const [isOpenEmployeeUpdate, setIsOpenEmployeeUpdate] = useState(false)
  const [isOpenTurnUpdate, setIsOpenTurnUpdate] = useState(false)
  const [page, setPage] = useState(1)
  const [selectedDate, setSelectedDate] = useState(null);

  // Otimização: Os dados do funcionário só são recalculados se 'employees' ou 'id' mudarem.
  const currentEmployee = useMemo(() => {
    if (!employees?.result) return null;
    return employees.result.find(employee => String(employee.matricula_funcionario) === id);
  }, [employees, id]);

  // Otimização: A escala, turno, etc., só são recalculados se o funcionário mudar.
  const { scale, turn, team, region, sector } = useMemo(() => {
    if (!currentEmployee) return {};

    const foundScale = scales?.result?.find(s => s.escala.id_escala === currentEmployee.id_escala)?.escala;
    const foundTurn = turns?.result?.find(t => t.id_turno === currentEmployee.id_turno);
    const foundTeam = teams?.result?.find(t => t.id_equipe === currentEmployee.id_equipe)?.nome_equipe;
    const foundRegion = regions?.result?.find(r => r.id_regiao === currentEmployee.id_regiao)?.nome_regiao;
    const foundsector = user?.funcionario?.id_setor === currentEmployee?.id_setor ? user?.setor?.nome_setor : null
    return {
      scale: foundScale,
      turn: foundTurn,
      team: foundTeam,
      region: foundRegion,
      sector: foundsector
    };
  }, [currentEmployee, scales, turns, teams, regions, user]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    console.log('Data selecionada:', date.toLocaleDateString('pt-BR'));
  };

  if (!employees || !employees?.result)
    return <p className="loading-text">Carregando funcionário...</p>

  if (!currentEmployee)
    return <p className="loading-text">Não foi possível carregar o funcionário..</p>

  return (
    <div className="body">
      <UpdateScale
        employee={currentEmployee}
        setIsOpenEmployee={setIsOpenScaleUpdate}
        isOpenEmployee={isOpenScaleUpdate}
      />
      <AddEmployeeCard
        isOpenEmployee={isOpenEmployeeAdd}
        setIsOpenEmployee={setIsOpenEmployeeAdd}
        setPage={page}
        employee={currentEmployee}
      />
      <UpdateEmployee
        isOpen={isOpenEmployeeUpdate}
        setIsOpen={setIsOpenEmployeeUpdate}
        employee={currentEmployee}
      />
      <UpdateTurn
      isOpen={isOpenTurnUpdate}
      setIsOpen={setIsOpenTurnUpdate}
      employee={currentEmployee}
      />

      <div className="container-profile-page">

        <div key={currentEmployee?.matricula_funcionario} className="profile-container">
          <div className="profile-card-up">
            <IoIosContact size={200} color={'#6B7280'} />
            <h2 className="profile-name">{currentEmployee?.nome}</h2>
          </div>
          <div className="profile-card-down">
            <p className="profile-info">Matricula: <span className="info-auth">{currentEmployee?.matricula_funcionario}</span> </p>
            <p className="profile-info">Telefone: <span className="info-auth">{currentEmployee?.telefone}</span></p>
            <p className="profile-info">Email: <span className="info-auth">{currentEmployee?.email}</span></p>
            <p className="profile-info">Escala: <span className="info-auth">{scale?.tipo_escala}</span></p>
            <p className="profile-info">Equipe: <span className="info-auth">{team}</span></p>
            <p className="profile-info">Regiao: <span className="info-auth">{region}</span></p>
            <p className="profile-info">Setor: <span className="info-auth">{sector}</span></p>
          </div>
          <button className="confirm-button" onClick={() => setIsOpenEmployeeUpdate(!isOpenEmployeeUpdate)}>Atualizar Dados </button>
        </div>

        <div className="profile-escale">
          <CalendarProfile
            value={selectedDate}
            onDateChange={handleDateSelect}
            escala={scale || null}
          />
          <div className="profile-escale-details">

            <div className="details">{`Folgas: ${getRestDaysDisplay(scale)}`}</div>
            <div className="details">{`Feriados: ${formatCurrentMonthHolidays(scale, holidays?.result)}`}</div>
            <div className="details">{`Horario: ${turn?.inicio_turno} - ${turn?.termino_turno} / Intervalo: ${turn?.intervalo_turno}`}</div>
          </div>
          <div className="update-buttons">
            <button className="confirm-button" onClick={() => {
              if (currentEmployee.id_escala) {
                setIsOpenScaleUpdate(!isOpenScaleUpdate)
              }
              if (!currentEmployee.id_escala) {
                setIsOpenEmployeeAdd(!isOpenEmployeeAdd)
                setPage(2)
              }
            }}>
              {currentEmployee?.id_escala ? 'Atualizar Escala' : 'Nova Escala'}
            </button>
            <button className="confirm-button" onClick={() => {
              if (currentEmployee.id_turno) {
                setIsOpenTurnUpdate(!isOpenTurnUpdate)
              }
              if (!currentEmployee.id_turno) {
                setIsOpenEmployeeAdd(!isOpenEmployeeAdd)
                setPage(3)
              }
            }}>{currentEmployee?.id_escala ? 'Atualizar Turno' : 'Novo Turno'}</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Employee