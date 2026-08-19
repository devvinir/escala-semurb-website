import { useParams } from "react-router-dom"

import { IoIosContact } from 'react-icons/io'
import CalendarProfile from '../components/CalendarProfile'
import { useState, useEffect} from 'react'
import GuestUpdateScale from "../components/modals/GuestUpdateScale"
import GuestAddEmployee from '../components/modals/AddEmployee'
import { getRestDaysDisplay, formatCurrentMonthHolidays } from '../utils/RestDays'
import GuestUpdateEmployee from '../components/modals/GuestUpdateEmployee'
import GuestUpdateTurn from '../components/modals/GuestUpdateTurn'
import DemoData from '../api/demodata.json'
import {GetHoliday} from "../api/holiday";

function GuestEmployeeProfile() {

  const { id } = useParams()
    const [holiday, setHoliday] = useState(null)

  useEffect(()=> {
    async function loadHoliday(){
        const r = await GetHoliday();
        setHoliday(r)    
    }
    loadHoliday()
  }, [])

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

    const currentEmployee = DemoData?.employee?.find(emp => (
        emp.registration) == id)

       
    


  const handleDateSelect = (date) => {
    setSelectedDate(date);
    console.log('Data selecionada:', date.toLocaleDateString('pt-BR'));
  };

  if (!DemoData?.employee)
    return <p className="loading-text">Carregando funcionário...</p>

  if (!currentEmployee)
    return <p className="loading-text">Não foi possível carregar o funcionário..</p>

   


  return (
    <div className="body">
      <GuestUpdateScale
        employee={currentEmployee}
        setIsOpenEmployee={setIsOpenScaleUpdate}
        isOpenEmployee={isOpenScaleUpdate}
      />
      <GuestAddEmployee
        isOpenEmployee={isOpenEmployeeAdd}
        setIsOpenEmployee={setIsOpenEmployeeAdd}
        setPage={page}
        employee={currentEmployee}
      />
      <GuestUpdateEmployee
        isOpen={isOpenEmployeeUpdate}
        setIsOpen={setIsOpenEmployeeUpdate}
        employee={currentEmployee}
      />
      <GuestUpdateTurn
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
            <p className="profile-info">Escala: <span className="info-auth">{DemoData?.scale?.find(s =>(
                s.id === currentEmployee.scale_id
            ))?.scale_type}</span></p>
            <p className="profile-info">Equipe: <span className="info-auth">{DemoData?.team?.find(s =>(
                s.id === currentEmployee.team_id
            ))?.name}</span></p>
            <p className="profile-info">Regiao: <span className="info-auth">{DemoData?.region?.find(s =>(
                s.id === currentEmployee.region_id
            ))?.name}</span></p>
            <p className="profile-info">Setor: <span className="info-auth">{DemoData?.sector?.find(s =>(
                s.id === currentEmployee.sector_id
            ))?.name}</span></p>
          </div>
          <button className="confirm-button" onClick={() => setIsOpenEmployeeUpdate(!isOpenEmployeeUpdate)}>Atualizar Dados </button>
          <button className="alert-button report">Relatório do Funcionário</button>
        </div>

        <div className="profile-escale">
          <CalendarProfile
            value={selectedDate}
            onDateChange={handleDateSelect}
            escala={DemoData?.scale?.find(s =>(
                s.id === currentEmployee.scale_id
            )) || null}
            holidays={holiday}
            editdays={null}
            employee={currentEmployee}
          />
          <div className="profile-escale-details">
            <div className="details d-folgas">{`Folgas: ${getRestDaysDisplay(DemoData?.scale?.find(s =>(
                s.id === currentEmployee.scale_id
            )))}`}</div>
            <div className="details d-feriados">{`Feriados: ${formatCurrentMonthHolidays(DemoData?.scale?.find(s =>(
                s.id === currentEmployee.scale_id
            )), holiday?.result)}`}</div>
            <div className="details d-horarios">{`Horario: ${formatTurn(DemoData?.shift?.find(s =>(
                s.id === currentEmployee.shift_id
            )).shift_start)} - ${formatTurn(DemoData?.shift?.find(s =>(
                s.id === currentEmployee.shift_id
            ))?.shift_end)} / Intervalo: ${formatTurn(DemoData?.shift?.find(s =>(
                s.id === currentEmployee.shift_id
            ))?.shift_pause)}`}</div>
          </div>

          <div className="editdays-container">
            <p className='editdays-title'>Mudanças nos dias:</p>
                <p>Nenhuma mudança registrada neste mês.</p>
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

export default GuestEmployeeProfile