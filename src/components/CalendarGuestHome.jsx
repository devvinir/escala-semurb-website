import React, { useState } from "react";
import '../styles/CalendarHome.css';
import { useNavigate } from "react-router-dom";

export default function CalendarGuestHome({ value }) {
    const [currentDate, setCurrentDate] = useState(value || new Date());
    const route = useNavigate();
    // const today = new Date();
    /* new Date(year, month, day) pega data atual
        ano mes e dia -> nessa ordem
        mes eh tratado de 0(janeiro) a 11(dezembro)
        e dia de 0 a 31
        possui as funções getMonth, getFullYear e getDate()
        getMonth() retorna o mês atual (0-11)
        getFullYear() retorna o ano atual
        getDate() retorna o dia do mês atual (1-31)
    */

    const generateDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay()
        const daysInMonth = new Date(year, month + 1, 0).getDate()

        const days = [];

        for (let daysNull = 0; daysNull < firstDayOfMonth; daysNull++) {
            days.push(null)
            //preencher os dias vazios na primeira semana do mes
        }
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day)
            //adiciona os dias do mes
        }
        return days;
    }

    const BackMonth = () => {
        setCurrentDate(
            new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() - 1,
                1 // primeiro dia do mes
            )
        )
    }

    const NextMonth = () => {
        setCurrentDate(
            new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() + 1,
                1
            )
        )
    }

    /*const daySelected = (day) => {
        if (!day || !value) return false;
        const dayIsSelected = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        )
        return dayIsSelected.toDateString() === value.toDateString()
        
        toDateString() converte a data escolhida em string(escrita)
        entao se clicarmos em algum dia ele retorna "DiaDaSemana Mes Dia Ano" 
        em texto
        
    }*/
    /*
     const isToday = (day) => {
     if (!day) return false;
     const dateToCheck = new Date(
         currentDate.getFullYear(), 
         currentDate.getMonth(), 
         day
     );
     return dateToCheck.toDateString() === today.toDateString();
 }
   */

    const DaysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    const MonthNames = currentDate.toLocaleString('pt-BR', { month: 'long' });
    //transforma a data em pt-BR e retorna o nome do mes completo
    const year = currentDate.getFullYear();
    const days = generateDays();

    const handleDayClick = async (day) => {
    if (!day) return;
    const date = new Date(
        currentDate.getFullYear(), 
        currentDate.getMonth(), 
        day);
        const formateDate = date.toISOString().split('T')[0]
        route(`/guest-currentday/${formateDate}`)
    };


    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button className="nav-button" onClick={BackMonth}> Voltar </button>
                <span className="header-content"><span className="consultarDatas">Consultar Datas:</span> {MonthNames} {year}</span>
                <button className="nav-button" onClick={NextMonth}> Proximo </button>
            </div>

            <div className="calendar-grid">
                {DaysOfWeek.map((day, index) => (
                    <div className="days-of-week" key={index}>
                        {day}
                    </div>
                )
                )}

                {days.map((day, index) => (
                    <div
                        //${isToday(day) ? 'today' : ''} destacar o dia atual
                        //${daySelected(day) ? 'selected' : ''} destacar o dia selecionado
                        className={`calendar-day  `}
                        key={index}
                        onClick={() => day && handleDayClick(day)
                        }>
                        {day}
                    </div>
                ))}

            </div>
        </div>
    )
}




