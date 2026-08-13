// src/utils/scaleUtils.js (ou src/utils.js)

export function getRestDaysDisplay(scale) {
  if (!scale) return 'N/A';

  // Se tem dias específicos de folga definidos
  if (Array.isArray(scale.unwork_scale) && 
      scale.unwork_scale.length > 0) {
    return scale.unwork_scale.join(' - ');
  }

  // Se é ciclo automático (NxM), calcular os dias de folga
  if (scale.work_day !== undefined && 
      scale.dias_n_trabalhados !== undefined && 
      scale.start_date) {
    
    const restDays = calculateRestDaysFromCycle(
      scale.start_date,
      scale.work_day,
      scale.dias_n_trabalhados
    );
    
    if (restDays.length > 0) {
      return restDays.join(' - ');
    }
  }

  return 'N/A';
}

// utils/scaleUtils.js (substitua a função antiga por esta)
function calculateRestDaysFromCycle(startDateStr, diasTrabalhados, diasFolga) {
  const DaysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  // Forçar parse como meia-noite UTC para evitar deslocamentos por timezone
  const startDate = new Date(startDateStr + 'T00:00:00');

  const cycleLength = diasTrabalhados + diasFolga;
  if (cycleLength <= 0) return [];

  // Pattern do ciclo: T = trabalho, F = folga
  const pattern = Array.from({ length: cycleLength }, (_, i) => (i < diasTrabalhados ? 'T' : 'F'));

  const restDaysSet = new Set();

  // Simular 90 dias a partir da data de início para capturar todas as folgas possíveis
  for (let i = 0; i < 90; i++) {
    // Criar data baseada em timestamp pra evitar problemas de timezone
    const currentTs = startDate.getTime() + i * 24 * 60 * 60 * 1000;
    const currentDate = new Date(currentTs);

    const positionInCycle = i % cycleLength;

    if (pattern[positionInCycle] === 'F') {
      const dayName = DaysOfWeek[currentDate.getDay()];
      restDaysSet.add(dayName);
      if (restDaysSet.size === 7) break;
    }
  }

  // Ordena: Seg -> Ter -> Qua -> Qui -> Sex -> Sab -> Dom
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

  // Se dias específicos definidos
  if (Array.isArray(scale.unwork_scale) &&
      scale.unwork_scale.length > 0) {
    const dayOfWeek = date.getDay();
    const dayName = DaysOfWeek[dayOfWeek];
    return !scale.unwork_scale.includes(dayName);
  }

  // Se é ciclo automático NxM
  if (scale.start_date && scale.work_day !== undefined &&
      scale.dias_n_trabalhados !== undefined) {
    // parse seguro UTC
    const startDate = new Date(scale.start_date + 'T00:00:00');
    const diffTime = date.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (24 * 60 * 60 * 1000));

    if (diffDays < 0) return true; // antes da escala considera dia de trabalho

    const cycleLength = scale.work_day + scale.dias_n_trabalhados;
    const positionInCycle = diffDays % cycleLength;

    return positionInCycle < scale.work_day;
  }

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
    .map(h => `${h.name} (${h.dataFormatada})`)
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
  if (!scale.work_day || !scale.dias_n_trabalhados) return 0;
  return scale.work_day + scale.dias_n_trabalhados;
}