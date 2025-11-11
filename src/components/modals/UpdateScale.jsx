import { useAuth } from '../../hook/useAuth'
import { useEffect, useState } from 'react'
import Alert from '../modals/Alert'

export default function UpdateScale({ employee, setIsOpenEmployee, isOpenEmployee }) {
  const { updateScale, scales, user } = useAuth()
  const [erroMessage, setErroMessage] = useState()
  const [response, setResponse] = useState('Erro')
  const [save, setSave] = useState()

  const scale = scales?.result?.find(s => s.escala.id_escala == employee.id_escala)?.escala
  const [form, setForm] = useState({})

  useEffect(() => {
    if (isOpenEmployee && employee)
      setForm({
        matricula_funcionario: employee?.matricula_funcionario,
        data_inicio: scale?.data_inicio,
        tipo_escala: scale?.tipo_escala,
        usa_dias_especificos: scale?.usa_dias_especificos ? 'SIM' : 'NAO',
        dias_n_trabalhados_escala_semanal: Array.isArray(scale?.dias_n_trabalhados_escala_semanal)
          ? scale.dias_n_trabalhados_escala_semanal
          : [],
      })
  }, [isOpenEmployee, employee])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleDiasChange = (dia) => {
    setForm(prev => {
      const dias = Array.isArray(prev.dias_n_trabalhados_escala_semanal)
        ? prev.dias_n_trabalhados_escala_semanal
        : []
      const updatedDias = dias.includes(dia) ? dias.filter(d => d !== dia) : [...dias, dia]
      return { ...prev, dias_n_trabalhados_escala_semanal: updatedDias }
    })
  }

  const camposObrigatorios = ['matricula_funcionario', 'data_inicio', 'tipo_escala']
  const camposPreenchidos = camposObrigatorios.every(key => form[key] !== '')
  const isDisabled = !camposPreenchidos || (form?.usa_dias_especificos === 'SIM' && form?.dias_n_trabalhados_escala_semanal?.length === 0)

  async function handleAddScale(e) {
    e.preventDefault()
    const newScale = await updateScale(user, form)
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
            <input name='matricula_funcionario' type="number" className="form-input" placeholder="Matricula"
              value={form?.matricula_funcionario} />

            <input name='data_inicio' type="date" className="form-input"
              value={form?.data_inicio} onChange={handleChange} />

            <input name='tipo_escala' id="escala-input" list="escalas-list" className="form-input"
              placeholder="Escala" value={form?.tipo_escala} onChange={handleChange} />
            <datalist id="escalas-list">
              {scales?.result?.map((scale, key) => (
                <option key={key} value={scale.escala.tipo_escala} />
              ))}
            </datalist>

            <div className="">
              <p className="">Dias da Semana:</p>
              <select name="usa_dias_especificos" 
              value={form?.usa_dias_especificos} 
              onChange={handleChange} 
              className="daysofweek">
                <option value="SIM">SIM</option>
                <option value="NAO">NAO</option>
              </select>
            </div>

            {form?.usa_dias_especificos === 'SIM' && (
              <div className="dias-semana-checkboxes">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map(dia => (
                  <label key={dia}>
                    <input type="checkbox"
                      checked={form?.dias_n_trabalhados_escala_semanal?.includes(dia)}
                      onChange={() => handleDiasChange(dia)} />
                    {dia}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="buttons-form">
            <button type="submit" className={`confirm-button ${isDisabled ? 'disabel' : ''}`} disabled={isDisabled}>
              Concluir
            </button>
            <button className="cancel-button" onClick={() => setIsOpenEmployee(!isOpenEmployee)}>Fechar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
