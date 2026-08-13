import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../styles/login.css'
import logo from '../assets/images/semurb-logo-login.png'
import {useAuth} from '../hook/useAuth'
import Alert from '../components/modals/Alert'
import {BeatLoader} from 'react-spinners'

function ForgotPassword(){

  const route = useNavigate();
  const [email, setEmail] = useState()
  const [erroMessage, setErroMessage] = useState('')
  const [response, setResponse] = useState('Erro')
  const {forgotPassword} = useAuth()
  const [load, setLoad] = useState(false)
  const [matricula, setMatricula] = useState()
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoad(true)

   const sendCode = await forgotPassword(email)
   if(sendCode?.result){
      setResponse('Sucesso')
      setErroMessage(sendCode.sucess)
      setMatricula(sendCode.result.registration)
   } else {
    setResponse(response)
    setErroMessage(sendCode.error)   
   }
   setLoad(false)
  }

  return (
    <div className='body'>
      { erroMessage && 
      <div className="form-container">
      <Alert response={response}
      text='ao Enviar Código'
      error={erroMessage}
      onClose={() => {setErroMessage(""); 
      if(response === 'Sucesso'){
      route(`/code-verify/${matricula}`)
    }}}
      /></div>
      }
    <div className="background-login">
      
      <div className="container-login">
        <div className="logo-login">
          <img src={logo} alt="semurb-logo" className=""/>
          <p className="font-title-logo">Escala Semurb</p>
        </div>

        <form className="form-login" onSubmit={handleSignIn}>
          <div className="title-login">
          <p className="font-title">Recuperar</p>
          <p className="font-subtitle">Senha</p>
          </div>

        <div className="content-login">
        <label className='label-login'> Email: </label>
        <input className='input-login' type="email" name="email" 
        id="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)} />

        <button type="submit" className={`button-login ${!email ? 'disable' : ''}`} 
        disabled={!email}>{load ? <BeatLoader size={15} color='#F4D03F'/> : "Enviar Código"}</button>
      
        <a className='forgot-password' href="/">Voltar ao login</a>
        </div> 
        </form>
      </div>

    </div>
    </div>
  )
}export default ForgotPassword;