import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IoIosCloseCircle, IoIosCheckmarkCircle } from "react-icons/io";
import '../styles/Search.css'
import DemoData from '../api/demodata.json'

function GuestCurrentDay() {
    const route = useNavigate()
    const {date} = useParams()

function employee_active(date) {
  const data = new Date(date);

  const days = ["Dom","Seg","Ter","Qua","Qui","Sex","Sab"];
  const week_day = days[data.getDay()];

  return DemoData.employee.filter((employee) => {
    const scale = DemoData.scale.find(
      scale => scale.id === employee.scale_id
    );

    if (!scale) return false;

    // scale por days fixos da semana
    if (scale.use_occasion) {
      return !scale.unwork_scale.includes(week_day);
    }

    // scale por cycle (12x36, 24x48, etc)
    const start = new Date(scale.start_date);
    const rest = Math.floor(
      (data - start) / (1000 * 60 * 60 * 24)
    );

    const [work_day, unwork_day] = scale.scale_type
      .split("x")
      .map(Number);

    const cycle = work_day + unwork_day;
    const current_day = rest % cycle;
    return current_day < work_day;
  });
}   

    const employee = employee_active(date)

  const [search, setSearch] = useState('')
  const searchLowerCase = search.toLowerCase();
  const listSearch = !employee ? [] : employee?.filter((employee) => 
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
          <div>scale</div>
          <div>Confirmação</div>
        </div>

        {!DemoData.employee ? <p className="loading-text">Carregando funcionários...</p> :
          
          listSearch?.map((employee) => (
            <div className="table-row" key={employee.registration}
              onClick={() => route(`/guest-employee-profile/${employee.registration}`)}>
              <div className='matricula'>{employee.registration}</div>
              <div >{employee.name}</div>
              <div >{DemoData?.scale.find(scale => (scale.id == employee.scale_id))?.scale_type}</div>
              <div > 
                {(() => {
            
                  if (employee.confirm === false) {
                    return <IoIosCloseCircle color='orange' size={30}/>
                  } else if (employee.confirm === true) {
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
export default GuestCurrentDay