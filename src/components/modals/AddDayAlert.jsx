import { useAuth } from '../../hook/useAuth'
import { useEffect, useState } from 'react'
import Alert from '../modals/Alert'

export default function AddDayAlert({ employee, setIsOpenDay, isOpenDay, day }) {
  const { addEditdays, user } = useAuth()
  const [erroMessage, setErroMessage] = useState()
  const [response, setResponse] = useState('Erro')

  const [form, setForm] = useState({})

  useEffect(() => {
    if (isOpenDay && employee)
      setForm({
        matricula_funcionario: employee?.matricula_funcionario,
        nome_diae: '',
        descricao_diae: '',
        data_diae: day,
      })
  }, [isOpenDay, employee])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const isDisable = Object.values(form).some(values => values === '')

  async function handleAddScale(e) {
    e.preventDefault()
    const editDay = await addEditdays(user, form)
    if (editDay?.result) {
      setResponse('Sucesso')
      setErroMessage(editDay?.sucess)
    } else {
      setResponse('Erro')
      setErroMessage(editDay?.error)
    }
  }

  if (!isOpenDay || !employee) return null

  return (
    <div className='form-container'>
      {erroMessage && (
        <Alert response={response} 
        text='ao Atualizar Escala' 
        error={erroMessage} 
        onClose={() => {
          setErroMessage("")
          setIsOpenDay(false)
          window.location.reload()
        }} />
      )}
      <div className="form-card-position">
        <form onSubmit={handleAddScale} className="forms">
          <p className="form-title">Alteração Esporádica</p>
          <div className="form-card">
            <input name='matricula_funcionario' type="number" className="form-input" placeholder="Matricula"
              value={form?.matricula_funcionario} />

            <input name='nome_diae' type="text" className="form-input"
            placeholder='Assunto'  value={form?.nome_diae} onChange={handleChange} />

            <input name='descricao_diae' type='text' className="form-input" 
            placeholder="Descrição" value={form?.descricao_diae} onChange={handleChange} />
            
            <input name='data_diae' type='date' className="form-input"
            value={form?.data_diae}  />   
          </div>

          <div className="buttons-form">
            <button type="submit" className={`confirm-button ${isDisable ? 'disable' : ''}`} disabled={isDisable}>
              Concluir
            </button>
            <button className="cancel-button" onClick={() => setIsOpenDay(!isOpenDay)}>Fechar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
