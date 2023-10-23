import { useEffect, useRef, useState } from "react"
import MainLayout from "../../Layouts/MainLayout"
import { Titulo } from "../Paneles/Titulo"
import { trans } from "../../helpers/utils"
import {FcUpload} from 'react-icons/fc'
import { useUploadExcel } from "../../hooks/jsx/useUploadExcel"
import { DataGrid } from "devextreme-react"
import { useDXCustomToolbar } from "../../hooks/jsx/useDXCustomToolbar"
import { BsFileEarmarkSpreadsheet } from "react-icons/bs"
import _ from "lodash"

export const LoadExcel = () => {

  // const file = useFileContent()
  const gridRef = useRef(null)
  const { uploadedData, ExcelUploader, fechaCartola  }  = useUploadExcel()
  const {CustomToolbar, RefreshButton, SearchPanel, ColumnChooser, EnlargeButton, height } = useDXCustomToolbar(gridRef)
  const [dataSource, setdataSource] = useState([])


  useEffect(() => {
    if (uploadedData?.loading) return
    const ds = uploadedData.dataSource.filter( item =>  _.get(item, 'valorCuota'))
    setdataSource( ds )
  }, [uploadedData?.dataSource])
  

  console.log(dataSource)

  return (
    <MainLayout>
      <Titulo texto={ trans('Subir Cartola') } Icono={<FcUpload /> } />

      <div>
        <ExcelUploader />
      </div>

      <CustomToolbar title={`Cartola ${fechaCartola ?? ''}`} ComponentIcon={<BsFileEarmarkSpreadsheet className="mt-1 me-2" /> }>
        <RefreshButton onClick={ () => console.log('refresh')} />
        <EnlargeButton />
        <ColumnChooser />
        <SearchPanel />
      </CustomToolbar>
      <DataGrid
        ref={gridRef}
        className="grid1"
        dataSource={dataSource}
        columnAutoWidth={true}
        height={height}
        pager={{ showPageSizeSelector: true, allowedPageSizes: [50, 100, 200], showInfo: true }}

      />




    </MainLayout>
  )
}
