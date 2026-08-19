//import {useNavigation} from "react-router-dom"
import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import MyChart from '../components/Graph';
import CalendarGuestHome from '../components/CalendarGuestHome';
import GuestAddEmployee from '../components/modals/GuestAddEmployee'
import SetorCard from '../components/SectorCard'
import GuestAddTeam from '../components/modals/GuestAddTeam'
import { IoMdPersonAdd, IoIosPeople  } from "react-icons/io";
import '../styles/Home.css';
import '../styles/EmployeeList.css'
import DemoData from "../api/demodata.json"

function GuestHome(){

  const route = useNavigate()

  const [isOpenEmployeeModal, setIsOpenEmployeeModal] = useState(false)
  const [isOpenTeam, setIsOpenTeam] = useState(false)
  
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    console.log('Data selecionada:', date.toLocaleDateString('pt-BR'));
  };

   const [search, setSearch] = useState('')
    const searchLowerCase = search.toLowerCase();
    const filteredSearch = DemoData?.employee.filter((emp) => 
    emp.name.toLowerCase().includes(searchLowerCase))

    return (
    <div className='body'>
      <GuestAddEmployee 
      isOpenEmployee={isOpenEmployeeModal} 
      setIsOpenEmployee={setIsOpenEmployeeModal}
      />
      <GuestAddTeam
      isOpen={isOpenTeam}
      setIsOpen={setIsOpenTeam}
      />
       
      
      <div className="container-search">
        <div className="search-list">
        <input type="search" placeholder='Buscar Funcionarios. . .' 
        value={search} onChange={(e) => setSearch(e.target.value)}/>
         {search ? 
        <div className="list">
          {filteredSearch.map(emp => (
        <div className="list-content" key={emp.registration} 
        onClick={() => route(`/employees/${emp.registration}`)}>
          <p className="list-info">{emp.name}</p>
          <p className="list-info-bottom">
            Equipe: {DemoData?.team?.find(team => (team.id == emp.team_id))?.name}</p>
        </div>
      ) )}
        </div>
       : null
      }
        </div>
        <button className="confirm-button add-empl" onClick={setIsOpenEmployeeModal}>
          <IoMdPersonAdd  size={20}  />Adicionar Funcionário</button>
        <button className="confirm-button" onClick={setIsOpenTeam}>
          <IoIosPeople size={30} /> Adicionar Equipe</button>
      </div>
      
     
      
      <div className='container-up'>
      <MyChart />
      <SetorCard />
      </div>

      <div className='container-down'>
          <CalendarGuestHome 
            value={selectedDate}
            onDateChange={handleDateSelect}
          />
      </div>
    </div>
  )
}

export default GuestHome;