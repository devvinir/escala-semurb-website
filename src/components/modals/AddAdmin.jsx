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

  const [form, setForm] = useState({
    matricula_funcionario: '',
    nome: '',
    email: '',
    telefone: '',
    cargo: '',
    setor: '',
    status_permissao: '',
    equipe: '',
    regiao: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
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

            <input name='matricula_funcionario' type="number" className="form-input" 
            placeholder="Matricula" value={form.matricula_funcionario} onChange={handleChange} />

            <input name='nome' type="text" className="form-input" placeholder="Nome Completo"
              value={form.nome} onChange={handleChange} />

            <input name='email' type="email" className="form-input" placeholder="Email"
            value={form.email} onChange={handleChange} />

            <input name='telefone' type="tel" className="form-input" placeholder="Telefone"
              value={form.telefone} onChange={handleChange} />

            <input name='cargo' type="text" className="form-input" placeholder="Cargo"
              value={form.cargo} onChange={handleChange} />

            <select name='setor' className="form-input form-option"
              value={form.setor} onChange={handleChange}>
              <option value={null}>Selecione um setor</option>
              {allSectors?.result?.map((sec) => (
                <option key={sec.id_setor} value={sec.nome_setor}> {sec.nome_setor}</option>
              ))}
            </select>

              <select name='status_permissao' className="form-input form-option"
               value={form.status_permissao} onChange={handleChange}>
              <option value={null}>Administrador(SIM/NÃO)</option>
              <option value='Sim'>Sim</option>
              <option value='Não'>Não</option>
            </select>

            <select name='equipe'  className="form-input form-option"
              value={form.equipe} onChange={handleChange}>
                <option value={null}>Selecione uma equipe</option>
                {allTeams?.result?.map((eq) => (
                  <option key={eq.id_equipe} value={eq.nome_equipe}> {eq.nome_equipe}</option>
                ))}
            </select>
            
            <select name='regiao' id="regiao-input"  className="form-input form-option"
               value={form.regiao} onChange={handleChange}>
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

  console.log(employee)

  const [form, setForm] = useState({
    matricula_funcionario: employee.matricula_funcionario,
    data_inicio: '',
    tipo_escala: '',
    usa_dias_especificos: 'NAO',
    dias_n_trabalhados_escala_semanal: [],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleDiasChange = (dia) => {
    setForm(prev => {
      const dias = prev.dias_n_trabalhados_escala_semanal
      const updatedDias = dias.includes(dia) ? dias.filter(d => d !== dia) : [...dias, dia]
      return { ...prev, dias_n_trabalhados_escala_semanal: updatedDias }
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

  const camposObrigatorios = ['matricula_funcionario', 'data_inicio', 'tipo_escala']
  const camposPreenchidos = camposObrigatorios.every(key => form[key] !== '')
  const isDisabled = !camposPreenchidos || (form.usa_dias_especificos === 'SIM' && form.dias_n_trabalhados_escala_semanal.length === 0)

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
            <input name='matricula_funcionario' type="number" className="form-input" placeholder="Matricula"
              value={form.matricula_funcionario} onChange={handleChange} />

            <input name='data_inicio' type="date" className="form-input" 
            value={form.data_inicio} onChange={handleChange} />

            <input name='tipo_escala' id="escala-input" list="escalas-list" className="form-input"
              placeholder="Escala" value={form.tipo_escala} onChange={handleChange} />
            <datalist id="escalas-list">
              {allScales?.result?.map(s =>
                <option key={s.id_escala} value={s.tipo_escala} />)}
            </datalist>
              
            <div className="">
            <label>Dias da Semana:</label>
            <select name="usa_dias_especificos" 
            value={form.usa_dias_especificos} 
            onChange={handleChange}
            className="daysofweek form-option">
              <option value="SIM">SIM</option>
              <option value="NAO">NAO</option>
            </select>

            {form.usa_dias_especificos === 'SIM' && (
              <div className="dias-semana-checkboxes">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map(dia => (
                  <label key={dia}>
                    <input type="checkbox"
                      checked={form.dias_n_trabalhados_escala_semanal.includes(dia)}
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
    matricula_funcionario: employee.matricula_funcionario,
    inicio_turno: '',
    termino_turno: '',
    duracao_turno: '',
    intervalo_turno: ''
  })
  const handleChange = (e) => {
    const {name, value} = e.target
    setForm(prev => ({...prev, [name]: value}))
  }

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
            <input name='matricula_funcionario' type="number" className="form-input" placeholder="Matricula"
              value={form.matricula_funcionario} onChange={handleChange} />

            <label className="form-label">Inicio do Turno</label>
            <input name='inicio_turno' type="time" className="form-input"
              value={form.inicio_turno} onChange={handleChange} />

            <label  className="form-label">Termino do Turno</label>
            <input type="time" className="form-input" name='termino_turno'
              value={form.termino_turno} onChange={handleChange} />

            <label  className="form-label">Duração do Turno</label>
            <input type="time" className="form-input" name='duracao_turno'
              value={form.duracao_turno} onChange={handleChange} />

            <label  className="form-label">Intervalo do Turno</label>
            <input type="time" className="form-input" name='intervalo_turno'
              value={form.intervalo_turno} onChange={handleChange} />
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
