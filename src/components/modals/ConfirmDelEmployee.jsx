import { useState } from 'react';
import { useAuth } from '../../hook/useAuth'
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';

export default function Confirmation({isOpen, setIsOpen, currentEmployee}) {

  const { deleteEmployee } = useAuth()
  const route = useNavigate();
  const [erroMessage, setErroMessage] = useState()
  const [response, setResponse] = useState('Erro')

 async function handleDelete(e) {
  e.preventDefault()

     const del = await deleteEmployee(currentEmployee?.registration)
     console.log(del)
     if (del?.result) {
       setResponse('Não')
       setErroMessage(del.sucess)
       route('/admin', { replace: true });
     } else {
       setResponse('Não')
       setErroMessage(del.error)
     }
   }
  if (isOpen) return (
    <div className="form-container">
      {erroMessage && (
        <Alert
          response={response}
          text="ao Deletar Funcionário"
          error={erroMessage}
          onClose={() => {
            setErroMessage("")
            setIsOpen(!isOpen)

          }}
        />
      )}
    <div className="form-card-position admin-card">
       <form className="forms admin-form">
        <p className="form-title">Deletar Funcionário?</p>
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