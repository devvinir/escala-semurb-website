import { useAuth } from '../../hook/useAuth'
import { useState, useEffect} from 'react'
import Alert from './Alert'


function UpdateAdmin({ isOpen, setIsOpen, employee }) {
  const { updateAdmin, allSectors, allTeams, allRegions} = useAuth()
  const [erroMessage, setErroMessage] = useState()
  const [response, setResponse] = useState('Erro')


  const [form, setForm] = useState({ })
 
  const sector = allSectors?.result?.find(sector => (
  employee.sector_id == sector.id))
  const team = allTeams?.result?.find(team => 
  employee.team_id == team.id)?.name
  const region = allRegions?.result?.find(region => 
  employee.region_id == region.id)?.name
  const selectedSector = allSectors?.result?.find(
  sector => sector.name === form.sector
)
const filteredTeams = allTeams?.result?.filter(
  team => team.sector_id === selectedSector?.id
)
  

  useEffect(()=>{
    if(isOpen && employee)
    setForm({
    email: employee.email,
    phone: employee.phone,
    position: employee.position,
    sector: sector.name, 
    is_admin: employee.is_admin,
    team: team,
    region: region,
    })

  },[isOpen, employee, sector, team, region])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "sector" && {team: ""})
    }));
  };

  async function handleAddEmployee(e) {
    e.preventDefault()

    console.log("dadoas enviados", form)

    const EditEmployee = await updateAdmin(employee.registration, form)

    console.log("Resposta do backend", EditEmployee)
    
  if (EditEmployee.sucess) {
      setResponse('Sucesso')
      setErroMessage(EditEmployee.sucess)
    } else {
      setResponse('Erro')
      setErroMessage(EditEmployee.error)
    }
  }

 if(isOpen) return (
    <div className='form-container'>
      {erroMessage && (
        <Alert
          response={response}
          text="ao Atualizar Funcionario"
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

            <input name='email' type="text" className="form-input" placeholder="Email"
              value={form.email} onChange={handleChange} />

            <input name='phone' type="tel" className="form-input" placeholder="phone"
              value={form.phone} onChange={handleChange} />

            <input name='position' type="text" className="form-input" placeholder="position"
              value={form.position} onChange={handleChange} />

            <select name="sector" id="setor-input" className="form-input"
             value={form.sector} onChange={handleChange} >
                <option value={null}>Selecione um setor</option>
              {allSectors.result?.map((sector) => (
                <option key={sector.id} value={sector.name}>{sector.name}</option>
              ))}
            </select>

             <select name="is_admin" className="form-input" 
              value={form.is_admin} onChange={handleChange} id='permissao-input'>
              <option value="TRUE">Sim</option>
              <option value="FALSE">Não</option>
            </select>

            <select name='team'className="form-input" 
            value={form.team} onChange={handleChange}>
                <option value={null}>Selecione uma equipe</option>
                {filteredTeams?.map((eq) => (
                    <option key={eq.id} value={eq.name}>
                        {eq.name}
                    </option>
                ))}
            </select>

            <select name="region" id="regiao-input" className="form-input"
             value={form.region} onChange={handleChange} >
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
export default UpdateAdmin