import { useAuth } from '../../hook/useAuth'
import { useEffect, useState } from 'react'
import Alert from '../modals/Alert'

export default function UpdateScaleAdmin({ employee, setIsOpenEmployee, isOpenEmployee }) {
  const { updateScaleAdmin, allScales} = useAuth()
  const [erroMessage, setErroMessage] = useState()
  const [response, setResponse] = useState('Erro')
  const [save, setSave] = useState()

  const scale = allScales?.result?.find(s => s.id == employee.scale_id)
  const [form, setForm] = useState({})

  useEffect(() => {
    if (isOpenEmployee && employee)
      setForm({
        registration: employee?.registration,
        start_date: scale?.start_date,
        scale_type: scale?.scale_type,
        use_occasion: scale?.use_occasion ? 'TRUE' : 'FALSE',
        unwork_scale: Array.isArray(scale?.unwork_scale)
          ? scale.unwork_scale
          : [],
      })
  }, [isOpenEmployee, employee])

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

  async function handleAddScale(e) {
    e.preventDefault()
    const newScale = await updateScaleAdmin(form)
    if (newScale?.result) {
      setResponse('Sucesso')
      setErroMessage(newScale?.sucess)
      setSave(newScale)
    } else {
      setResponse('Erro')
      setErroMessage(newScale?.error)
    }
  }

  if (!isOpenEmployee) return null

  return (
    <div className='form-container'>
      {erroMessage && (
        <Alert response={response} 
        text='ao Atualizar Escala' 
        error={erroMessage} 
        onClose={() => {
          setErroMessage("")
          if (response === 'Sucesso' && save)
            setIsOpenEmployee(false)
          window.location.reload()
        }} />
      )}
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
              {allScales?.result?.map((scale, key) => (
                <option key={key} value={scale.scale_type} />
              ))}
            </datalist>

            <div className="">
              <p className="">Dias da Semana:</p>
              <select name="use_occasion" value={form?.use_occasion} onChange={handleChange} className="daysofweek">
                <option value="TRUE">SIM</option>
                <option value="FALSE">NÃO</option>
              </select>
            </div>

            {form?.use_occasion === 'TRUE' && (
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
