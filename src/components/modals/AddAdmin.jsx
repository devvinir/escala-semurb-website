import '../../styles/AddEmployee.css'
import { useAuth } from '../../hook/useAuth'
import { useState, useEffect} from 'react'
import Alert from './Alert'

function AddAdminCard({ isOpenEmployee, setIsOpenEmployee, setPage, employee }) {
  const [currentPage, setCurrentPage] = useState(setPage || 1)
  const [createdEmployee, setCreatedEmployee] = useState(employee || null) // guarda funcionário criado
  
    useEffect(() => {
    if (setPage) {
      setCurrentPage(setPage)
    }
  }, [setPage])

  const goNextPage = (employee) => {
    if (employee) setCreatedEmployee(employee)
    setCurrentPage((prev) => prev + 1) // avança de forma progressiva
  }

  const pages = [
    <Page1
      key="page1"
      isOpenEmployee={isOpenEmployee}
      setIsOpenEmployee={setIsOpenEmployee}
      goNextPage={goNextPage}
    />,
    <Page2
      key="page2"
      employee={createdEmployee}
      setIsOpenEmployee={setIsOpenEmployee}
      goNextPage={goNextPage}
    />,
    <Page3
      key="page3"
      employee={createdEmployee}
      setIsOpenEmployee={setIsOpenEmployee}
    />
  ]

  return isOpenEmployee && (
    <div className="form-container">
      {pages[currentPage - 1]}
    </div>
  )
}

