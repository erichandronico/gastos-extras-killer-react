import { addDays, format } from 'date-fns';

export function serialToDate(serial) {
  const startDate = new Date(1900, 0, 1);
  
  // Agrega el número de días al serial de Excel a la fecha de inicio.
  const date = addDays(startDate, serial - 2);  // El ajuste de -2 es por el error del año bisiesto en Excel.
  
  return format(date, 'yyyy-MM-dd');
}

