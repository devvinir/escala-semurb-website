import api from "../api/api";


export const addScale = async (
  user, payload
) => {
  try {
    const { data } = await api.post('/cadastrarEscala', {
      matricula_adm: user?.employee.registration,
      ...payload
    })
    const sucess = "Cadastro da escala realizado com sucesso"
    return { result: data, error: null, sucess: sucess }
  } catch (error) {
    const erro = error?.response?.data?.message || error?.message
    console.error('Erro ao cadastrar escala', erro)
    return { result: null, error: erro, sucess: null }
  }
};

export const updateScale = async (
  user, payload
) => {
  try {
    const { data } = await api.put('alterarEscala', {
      matricula_adm: user?.employee?.registration,
      ...payload
    })
    const sucess = "Escala atualizada com sucesso"
    return { result: data, error: null, sucess: sucess }
  } catch (error) {
    const erro = error?.response?.data?.message || error?.message
    console.error('Erro ao atualizar escala', erro)
    return { result: null, error: erro, sucess: null }
  }
}

export const findScales = async (user) => {
  try {
    const { data } = await api.get(`/escalasSetor/${user?.employee?.registration}`)
    const sucess = "Escalas listadas com sucesso"
    return { result: data, error: null, sucess: sucess }
  } catch (error) {
    const erro = error?.response?.data?.message || error?.message
    console.error('Erro ao listar escalas', erro)
    return { result: null, error: erro, sucess: null}
  }
};

export const findAllScales = async () => {
  try {
    const { data } = await api.get(`/listarEscalas_master`)
    const sucess = "Escalas listadas com sucesso"
    return { result: data.escalas, error: null, sucess: sucess }
  } catch (error) {
    const erro = error?.response?.data?.message || error?.message
    console.error('Erro ao listar escalas', erro)
    return { result: null, error: erro, sucess: null}
  }
};

export const addScaleAdmin = async(payload) =>{
  try{
    const {data} = await api.post('/cadastrarEscala_master',{
      ...payload
    })
    const sucess = 'Escala cadastrada com sucesso'
    return{result:data, error: null, sucess: sucess}
  }catch(error){
    const erro = error?.response?.data?.message || error?.message
    console.error('Erro ao cadastrar escala: ', erro)
    return {result: null, error: erro, sucess: null}
  }
}


export const updateScaleAdmin = async ( payload) => {
  try {
    const { data } = await api.put('/alterarEscala_master', {
      ...payload
    })
    const sucess = 'Escala alterada com sucesso'
    return { result: data, error: null, sucess: sucess }
  } catch (error) {
    const erro = error?.response?.data?.message || error.message
    console.error('Erro ao alterar escala ', erro)
    return { result: null, error: erro, sucess: null }
  }
}
