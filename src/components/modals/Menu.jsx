import '../../styles/Menu.css'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../hook/useAuth'
function MenuHeader({isOpen, setIsOpen }) {
    const {logout, user, admin, createReport} = useAuth();
    const route = useNavigate();
    async function handleLogout(){
        logout()
        route('/')
    }
    async function handleReport(){
      const report = await createReport(user)
      if(report?.result){
       const blobUrl = URL.createObjectURL(report.result);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "relatorio_geral.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // libera memória
    URL.revokeObjectURL(blobUrl);
      }else{
        alert('Erro ao gerar relatório. Tente novamente mais tarde.')
      }
    }
if(user && isOpen)
    return (
    <div className="menu-container">
        <div className="options"> 
            <button className="option" onClick={() => route('/profile')}>Perfil</button>
            <button className="option" onClick={()=> route('/config')}>Configurações</button>
            <button className="option" onClick={handleLogout}>Sair</button>
            <button className="option" onClick={setIsOpen}>Fechar Menu</button>
            <button className="option" onClick={handleReport}>Relatorio Geral</button>
              
        </div>
        
    </div>
   
  );

if(admin && isOpen)
    return(
    <div className="menu-container">
            <div className="options"> 
                <button className="option" onClick={handleLogout}>Sair</button>
                <button className="option" onClick={setIsOpen}>Fechar Menu</button>
            </div>
        
    </div>
    );
 
} 

export default MenuHeader