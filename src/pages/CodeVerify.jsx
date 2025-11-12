import React, {useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../styles/login.css'
import logo from '../assets/images/semurb-logo-login.png'
import {useAuth} from '../hook/useAuth'
import Alert from '../components/modals/Alert'
import {BeatLoader} from 'react-spinners'

function CodeVerify(){

  const route = useNavigate();
  const [codigo, setCodigo] = useState()
  const [erroMessage, setErroMessage] = useState('')
  const [response, setResponse] = useState('Erro')
  const {codeVerify} = useAuth()
  const {id} = useParams()
  const matricula_funcionario = id
  const [code, setCode] = useState()
  const [load, setLoad] = useState(false)

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoad(true)

   const receiveCode = await codeVerify(codigo, matricula_funcionario)
   if(receiveCode?.result){
      setResponse('Sucesso')
      setErroMessage(receiveCode.sucess)
      setCode(receiveCode.result.codigo)
   } else {
    setResponse(response)
    setErroMessage(receiveCode.error)   
   }
   setLoad(false)
  }

  return (
    <div className='body'>
      { erroMessage && 
      <div className="form-container">
      <Alert response={response}
      text='ao Verificar Código'
      error={erroMessage}
      onClose={() => {setErroMessage("");
        if(response === 'Sucesso')
        route(`/reset-password/${code}-${matricula_funcionario}`)
    }}
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
        <label className='label-login'> Código: </label>
        <input className='input-login' type="number" name="code" 
        id="code" 
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)} />

        <button type="submit" className={`button-login ${!codigo ? 'disable' : ''}`} 
        disabled={!codigo}>{load? <BeatLoader size={15} color='#F4D03F'/> : "Verificar"}</button>
      
        <a className='forgot-password' href="/">Voltar ao login</a>
        </div> 
        </form>
      </div>

    </div>
    </div>
  )
}export default CodeVerify;