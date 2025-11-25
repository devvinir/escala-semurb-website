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
    user?.funcionario?.id_equipe == team.id_equipe
  ))?.nome_equipe
  const region = regions?.result?.find(region => (
    user?.funcionario?.id_regiao == region.id_regiao
  ))?.nome_regiao
  const turn = turns?.result?.find(turn => (
    user?.funcionario?.id_turno == turn.id_turno
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
            <h2 className="profile-name">{user?.funcionario.nome}</h2>
          </div>
          <div className="profile-card-down">
            <p className="profile-info">Matricula: <span className="info-auth">{user?.funcionario?.matricula_funcionario}</span> </p>
            <p className="profile-info">Telefone: <span className="info-auth">{user?.funcionario?.telefone}</span></p>
            <p className="profile-info">Email: <span className="info-auth">{user ? user.funcionario?.email : 'Desconhecido'}</span></p>
            <p className="profile-info">Escala: <span className="info-auth">{user ? user?.escala?.tipo_escala : 'Desconhecido'}</span></p>
            <p className="profile-info">Equipe: <span className="info-auth">{team || 'Desconhecido'}</span></p>
            <p className="profile-info">Regiao: <span className="info-auth">{region || 'Desconhecido'}</span></p>
            <p className="profile-info">Setor: <span className="info-auth">{user ? user.setor?.nome_setor : 'Desconhecido'}</span></p>

          </div>

        </div>

        <div className="profile-escale">
          <CalendarProfile
            value={selectedDate}
            onDateChange={handleDateSelect}
            escala={user?.escala}
            holidays={holidays}
          />

          <div className="profile-escale-details">
            
            <div className="details d-folgas">{`Folgas: ${getRestDaysDisplay(user?.escala)}`}</div>
            <div className="details d-feriados">{`Feriados: ${formatCurrentMonthHolidays(user?.escala, holidays?.result)}`}</div>
            <div className="details d-horarios">{`Horario: ${formatTurn(turn?.inicio_turno)} - ${formatTurn(turn?.termino_turno)} / Intervalo: ${formatTurn(turn?.intervalo_turno)}`}</div>
          </div>

          <div className="editdays-container">
            <p className='editdays-title'>Mudanças nos dias:</p>
            {editdays?.result
              ?.filter(d => {
                const mesDoRegistro = new Date(d.data_diae).getMonth() + 1
                return (
                  d.matricula_funcionario === user.funcionario.matricula_funcionario &&
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
                d.matricula_funcionario === user.funcionario.matricula_funcionario &&
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