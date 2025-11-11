import { useState, useEffect } from 'react';
import '../styles/CalendarProfile.css';

export default function CalendarProfile({ value, onDateChange, escala, holidays }) {
  const [currentDate, setCurrentDate] = useState(value || new Date());

  console.log(holidays)//LOG do parametro holidays

  const DaysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
  const MonthNames = currentDate.toLocaleString("pt-BR", { month: "long" });
  const year = currentDate.getFullYear();

  // Debug detalhado
  useEffect(() => {
    console.log('=== CALENDAR PROFILE DEBUG ===');
    console.log('Escala completa:', JSON.stringify(escala, null, 2));
    console.log('usa_dias_especificos:', escala?.usa_dias_especificos);
    console.log('dias_n_trabalhados_escala_semanal:', escala?.dias_n_trabalhados_escala_semanal);
    console.log('tipo:', typeof escala?.dias_n_trabalhados_escala_semanal);
    console.log('isArray:', Array.isArray(escala?.dias_n_trabalhados_escala_semanal));
    
    // Verificar se é string e converter se necessário
    if (typeof escala?.dias_n_trabalhados_escala_semanal === 'string') {
      console.log('dias_n_trabalhados_escala_semanal é uma STRING:', escala.dias_n_trabalhados_escala_semanal);
    }
  }, [escala]);

  const BackMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const NextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const generateDays = () => {
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = Array(firstDayOfMonth).fill(null).concat([...Array(daysInMonth).keys()].map(i => i + 1));
    return days;
  };

  const parseDiasArray = () => {
    // Se for array, retorna como está
    if (Array.isArray(escala?.dias_n_trabalhados_escala_semanal)) {
      return escala.dias_n_trabalhados_escala_semanal;
    }
    
    // Se for string, tenta converter
    if (typeof escala?.dias_n_trabalhados_escala_semanal === 'string') {
      const str = escala.dias_n_trabalhados_escala_semanal;
      
      // Tenta JSON.parse se for um array em string
      try {
        const parsed = JSON.parse(str);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // não é JSON
      }
      
      // Tenta separar por vírgula
      if (str.includes(',')) {
        return str.split(',').map(d => d.trim());
      }
      
      // Tenta separar por espaço
      if (str.includes(' ')) {
        return str.split(' ').map(d => d.trim()).filter(d => d);
      }
    }
    
    return [];
  };

   const getHolidaysMap = () => {
    const holidayMap = {};
    
    // Suporta tanto { result: [] } quanto array direto
    const holidaysList = holidays?.result;
    
    if (!holidaysList || holidaysList.length === 0) return holidayMap;
    const currentYear = currentDate.getFullYear();
    holidaysList?.forEach(holiday => {
       // Pegar apenas mês e dia do feriado, ignorando o ano
      const holidayDate = new Date(holiday.dia_feriado);
      const month = String(holidayDate.getMonth() + 1).padStart(2, '0');
      const day = String(holidayDate.getDate()).padStart(2, '0');

      // Criar a chave com o ano atual do calendário
      const dateKey = `${currentYear}-${month}-${day}`;
      
      holidayMap[dateKey] = {
        nome: holiday.nome_feriado,
        id: holiday.id_feriado
      };
    });

    return holidayMap;
  };


  const getWorkDaysMap = () => {
    if (!escala) {
      console.log('escala nao encontrada');
      return {};
    }
    
    const workMap = {};
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const diasMapeados = { 'Dom': 0, 'Seg': 1, 'Ter': 2, 'Qua': 3, 'Qui': 4, 'Sex': 5, 'Sab': 6 };
    
    // A lógica: se dias_n_trabalhados_escala_semanal tem valores, usa dias específicos
    const diasArray = parseDiasArray();
    const temDiasDefinidos = diasArray.length > 0;

    console.log('Verificar dados enviados:', { 
      temDiasDefinidos, 
      diasArray,
      data_inicio: escala.data_inicio,
      dias_trabalhados: escala.dias_trabalhados,
      dias_n_trabalhados: escala.dias_n_trabalhados
    });

    if (temDiasDefinidos) {
      console.log('USANDO DIAS ESPECIFICOS:', diasArray);
      
      const diasFolga = diasArray
        .map(d => {
          const index = diasMapeados[d.trim()];
          console.log(`  Mapeando "${d}" -> índice ${index}`);
          return index;
        })
        .filter(d => d !== undefined);
      
      console.log('Índices de folga:', diasFolga);

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateKey = date.toISOString().split('T')[0];
        const dayOfWeek = date.getDay();
        const isRest = diasFolga.includes(dayOfWeek);
        
        workMap[dateKey] = isRest ? 'rest' : 'work';
      }
    } else if (escala.data_inicio && escala.dias_trabalhados !== undefined && escala.dias_n_trabalhados !== undefined) {
      console.log('USANDO FOLGAS AUTOMATICAS');
      
      const startDate = new Date(escala.data_inicio);
      const cycleLength = escala.dias_trabalhados + escala.dias_n_trabalhados;
      
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateKey = date.toISOString().split('T')[0];
        const diff = Math.floor((date - startDate) / (1000 * 60 * 60 * 24));
        
        if (diff >= 0) {
          workMap[dateKey] = (diff % cycleLength) < escala.dias_trabalhados ? 'work' : 'rest';
        }
      }
    } else {
      console.log('escala invalida');
    }

    return workMap;
  };

  const days = generateDays();
  const workDaysMap = getWorkDaysMap();
  const holidaysMap = getHolidaysMap()

  return (
    <div className="calendar-container-profile">
      <div className="calendar-header-profile">
        <button className="nav-button-profile" onClick={BackMonth}>Voltar</button>
        <span className="header-content-profile">
          <span className="consultarDatas-profile">Consultar Datas:</span> {MonthNames} {year}
        </span>
        <button className="nav-button-profile" onClick={NextMonth}>Próximo</button>
      </div>

      <div className="calendar-grid-profile">
        {DaysOfWeek.map((day, index) => (
          <div className="days-of-week-profile" key={index}>{day}</div>
        ))}

        {days.map((day, index) => {
          const date = day != null ? new Date(year, currentDate.getMonth(), day) : null;
          const dateKey = date ? date.toISOString().split('T')[0] : null;
          const status = dateKey ? workDaysMap[dateKey] : null;
          const holiday = dateKey ? holidaysMap[dateKey] : null

          return (
            <div
              key={index}
              className={`calendar-day-profile 
                ${status === 'work' ? 'work-day' : ''} 
                ${status === 'rest' ? 'rest-day' : ''}
                ${holiday ? 'holiday-day' : ''}
                `}
              onClick={() => day && onDateChange(new Date(
                year, currentDate.getMonth(), day
              ))}
              title={holiday ? holiday.nome : ''}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}