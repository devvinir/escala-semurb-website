import api from '../api/api'

export const addAdmin = async (payload) => {
    try {
        const { data } = await api.post('cadastrarFuncionario_master', { ...payload })
        const sucess = "Administrador cadastrado com sucesso"
        return { result: data, error: null, sucess: sucess }
    } catch (error) {
        const erro = error?.response?.data?.mensagem || error?.message
        console.error('Erro ao cadastrar administrador', erro)
        return { result: null, error: erro, sucess: null }
    }
}
export const deleteEmployee = async (matricula_funcionario) => {
    try {
        const { data } = await api.delete(`/deletarFuncionario_master/${matricula_funcionario}`)
        const sucess = "Funcionário deletado com sucesso"
        return { result: data, error: null, sucess: sucess }
    } catch (error) {
        const erro = error.response?.data?.mensagem || error?.message
        console.error('Erro ao deletar funcionário', erro)
        return { result: null, error: erro, sucess: null }
    }
}
export const updateAdmin = async (matricula_funcionario, payload) => {
    try {
        const { data } = await api.put(`/editarFuncionario_master/${matricula_funcionario}`, {
            ...payload
        })
        const sucess = "Funcionário editado com sucesso"
        return { result: data, error: null, sucess: sucess }
    } catch (error) {
        const erro = error.response?.data?.mensagem || error?.message
        console.error('Erro ao editar funcionário', erro)
        return { result: null, error: erro, sucess: null }
    }
}

export const findEditdays = async () => {
    try {
        const { data } = await api.get(`/diasEspecificos`)
        const sucess = "Dias com especificações listados com sucesso"
        return { result: data.diasEspecificos, error: null, sucess: sucess }
    } catch (error) {
        const erro = error.response?.data?.mensagem || error?.message
        console.error('Erro ao listar especificações', erro)
        return { result: null, error: erro, sucess: null }
    }
}
export const addEditdays = async (user, payload) => {
    try {
        const { data } = await api.post(`/cadastrarDiaEspecifico/${user?.funcionario?.matricula_funcioanrio}`,{
            ...payload
        })
        const sucess = "Especificação cadastrada com sucesso"
        return { result: data, error: null, sucess: sucess }
    } catch (error) {
        const erro = error.response?.data?.mensagem || error?.message
        console.error('Erro ao cadastrar especificação', erro)
        return { result: null, error: erro, sucess: null }
    }
}

export const createReport = async (user) =>{
    try{
        const month = new Date().getMonth() +1
        const year = new Date().getFullYear()

        const {data} = await api.get(`/relatorioGeralSetor/${user?.funcionario?.matricula_funcionario}?mes=${month}&ano=${year}`,
            { responseType: 'blob' }
        )
        const sucess = "Relatório gerado com sucesso"
        return {result: data, error: null, sucess: sucess}
    } catch(error){
        const erro = error?.response?.data?.mensagem || error?.message
        console.error('Erro ao gerar relatório', erro)
        return {result: null, error: erro, sucess: null}
    }
}

