import '../styles/Config.css'
import { IoIosArrowForward } from "react-icons/io";
import {useTheme} from '../hook/useTheme'
import {useNavigate} from 'react-router-dom'
function Config() {

    const {mode, toggleTheme} = useTheme()
    const route = useNavigate()
    return(
        <div className="body">
            <div className="config-card">
                <div className="config-options">
                <button onClick={toggleTheme} className="config-opition">Modo {mode === "light" ? "Escuro" : "Claro"} </button>
                <button className="config-opition" onClick={()=> route('/privacy-policy')}>Politica e Privacidade <IoIosArrowForward /></button>
                <button className="config-opition">Acessibilidade <IoIosArrowForward /></button>
                <button className="config-opition" onClick={()=> route('/about')}>Sobre <IoIosArrowForward /></button>
            </div>
            </div>
        </div>
    )
}
export default Config