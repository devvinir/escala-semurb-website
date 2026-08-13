import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../hook/useAuth'
import MyChart from '../components/Graph';
import CalendarHome from '../components/CalendarHome';
import AddEmployeeCard from '../components/modals/AddEmployee'
import SectorCard from '../components/SectorCard'
import AddTeam from '../components/modals/AddTeam'
import { IoMdPersonAdd, IoIosPeople  } from "react-icons/io";
import '../styles/Home.css';
import '../styles/EmployeeList.css'

  function Home() { 

  const route = useNavigate()
  const {employees, teams} = useAuth()
  
  const [isOpenEmployeeModal, setIsOpenEmployeeModal] = useState(false)
  const [isOpenTeam, setIsOpenTeam] = useState(false)

  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    console.log('Data selecionada:', date.toLocaleDateString('pt-BR'));
  };

   const [search, setSearch] = useState('')
    const searchLowerCase = search.toLowerCase();
    const employeesList = employees?.result?.filter((employee) => 
    employee.name.toLowerCase().includes(searchLowerCase))

     

  return (
    <div className='body'>
      <AddEmployeeCard 
      isOpenEmployee={isOpenEmployeeModal} 
      setIsOpenEmployee={setIsOpenEmployeeModal}
      />
      <AddTeam
      isOpen={isOpenTeam}
      setIsOpen={setIsOpenTeam}
      />
       
      
      <div className="container-search">
        <div className="search-list">
        <input type="search" placeholder='Buscar Funcionarios. . .' 
        value={search} onChange={(e) => setSearch(e.target.value)}/>
         {search? 
        <div className="list">
          {employeesList?.map(employee => (
        <div className="list-content" key={employee.registration} 
        onClick={() => route(`/employees/${employee.registration}`)}>
          <p className="list-info">{employee.name}</p>
          <p className="list-info-bottom">
              Equipe: {teams?.result?.find(team => (team.id_equipe == employee.team_id))?.name}</p>
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
      <SectorCard />
      </div>

      <div className='container-down'>
          <CalendarHome 
            value={selectedDate}
            onDateChange={handleDateSelect}
          />
      </div>
    </div>
  )
}
export default Home;