function Page1({ setIsOpenEmployee, goNextPage }) {
  const { addAdmin, allTeams,  allSectors} = useAuth()
  const [erroMessage, setErroMessage] = useState()
  const [response, setResponse] = useState('Erro')
  const [save, setSave] = useState() 

  const selectedSector = allSectors?.result?.find(
  sector => sector.name === form.sector
)

const filteredTeams = allTeams?.result?.filter(
  team => team.sector_id === selectedSector?.id
)
  const [form, setForm] = useState({
    registration: '',
    name: '',
    email: '',
    phone: '',
    position: '',
    sector: '',
    is_admin: '',
    team: '',
    region: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "sector" && {team : ""})
    }));
  };


  async function handleAddEmployee(e) {
    e.preventDefault()
    const employee = await addAdmin(form)

    if (employee.result) {
      setResponse('Sucesso')
      setErroMessage(employee.sucess)
      setSave(employee.result)
    } else {
      setResponse('Erro')
      setErroMessage(employee.error)
    }
  }
  const isDisable = Object.values(form).some(values => values === '')
  return (
    <div>
      {erroMessage && (
        <Alert
          response={response}
          text="ao Cadastrar Funcionario"
          error={erroMessage}
          onClose={() => {
            setErroMessage("")
            if (response === 'Sucesso' && save) {
              goNextPage(save)
            }
          }}
        />
      )}

      <div className="form-card-position">
        <form onSubmit={handleAddEmployee} className="forms">
          <p className="form-title">Adicionar Funcionario</p>
          <div className="form-card ">

            <input name='registration' type="number" className="form-input" 
            placeholder="Matricula" value={form.registration} onChange={handleChange} />

            <input name='name' type="text" className="form-input" placeholder="name Completo"
              value={form.name} onChange={handleChange} />

            <input name='email' type="email" className="form-input" placeholder="email"
            value={form.email} onChange={handleChange} />

            <input name='phone' type="tel" className="form-input" placeholder="phone"
              value={form.phone} onChange={handleChange} />

            <input name='position' type="text" className="form-input" placeholder="position"
              value={form.position} onChange={handleChange} />

            <select name='sector' className="form-input form-option"
              value={form.sector} onChange={handleChange}>
              <option value={null}>Selecione um sector</option>
              {allSectors?.result?.map((sec) => (
                <option key={sec.id} value={sec.name}> {sec.name}</option>
              ))}
            </select>

              <select name='is_admin' className="form-input form-option"
               value={form.is_admin} onChange={handleChange}>
              <option value={null}>Administrador(TRUE/NÃO)</option>
              <option value='TRUE'>TRUE</option>
              <option value='FALSE'>Não</option>
            </select>

            <select name='team'  className="form-input form-option"
              value={form.team} onChange={handleChange}>
                <option value={null}>Selecione uma team</option>
                {filteredTeams?.map((eq) => (
                    <option key={eq.id} value={eq.name}>
                        {eq.name}
                    </option>
                ))}
            </select>
            
            <select name='region' id="region-input"  className="form-input form-option"
               value={form.region} onChange={handleChange}>
              <option value={null}>Selecione uma região</option>
              <option value='Sul'>Sul</option>
              <option value='Norte'>Norte</option>
              <option value='Leste'>Leste</option>
              <option value='Oeste'>Oeste</option>
            </select>
            
          </div>

          <div className="buttons-form">
            <button type="submit" className={`confirm-button ${isDisable ? 'disable' : ''}`}
              disabled={isDisable}>
              Continuar
            </button>
            <button type="button" className="cancel-button" onClick={() => setIsOpenEmployee(false)}>Fechar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Page2({ employee, setIsOpenEmployee, goNextPage }) {
  const { addScaleAdmin, allScales} = useAuth()
  const [erroMessage, setErroMessage] = useState()
  const [response, setResponse] = useState('Erro')
  const [save, setSave] = useState()  


  const [form, setForm] = useState({
    registration: employee.registration,
    start_date: '',
    scale_type: '',
    use_occasion: 'FALSE',
    unwork_scale: [],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleDiasChange = (dia) => {
    setForm(prev => {
      const dias = prev.unwork_scale
      const updatedDias = dias.includes(dia) ? dias.filter(d => d !== dia) : [...dias, dia]
      return { ...prev, unwork_scale: updatedDias }
    })
  }

  async function handleAddScale(e) {
    e.preventDefault()
    const scale = await addScaleAdmin(form)
    if (scale.result) {
      setResponse('Sucesso')
      setErroMessage(scale.sucess)
      setSave(employee)
    } else {
      setResponse('Erro')
      setErroMessage(scale.error)
    }
  }

  const camposObrigatorios = ['registration', 'start_date', 'scale_type']
  const camposPreenchidos = camposObrigatorios.every(key => form[key] !== '')
  const isDisabled = !camposPreenchidos || (form.use_occasion === 'TRUE' && form.unwork_scale.length === 0)

  return (
    <div>
      {erroMessage && (
        <Alert
          response={response}
          text="ao Cadastrar Escala"
          error={erroMessage}
          onClose={() => {
            setErroMessage("")
            if (response === 'Sucesso' && save) 
              goNextPage(save)
          }}
        />
      )}

      <div className="form-card-position">
        <form onSubmit={handleAddScale} className="forms">
          <p className="form-title">Cadastrar Escala</p>
          <div className="form-card">
            <input name='registration' type="number" className="form-input" placeholder="Matricula"
              value={form.registration} onChange={handleChange} />

            <input name='start_date' type="date" className="form-input" 
            value={form.start_date} onChange={handleChange} />

            <input name='scale_type' id="escala-input" list="escalas-list" className="form-input"
              placeholder="Escala" value={form.scale_type} onChange={handleChange} />
            <datalist id="escalas-list">
              {allScales?.result?.map(s =>
                <option key={s.id} value={s.scale_type} />)}
            </datalist>
              
            <div className="">
            <label className="form-label">Dias da Semana:</label>
            <select name="use_occasion" 
            value={form.use_occasion} 
            onChange={handleChange}
            className="daysofweek form-option">
              <option value="TRUE">SIM</option>
              <option value="FALSE">NÃO</option>
            </select>

            {form.use_occasion === 'TRUE' && (
              <div className="dias-semana-checkboxes">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map(dia => (
                  <label key={dia} >
                    <input type="checkbox"
                      checked={form.unwork_scale.includes(dia)}
                      onChange={() => handleDiasChange(dia)}
                    />
                    {dia}
                  </label>
                ))}
              </div>
            )}
          </div>
          </div>

          <div className="buttons-form">
            <button type="submit" className={`confirm-button ${isDisabled ? 'disable' : ''}`} disabled={isDisabled}>Concluir</button>
            <button type="button" className="cancel-button" onClick={() => setIsOpenEmployee(false)}>Fechar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Page3({ employee, setIsOpenEmployee }) {
  const { addTurnAdmin} = useAuth()
  const [erroMessage, setErroMessage] = useState()
  const [response, setResponse] = useState('Erro')
  const [save, setSave] = useState()

  const [form, setForm] = useState({
    registration: employee.registration,
    shift_start: '',
    shift_end: '',
    total_shift: '',
    shift_pause: ''
  })
  const handleChange = (e) => {
 const { name, value } = e.target;

 setForm(prev => ({
   ...prev,
   [name]: value,
 }));
};

  async function handleAddTurn(e) {
    e.preventDefault()
    const turn = await addTurnAdmin(form)
    if (turn.result) {
      setResponse('Sucesso')
      setErroMessage(turn.sucess)
      setSave(turn)
    } else {
      setResponse('Erro')
      setErroMessage(turn.error)
    }
  }

  const isDisable = Object.values(form).some(values => values === '')
  return (
    <div>
      {erroMessage && (
        <Alert
          response={response}
          text="ao Cadastrar Turno"
          error={erroMessage}
          onClose={() => {
            setErroMessage("")
            if (response === 'Sucesso' && save) {
              setIsOpenEmployee(false)
              window.location.reload()
            }
          }}
        />
      )}

      <div className="form-card-position">
        <form onSubmit={handleAddTurn} className="forms">
          <p className="form-title">Cadastrar Turno</p>
          <div className="form-card">

            <label className="form-label">Matricula</label>
            <input name='registration' type="number" className="form-input" placeholder="Matricula"
              value={form.registration} onChange={handleChange} />

            <label className="form-label">Inicio do Turno</label>
            <input name='shift_start' type="time" className="form-input"
              value={form.shift_start} onChange={handleChange} />

            <label  className="form-label">Termino do Turno</label>
            <input type="time" className="form-input" name='shift_end'
              value={form.shift_end} onChange={handleChange} />

            <label  className="form-label">Duração do Turno</label>
            <input type="time" className="form-input" name='total_shift'
              value={form.total_shift} onChange={handleChange} />

            <label  className="form-label">Intervalo do Turno</label>
            <input type="time" className="form-input" name='shift_pause'
              value={form.shift_pause} onChange={handleChange} />
          </div>

          <div className="buttons-form">
            <button type="submit" className={`confirm-button ${isDisable ? 'disable' : ''} `}
              disabled={isDisable}>
              Concluir
            </button>
            <button type="button" className="cancel-button" onClick={() => setIsOpenEmployee(false)}>Fechar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddAdminCard
