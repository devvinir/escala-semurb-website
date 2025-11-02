// src/utils/scaleUtils.js (ou src/utils.js)

export function getRestDaysDisplay(scale) {
  if (!scale) return 'N/A';

  // Se tem dias específicos de folga definidos
  if (Array.isArray(scale.dias_n_trabalhados_escala_semanal) && 
      scale.dias_n_trabalhados_escala_semanal.length > 0) {
    return scale.dias_n_trabalhados_escala_semanal.join(', ');
  }

  // Se é ciclo automático (NxM), calcular os dias de folga
  if (scale.dias_trabalhados !== undefined && 
      scale.dias_n_trabalhados !== undefined && 
      scale.data_inicio) {
    
    const restDays = calculateRestDaysFromCycle(
      scale.data_inicio,
      scale.dias_trabalhados,
      scale.dias_n_trabalhados
    );
    
    if (restDays.length > 0) {
      return restDays.join(', ');
    }
  }

  return 'N/A';
}

// Calcula quais dias da semana são folgas baseado no ciclo
function calculateRestDaysFromCycle(startDateStr, diasTrabalhados, diasFolga) {
  const DaysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
  const startDate = new Date(startDateStr);
  const cycleLength = diasTrabalhados + diasFolga;
  
  // Analisar próximos 30 dias para encontrar padrão de folgas
  const restDaysSet = new Set();
  
  for (let i = 0; i < 30; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i);
    
    const positionInCycle = i % cycleLength;
    
    // Se está na posição de folga do ciclo
    if (positionInCycle >= diasTrabalhados) {
      const dayOfWeek = currentDate.getDay();
      restDaysSet.add(DaysOfWeek[dayOfWeek]);
    }
  }
  
  // Retornar em ordem (segunda a domingo)
  const orderMap = { 'Seg': 1, 'Ter': 2, 'Qua': 3, 'Qui': 4, 'Sex': 5, 'Sab': 6, 'Dom': 0 };
  return Array.from(restDaysSet).sort((a, b) => orderMap[a] - orderMap[b]);
}

// Nova função: Filtra feriados baseado na escala
export function getHolidaysForScale(scale, holidays, monthFilter = null) {
  if (!scale || !holidays) {
    return [];
  }

  // Suporta tanto { result: [] } quanto array direto
  const holidaysList = Array.isArray(holidays) ? holidays : holidays.result;
  
  if (!holidaysList || holidaysList.length === 0) {
    return [];
  }

  const holidaysWithStatus = holidaysList
    .filter(holiday => {
      // Se monthFilter for passado, filtra pelo mês
      if (monthFilter !== null) {
        const holidayDate = new Date(holiday.dia_feriado);
        return holidayDate.getMonth() === monthFilter;
      }
      return true;
    })
    .map(holiday => {
      const holidayDate = new Date(holiday.dia_feriado);
      const isWorkDay = isWorkingDay(holidayDate, scale);
      
      return {
        id: holiday.id_feriado,
        nome: holiday.nome_feriado,
        data: holiday.dia_feriado,
        dataFormatada: holidayDate.toLocaleDateString('pt-BR'),
        status: isWorkDay ? 'Trabalha' : 'Folga',
        isWorkDay
      };
    });

  return holidaysWithStatus;
}

// Verifica se uma data específica é dia de trabalho baseado na escala
function isWorkingDay(date, scale) {
  const DaysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
  
  // Se tem dias específicos de folga
  if (Array.isArray(scale.dias_n_trabalhados_escala_semanal) && 
      scale.dias_n_trabalhados_escala_semanal.length > 0) {
    
    const dayOfWeek = date.getDay();
    const dayName = DaysOfWeek[dayOfWeek];
    
    // Se o dia da semana está na lista de folgas, NÃO é dia de trabalho
    return !scale.dias_n_trabalhados_escala_semanal.includes(dayName);
  }

  // Se é ciclo automático NxM
  if (scale.data_inicio && scale.dias_trabalhados !== undefined && 
      scale.dias_n_trabalhados !== undefined) {
    
    const startDate = new Date(scale.data_inicio);
    const cycleLength = scale.dias_trabalhados + scale.dias_n_trabalhados;
    
    // Calcular diferença em dias
    const diffTime = date - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return true; // Antes da data de início, considera como trabalho
    
    const positionInCycle = diffDays % cycleLength;
    
    // Se está dentro dos dias trabalhados do ciclo
    return positionInCycle < scale.dias_trabalhados;
  }

  // Se não tem configuração, considera como dia de trabalho
  return true;
}

// Formata lista de feriados para exibição
export function formatHolidaysDisplay(scale, holidays, monthFilter = null) {
  const holidaysWithStatus = getHolidaysForScale(scale, holidays, monthFilter);
  
  if (holidaysWithStatus.length === 0) {
    return monthFilter !== null 
      ? 'Nenhum feriado neste mês'
      : 'Nenhum feriado cadastrado';
  }

  // Filtrar apenas feriados em dias de trabalho
  const workHolidays = holidaysWithStatus.filter(h => h.isWorkDay);
  
  if (workHolidays.length === 0) {
    return 'Todos os feriados em dias de folga';
  }

  // Limitar a 3 feriados para não ficar muito longo
  const display = workHolidays
    .slice(0, 3)
    .map(h => `${h.nome} (${h.dataFormatada})`)
    .join(', ');
  
  const remaining = workHolidays.length - 3;
  
  return remaining > 0 
    ? `${display} +${remaining} mais`
    : display;
}

// Função auxiliar para pegar apenas feriados do mês atual
export function getCurrentMonthHolidays(scale, holidays) {
  const currentMonth = new Date().getMonth();
  return getHolidaysForScale(scale, holidays, currentMonth);
}

// Função auxiliar para formatar feriados do mês atual
export function formatCurrentMonthHolidays(scale, holidays) {
  const currentMonth = new Date().getMonth();
  return formatHolidaysDisplay(scale, holidays, currentMonth);
}

export function calculateCycleLength(scale) {
  if (!scale.dias_trabalhados || !scale.dias_n_trabalhados) return 0;
  return scale.dias_trabalhados + scale.dias_n_trabalhados;
}