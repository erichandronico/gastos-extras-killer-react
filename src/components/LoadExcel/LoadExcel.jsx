import MainLayout from "../../Layouts/MainLayout"
import { Titulo } from "../Paneles/Titulo"
import { trans } from "../../helpers/utils"
import {FcUpload} from 'react-icons/fc'
import { useUploadExcel } from "../../hooks/jsx/useUploadExcel"
import { GridCartola } from "./GridCartola"


export const LoadExcel = () => {

  const { content, ExcelUploader  }   = useUploadExcel()

  return (
    <MainLayout>
      <Titulo texto={ trans('Subir Cartola') } Icono={<FcUpload /> } />
      <ExcelUploader />
      <GridCartola content={content} />
    </MainLayout>
  )
}
