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

  const { employees, user, teams, scales, regions, turns, holidays, editdays, createReportEmployee } = useAuth()
  const { id } = useParams()

  const formatTurn = (t) => {
    if (!t) return '';
    return t.substring(0, 5)
  }

  const [isOpenScaleUpdate, setIsOpenScaleUpdate] = useState(false)
  const [isOpenEmployeeAdd, setIsOpenEmployeeAdd] = useState(false)
  const [isOpenEmployeeUpdate, setIsOpenEmployeeUpdate] = useState(false)
  const [isOpenTurnUpdate, setIsOpenTurnUpdate] = useState(false)
  const [page, setPage] = useState(1)
  const [selectedDate, setSelectedDate] = useState(null);

  // Otimização: Os dados do funcionário só são recalculados se 'employees' ou 'id' mudarem.
  const currentEmployee = useMemo(() => {
    if (!employees?.result) return null;
    return employees.result.find(employee => String(employee.registration) === id);
  }, [employees, id]);

  // Otimização: A escala, turno, etc., só são recalculados se o funcionário mudar.
  const { scale, turn, team, region, sector } = useMemo(() => {
    if (!currentEmployee) return {};

    const foundScale = scales?.result?.find(s => s.escala.id_escala === currentEmployee.scale_id)?.escala;
    const foundTurn = turns?.result?.find(t => t.id_turno === currentEmployee.shift_id);
    const foundTeam = teams?.result?.find(t => t.id_equipe === currentEmployee.team_id)?.name;
    const foundRegion = regions?.result?.find(r => r.id_regiao === currentEmployee.region_id)?.name;
    const foundsector = user?.employee?.sector_id === currentEmployee?.sector_id ? user?.setor?.name : null
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

  const currentMonth = new Date().getMonth() + 1


  if (!employees || !employees?.result)
    return <p className="loading-text">Carregando funcionário...</p>

  if (!currentEmployee)
    return <p className="loading-text">Não foi possível carregar o funcionário..</p>

    async function handleReport(registration) {
  const report = await createReportEmployee(user, registration);

  if (report?.result) {
    const blobUrl = URL.createObjectURL(report.result);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `relatorio_funcionario_${registration}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(blobUrl);
  } else {
    alert("Erro ao gerar relatório do funcionário.");
  }
}


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

        <div key={currentEmployee?.registration} className="profile-container">
          <div className="profile-card-up">
            <IoIosContact size={200} color={'#6B7280'} />
            <h2 className="profile-name">{currentEmployee?.name}</h2>
          </div>
          <div className="profile-card-down">
            <p className="profile-info">Matricula: <span className="info-auth">{currentEmployee?.registration}</span> </p>
            <p className="profile-info">phone: <span className="info-auth">{currentEmployee?.phone}</span></p>
            <p className="profile-info">Email: <span className="info-auth">{currentEmployee?.email}</span></p>
            <p className="profile-info">Escala: <span className="info-auth">{scale?.scale_type}</span></p>
            <p className="profile-info">Equipe: <span className="info-auth">{team}</span></p>
            <p className="profile-info">Regiao: <span className="info-auth">{region}</span></p>
            <p className="profile-info">Setor: <span className="info-auth">{sector}</span></p>
          </div>
          <button className="confirm-button" onClick={() => setIsOpenEmployeeUpdate(!isOpenEmployeeUpdate)}>Atualizar Dados </button>
          <button className="alert-button report" onClick={() => handleReport(currentEmployee?.registration)}>Relatório do Funcionário</button>
        </div>

        <div className="profile-escale">
          <CalendarProfile
            value={selectedDate}
            onDateChange={handleDateSelect}
            escala={scale || null}
            holidays={holidays}
            editdays={editdays}
            employee={currentEmployee}
          />
          <div className="profile-escale-details">
            <div className="details d-folgas">{`Folgas: ${getRestDaysDisplay(scale)}`}</div>
            <div className="details d-feriados">{`Feriados: ${formatCurrentMonthHolidays(scale, holidays?.result)}`}</div>
            <div className="details d-horarios">{`Horario: ${formatTurn(turn?.shift_start)} - ${formatTurn(turn?.shift_end)} / Intervalo: ${formatTurn(turn?.shift_pause)}`}</div>
          </div>

          <div className="editdays-container">
            <p className='editdays-title'>Mudanças nos dias:</p>
            {editdays?.result
              ?.filter(d => {
                const mesDoRegistro = new Date(d.day).getMonth() + 1
                return (
                  d.registration === currentEmployee.registration &&
                  mesDoRegistro === currentMonth
                )
              })
              .map((d, i) => (
                <div key={i} className="editday-item">
                  <strong>{new Date(d.day).toLocaleDateString('pt-BR')}</strong> — <em>{d.title}</em>: 
                  <p className="editdays-description">{d.description}</p>
                </div>
              ))
            }
            {editdays?.result?.filter(d => {
              const mesDoRegistro = new Date(d.day).getMonth() + 1
              return (
                d.registration === currentEmployee.registration &&
                mesDoRegistro === currentMonth
              )
            }).length === 0 && (
                <p>Nenhuma mudança registrada neste mês.</p>
              )}
          </div>


          <div className="update-buttons">
            <button className="confirm-button" onClick={() => {
              if (currentEmployee.scale_id) {
                setIsOpenScaleUpdate(!isOpenScaleUpdate)
              }
              if (!currentEmployee.scale_id) {
                setIsOpenEmployeeAdd(!isOpenEmployeeAdd)
                setPage(2)
              }
            }}>
              {currentEmployee?.scale_id ? 'Atualizar Escala' : 'Nova Escala'}
            </button>
            <button className="confirm-button" onClick={() => {
              if (currentEmployee.shift_id) {
                setIsOpenTurnUpdate(!isOpenTurnUpdate)
              }
              if (!currentEmployee.shift_id) {
                setIsOpenEmployeeAdd(!isOpenEmployeeAdd)
                setPage(3)
              }
            }}>{currentEmployee?.scale_id ? 'Atualizar Turno' : 'Novo Turno'}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Employee