import '../../styles/AddEmployee.css'
import { useState, useEffect } from 'react'
import DemoData from "../../api/demodata.json"

function GuestAddEmployee({ isOpenEmployee, setIsOpenEmployee, page, employee }) {

  const [currentPage, setCurrentPage] = useState(page? page:  1)

  const [createdEmployee, setCreatedEmployee] = useState(employee || null) // guarda funcionário criado

useEffect(() => {
  if(isOpenEmployee){
    setCurrentPage(page || 1)
  }
}, [isOpenEmployee, page])

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

function Page1({setIsOpenEmployee, goNextPage }) {
  const [form, setForm] = useState({
    registration: '',
    name: '',
    phone: '',
    email: '',
    position: '',
    team: '',
    region: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
   function handleAddEmployee(e) {
    e.preventDefault()
    goNextPage()
   }

  const isDisable = Object.values(form).some(values => values === '')
  
  return (
    <div>
        

      <div className="form-card-position">
        <form onSubmit={handleAddEmployee} className="forms">
          <p className="form-title">Adicionar Funcionario</p>
          <div className="form-card ">

            <input name='registration' type="number" className="form-input" placeholder="Matricula"
              value={form.registration} onChange={handleChange} />

            <input name='name' type="text" className="form-input" placeholder="Nome Completo"
              value={form.name} onChange={handleChange} />

            <input name='phone' type="tel" className="form-input" placeholder="Telefone"
              value={form.phone} onChange={handleChange} />

            <input name='email' type="email" className="form-input" placeholder="Email"
              value={form.email} onChange={handleChange} />

            <input name='position' type="text" className="form-input" placeholder="Cargo"
              value={form.position} onChange={handleChange} />

            <select name='team' id="equipe-input" list="equipes-list" className="form-input form-option"
              placeholder="Equipe" value={form.team} onChange={handleChange}>
              <option value={null}>Selecione uma equipe</option>
              {DemoData?.team.map((eq) => (
                <option key={eq.id} value={eq.name}> {eq.name}</option>
              ))}
            </select>

            <select name='region' id="regiao-input" list="regioes-list" className="form-input form-option"
              placeholder="Regiao" value={form.region} onChange={handleChange}>
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

function Page2({ setIsOpenEmployee, goNextPage }) {

  const [form, setForm] = useState({
    registration: '',
    start_date: '',
    scale_type: '',
    use_occasion: 'FALSE',
    unwork_scale: [],
  })

  const handleChange = (e) => {
 const { name, value } = e.target;

 setForm(prev => ({
   ...prev,
   [name]: value
 }));
};

  const handleDiasChange = (dia) => {
    setForm(prev => {
      const dias = prev.unwork_scale
      const updatedDias = dias.includes(dia) ? dias.filter(d => d !== dia) : [...dias, dia]
      return { ...prev, unwork_scale: updatedDias }
    })
  }

  async function handleAddScale(e) {
    e.preventDefault()
    goNextPage()
  }

  const camposObrigatorios = ['registration', 'start_date', 'scale_type']
  const camposPreenchidos = camposObrigatorios.every(key => form[key] !== '')
  const isDisabled = !camposPreenchidos || (form.use_occasion === 'SIM' && form.unwork_scale.length === 0)

  return (
    <div>

      <div className="form-card-position">
        <form onSubmit={handleAddScale} className="forms">
          <p className="form-title">Cadastrar Escala</p>
          <div className="form-card">
            <input name='registration' type="number" className="form-input" placeholder="Matricula"
              value={form.registration} onChange={handleChange} />
            <input name='start_date' type="date" className="form-input" value={form.start_date} onChange={handleChange} />
            <input name='scale_type' id="escala-input" list="escalas-list" className="form-input"
              placeholder="Escala" value={form.scale_type} onChange={handleChange} />
            <datalist id="escalas-list">
              {DemoData?.scale?.map(s =>
                <option key={s.id} value={s.scale_type} />)}
            </datalist>

            <div className="">
              <label className="form-label">Dias da Semana:</label>
              <select name="use_occasion"
                value={form.use_occasion}
                onChange={handleChange}
                className="daysofweek form-option">
                <option value="SIM">SIM</option>
                <option value="NAO">NAO</option>
              </select>

              {form.use_occasion === 'SIM' && (
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
            <button className={`confirm-button ${isDisabled ? 'disable' : ''}`} disabled={isDisabled}>Concluir</button>
            <button type="button" className="cancel-button" onClick={() => setIsOpenEmployee(false)}>Fechar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Page3({ setIsOpenEmployee }) {

  const [form, setForm] = useState({
    registration: '',
    shift_start: '',
    shift_end: '',
    total_shift: '',
    shift_pause: ''
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleAddTurn(e) {
    e.preventDefault()
    window.location.reload()
  }

  const isDisable = Object.values(form).some(values => values === '')
  return (
    <div>
      

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

            <label className="form-label">Termino do Turno</label>
            <input type="time" className="form-input" name='shift_end'
              value={form.shift_end} onChange={handleChange} />

            <label className="form-label">Duração do Turno</label>
            <input type="time" className="form-input" name='total_shift'
              value={form.total_shift} onChange={handleChange} />

            <label className="form-label">Intervalo do Turno</label>
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

export default GuestAddEmployee;
