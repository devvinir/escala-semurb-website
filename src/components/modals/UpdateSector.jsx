import { useState } from 'react';
import { useAuth } from '../../hook/useAuth'
import Alert from './Alert';

export default function UpdateSector({isOpen, setIsOpen, id_setor}) {

  const { updateSector, allSectors } = useAuth()

  const [erroMessage, setErroMessage] = useState()
  const [response, setResponse] = useState('Erro')
  
  const sector = allSectors?.result?.setores?.find(sector => 
    sector.id_setor == id_setor
  )
  const [newSector, setNewSector] = useState(sector?.nome_setor)

  const handleSubmit = async (e) => {
      e.preventDefault()
    
    const res = await updateSector(id_setor, newSector)
    if (res?.result) {
      setResponse('Sucesso')
      setErroMessage(res?.sucess)
    } else {
      setResponse('Erro')
      setErroMessage(res?.error)
    }
  }

  if (isOpen) return (
    <div className="form-container">
      {erroMessage && (
        <Alert
          response={response}
          text="ao Editar Setor"
          error={erroMessage}
          onClose={() => {
            setErroMessage("")
            setIsOpen(!isOpen)
            window.location.reload()
          }}
        />
      )}
    <div className="form-card-position admin-card">
      <form onSubmit={handleSubmit} className="forms admin-form">
        <p className="form-title">Editar Setor</p>
        <div className="form-card admin-setor">
         <input name="setor" className="form-input"
              placeholder="Setor" value={newSector} onChange={(e) => setNewSector(e.target.value)} />
      
        </div>
        <div className="buttons-form">
          <button type="submit" className="confirm-button"
            disabled={!newSector}
          >
            Concluir
          </button>
          <button className="cancel-button" onClick={() => setIsOpen(!isOpen)}>Cancelar</button>
        </div>
      </form>
    </div>
    </div>

  );
}