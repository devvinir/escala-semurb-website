import api from '../api/api'

export const findTeams = async (user) => {
  try {
    const { data } = await api.get(`/equipesSetor/${user?.funcionario?.matricula_funcionario}`);
    const sucess = 'Equipes listadas com sucesso'
    return { result: data, error: null, sucess: sucess }
  } catch (error) {
    const erro = error.response?.data?.mensagem
    console.error("Erro ao buscar equipes:", erro);
    return { result: null, error: erro, sucess: null }
  }
};
export const addTeam = async (user, nome_equipe) => {
  try {
    const { data } = await api.post(`/cadastrarEquipe/${user?.funcionario?.matricula_funcionario}`, {
      nome_equipe
    })
    const sucess = "Equipe cadastrado com sucesso"
    return { result: data, error: null, sucess: sucess }
  } catch (error) {
    const erro = error?.response?.data?.mensagem || error?.message
    console.error('Erro ao criar equipe', erro)
    return { result: null, error: erro, sucess: null }
  }
};

export const findAllTeams = async() => {
  try{
    const {data} = await api.get('/listarEquipes_master')
    const sucess = 'Equipes listadas com sucesso'
    return { result: data.equipes, error: null, sucess: sucess}
  }catch(error){
    const erro = error?.response?.data?.mensagem || error?.message
    console.error('Erro ao listar equipes: ', erro)
    return { result: null, error: erro, sucess: null}
  }
}

export const createReportTeam = async (user, id_equipe) => {
  try {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const response = await api.get(
      `/relatorioPorEquipe/${user?.funcionario?.matricula_funcionario}/${id_equipe}?mes=${month}&ano=${year}`,
      { responseType: "blob" }
    );

    return { result: response.data, error: null };

  } catch (error) {
    const erro = error?.response?.data?.mensagem || error?.message;
    return { result: null, error: erro };
  }
};
