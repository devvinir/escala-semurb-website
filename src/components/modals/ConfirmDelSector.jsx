import { useState } from 'react';
import { useAuth } from '../../hook/useAuth'
import Alert from './Alert';

export default function Confirmation({isOpen, setIsOpen, id}) {

  const { deleteSector } = useAuth()

  const [erroMessage, setErroMessage] = useState()
  const [response, setResponse] = useState('Erro')

 async function handleDelete(e) {
  e.preventDefault()
     const del = await deleteSector(id)
     if (del?.sucess) {
       setResponse('Não')
       setErroMessage('Setor foi deletado')
       setIsOpen(!isOpen)
     } else {
       setResponse('Não')
       setErroMessage('Erro ao Buscar Setor')
     }
   }
  if (isOpen) return (
    <div className="form-container">
      {erroMessage && (
        <Alert
          response={response}
          text="ao Deletar Setor"
          error={erroMessage}
          onClose={() => {
            setErroMessage("")
            setIsOpen(!isOpen)
          }}
        />
      )}
      
    <div className="form-card-position admin-card">
        <form className="forms admin-form">
        <p className="form-title">Deletar Setor?</p>
        <div className="form-card admin-setor">
         
        </div>
        <div className="buttons-form">
          <button type="submit" className="alert-button"
           onClick={handleDelete}>
            Sim
          </button>
          <button className="cancel-button" onClick={() => setIsOpen(!isOpen)}>Cancelar</button>
        </div>
      </form>
    </div>
    </div>

  );
}