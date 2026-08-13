import { IoIosContact } from "react-icons/io";
import CalendarProfile from '../components/CalendarProfile'
import { useState } from 'react'
import { useAuth } from '../hook/useAuth'
import '../styles/Profile.css'
import { getRestDaysDisplay, formatCurrentMonthHolidays } from '../utils/RestDays'

function Profile() {
  const { user, holidays, teams, regions, turns, editdays } = useAuth()
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    console.log('Data selecionada:', date.toLocaleDateString('pt-BR'));
  };
  const team = teams?.result?.find(team => (
    user?.employee?.team_id == team.id
  ))?.name
  const region = regions?.result?.find(region => (
    user?.employee?.region_id == region.id
  ))?.name
  const turn = turns?.result?.find(turn => (
    user?.employee?.shift_id == turn.id
))
  
    const formatTurn = (t) => {
    if(!t) return '';
    return t.substring(0, 5)
  }

  const currentMonth = new Date().getMonth() + 1

  return (
    <div className="body">

      <div className="container-profile-page">

        <div className="profile-container">
          <div className="profile-card-up">
            <IoIosContact size={200} color={'#6B7280'} />
            <h2 className="profile-name">{user?.employee.name}</h2>
          </div>
          <div className="profile-card-down">
            <p className="profile-info">Matricula: <span className="info-auth">{user?.employee?.registration}</span> </p>
            <p className="profile-info">phone: <span className="info-auth">{user?.employee?.phone}</span></p>
            <p className="profile-info">Email: <span className="info-auth">{user ? user.employee?.email : 'Desconhecido'}</span></p>
            <p className="profile-info">Escala: <span className="info-auth">{user ? user?.scale?.scale_type : 'Desconhecido'}</span></p>
            <p className="profile-info">Equipe: <span className="info-auth">{team || 'Desconhecido'}</span></p>
            <p className="profile-info">Regiao: <span className="info-auth">{region || 'Desconhecido'}</span></p>
            <p className="profile-info">Setor: <span className="info-auth">{user ? user.sector?.name : 'Desconhecido'}</span></p>

          </div>

        </div>

        <div className="profile-escale">
          <CalendarProfile
            value={selectedDate}
            onDateChange={handleDateSelect}
            escala={user?.scale}
            holidays={holidays}
          />

          <div className="profile-escale-details">
            
            <div className="details d-folgas">{`Folgas: ${getRestDaysDisplay(user?.scale)}`}</div>
            <div className="details d-feriados">{`Feriados: ${formatCurrentMonthHolidays(user?.scale, holidays?.result)}`}</div>
            <div className="details d-horarios">{`Horario: ${formatTurn(turn?.shift_start)} - ${formatTurn(turn?.shift_end)} / Intervalo: ${formatTurn(turn?.shift_pause)}`}</div>
          </div>

          <div className="editdays-container">
            <p className='editdays-title'>Mudanças nos dias:</p>
            {editdays?.result
              ?.filter(d => {
                const mesDoRegistro = new Date(d.day).getMonth() + 1
                return (
                  d.registration === user.employee.registration &&
                  mesDoRegistro === currentMonth
                )
              })
              .map((d, i) => (
                <div key={i} className="editday-item">
                  <strong>{new Date(d.day).toLocaleDateString('pt-BR')}</strong> — <em>{d.name_diae}</em>: 
                  <p className="editdays-description">{d.description}</p>
                </div>
              ))
            }
            {editdays?.result?.filter(d => {
              const mesDoRegistro = new Date(d.day).getMonth() + 1
              return (
                d.registration === user.employee.registration &&
                mesDoRegistro === currentMonth
              )
            }).length === 0 && (
                <p className="loading-text" >Nenhuma mudança registrada neste mês.</p>
              )}
          </div>

        </div>

      </div>
    </div>
  )
}
export default Profile