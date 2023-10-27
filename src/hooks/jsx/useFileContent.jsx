import { useState } from 'react'
import { trans } from '../../helpers/utils';
import notify from 'devextreme/ui/notify';


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

        console.log('file.type', file.type)

        const isText = ( file.type.indexOf('text') > -1 )
        const isXlsx = ( file.type.indexOf('spreadsheetml') > -1 || file.type.indexOf('ms-excel') > 1 )

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