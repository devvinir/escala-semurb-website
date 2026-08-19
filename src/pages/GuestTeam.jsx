
import {useParams, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import AddEmployeeCard from '../components/modals/AddEmployee'
import { IoMdPersonAdd, IoIosCloseCircle, IoIosCheckmarkCircle  } from "react-icons/io";
import'../styles/EmployeeTable.css'
import DemoData from "../api/demodata.json"


function Teams() {
    
    const route = useNavigate()
    
    const {id} = useParams()

    const [search, setSearch] = useState('')
    const searchLowerCase = search.toLowerCase();
    const employeesList = !DemoData?.employee ? [] : DemoData?.employee.filter((employee) => 
    employee.name.toLowerCase().includes(searchLowerCase))

    const [isOpenEmployeeModal, setIsOpenEmployeeModal] = useState(false)
    
    return(
    <div className="body">
        <AddEmployeeCard 
            isOpenEmployee={isOpenEmployeeModal} 
            setIsOpenEmployee={() => setIsOpenEmployeeModal(!isOpenEmployeeModal)}

        />

      <div className="container-search grid-3">
        <button className="alert-button report">Relatório da Equipe</button>
        <input type="search" placeholder='Buscar funcionários...' value={search} onChange={(e)=> setSearch(e.target.value)} />
        <button className="confirm-button add-empl" onClick={() => setIsOpenEmployeeModal(!isOpenEmployeeModal)}>
          <IoMdPersonAdd  size={20}  />Adicionar Funcionário </button>
      </div>

      <div className="type-table">
        <p className="type-title">Funcionarios da Equipe</p>
        <p className="type-subtitle">{DemoData?.team?.find(team => (team.id == id))?.name}</p>
      </div>

<div className="table">
  <div className="table-header">
    <div>Matrícula</div>
    <div>Nome</div>
    <div>Email</div>
    <div>Telefone</div>
    <div>Setor</div>
    <div>Equipe</div>
    <div>Região</div>
    <div>Escala</div>
    <div>Confirmação</div>
  </div>

     {!DemoData.employee ? <p className="loading-text">Carregando funcionários...</p> : 
     
     employeesList?.filter(employee => employee.team_id == id).map((employee) => (  
      <div className="table-row" key={employee.registration} 
      onClick={() => route(`/guest-employee-profile/${employee.registration}`)}>

            <div className='matricula'>{employee.registration}</div>
            <div >{employee.name}</div>
            <div >{employee.email}</div>
            <div >{employee.phone}</div>
            <div >Demo</div>
            <div >{DemoData?.team?.find(team => (team.id == employee.team_id))?.name}</div>
            <div >{DemoData.region?.find(region =>(region.id == employee.region_id))?.name}</div>
            <div >{DemoData.scale?.find(scale => (scale.id ==  employee.scale_id))?.scale_type }</div>
            <div >{(() => {
              if (employee.confirm == false) {
                return <IoIosCloseCircle color='orange' size={50} />
              } else if (employee.confirm == true) {
                return <IoIosCheckmarkCircle color='green' size={50}/>
              }
            })()}
            
            </div> 
      </div>
        ))}
  </div>

      </div>
    )      

}
export default Teams