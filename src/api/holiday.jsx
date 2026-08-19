import axios from 'axios';

 const api_holiday = axios.create({
    baseURL: 'https://brasilapi.com.br/api/feriados/v1',
    timeout: 10000
});

const current_year = new Date().getFullYear();

export const GetHoliday = async () => {
    try{
        const {data} = await api_holiday.get(`/${current_year}`);
        return { result: data, error: null };
    }
    catch(error){
        return { result: null, error: error.message}
    }
}