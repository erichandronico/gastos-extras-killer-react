## Funciones de fecha

- `getFormatDate(fecha, formato = 'YYYY-MM-DD')`: Convierte una fecha en formato `formato`.
- `getFechasDeVigenciaFromData(data)`: Retorna un objeto con las fechas de inicio y fin de una data.
- `getFormatDateFns({fecha, formato = 'yyyy-MM-dd'})`: Convierte una fecha en formato `formato` utilizando la librería `date-fns`.
- `getFormatDatetime({fecha, formato = 'dd-MM-yyyy HH:mm'})`: Convierte una fecha y hora en formato `formato`.
- `dateNowStr(format = 'yyyy-MM-dd')`: Retorna la fecha actual en formato `format`.
- `dateTimeNowStr(format = 'yyyy-MM-dd HH:mm:ss')`: Retorna la fecha y hora actual en formato `format`.
- `getUserDate()`: Retorna la fecha y hora actual en formato ISO 8601.
- `dateboxToAAAAMMDD(dateString, formatoActual="dd/MM/yyyy", formatoDestino = "yyyy-MM-dd")`: Convierte una cadena de fecha en formato `formatoActual` en formato `formatoDestino`.
- `getDateRange(fecha_i, fecha_f)`: Retorna un array con todas las fechas en el rango desde `fecha_i` hasta `fecha_f`.
- `dxDatetimeToLocal(fecha, formato = 'yyyy-MM-dd HH:mm:ss')`: Convierte una fecha y hora en formato ISO 8601 a la hora local en formato `formato`.
- `aaaammdd(fecha)`: Retorna la fecha en formato `YYYY-MM-DD`.
- `aaaammddHH(fecha)`: Retorna la fecha y hora en formato `YYYY-MM-DD HH:mm:ss`.
- `addDias(fecha, dias)`: Retorna la fecha sumando `dias` días a `fecha`.
- `isInXDaysRange(xdays, dateToCompare)`: Retorna `true` si `dateToCompare` está dentro del rango de `xdays` días desde hoy.
- `getWrittenDate(fecha, formato = 'd', lang = 'cl')`: Retorna la fecha escrita en formato `formato` y idioma `lang`.
- `addIntermediateDates(arr, dateField)`: Agrega fechas intermedias a un array de objetos ordenados por `dateField`.
- `completeData(data = [], dateKey = 'date', fillWith = {}, key)`: Completa las fechas faltantes en un array de objetos con valores por defecto.
- `fillDates(dataSource = [], dateKey = 'date', defaultValues, groupKey)`: Rellena las fechas faltantes en un array de objetos agrupados por una clave.
