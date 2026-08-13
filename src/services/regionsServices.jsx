import api from '../api/api'

export const findRegions = async (user) => {
  try {
    const { data } = await api.get(`/regiaoSetor/${user?.employee?.registration}`);
    const sucess = 'Regiões listadas com sucesso'
    return { result: data, error: null, sucess: sucess }
  } catch (error) {
    const erro = error?.response?.data?.message || error?.message
    console.error("Erro ao buscar regiões:", erro);
    return { result: null, error: erro, sucess: null }
  }
};

export const findAllRegions = async() => {
  try{
    const {data} = await api.get('/listarRegioes_master')
    const sucess = 'Regiões listadas com sucesso'
    return {result: data.regioes, error: null, sucess: sucess}
  }catch(error){
    const erro = error?.response?.data?.message || error?.message
    console.error('Erro ao listar regiões: ', erro)
    return {result: null, error: erro, sucess: null}

  }
}