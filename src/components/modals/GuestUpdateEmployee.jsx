import DemoData from '../../api/demodata.json'
import { useState } from 'react'
import Alert from './Alert'


export default function UpdateEmployee({ isOpen, setIsOpen }) {

  const [form, setForm] = useState({})


 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    function handleAddEmployee(e) {
    e.preventDefault()
    window.location.reload();
  }

  if (isOpen) return (
    <div className='form-container'>

      <div className="form-card-position">
        <form onSubmit={handleAddEmployee} className="forms">
          <p className="form-title">Atualizar Funcionario</p>
          <div className="form-card ">

            <input name='registration' type="number" className="form-input" 
            placeholder='Matricula' value={form.registration} />

            <input name='email' type="text" className="form-input" placeholder="Email"
              value={form.email} onChange={handleChange} />

            <input name='phone' type="tel" className="form-input" placeholder="Telefone"
              value={form.phone} onChange={handleChange} />

            <input name='position' type="text" className="form-input" placeholder="Cargo"
              value={form.position} onChange={handleChange} />

            <select name='team' className="form-input" value={form.team} onChange={handleChange}>
              <option value="">Selecione uma equipe</option>
              {DemoData?.team?.map((eq) => (
                <option key={eq.id} value={eq.name}> {eq.name}</option>
              ))}
            </select>

            <select name="region" id="regiao-input" className="form-input"
            value={form.region} onChange={handleChange}>
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
