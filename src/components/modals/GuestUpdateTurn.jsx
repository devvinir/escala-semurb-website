import { useState} from 'react'
import DemoData from '../../api/demodata.json'
import Alert from './Alert'

export default function Updateshift({ isOpen, setIsOpen}) {

    const [form, setForm] = useState({})
    
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
    window.location.reload()
  }
  
  if(isOpen)
    return(
    <div className="form-container">
    

      <div className="form-card-position">
        <form onSubmit={handleSubmit} className="forms">
          <p className="form-title">Cadastrar shifto</p>
          <div className="form-card">

            <label className="form-label">Matricula</label>
            <input name='registration' type="number" className="form-input" placeholder="Matricula"
              value={form.registration} onChange={handleChange} />

            <label className="form-label">Inicio do shifto</label>
            <input name='shift_start' type="time" className="form-input"
              value={form.shift_start} onChange={handleChange} />

            <label className="form-label">Termino do shifto</label>
            <input name='shift_end' type="time" className="form-input"
              value={form.shift_end} onChange={handleChange} />

            <label  className="form-label">Duração do shifto</label>
            <input name='total_shift' type="time" className="form-input"
              value={form.total_shift} onChange={handleChange} />

            <label className="form-label">Intervalo do shifto</label>
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