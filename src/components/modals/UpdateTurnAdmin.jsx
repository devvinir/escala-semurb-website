import { useState, useEffect } from 'react'
import { useAuth } from '../../hook/useAuth'
import Alert from './Alert'

export default function UpdateTurnAdmin({ isOpen, setIsOpen, employee }) {

  const { updateTurnAdmin, allTurns } = useAuth()

  const turn = allTurns?.result?.find(t => (
    t.id_turno === employee.id_turno
  ))

  const [response, setRes] = useState('Erro')
  const [error, setError] = useState()

  const [form, setForm] = useState({})
  useEffect(() => {
    if (employee && isOpen) {
      setForm({
        matricula_funcionario: employee.matricula_funcionario,
        inicio_turno: employee.id_turno === turn.id_turno ? turn.inicio_turno : null,
        termino_turno: employee.id_turno === turn.id_turno ? turn.termino_turno : null,
        duracao_turno: employee.id_turno === turn.id_turno ? turn.duracao_turno : null,
        intervalo_turno: employee.id_turno === turn.id_turno ? turn.intervalo_turno : null
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
            <input name='matricula_funcionario' type="number" className="form-input" placeholder="Matricula"
              value={form.matricula_funcionario}  />

            <label className="form-label">Inicio do Turno</label>
            <input name='inicio_turno' type="time" className="form-input"
              value={form.inicio_turno} onChange={handleChange} />

            <label className="form-label">Termino do Turno</label>
            <input name='termino_turno' type="time" className="form-input"
              value={form.termino_turno} onChange={handleChange} />

            <label  className="form-label">Duração do Turno</label>
            <input name='duracao_turno' type="time" className="form-input"
              value={form.duracao_turno} onChange={handleChange} />

            <label className="form-label">Intervalo do Turno</label>
            <input name='intervalo_turno' type="time" className="form-input"
              value={form.intervalo_turno} onChange={handleChange} />
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