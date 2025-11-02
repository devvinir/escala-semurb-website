import api from '../api/api'

export const findAllSectors = async () => {
        try {
            const { data } = await api.get('/listarSetores')
             const sucess = "Setores listados com sucesso"
        return { result: data.setores, error: null, sucess: sucess }
        } catch (error) {
            const erro = error.response?.data?.mensagem || error.message
            console.error('Erro ao buscar TODOS setores', erro)
            return {result: null, error: erro, sucess: null}
        }
    };                                                                           
export const addSector = async (nome_setor) => {
        try {
            const { data } = await api.post('/cadastrarSetor', {
                nome_setor
            })
             const sucess = "Setor cadastrado com sucesso"
        return { result: data, error: null, sucess: sucess }
        } catch (error) {
            const erro = error.response?.data?.mensagem || error.message
            console.error('Erro ao criar setor', erro)
            return {result: null, error: erro, sucess: null}
        }
    };
export const deleteSector = async (id_setor) => {
    try{
        const {data} = await api.delete(`deletarSetor/${id_setor}`)
        const sucess = "Setor deletado com sucesso"
        return { result: data, error: null, sucess: sucess }
        } catch (error) {
            const erro = error.response?.data?.mensagem || error.message
            console.error('Erro ao deletar setor', erro)
            return {result: null, error: erro, sucess: null}
    }
}
export const updateSector = async (id_setor, nome_setor) => {
    try{
        const {data} = await api.put(`editarSetor/${id_setor}`,{nome_setor})
        const sucess = "Setor editado com sucesso"
        return { result: data, error: null, sucess: sucess }
        } catch (error) {
            const erro = error.response?.data?.mensagem || error.message 
            console.error('Erro ao editar setor', erro)
            return {result: null, error: erro, sucess: null}
    }
}