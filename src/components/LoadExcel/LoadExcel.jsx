import { useCallback, useRef } from "react"
import MainLayout from "../../Layouts/MainLayout"
import { Titulo } from "../Paneles/Titulo"
import { trans } from "../../helpers/utils"
import {FcUpload} from 'react-icons/fc'
import { useUploadExcel } from "../../hooks/jsx/useUploadExcel"
import { DataGrid } from "devextreme-react"
import { useDXCustomToolbar } from "../../hooks/jsx/useDXCustomToolbar"
import { BsFileEarmarkSpreadsheet } from "react-icons/bs"
import { useBankContentToJson } from "../../hooks/jsx/useBankContentToJson"
import { Column, Editing, Lookup } from "devextreme-react/data-grid"
import { useCategories } from "../../hooks/queries/useCategories"
import { GiSave } from 'react-icons/Gi'
import { useItemCategories } from "../../hooks/queries/useItemCategory"
import { useCartola } from "../../hooks/queries/useCartola"
import { useNotifyRefetch } from "../../hooks/useNotifyRefetch"


export const LoadExcel = () => {
  // const file = useFileContent()
  const gridRef = useRef(null)
  const {CustomToolbar, RefreshButton, SearchPanel, ColumnChooser, EnlargeButton, height, CustomButton } = useDXCustomToolbar(gridRef)
  
  const { content, ExcelUploader  }   = useUploadExcel()
  const cartola                       = useBankContentToJson(content)
  const categories                    = useCategories()
  const itemCategories                = useItemCategories()
  const cartolaQuery                  = useCartola()
  const { notifyResultado }           = useNotifyRefetch()


  const handleSave = useCallback( () => {
    const { dataSource } = gridRef?.current?.props ?? []
    const rest = { bank: 'itau', instance: 'default' }
    cartolaQuery.add.mutateAsync({...rest, date: cartola?.fecha, cartola: dataSource }).then(notifyResultado)
  }, [gridRef?.current?.props?.dataSource])


  const handleUpdate = useCallback( ({oldData, newData}) => {
    const { descripcion } = oldData;
    const { category }    = newData;
    itemCategories.add.mutateAsync( { instance: 'default', name: descripcion, category }).then(notifyResultado)
  }, [])



  return (
    <MainLayout>
      <Titulo texto={ trans('Subir Cartola') } Icono={<FcUpload /> } />

      <div>
        <ExcelUploader />
      </div>

      <CustomToolbar title={`Cartola ${cartola.fecha ?? ''}`} ComponentIcon={<BsFileEarmarkSpreadsheet className="mt-1 ms-3 me-3" /> }>
        <RefreshButton onClick={ () => console.log('refresh')} />
        <EnlargeButton />
        <ColumnChooser />
        <SearchPanel />
        <CustomButton onClick={ handleSave } cantidad={cartola?.dataSource?.length} >
          <GiSave size={20} />
        </CustomButton>
      </CustomToolbar>
      <DataGrid
        ref={gridRef}
        className="grid1"
        dataSource={cartola.dataSource ?? []}
        columnAutoWidth={true}
        height={height}
        onRowUpdating={ handleUpdate }
        pager={{ showPageSizeSelector: true, allowedPageSizes: [50, 100, 200], showInfo: true }}
      >
        {
          cartola?.columns?.map( c => <Column dataField={c} key={c} name={c} allowEditing={false} /> )
        }
        { (cartola?.dataSource?.length > 0) &&
          <Column key="cate" dataField="category" caption={trans("Categoría")} allowEditing={true} width={150} >
            <Lookup dataSource={ categories?.data?.categories } valueExpr="_id" displayExpr="name" />
          </Column>
        }
        <Editing allowUpdating={true} useIcons={true} mode="cell" />
      </DataGrid>

    </MainLayout>
  )
}
