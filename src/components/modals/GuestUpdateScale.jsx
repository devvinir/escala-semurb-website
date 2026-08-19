import DemoData from '../../api/demodata.json'
import {  useState } from 'react'
import Alert from '../modals/Alert'

export default function UpdateScale({  setIsOpenEmployee, isOpenEmployee }) {

  const [form, setForm] = useState({})

 

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleDiasChange = (dia) => {
    setForm(prev => {
      const dias = Array.isArray(prev.unwork_scale)
        ? prev.unwork_scale
        : []
      const updatedDias = dias.includes(dia) ? dias.filter(d => d !== dia) : [...dias, dia]
      return { ...prev, unwork_scale: updatedDias }
    })
  }

  const camposObrigatorios = ['registration', 'start_date', 'scale_type']
  const camposPreenchidos = camposObrigatorios.every(key => form[key] !== '')
  const isDisabled = !camposPreenchidos || (form?.use_occasion === 'TRUE' && form?.unwork_scale?.length === 0)

function handleAddScale(e) {
    e.preventDefault()
  window.location.reload()
  }

  if (!isOpenEmployee) return null

  return (
    <div className='form-container'>
     
      <div className="form-card-position">
        <form onSubmit={handleAddScale} className="forms">
          <p className="form-title">Atualizar Escala</p>
          <div className="form-card">
            <input name='registration' type="number" className="form-input" placeholder="Matricula"
              value={form?.registration} />

            <input name='start_date' type="date" className="form-input"
              value={form?.start_date} onChange={handleChange} />

            <input name='scale_type' id="escala-input" list="escalas-list" className="form-input"
              placeholder="Escala" value={form?.scale_type} onChange={handleChange} />
            <datalist id="escalas-list">
              {DemoData.scale?.map((scale, key) => (
                <option key={key} value={scale.scale_type} />
              ))}
            </datalist>

            <div className="">
              <p className="">Dias da Semana:</p>
              <select name="use_occasion" 
              value={form?.use_occasion} 
              onChange={handleChange} 
              className="daysofweek">
                <option value="true">SIM</option>
                <option value="false">NAO</option>
              </select>
            </div>

            {form?.use_occasion === 'true' && (
              <div className="dias-semana-checkboxes">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map(dia => (
                  <label key={dia}>
                    <input type="checkbox"
                      checked={form?.unwork_scale?.includes(dia)}
                      onChange={() => handleDiasChange(dia)} />
                    {dia}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="buttons-form">
            <button type="submit" className={`confirm-button ${isDisabled ? 'disable' : ''}`} disabled={isDisabled}>
              Concluir
            </button>
            <button className="cancel-button" onClick={() => setIsOpenEmployee(!isOpenEmployee)}>Fechar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
