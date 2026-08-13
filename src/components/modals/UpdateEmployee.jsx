import { useAuth } from '../../hook/useAuth'
import { useState, useEffect } from 'react'
import Alert from './Alert'


export default function UpdateEmployee({ isOpen, setIsOpen, employee }) {
  const { updateEmployee, teams, regions, user } = useAuth()
  const [erroMessage, setErroMessage] = useState()
  const [response, setResponse] = useState('Erro')
  const [form, setForm] = useState({})

  const team = teams?.result?.find(team =>
    employee.team_id == team.id_equipe)?.name
  const region = regions?.result?.find(region =>
    employee.region_id == region.id_regiao)?.name

  useEffect(() => {
    if (isOpen && employee)
      setForm({
        registration: employee.registration,
        email: employee.email,
        phone: employee.phone,
        position: employee.position,
        equipe: team,
        regiao: region,
      })

  }, [isOpen, employee])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleAddEmployee(e) {
    e.preventDefault()

    const EditEmployee = await updateEmployee(user, form)

    if (EditEmployee.sucess) {
      setResponse('Sucesso')
      setErroMessage(EditEmployee.sucess)
    } else {
      setResponse('Erro')
      setErroMessage(EditEmployee.error)
    }
  }

  if (isOpen) return (
    <div className='form-container'>
      {erroMessage && (
        <Alert
          response={response}
          text="ao AtualizarFuncionario"
          error={erroMessage}
          onClose={() => {
            setErroMessage("")
            setIsOpen(!isOpen)
            window.location.reload()
          }}
        />
      )}

      <div className="form-card-position">
        <form onSubmit={handleAddEmployee} className="forms">
          <p className="form-title">Atualizar Funcionario</p>
          <div className="form-card ">

            <input name='registration' type="number" className="form-input" 
            placeholder='Matricula' value={form.registration} />

            <input name='email' type="text" className="form-input" placeholder="Email"
              value={form.email} onChange={handleChange} />

            <input name='phone' type="tel" className="form-input" placeholder="phone"
              value={form.phone} onChange={handleChange} />

            <input name='position' type="text" className="form-input" placeholder="position"
              value={form.position} onChange={handleChange} />

            <select name='equipe' className="form-input" value={form.equipe} onChange={handleChange}>
              <option value="">Selecione uma equipe</option>
              {teams?.result?.map((eq) => (
                <option key={eq.id_equipe} value={eq.name}> {eq.name}</option>
              ))}
            </select>

            <select name="regiao" id="regiao-input" className="form-input"
            value={form.regiao} onChange={handleChange}>
              {region ? <option value={region}> {region}</option> : null}
                <option value={null}> Selecione uma região</option>
                <option value="Norte"> Norte</option>
                <option value="Sul"> Sul</option>
                <option value="Leste"> Leste</option>
                <option value="Oeste"> Oeste</option>
            </select>


          </div>

          <div className="buttons-form">
            <button type="submit"
              className={`confirm-button ${Object.values(form).some(values => values === '') ? 'disable' : ''}`}
              disabled={Object.values(form).some(values => values === '')}>
              Continuar
            </button>
            <button type="button" className="cancel-button" onClick={() => setIsOpen(!isOpen)}>Fechar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
