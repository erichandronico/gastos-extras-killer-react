import { DataGrid } from "devextreme-react"
import MainLayout from "../../Layouts/MainLayout"
import { Titulo } from "../Paneles/Titulo"
import { LuSettings2 } from 'react-icons/lu'
import { useItemCategories } from "../../hooks/queries/useItemCategory"
import { Column, Editing, HeaderFilter, Lookup } from "devextreme-react/data-grid"
import { useCategories } from "../../hooks/queries/useCategories"
import { trans } from "../../helpers/utils"
import { useDXCustomToolbar } from "../../hooks/jsx/useDXCustomToolbar"
import { useCallback, useRef } from "react"
import { BsFileEarmarkSpreadsheet } from "react-icons/bs"
import { useNotifyRefetch } from "../../hooks/useNotifyRefetch"

const importanceList = ['básico', 'necesario', 'lo quería', 'no era necesario']

export const CategoryManager = () => {

  const gridRef = useRef(null)
  const {CustomToolbar, RefreshButton, SearchPanel, ColumnChooser, EnlargeButton, height } = useDXCustomToolbar(gridRef)

  const itemCategories        = useItemCategories()
  const categories            = useCategories()
    const { notifyResultado } = useNotifyRefetch()

  const handleUpdate = useCallback( ({oldData, newData}) => {
    itemCategories.add.mutateAsync({ ...oldData, ...newData  }).then(notifyResultado)
  } ,[])

  const handleRemove = useCallback( ({oldData}) => {
    itemCategories.del.mutateAsync(oldData).then(notifyResultado)
  } ,[])

  return (
    <MainLayout>
        <Titulo texto={"Administrador de Categorías"} Icono={<LuSettings2 />} />

        <CustomToolbar title={`Mantenedor de Categorías`} ComponentIcon={<BsFileEarmarkSpreadsheet className="mt-1 ms-3 me-3" /> }>
            <RefreshButton onClick={ () => itemCategories.refetch().then( categories.refetch() ) } />
            <EnlargeButton />
            <ColumnChooser />
            <SearchPanel />
          </CustomToolbar>
        <DataGrid
          ref={gridRef}
          dataSource={ itemCategories?.data?.itemCategories }
          className="grid1"
          height={ height }
          onRowUpdating={ handleUpdate }
          onRowRemoving={ handleRemove }
         >
          <HeaderFilter visible={true} />
          <Column dataField="_id" visible={false} allowEditing={false} />
          <Column dataField="instance" visible={false} allowEditing={false} />
          <Column dataField="name" caption="Descripción" allowEditing={false} />
          <Column dataField="codigoReferencia" allowEditing={false} />
          <Column dataField="montoOperacion" allowEditing={false} format="currency" />
          <Column key="cate" dataField="category" caption={trans("Categoría")} allowEditing={true} width={150} >
            <Lookup dataSource={ categories?.data?.categories } valueExpr="_id" displayExpr="name" />
          </Column>
          <Column dataField="referencia" caption="Referencia Compra" allowEditing={true} />
          <Column dataField="importance" caption="Importancia"  allowEditing={true} >
            <Lookup dataSource={importanceList} />
          </Column>
          <Editing allowUpdating={true} allowDeleting={true} useIcons={true} mode="form" />
          
        </DataGrid>
    </MainLayout>
  )
}
