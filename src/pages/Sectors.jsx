import { useAuth } from '../hook/useAuth'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { IoIosNotifications, IoMdPersonAdd, IoIosCreate } from 'react-icons/io'
import AddAdmin from '../components/modals/AddAdmin'
import UpdateSector from '../components/modals/UpdateSector'

import '../styles/EmployeeTable.css'

function Sectors() {

  const route = useNavigate()

  const { allSectors, allEmployees, getAllEmployees } = useAuth()
  const { id } = useParams()

  const [search, setSearch] = useState('')
  const searchLowerCase = search.toLowerCase();

  const [isOpenModalAdmin, setIsOpenModalAdmin] = useState(false)
  const [isOpenUpdate, setIsOpenUpdate] = useState(false) 

  useEffect(() => {
    getAllEmployees()
  }, [])

  if (!allSectors.sucess)
    return <p className="loading-text">Carregando setores...</p>;

  if (!allEmployees.sucess)
    return <p className="loading-text">Carregando funcionários do setor...</p>

  const employeesList = allEmployees?.result?.filter((employee) =>
    employee.name.toLowerCase().includes(searchLowerCase))

  const currentSector = allSectors?.result?.find(sector => (sector.id == id))?.name

  if (!employeesList)
    return <p className="loading-text">Não foi possivel encontrar os funcionários.</p>;

  return (
    <div className="body">
      <AddAdmin isOpenModal={isOpenModalAdmin} setIsOpenModal={setIsOpenModalAdmin} />
      <UpdateSector isOpen={isOpenUpdate} setIsOpen={setIsOpenUpdate} id={id}/>

      <div className="container-search grid-2">
        <input type="search" placeholder='Buscar Funcionarios. . .' value={search}
          onChange={(e) => setSearch(e.target.value)} />
        <button className="confirm-button"
          onClick={() => setIsOpenModalAdmin(!isOpenModalAdmin)}>
          <IoMdPersonAdd size={20} /> Adicionar Funcionario </button>
      </div>

      <div className="type-table">
        <p className="type-title type-icon">Funcionarios do Setor: 
          <IoIosCreate size={40} cursor='pointer'
          onClick={() => setIsOpenUpdate(!isOpenUpdate)}/></p>
        <p className="type-subtitle">{currentSector}</p>
      </div>

      <div className="table admin-table">
        <div className="table-header">
          <div>Matrícula</div>
          <div>Nome</div>
          <div>Email</div>
          <div>Telefone</div>
          <div>Setor</div>
        </div>


        {employeesList?.filter(employee => employee.id_sector == id).map((employee) => (
          <div className="table-row" key={employee.registration}
            onClick={() => route(`/edit-employee/${employee.registration}`)}>
            <div className='matricula'>{employee.registration}</div>
            <div >{employee.name}</div>
            <div >{employee.email}</div>
            <div >{employee.phone}</div>
            <div >{allSectors.result?.find(sector => (
              sector.id == employee.id_setor))?.name}</div>
          </div>
        ))}
      </div>

    </div>
  )

}
export default Sectors