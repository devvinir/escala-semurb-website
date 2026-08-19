import '../styles/Config.css'
import { IoIosArrowForward } from "react-icons/io";
import {useTheme} from '../hook/useTheme'
function GuestConfig() {

    const {mode, toggleTheme} = useTheme()

    return(
        <div className="body">
            <div className="config-card">
                <div className="config-options">
                <button onClick={toggleTheme} className="config-opition">Modo {mode === "light" ? "Escuro" : "Claro"} </button>
                <button className="config-opition">Politica e Privacidade <IoIosArrowForward /></button>
                <button className="config-opition">Acessibilidade <IoIosArrowForward /></button>
                <button className="config-opition">Sobre <IoIosArrowForward /></button>
            </div>
            </div>
        </div>
    )
}
export default GuestConfig