import api from '../api/api'

export const addAdmin = async (payload) => {
    try {
        const { data } = await api.post('cadastrarFuncionario_master', {...payload})
        const sucess = "Administrador cadastrado com sucesso"
        return { result: data, error: null, sucess: sucess }
    }catch(error){
         const erro = error?.response?.data?.mensagem || error?.message
        console.error('Erro ao cadastrar administrador', erro)
        return { result: null, error: erro, sucess: null }
    }}
export const deleteEmployee = async(matricula_funcionario) => {
    try{
        const {data} = await api.delete(`/deletarFuncionario_master/${matricula_funcionario}`)
        const sucess = "Funcionário deletado com sucesso"
        return { result: data, error: null, sucess: sucess }
    }catch(error){
         const erro = error.response?.data?.mensagem || error?.message
        console.error('Erro ao deletar funcionário', erro)
        return { result: null, error: erro, sucess: null }
    }
}
export const updateAdmin = async(matricula_funcionario, payload) => {
    try{
        const {data} = await api.put(`/editarFuncionario_master/${matricula_funcionario}`,{
            ...payload
        })
        const sucess = "Funcionário editado com sucesso"
        return { result: data, error: null, sucess: sucess }
    }catch(error){
         const erro = error.response?.data?.mensagem || error?.message
        console.error('Erro ao editar funcionário', erro)
        return { result: null, error: erro, sucess: null }
    }
}

