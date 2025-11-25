import { useParams } from "react-router-dom"
import { useAuth } from '../hook/useAuth'
import { IoIosContact } from 'react-icons/io'
import { useState } from 'react'
import CalendarProfile from '../components/CalendarProfile'
import UpdateScaleAdmin from '../components/modals/UpdateScaleAdmin'
import AddAdminCard from '../components/modals/AddAdmin'
import UpdateAdmin from '../components/modals/UpdateAdmin'
import UpdateTurnAdmin from '../components/modals/UpdateTurnAdmin'
import Confirmation from '../components/modals/ConfirmDelEmployee'
import { getRestDaysDisplay, formatCurrentMonthHolidays } from '../utils/RestDays'


function EditEmployee() {

  const { allEmployees, editdays, allSectors, allTeams, allRegions, allTurns, allScales, holidays } = useAuth()
  const { id } = useParams()

  
  const [isOpenEmployeeUpdate, setIsOpenEmployeeUpdate] = useState(false)
  const [isOpenEmployeeAdd, setIsOpenEmployeeAdd] = useState(false)
  const [isOpenAdminUpdate, setIsOpenAdminUpdate] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenTurnUpdate, setIsOpenTurnUpdate] = useState(false)
  const [page, setPage] = useState(2)

  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    console.log('Data selecionada:', date.toLocaleDateString('pt-BR'));
  };

  const formatTurn = (t) => {
    if(!t) return '';
    return t.substring(0, 5)
  }
  if (!allEmployees || !allEmployees.result) {
    return <p className='loading-text'>Carregando funcionário...</p>;
  }

  const currentEmployee = allEmployees?.result?.find(
    employee => String(employee.matricula_funcionario) === id
  );


  const sector = allSectors.result?.find(sector => (
    currentEmployee?.id_setor == sector.id_setor))?.nome_setor
  const team = allTeams?.result?.find(team => (
    currentEmployee?.id_equipe == team.id_equipe
  ))?.nome_equipe
  const region = allRegions?.result?.find(region => (
    currentEmployee?.id_regiao == region.id_regiao
  ))?.nome_regiao
  const scale = allScales?.result?.find(scale => (
    currentEmployee?.id_escala == scale.id_escala
  ))
  const turn = allTurns?.result?.find(turn => (
    currentEmployee?.id_turno == turn.id_turno
  ))



  if (!currentEmployee)
    return <p className="loading-text">Não foi possível encontrar o funcionário</p>;

    
  const currentMonth = new Date().getMonth() + 1

  return (
    <div className="body">

      <UpdateScaleAdmin
        employee={currentEmployee}
        setIsOpenEmployee={setIsOpenEmployeeUpdate}
        isOpenEmployee={isOpenEmployeeUpdate}
      />
      <AddAdminCard
        isOpenEmployee={isOpenEmployeeAdd}
        setIsOpenEmployee={setIsOpenEmployeeAdd}
        setPage={page}
        employee={currentEmployee}
      />
      <UpdateAdmin
        isOpen={isOpenAdminUpdate}
        setIsOpen={setIsOpenAdminUpdate}
        employee={currentEmployee}
      />
      <UpdateTurnAdmin
        isOpen={isOpenTurnUpdate}
        setIsOpen={setIsOpenTurnUpdate}
        employee={currentEmployee}

      />
      <Confirmation
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        currentEmployee={currentEmployee}
      />
      <div className="container-profile-page">
        <div key={currentEmployee?.matricula_funcionario} className="profile-container">
          <div className="profile-card-up">
            <IoIosContact size={200} color={'#6B7280'} />

            <h2 className="profile-name">{currentEmployee?.nome}</h2>
          </div>
          <div className="profile-card-down">
            <p className="profile-info">Matrícula: <span className="info-auth">{currentEmployee?.matricula_funcionario}</span> </p>
            <p className="profile-info">Telefone: <span className="info-auth">{currentEmployee?.telefone}</span></p>
            <p className="profile-info">Email: <span className="info-auth">{currentEmployee?.email}</span></p>
            <p className="profile-info">Cargo: <span className="info-auth">{currentEmployee?.cargo}</span></p>
            <p className="profile-info">Equipe: <span className="info-auth">{team}</span></p>
            <p className="profile-info">Região: <span className="info-auth">{region}</span></p>
            <p className="profile-info">Setor: <span className="info-auth">{sector}</span></p>
            <p className="profile-info">Escala: <span className="info-auth">{scale?.tipo_escala}</span></p>
          </div>
          <button className="confirm-button" onClick={() => setIsOpenAdminUpdate(!isOpenAdminUpdate)}>Atualizar Dados</button>
          <button className="cancel-button" onClick={() => setIsOpenDelete(!isOpenDelete)}>Deletar Funcionario</button>
        </div>

        <div className="profile-escale">
          <CalendarProfile
            value={selectedDate}
            onDateChange={handleDateSelect}
            escala={scale}
            holidays={holidays}
            employee={currentEmployee}
          />
          <div className="profile-escale-details">
            <div className="details d-folgas">{`Folgas: ${getRestDaysDisplay(scale)}`}</div>
            <div className="details d-feriados">{`Feriados: ${formatCurrentMonthHolidays(scale, holidays?.result)}`}</div>
            <div className="details d-horarios">{`Horario: ${formatTurn(turn?.inicio_turno)} - ${formatTurn(turn?.termino_turno)} / Intervalo: ${formatTurn(turn?.intervalo_turno)}`}</div>
          </div>

          <div className="editdays-container">
            <p className='editdays-title'>Mudanças nos dias:</p>
            {editdays?.result
              ?.filter(d => {
                const mesDoRegistro = new Date(d.data_diae).getMonth() + 1
                return (
                  d.matricula_funcionario === currentEmployee.matricula_funcionario &&
                  mesDoRegistro === currentMonth
                )
              })
              .map((d, i) => (
                <div key={i} className="editday-item">
                  <strong>{new Date(d.data_diae).toLocaleDateString('pt-BR')}</strong> — <em>{d.nome_diae}</em>: 
                  <p className="editdays-description">{d.descricao_diae}</p>
                </div>
              ))
            }
            {editdays?.result?.filter(d => {
              const mesDoRegistro = new Date(d.data_diae).getMonth() + 1
              return (
                d.matricula_funcionario === currentEmployee.matricula_funcionario &&
                mesDoRegistro === currentMonth
              )
            }).length === 0 && (
                <p className="loading-text" >Nenhuma mudança registrada neste mês.</p>
              )}
          </div>

          <div className="update-buttons">
            <button className="confirm-button"
              onClick={() => {
                if (currentEmployee?.id_escala) {
                  setIsOpenEmployeeUpdate(!isOpenEmployeeUpdate)
                } else {
                  setPage(2)
                  setIsOpenEmployeeAdd(!isOpenEmployeeAdd)
                }
              }}>
              {currentEmployee?.id_escala ? 'Atualizar Escala' : 'Nova Escala'}
            </button>
            <button className="confirm-button"
              onClick={() => {
                if (currentEmployee?.id_turno) {
                  setIsOpenTurnUpdate(!isOpenTurnUpdate)
                } else {
                  setPage(3)
                  setIsOpenEmployeeAdd(!isOpenEmployeeAdd)
                }
              }}>
              {currentEmployee?.id_turno ? 'Atualizar Turno' : 'Novo Turno'}</button>
          </div>

        </div>
      </div>
    </div>
  )
}
export default EditEmployee