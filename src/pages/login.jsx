import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/login.css'
import logo from '../assets/images/semurb-logo-login.png'
import { useAuth } from '../hook/useAuth'
import Alert from '../components/modals/Alert'
import { BeatLoader } from "react-spinners";

function Login() {
  const route = useNavigate();
  const { signIn, logout } = useAuth();
  const [registration, setMatricula] = useState()
  const [senha, setSenha] = useState()
  const [erroMessage, setErroMessage] = useState()
  const [response, setResponse] = useState('Erro')
  const [loading, setLoad] = useState(false)
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoad(true)

    const userData = await signIn(registration, senha);
    if (userData.result) {
      route('/home', { replace: true });
    } else {
      setResponse(response)
      setErroMessage(userData.error)
      logout()
    }

    setLoad(false);
  }
  return (
    <div className='body'>
      {erroMessage &&
      <div className="form-container">
        <Alert response={response}
          text='ao Fazer Login'
          error={erroMessage}
          onClose={() => setErroMessage("")}
        />
      </div>
      }
      <div className="background-login">

        <div className="container-login">
          <div className="logo-login">
            <img src={logo} alt="semurb-logo" className="" />
            <p className="font-title-logo">Escala Semurb</p>
          </div>

          <form className="form-login" onSubmit={handleSignIn}>
            <div className="title-login">
              <p className="font-title">Administrador</p>
              <p className="font-subtitle">LOGIN</p>
            </div>

            <div className="content-login">
              <label className='label-login'> Numero de Matricula </label>
              <input className='input-login' type="number" name="registration"
                id="registration"
                value={registration}
                onChange={(e) => setMatricula(e.target.value)} />

              <label className='label-login'> Senha </label>
              <input className='input-login' type="password" name="senha" id="senha"
                value={senha} onChange={(e) => setSenha(e.target.value)} />

                <button type="submit" className={`button-login ${!registration || !senha ? 'disable' : ''}`}
                  disabled={!registration || !senha}>
                  {loading ? ( <BeatLoader size={15} color='#F4D03F' /> ) : ('Entrar') }
                </button>
               
              <a className='forgot-password' href="/forgot-password">Esqueceu a senha?</a>
              
              <div> 
                <a className='forgot-password' href="/login/admin">Admin</a>
                
                <a className="forgot-password" href="/guest-home">Entrar como visitante</a>
                </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Login;