import { useState } from 'react'
import StringUtility, { trans } from '../../helpers/utils';
import notify from 'devextreme/ui/notify';
import * as XLSX from 'xlsx';
import _ from 'lodash';
import { serialToDate } from '../../helpers/fechas';


const detectCSVDelimiter = csv => {
    const lines = csv.split('\n');
    const numFields = lines[0].split(/\t|,|;/).length;
    const separators = ['\t', ',', ';'];
    let delimiter = ',';
    let valid = true;
    for (let i = 1; i < lines.length && valid; i++) {
      let fields = null;
      for (const sep of separators) {
        fields = lines[i].split(sep);
        if (fields.length === numFields) {
          delimiter = sep;
          break;
        }
      }
      if (fields.length !== numFields) {
        valid = fields.every(field => {
          if (/^[+-]?\d*([,.]\d+)?$/.test(field)) {
            return field.indexOf(delimiter) === field.lastIndexOf(delimiter);
          } else {
            return field.split(delimiter).length % 2 === 0;
          }
        });
      }
    }
    return valid ? delimiter : null;
  }

const transformations = {

  'cuota': (value) => {
    if (!String(value)?.includes('/')) return { cuota: value, totalCuotas: null}
    const [cuota, totalCuotas] = value.split('/');
    return { cuota: _.toNumber(cuota), totalCuotas: _.toNumber(totalCuotas) };
    
  },
  'fecha': (value) => {
    if (typeof value === 'number') {
      const fecha = serialToDate(value)
      return { fecha };  // Modifica según tu lógica de fechas
    }
    return { fecha: value };
  }
};


//Cartolas Tarjetas de Crédito
const getJsonFromEstadoTcNacionalItau = (result, matchContent, matchFechaCartola='Fecha de estado de cuenta:') => {
  const workbook  = XLSX.read(result, { type: 'binary' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Find the row index that matches the content
  const headerRowIndex  = sheetData.findIndex(row => row.includes(matchContent));
  const fechaRowIndex   = sheetData.findIndex(row => row.includes(matchFechaCartola));

  // If no match is found, default to the first row as header
  if (headerRowIndex === -1) {
      console.error('No matching content found in the sheet.');
      return [];
  }

  // const header = sheetData[headerRowIndex];

  const header = [
    'lugarOperacion',
    'fecha',
    'codigoReferencia',
    'descripcion',
    'montoOperacion',
    'montoTotal',
    'cuota',
    'valorCuota'
  ]

  const rows   = sheetData.slice(headerRowIndex + 1);
  
  const dataSource = rows.reduce((acc, row) => {
      const obj = {};

      header.forEach((key, index) => {
        
        if (transformations[key]) {
          Object.assign(obj, transformations[key](row[index]));
        } else {
          obj[key] = row[index];
        }

      });

      acc.push(obj);
      return acc;
  }, []);

  return { dataSource, cartola: sheetData[fechaRowIndex].at(1) }
};

const csvToJson = csvContent => {
    const lines     = csvContent.replace(/\r/g, '').split('\n');
    const headers   = lines[0].toLowerCase().split(';');

    const delimiter = detectCSVDelimiter(csvContent)
    // console.log('delimiter', delimiter)

    return lines.slice(1).map(line => {
      const currentLine = line.split( delimiter );
      return currentLine.length === headers.length
        ? headers.reduce((acc, header, index) => ({ ...acc, [header.replaceAll(' ', '_')]: currentLine[index] }), {})
        : null;
    }).filter(Boolean);
  };

//Concentra las cartolas
const getDataFrom = {
  itauTc: getJsonFromEstadoTcNacionalItau
}



export const useFileContent = () => {

    const [content, setContent]     = useState(null)
    const [fechaCartola, setFechaCartola] = useState(null)
    const [info, setInfo]           = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const fileUploadContentChange = event => {
        setIsLoading(true)
        const file = event?.value?.at(0);
    
        if (!file) { 
          setIsLoading(false);
          return;
        }

        const isText = ( file.type.indexOf('text') > -1 )
        const isXlsx = ( file.type.indexOf('spreadsheetml') > -1 )

        if ( !isText && !isXlsx ) {
            console.error('El archivo no es un archivo de texto o de excel');
            notify( trans('el archivo no es una archivo de texto o de excel'), 'error', 1000 )
            setIsLoading(false);
            return;
          }

        setInfo( file )

        const reader = new FileReader();

        reader.onload = ({target}) => {
          if ( isText )   setContent( csvToJson(target?.result) );

          const itauTc = getDataFrom['itauTc']( target?.result, 'Lugar de operación' )

          if ( isXlsx )         setContent( itauTc?.dataSource ?? [] );
          if (itauTc?.cartola)  setFechaCartola( serialToDate(itauTc?.cartola) )

          setIsLoading(false);
        }

        if ( isText ) reader.readAsText(file);
        if ( isXlsx ) reader.readAsBinaryString(file);
   
    }

    const reset = () => { setContent(null); setInfo({}); setIsLoading(false); }

    return { content, info, fileUploadContentChange, reset, isLoading, fechaCartola }
}


//MODIFICAR => solo debe devolver el contenido sin exportar a JSON!!
//Crear otro hook para la lógica del banco: tome el contenido y genere el JSON dependiendo del banco