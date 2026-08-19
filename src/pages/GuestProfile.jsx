import { IoIosContact } from "react-icons/io";
import CalendarProfile from '../components/CalendarProfile'
import {useState, useEffect} from 'react'
import {GetHoliday} from '../api/holiday'
import '../styles/Profile.css'
import { getRestDaysDisplay, formatCurrentMonthHolidays } from '../utils/RestDays'
import DemoData from '../api/demodata.json'
function Profile() {

        const [holiday, setHoliday] = useState()
      useEffect(()=> {  
        async function loadHoliday(){
            const r = await GetHoliday();
            setHoliday(r)    
        }
        loadHoliday()
      }, [])

     const [selectedDate, setSelectedDate] = useState(null);
      const handleDateSelect = (date) => {
        setSelectedDate(date);
      };

    const formatTurn = (t) => {
    if(!t) return '';
    return t.substring(0, 5)
  }


  return (
    <div className="body">

      <div className="container-profile-page">

        <div className="profile-container">
          <div className="profile-card-up">
            <IoIosContact size={200} color={'#6B7280'} />
            <h2 className="profile-name">Visitante</h2>
          </div>
          <div className="profile-card-down">
            <p className="profile-info">Matricula: <span className="info-auth">99999</span> </p>
            <p className="profile-info">Telefone: <span className="info-auth">{"(11) 99999-9999"}</span></p>
            <p className="profile-info">Email: <span className="info-auth">visitante@demo.com</span></p>
            <p className="profile-info">Escala: <span className="info-auth">5x2</span></p>
            <p className="profile-info">Equipe: <span className="info-auth">Demo</span></p>
            <p className="profile-info">Regiao: <span className="info-auth">Sul</span></p>
            <p className="profile-info">Setor: <span className="info-auth">Demo</span></p>

          </div>

        </div>

        <div className="profile-escale">
          <CalendarProfile
            value={selectedDate}
            onDateChange={handleDateSelect}
            escala={DemoData.scale.find(s=>s.id==3)}
            holidays={holiday}
          />

          <div className="profile-escale-details">
            
            <div className="details d-folgas">{`Folgas: ${getRestDaysDisplay(DemoData.scale.find(s=>s.id==3))}`}</div>
            <div className="details d-feriados">{`Feriados: ${formatCurrentMonthHolidays(DemoData.scale.find(s=>s.id==3), holiday?.result)}`}</div>
            <div className="details d-horarios">{`Horario: ${formatTurn(DemoData.shift.find(s=>s.id==3).shift_start)} - ${formatTurn(DemoData.shift.find(s=>s.id==3).shift_end)} / Intervalo: ${formatTurn(DemoData.shift.find(s=>s.id==3).shift_pause)}`}</div>
          </div>

          <div className="editdays-container">
            <p className='editdays-title'>Mudanças nos dias:</p>
                <p className="loading-text" >Nenhuma mudança registrada neste mês.</p>
          </div>

        </div>

      </div>
    </div>
  )
}
export default Profile