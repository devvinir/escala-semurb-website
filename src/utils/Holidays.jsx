// Nova função: Filtra feriados baseado na escala
export function getHolidaysForScale(scale, holidays) {
  if (!scale || !holidays || holidays.length === 0) {
    return [];
  }

  const holidaysWithStatus = holidays.map(holiday => {
    const holidayDate = new Date(holiday.dia_feriado);
    const isWorkDay = isWorkingDay(holidayDate, scale);
    
    return {
      nome: holiday.name_feriado,
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
  if (Array.isArray(scale.unwork_scale) && 
      scale.unwork_scale.length > 0) {
    
    const dayOfWeek = date.getDay();
    const dayName = DaysOfWeek[dayOfWeek];
    
    // Se o dia da semana está na lista de folgas, NÃO é dia de trabalho
    return !scale.unwork_scale.includes(dayName);
  }

  // Se é ciclo automático NxM
  if (scale.start_date && scale.work_day !== undefined && 
      scale.dias_n_trabalhados !== undefined) {
    
    const startDate = new Date(scale.start_date);
    const cycleLength = scale.work_day + scale.dias_n_trabalhados;
    
    // Calcular diferença em dias
    const diffTime = date - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return true; // Antes da data de início, considera como trabalho
    
    const positionInCycle = diffDays % cycleLength;
    
    // Se está dentro dos dias trabalhados do ciclo
    return positionInCycle < scale.work_day;
  }

  // Se não tem configuração, considera como dia de trabalho
  return true;
}

// Formata lista de feriados para exibição
export function formatHolidaysDisplay(scale, holidays) {
  const holidaysWithStatus = getHolidaysForScale(scale, holidays);
  
  if (holidaysWithStatus.length === 0) {
    return 'Nenhum feriado cadastrado';
  }

  // Filtrar apenas feriados em dias de trabalho (se quiser)
  const workHolidays = holidaysWithStatus.filter(h => h.isWorkDay);
  
  if (workHolidays.length === 0) {
    return 'Nenhum feriado em dia de trabalho';
  }

  return workHolidays
    .map(h => `${h.name} (${h.dataFormatada})`)
    .join(', ');
}

export function calculateCycleLength(scale) {
  if (!scale.work_day || !scale.dias_n_trabalhados) return 0;
  return scale.work_day + scale.dias_n_trabalhados;
}