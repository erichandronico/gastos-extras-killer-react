import { useState } from 'react'
import { trans } from '../../helpers/utils';
import notify from 'devextreme/ui/notify';



// const detectCSVDelimiter = csv => {
//     const lines = csv.split('\n');
//     const numFields = lines[0].split(/\t|,|;/).length;
//     const separators = ['\t', ',', ';'];
//     let delimiter = ',';
//     let valid = true;
//     for (let i = 1; i < lines.length && valid; i++) {
//       let fields = null;
//       for (const sep of separators) {
//         fields = lines[i].split(sep);
//         if (fields.length === numFields) {
//           delimiter = sep;
//           break;
//         }
//       }
//       if (fields.length !== numFields) {
//         valid = fields.every(field => {
//           if (/^[+-]?\d*([,.]\d+)?$/.test(field)) {
//             return field.indexOf(delimiter) === field.lastIndexOf(delimiter);
//           } else {
//             return field.split(delimiter).length % 2 === 0;
//           }
//         });
//       }
//     }
//     return valid ? delimiter : null;
//   }




// const csvToJson = csvContent => {
//     const lines     = csvContent.replace(/\r/g, '').split('\n');
//     const headers   = lines[0].toLowerCase().split(';');

//     const delimiter = detectCSVDelimiter(csvContent)
//     // console.log('delimiter', delimiter)

//     return lines.slice(1).map(line => {
//       const currentLine = line.split( delimiter );
//       return currentLine.length === headers.length
//         ? headers.reduce((acc, header, index) => ({ ...acc, [header.replaceAll(' ', '_')]: currentLine[index] }), {})
//         : null;
//     }).filter(Boolean);
//   };




export const useFileContent = () => {

    const [content, setContent]     = useState(null)
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
          if ( isText )   setContent( target?.result ?? {} );
          if ( isXlsx )   setContent( target?.result ?? {} );
          setIsLoading(false);
        }

        if ( isText ) reader.readAsText(file);
        if ( isXlsx ) reader.readAsBinaryString(file);

    }

    const reset = () => { setContent(null); setInfo({}); setIsLoading(false); }

    return { 
      content, 
      info, 
      fileUploadContentChange, 
      reset, 
      isLoading }
}


//MODIFICAR => solo debe devolver el contenido sin exportar a JSON!!
//Crear otro hook para la lógica del banco: tome el contenido y genere el JSON dependiendo del banco