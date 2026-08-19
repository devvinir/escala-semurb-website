import { useState } from 'react';

export default function GuestAddTeam({isOpen, setIsOpen}) {

  const [name, setName] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    window.location.reload()
  }
  if (isOpen) return (
    <div className="form-container">
     
    <div className="form-card-position admin-card">
      <form onSubmit={handleSubmit} className="forms admin-form">
        <p className="form-title">Adicionar Equipe</p>
        <div className="form-card admin-setor">
          <input name="equipe" type="text" className="form-input" placeholder="Nome do Equipe"
            value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="buttons-form">
          <button type="submit" className="confirm-button"
            disabled={!name}
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