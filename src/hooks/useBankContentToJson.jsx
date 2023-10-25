import _ from "lodash";
import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { serialToDate } from '../helpers/fechas';
import { useItemCategories } from "./queries/useItemCategory";



const transformations = {
  cuota: (value) => {
    if (String(value)?.includes('/')) {
      const [cuota, totalCuotas] = value.split('/');
      return {
        cuota: _.toNumber(cuota),
        totalCuotas: _.toNumber(totalCuotas)
      };
    }
    return { cuota: value };
  },
  fecha: (value) => {
    if (typeof value === 'number') {
      const fecha = serialToDate(value)
      return { fecha }
    }
    return { fecha: value };
  }
};

//Cartolas Tarjetas de Crédito
const getJsonFromEstadoTcNacionalItau = (result, matchContent, matchFechaCartola='Fecha de estado de cuenta:') => {
  try {
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
  
    const captionHeader = sheetData[headerRowIndex];
  
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

    const columns = [
      'lugarOperacion',
      'fecha',
      'codigoReferencia',
      'descripcion',
      'montoOperacion',
      'montoTotal',
      'cuota',
      'totalCuotas',
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

    return { 
      dataSource: dataSource.filter( item =>  _.get(item, 'valorCuota')),
      fecha: serialToDate( sheetData[fechaRowIndex].at(1) ), 
      captionHeader, 
      columns 
    };
  } catch (error) {
    console.log(error)
  }

  };

//Concentra las cartolas
const getDataFrom = {
    itauTc: getJsonFromEstadoTcNacionalItau
}




export const useBankContentToJson = (content, format='xlsx') => {

    const itemCategories = useItemCategories()
    const [bankTc, setBankTc]   = useState(null)
    const [reload, setReload]   = useState(null)

    useEffect( () => {
      if (!content) return 

      const itauTc = getDataFrom['itauTc']( content, 'Lugar de operación' )
      const getCategory = itemCategories?.data?.getItemCategoryByNameAndCode

      const itauTcWithCategory = itauTc?.dataSource?.map( i => {
        const {referencia, category, importance} = getCategory( i?.descripcion, i?.codigoReferencia ) ?? { referencia: '', category: '', importance: ''}
        return { ...i, referencia, category, importance }
      })

      setBankTc({...itauTc, dataSource: itauTcWithCategory })

    }, [content, itemCategories?.data, reload])

    return {
      dataSource:     bankTc?.dataSource ?? [],
      fecha:          bankTc?.fecha ?? '',
      columnsCaption: bankTc?.captionHeader ?? [],
      columns:        bankTc?.columns ?? [],
      refetch:        () => setReload( new Date() )
    }
}