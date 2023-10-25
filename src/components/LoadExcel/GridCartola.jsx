import { DataGrid } from "devextreme-react"
import { useCallback, useRef } from "react"
import { BsFileEarmarkSpreadsheet } from "react-icons/bs"
import { Column, Editing, Lookup } from "devextreme-react/data-grid"
import { useDXCustomToolbar } from "../../hooks/jsx/useDXCustomToolbar"
import { useCategories } from "../../hooks/queries/useCategories"
import { useBankContentToJson } from "../../hooks/useBankContentToJson"
import { useItemCategories } from "../../hooks/queries/useItemCategory"
import { useCartola } from "../../hooks/queries/useCartola"
import { useNotifyRefetch } from "../../hooks/useNotifyRefetch"
import { GiSave } from 'react-icons/Gi'
import { trans } from "../../helpers/utils"


export const GridCartola = ({content}) => {

    const gridRef = useRef(null)
    const {CustomToolbar, RefreshButton, SearchPanel, ColumnChooser, EnlargeButton, height, CustomButton } = useDXCustomToolbar(gridRef)
    const categories                    = useCategories()
    const cartola                       = useBankContentToJson(content)
    const itemCategories                = useItemCategories()
    const cartolaQuery                  = useCartola('default')
    const { notifyResultado }           = useNotifyRefetch()


    const handleSave = useCallback( () => {
        const { dataSource } = gridRef?.current?.props ?? []
        const rest = { bank: 'itau', instance: 'default' }
        cartolaQuery.add.mutateAsync({...rest, date: cartola?.fecha, cartola: dataSource }).then(notifyResultado)
    }, [gridRef?.current?.props?.dataSource])

    const refreshCartola = useCallback( () => itemCategories.refetch().then(cartola.refetch()), [])


  return (
    <>
        <CustomToolbar title={`Cartola ${cartola.fecha ?? ''}`} ComponentIcon={<BsFileEarmarkSpreadsheet className="mt-1 ms-3 me-3" /> }>
            <RefreshButton onClick={ refreshCartola } />
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
            dataSource={ cartola?.dataSource }
            columnAutoWidth={true}
            height={height}
            onRowUpdating={ itemCategories.handleUpdate }
            pager={{ showPageSizeSelector: true, allowedPageSizes: [50, 100, 200], showInfo: true }}
            headerFilter={{ visible: true }}
        >
            {
            cartola?.columns?.map( c => <Column dataField={c} key={c} name={c} allowEditing={false} /> )
            }
            { (cartola?.dataSource?.length > 0) && <Column dataField="referencia" allowEditing={false} /> }
            { (cartola?.dataSource?.length > 0) && <Column dataField="importance" allowEditing={false} /> }
            { (cartola?.dataSource?.length > 0) &&
            <Column key="cate" dataField="category" caption={trans("Categoría")} allowEditing={true} width={150} >
                <Lookup dataSource={ categories?.data?.categories } valueExpr="_id" displayExpr="name" />
            </Column>
            }
            <Editing allowUpdating={true} useIcons={true} mode="cell" />
        </DataGrid>
      </>
  )
}
