import api from "../api/api";

export const addEmployee = async (user, payload) => {
    try {
        const { data } = await api.post('/cadastrarFuncionario', {
            matricula_adm: user?.employee.registration,
            ...payload
        })
        const sucess = 'Cadastro do funcionario realizado com sucesso'
        return { result: data.funcionario, error: null, sucess: sucess }
    } catch (error) {
        const erro = error?.response?.data?.mensagem || error?.message
        console.error('erro ao cadastrar :', erro)
        return { result: null, error: erro, sucess: null };
    }
}

export const findAllEmployees = async () => {
    try {
        const { data } = await api.get('/listarFuncionarios_master')
        const sucess = "TODOS funcionarios listados com sucesso"
        return { result: data.funcionarios, error: null, sucess: sucess }
    } catch (error) {
        const erro = error?.response?.data?.mensagem && error?.message
        console.error('Erro ao buscar TODOS funcionarios', erro)
        return { result: null, error: erro, sucess: null }
    }
};

export const findEmployees = async (user) => {
    try {
        const { data } = await api.get(`/funcionariosSetor/${user?.employee.registration}`)
        const sucess = "funcionarios listados com sucesso"
        return { result: data, error: null, sucess: sucess }
    } catch (error) {
        const erro = error.response?.data?.mensagem || error?.message
        console.error('Erro ao listar funcionarios', erro)
        return { result: null, error: erro, sucess: null }
    }
};

export const findActives = async (user, date) => {
    try {
        const { data } = await api.get(`funcionariosAtivosSetor/${user?.funcionario?.registration}`,{
            params: {data: date}
        })
        const sucess = 'funcionarios do dia listados com sucesso'
        return { result: data, error: null, sucess: sucess }
    } catch (error) {
        const erro = error?.response?.data?.mensagem || error?.message
        console.error('Erro ao listar funcionarios do dia', erro)
        return { result: null, error: erro, sucess: null }
    }
};

export const contEmployeesScale = async(user) => {
    try{
        const{data} = await api.get(`/funcionariosEscala/${user?.funcionario?.registration}`)
        const sucess = 'quantidades de funcionarios por escala listados com sucesso'
        return { result: data, error: null, sucess: sucess }
    } catch (error) {
        const erro = error?.response?.data?.mensagem || error?.message
        console.error('Erro ao listar funcionarios por escala',erro)
        return { result: null, error: erro, sucess: null }
    }
}

export const updateEmployee = async(user, payload) => {
    try{
        const {data} = await api.put(`/editarFuncionario/${user?.funcionario?.registration}`, {
            ...payload
        })
        const sucess = 'Funcionario atualizado com sucesso'
        return { result: data, error: null, sucess: sucess }
    } catch (error) {
        const erro = error?.response?.data?.mensagem || error?.message
        console.error('Erro ao atualizar funcionario', erro)
        return { result: null, error: erro, sucess: null }
    }
}   

export const contEmployeesSector = async() => {
    try{
        const {data} = await api.get('/contabilizarFuncionariosSetor')
        const sucess = 'Contabilização de funcionarios realizada com sucesso'
        return {result: data, error: null, sucess: sucess}
    }catch(error){
        const erro = error?.response?.data?.mensagem || error?.message
        console.error('Erro ao contabilizar funcionarios:', erro)
        return {result: null, error: erro, sucess: null}
    }
}

export const confirmEmployees = async(user) => {
    try{
        const {data} = await api.get(`/confirmacoesSetor/${user?.funcionario?.registration}`)
        const sucess = 'Confirmações do setor listadas com sucesso'
        return {result: data, error: null, sucess: sucess}
    }catch(error){
        const erro = error?.response?.data?.mensagem || error?.message
        console.error('Erro ao listar confirções do setor:', erro)
        return {result: null, error: erro, sucess: null}
    }
}

export const createReportEmployee = async (user, registration) => {
  try {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const response = await api.get(
      `/relatorioPorFuncionario/${user?.funcionario?.registration}/${registration}?mes=${month}&ano=${year}`,
      { responseType: "blob" }
    );

    return { result: response.data, error: null };

  } catch (error) {
    const erro = error?.response?.data?.mensagem || error?.message;
    return { result: null, error: erro };
  }
};
