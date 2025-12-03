import '../../styles/Notification.css';
import { useAuth } from '../../hook/useAuth';

function Notification({isNotification, setIsNotification}){

const { user } = useAuth();

const formater = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false 
});

    if (isNotification) return(
    <div className="modal-list">
        <div className="list-container">
            {user?.notificacoes?.map(n =>(
            <div className="list-notification">
                <p className="type-notification">{n.tipo_notificacao}</p>
                <p className="message-notification">{n.mensagem}</p>
                <p className="date-notification">{formater.format(new Date(n.enviada_em))}</p>
            </div>
        ))}
                <button className="cancel-button"
                onClick={setIsNotification}>Fechar
                </button>
        </div>
    </div>
    ); return null   
}
export default Notification;