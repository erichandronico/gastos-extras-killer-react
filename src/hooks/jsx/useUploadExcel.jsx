import { EditorLayout } from '../../Layouts/EditorLayout'
import { trans } from '../../helpers/utils'
import { FileUploader } from 'devextreme-react'
import { format } from 'date-fns'
import { AiOutlineFileExcel } from 'react-icons/ai'
import { BsArrowRightShort, BsFiletypeCsv } from 'react-icons/bs'
import { useFileContent } from './useFileContent'
import { useEffect, useState } from 'react'


export const useUploadExcel = () => {

  const file                            = useFileContent();
  const [uploadedData, setUploadedData] = useState({ loading: false, dataSource: [] });

  useEffect(() =>  {
    setUploadedData( anterior => ({...anterior, loading: file?.isLoading }) )
  }, [file.isLoading])


  useEffect( () => {
      if (!file.content) return
      setUploadedData( anterior => ({...anterior, loading: true }) )
      const result = file.content
      //LOGICAS DE subida
      setUploadedData( anterior => ({...anterior, loading: false, dataSource: result }))   
  }, [file.content])


    const ExcelUploader = () => {
        return (
          <EditorLayout blanco={false} border={false}>
            <div className="flex flex-col">
              <div className="mb-2">
                  <h5 className="pl-0 font-light flex items-center">
                      <BsArrowRightShort className="ml-1 mb-1 mr-1" size={15} />
                      {trans('Selección de Archivo')}
                      <AiOutlineFileExcel className="ml-3 mr-2 mb-1" size={20} title="Excel" />
                      <BsFiletypeCsv className="ml-2 mr-3 mb-1" size={18} title="CSV" />
                  </h5>
              </div>
              <hr className="mt-0 mb-4" />
              <div className="mt-0 pt-0 ml-4 flex font-light">
                <form encType="multipart/form-data" action="">
                  <FileUploader
                    className=""
                    selectButtonText={trans('Buscar Archivo')}
                    labelText={trans('Suéltalo Aquí')}
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv,text/plain"
                    uploadMode="useForm"
                    disabled={false}
                    onValueChanged={file.fileUploadContentChange}
                  />
                </form>
              </div>
              <div>
                {file?.info && file.info?.lastModifiedDate && (
                  <div className="ml-4 mt-3 font-light text-xs">
                    <div className="pl-3 pb-2">
                      <b>{trans('Modificado el')}:</b> {format(new Date(file?.info?.lastModifiedDate), 'dd/MM/yyyy HH:mm')}
                    </div>
                    <div className="pl-3 pb-2">
                      <b>{trans('Tamaño')}:</b> {((file?.info.size ?? 0) / 1024).toFixed(1)} kb
                    </div>
                    <div className="pl-3 pb-2">
                      <b>{trans('Tipo')}:</b> {file?.info.type ?? ''}
                    </div>
                  </div>
                )}
              </div>
              {/* Uncomment the below code if you want to use the button
              <div className="pt-5">
                <Button
                  style={{ display: 'block' }}
                  text={trans(uploadButtonText)}
                  icon="fas fa-cloud-upload-alt"
                  disabled={!importedData.hasAllRequiredKeys || (isFhoImport && !dimSelected)}
                  onClick={uploadFn}
                />
              </div>
              */}
            </div>
          </EditorLayout>
        );
      };

      return { ExcelUploader, uploadedData, fechaCartola: file?.fechaCartola }


}
