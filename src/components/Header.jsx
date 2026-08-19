import { IoMdArrowBack, IoIosHome, IoIosNotifications, IoMdMenu } from "react-icons/io";
import '../styles/Header.css'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import logo from '../assets/images/semurb-logo-header.png'
import MenuHeader from './modals/Menu';
import Notification from '../components/modals/Notification'
import {useAuth} from '../hook/useAuth'

function Header() {
    const route = useNavigate()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isNotificationModal, setIsNotificationModal] = useState()
    const {user, admin} = useAuth();

    

  if(user) return (
    <header className='header'>
        <div className='header-part-left'> 
            <IoMdArrowBack cursor='pointer' size={30} color='#F4D03F' onClick={()=>route(-1)}/>  
            <IoIosHome cursor='pointer' size={30} color='#F4D03F' onClick={()=> route('/home')}/>
            <p className='painel'>Secretaria Da Mobilidade Urbana</p>  
        </div>

        <div className='header-part-right'>
                <img className='img' alt='SEMURB' src={logo}></img>
                <IoIosNotifications cursor='pointer' size={30} color="#F4D03F"
                onClick={setIsNotificationModal}/>
                <button className='menu' onClick={setIsOpenModal} >
                    <IoMdMenu cursor='pointer' size={30} color="#F4D03F" />
                </button>
                 
        </div>
        <Notification isNotification={isNotificationModal} 
        setIsNotification={() => setIsNotificationModal(!isNotificationModal)}/>
         <MenuHeader isOpen={isOpenModal} setIsOpen={() => setIsOpenModal(!isOpenModal)}/>
        </header>
    ); 
    
    if(admin) return ( <header className='header'>
        <div className='header-part-left'> 
        <IoMdArrowBack cursor='pointer' size={30} color='#F4D03F' onClick={()=>route(-1)}/>
            <IoIosHome cursor='pointer' size={30} color='#F4D03F' onClick={()=> route('/admin')}/>
            <p className='painel'>Secretaria Da Mobilidade Urbana</p>  
        </div>

        <div className='header-part-right'>
                <img className='img' alt='SEMURB' src={logo}></img>
                <button className='menu' onClick={setIsOpenModal} >
                    <IoMdMenu cursor='pointer' size={30} color="#F4D03F" />
                </button>
                 
        </div>
         <MenuHeader isOpen={isOpenModal} setIsOpen={() => setIsOpenModal(!isOpenModal)}/>
         
        </header>
        )

        else return (
    <header className='header'>
        <div className='header-part-left'> 
            <IoMdArrowBack cursor='pointer' size={30} color='#F4D03F' onClick={()=>route(-1)}/>  
            <IoIosHome cursor='pointer' size={30} color='#F4D03F' onClick={()=> route('/guest-home')}/>
            <p className='painel'>Secretaria Da Mobilidade Urbana</p>  
        </div>

        <div className='header-part-right'>
                <img className='img' alt='SEMURB' src={logo}></img>
                <IoIosNotifications cursor='pointer' size={30} color="#F4D03F"
                onClick={setIsNotificationModal}/>
                <button className='menu' onClick={setIsOpenModal} >
                    <IoMdMenu cursor='pointer' size={30} color="#F4D03F" />
                </button>
                 
        </div>
        <Notification isNotification={isNotificationModal} 
        setIsNotification={() => setIsNotificationModal(!isNotificationModal)}/>
         <MenuHeader isOpen={isOpenModal} setIsOpen={() => setIsOpenModal(!isOpenModal)}/>
        </header>
    ); 
}
export default Header;
