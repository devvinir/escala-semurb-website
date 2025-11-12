import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../styles/login.css'
import logo from '../assets/images/semurb-logo-login.png'
import {useAuth} from '../hook/useAuth'
import {BeatLoader} from 'react-spinners'
import Alert from '../components/modals/Alert'

function LoginAdmin() {
  const route = useNavigate();
  const {adminSignIn} = useAuth();
  const [registration, setMatricula] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoad] = useState(false)
  const [response, setResponse] = useState('Erro')
  const [error, setError] = useState()

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoad(true)

    const adminData = await adminSignIn(registration, password);
    if(adminData.result){
      route('/admin', {replace: true})
    } else {
     setResponse(response)
     setError(adminData.error) 
    }

    setLoad(false)
  }

  return (
    <div className="body">
      {error &&
      <div className="form-container">
        <Alert response={response}
          text='ao Fazer Login'
          error={error}
          onClose={() => 
            setError("")
        }
        />
      </div> 
      }
    <div className="background-login">
      
      <div className="container-login">
        <div className="logo-login">
          <img src={logo} alt="semurb-logo" className=""/>
          <p className="font-title-logo">Escala Semurb</p>
        </div>

        <form className="form-login" onSubmit={handleSignIn}>
          <div className="title-login">
          <p className="font-title">Administrador</p>
          <p className="font-subtitle">LOGIN</p>
          </div>

        <div className="content-login">
        <label className='label-login'> Numero de Matricula </label>
        <input className='input-login' type="text" name="registration" 
        id="registration" 
        value={registration}
        onChange={(e) => setMatricula(e.target.value)} />

        <label className='label-login'> Senha </label>
        <input className='input-login' type="password" name="password" id="password" 
        value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className={`button-login ${!registration || !password ? 'disable' : ''}`} type="submit" disabled={!registration || !password}>
           {loading ? ( <BeatLoader size={15} color='#F4D03F' /> ) : ('Entrar') }
        </button>
       
        </div> 
        </form>
      </div>

    </div>
    </div>
  )
}

export default LoginAdmin;