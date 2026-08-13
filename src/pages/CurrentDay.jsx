import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth'
import { useEffect, useState } from 'react';
import { IoIosCloseCircle, IoIosCheckmarkCircle } from "react-icons/io";
import '../styles/Search.css'

function CurrentDay() {
  const { user, scales, findActives, confirms } = useAuth()
  const route = useNavigate();
  const { date } = useParams();
  const [list, setList] = useState()

  useEffect(() => {
    async function handleActive() {
      const activesList = await findActives(user, date)
      if (activesList.result) {
        setList(activesList.result)
      } else {
        setList([])
      }
    }
    handleActive();
  }, [user, date, findActives])

  const [search, setSearch] = useState('')
  const searchLowerCase = search.toLowerCase();
  const listSearch = !list ? [] : list?.filter((employee) => 
    employee.name.toLowerCase().includes(searchLowerCase))

  const [ano, mes, dia] = String(date).split('-')
  const currentdate = new Date(ano, mes -1, dia)
  const formatdate = currentdate.toLocaleString('pt-BR', {
    day: '2-digit', 
    month: 'long', 
    year: 'numeric'
  })

  return (
    <div className='body'>

    <div className="container-search grid-1">
      <input type="search" placeholder='Buscar funcionários...' value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>

      <div className="type-table">
        <p className="type-title">Ativos do Dia</p>
        <p className="type-subtitle">{formatdate}</p>
      </div>

      <div className="table currentday-table">
        <div className="table-header">
          <div>Matrícula</div>
          <div>Nome</div>
          <div>Escala</div>
          <div>Confirmação</div>
        </div>

        {!list ? <p className="loading-text">Carregando funcionários...</p> :
          
          listSearch?.map((employee) => (
            <div className="table-row" key={employee.registration}
              onClick={() => route(`/employees/${employee.registration}`)}>
              <div className='matricula'>{employee.registration}</div>
              <div >{employee.name}</div>
              <div >{scales?.result?.find(scale => (scale.escala.id_escala == employee.scale_id))?.escala.scale_type}</div>
              <div > 
                {(() => {
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
  );
}
export default CurrentDay