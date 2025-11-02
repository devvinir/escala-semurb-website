import '../styles/SectorCard.css'
import { useAuth } from '../hook/useAuth';
import { useNavigate } from 'react-router-dom'
import { IoIosTrash } from "react-icons/io";
import Confirmation from './modals/ConfirmDelSector'
import { useState } from 'react';

export default function SectorCard() {

  const { admin, user, teams, allSectors } = useAuth();
  const route = useNavigate();
  console.log(teams)
  const [isOpen, setIsOpen] = useState(false)
  const [id, setId] = useState()
  if (user) return (
    <div className='container-setor'>
      <div className='setor'>
        <p className='title-setor'>
          Setor: {user ? user.setor.nome_setor : 'Desconhecido'}</p>
      </div>
      {!teams?.result ? <p className="loading-text">Carregando equipes...</p> : null}
      <div className='container-teams'>
        {teams?.result?.map((tm) => (
          <div className='team' key={tm.id_equipe} onClick={() => route(`/teams/${tm.id_equipe}`)} >
            <p>{tm.nome_equipe}</p>
          </div>
        ))}


      </div>
    </div>
  );

  if (admin)
    return (
      <div className='container-setor'>
        <Confirmation
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                id_setor={id ? id : null}
              />
        <div className='setor'>
          <p className='title-setor'>
            Setores:</p>
        </div>
        {!allSectors?.result ? <p className="loading-text">Carregando setores...</p> : null}
        <div className='container-teams'>
          {allSectors?.result?.map((sector) => (

            <div className='team' key={sector.id_setor}
              onClick={() => route(`/sectors/${sector.id_setor}`)} >
              
              <p>{sector.nome_setor}</p>
              <IoIosTrash size={25} className='delSector'
                onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); setId(sector.id_setor)}} />
            </div>
          ))}
        </div>
      </div>
    );
}