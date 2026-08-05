import api from '../api/api'

export const findAllSectors = async () => {
        try {
            const { data } = await api.get('/listarSetores')
             const sucess = "Setores listados com sucesso"
        return { result: data.sectors, error: null, sucess: sucess }
        } catch (error) {
            const erro = error.response?.data?.mensagem || error.message
            console.error('Erro ao buscar TODOS setores', erro)
            return {result: null, error: erro, sucess: null}
        }
    };                                                                           
export const addSector = async (name) => {
        try {
            const { data } = await api.post('/cadastrarSetor', {
                name
            })
             const sucess = "Setor cadastrado com sucesso"
        return { result: data, error: null, sucess: sucess }
        } catch (error) {
            const erro = error.response?.data?.mensagem || error.message
            console.error('Erro ao criar setor', erro)
            return {result: null, error: erro, sucess: null}
        }
    };
export const deleteSector = async (id) => {
    try{
        const {data} = await api.delete(`deletarSetor/${id}`)
        const sucess = "Setor deletado com sucesso"
        return { result: data, error: null, sucess: sucess }
        } catch (error) {
            const erro = error.response?.data?.mensagem || error.message
            console.error('Erro ao deletar setor', erro)
            return {result: null, error: erro, sucess: null}
    }
}
export const updateSector = async (id, name) => {
    try{
        const {data} = await api.put(`editarSetor/${id}`,{name})
        const sucess = "Setor editado com sucesso"
        return { result: data, error: null, sucess: sucess }
        } catch (error) {
            const erro = error.response?.data?.mensagem || error.message 
            console.error('Erro ao editar setor', erro)
            return {result: null, error: erro, sucess: null}
    }
}