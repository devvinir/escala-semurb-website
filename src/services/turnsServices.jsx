import api from '../api/api'

export const findTurns = async (user) => {
  try {
    const { data } = await api.get(`/turnosSetor/${user?.employee?.registration}`)
    const sucess = 'Turnos listados realizado com sucesso'
    return { result: data, error: null, sucess: sucess }
  } catch (error) {
    const erro = error?.response?.data?.mensagem || error?.message
    console.error('Erro ao listar turnos', erro)
    return { result: null, error: erro, sucess: null }
  }
};

export const addTurn = async (user, payload) => {
  try {
    const { data } = await api.post('/cadastrarTurno', {
      matricula_adm: user?.employee.registration,
      ...payload
    })
    const sucess = "Cadastro do Turno realizado com sucesso"
    return { result: data.turno, error: null, sucess: sucess }
  } catch (error) {
    const erro = error?.response?.data?.mensagem || error?.message
    console.error('Erro ao cadastrar turno', erro)
    return { result: null, error: erro, sucess: null }
  }
}

export const updateTurn = async (user, payload) => {
  try {
    const { data } = await api.put('/alterarTurno', {
      matricula_adm: user?.employee?.registration,
      ...payload
    })
    const sucess = 'Turno alterado com sucesso'
    return { result: data, error: null, sucess: sucess }
  } catch (error) {
    const erro = error?.response?.data?.mensagem || error.message
    console.error('Erro ao alterar turno ', erro)
    return { result: null, error: erro, sucess: null }
  }
}

export const findAllTurns = async () => {
  try{
    const {data} = await api.get('/listarTurnos_master')
    const sucess = 'Turnos listados com sucesso'
    return { result: data.turnos, error: null, sucess: sucess}
  }catch(error){
    const erro = error?.response?.data?.mensagem || error?.message
    console.error('Erro ao listar turnos: ', erro)
    return {result: null, error: erro, sucess: null}

  }
}

export const addTurnAdmin = async(payload) =>{
  try{
    const {data} = await api.post('/cadastrarTurno_master',{
      ...payload
    })
    const sucess = 'Turno cadastrado com sucesso'
    return{result:data, error: null, sucess: sucess}
  }catch(error){
    const erro = error?.response?.data?.mensagem || error?.message
    console.error('Erro ao cadastrar turno: ', erro)
    return {result: null, error: erro, sucess: null}
  }
}

export const updateTurnAdmin = async ( payload) => {
  try {
    const { data } = await api.put('/alterarTurno_master', {
      ...payload
    })
    const sucess = 'Turno alterado com sucesso'
    return { result: data, error: null, sucess: sucess }
  } catch (error) {
    const erro = error?.response?.data?.mensagem || error.message
    console.error('Erro ao alterar turno ', erro)
    return { result: null, error: erro, sucess: null }
  }
}
