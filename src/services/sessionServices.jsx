import api from '../api/api'

export const forgotPassword = async(email) =>{
  try{
      const {data} = await api.post('/envioVerificacaoAdm_email',{
        email
      })
    const sucess = "code enviado com sucesso"
    return {result: data, error: null, sucess: sucess}
  } catch(error){
    const erro = error?.response?.data?.message || error?.message
    return {result: null, error: erro, sucess: null}
  }
}

export const codeVerify = async(code, registration) =>{
  try{
    const {data} = await api.post('/verificacaocodeAdm',{
      code, registration
    })
    const sucess = "code verificado com sucesso"
    return {result: data, error: null, sucess: sucess}
  } catch(error){
    const erro = error?.response?.data?.message || error?.message
    return {result: null, error: erro || error?.message, sucess: null}
  }
}

export const resetPassword = async(registration, code, new_password, confirm_password) =>{
  try{
    const {data} = await api.put('/redefinirSenhaAdm',{
       registration, code, new_password, confirm_password
    })
    const sucess = "Senha redefinida com sucesso"
    return {result: data, error: null, sucess: sucess}
  } catch(error){
    const erro = error?.response?.data?.message || error?.message
    return {result: null, error: erro, sucess: null}
  }
}
