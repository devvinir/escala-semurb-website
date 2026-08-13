import {useAuth} from '../hook/useAuth'
import {useParams, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import AddEmployeeCard from '../components/modals/AddEmployee'
import { IoMdPersonAdd, IoIosCloseCircle, IoIosCheckmarkCircle  } from "react-icons/io";
import'../styles/EmployeeTable.css'


function Teams() {
    
    const route = useNavigate()
    
    const {teams, employees, user, regions, scales, confirms, createReportTeam} = useAuth()
    const {id} = useParams()

    const [search, setSearch] = useState('')
    const searchLowerCase = search.toLowerCase();
    const employeesList = !employees ? [] : employees?.result?.filter((employee) => 
    employee.name.toLowerCase().includes(searchLowerCase))

    const [isOpenEmployeeModal, setIsOpenEmployeeModal] = useState(false)
    
  async function handleReport(id_equipe) {
  const report = await createReportTeam(user, id_equipe);

  if (report?.result) {
    const blobUrl = URL.createObjectURL(report.result);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `relatorio_equipe_${id_equipe}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(blobUrl);
  } else {
    alert("Erro ao gerar relatório da equipe.");
  }
}


    return(
    <div className="body">
        <AddEmployeeCard 
            isOpenEmployee={isOpenEmployeeModal} 
            setIsOpenEmployee={() => setIsOpenEmployeeModal(!isOpenEmployeeModal)}

        />

      <div className="container-search grid-3">
        <button className="alert-button report" onClick={() => handleReport(id)}>Relatório da Equipe</button>
        <input type="search" placeholder='Buscar funcionários...' value={search} onChange={(e)=> setSearch(e.target.value)} />
        <button className="confirm-button add-empl" onClick={() => setIsOpenEmployeeModal(!isOpenEmployeeModal)}>
          <IoMdPersonAdd  size={20}  />Adicionar Funcionário </button>
      </div>

      <div className="type-table">
        <p className="type-title">Funcionarios da Equipe</p>
        <p className="type-subtitle">{teams?.result?.find(team => (team.id_equipe == id))?.name}</p>
      </div>

<div className="table">
  <div className="table-header">
    <div>Matrícula</div>
    <div>Nome</div>
    <div>Email</div>
    <div>phone</div>
    <div>Setor</div>
    <div>Equipe</div>
    <div>Região</div>
    <div>Escala</div>
    <div>Confirmação</div>
  </div>

     {!employees ? <p className="loading-text">Carregando funcionários...</p> : 
     
     employeesList?.filter(employee => employee.team_id == id).map((employee) => (  
      <div className="table-row" key={employee.registration} 
      onClick={() => route(`/employees/${employee.registration}`)}>

            <div className='matricula'>{employee.registration}</div>
            <div >{employee.name}</div>
            <div >{employee.email}</div>
            <div >{employee.phone}</div>
            <div >{user?.setor?.sector_id == employee.sector_id ? user.setor?.name : ''}</div>
            <div >{teams?.result?.find(team => (team.id_equipe == employee.team_id))?.name}</div>
            <div >{regions?.result?.find(region =>(region.id_regiao == employee.region_id))?.name}</div>
            <div >{scales?.result?.find(scale => (scale.escala.id_escala ==  employee.scale_id))?.escala.scale_type }</div>
            <div >{(() => {
              const confirm = confirms?.result?.find(confirm => (confirm.registration == employee.registration))?.confirmation?.[0]?.status;
              if (confirm === 'Pendente') {
                return <IoIosCloseCircle color='orange' size={30}/>
              } else if (confirm === 'Confirmado') {
                return <IoIosCheckmarkCircle color='green' size={30}/>
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