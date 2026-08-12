import { useState, useEffect } from 'react'
import { useAuth } from '../../hook/useAuth'
import Alert from './Alert'

export default function UpdateTurnAdmin({ isOpen, setIsOpen, employee }) {

  const { updateTurnAdmin, allTurns } = useAuth()

  const turn = allTurns?.result?.find(t => (
    t.id === employee.shift_id
  ))

  const [response, setRes] = useState('Erro')
  const [error, setError] = useState()

  const [form, setForm] = useState({})
  useEffect(() => {
    if (employee && isOpen) {
      setForm({
        registration: employee.registration,
        shift_start: employee.shift_id === turn.id ? turn.shift_start : null,
        shift_end: employee.shift_id === turn.id ? turn.shift_end : null,
        total_shift: employee.shift_id === turn.id ? turn.total_shift : null,
        shift_pause: employee.shift_id === turn.id ? turn.shift_pause : null
      })
    }
  }, [employee, isOpen, turn])
   const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev, [name]: value
    })
    )
  }
  const isDisable = Object.values(form).some(values => values === '')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newTurn = await updateTurnAdmin(form)
    if (newTurn.result) {
      setRes('Sucesso')
      setError(newTurn.sucess)
    } else {
      setError(newTurn.error)
    }
  }
  
  if(isOpen)
    return(
    <div className="form-container">
      {error && (
        <Alert 
        response={response}
        text='Ao Alterar Turno'
        error={error}
        onClose={()=>{
          setError("")
          setIsOpen(!isOpen)
          window.location.reload()
        }}
        />
      )}

      <div className="form-card-position">
        <form onSubmit={handleSubmit} className="forms">
          <p className="form-title">Cadastrar Turno</p>
          <div className="form-card">

            <label className="form-label">Matricula</label>
            <input name='registration' type="number" className="form-input" placeholder="Matricula"
              value={form.registration}  />

            <label className="form-label">Inicio do Turno</label>
            <input name='shift_start' type="time" className="form-input"
              value={form.shift_start} onChange={handleChange} />

            <label className="form-label">Termino do Turno</label>
            <input name='shift_end' type="time" className="form-input"
              value={form.shift_end} onChange={handleChange} />

            <label  className="form-label">Duração do Turno</label>
            <input name='total_shift' type="time" className="form-input"
              value={form.total_shift} onChange={handleChange} />

            <label className="form-label">Intervalo do Turno</label>
            <input name='shift_pause' type="time" className="form-input"
              value={form.shift_pause} onChange={handleChange} />
          </div>

          <div className="buttons-form">
            <button type="submit" className={`confirm-button ${isDisable ? 'disable' : ''} `}
              disabled={isDisable}>
              Concluir
            </button>
            <button type="button" className="cancel-button" onClick={() => setIsOpen(false)}>Fechar</button>
          </div>
        </form>
      </div>
    </div>
  );
  return null
}