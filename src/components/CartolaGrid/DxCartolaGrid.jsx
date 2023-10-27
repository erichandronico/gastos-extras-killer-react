import { DataGrid } from "devextreme-react"
import { Column, Editing, FilterPanel, GroupItem, GroupPanel, Lookup, SortByGroupSummaryInfo, Summary } from "devextreme-react/data-grid"
import { trans } from "../../helpers/utils"
import { useDXCustomToolbar } from "../../hooks/jsx/useDXCustomToolbar"
import { useCategories } from "../../hooks/queries/useCategories"
import { useItemCategories } from "../../hooks/queries/useItemCategory"
import { useCallback, useRef } from "react"
import { useCartola } from "../../hooks/queries/useCartola"
import { useNotifyRefetch } from "../../hooks/useNotifyRefetch"
import { BsFileEarmarkSpreadsheet } from "react-icons/bs"
import { GiSave } from 'react-icons/Gi'

const importanceList = ['básico', 'necesario', 'lo quería', 'no era necesario']
const invisibles = ['lugarOperacion', 'montoTotal']

export const DxCartolaGrid = ({cartola, hystorySelector=false}) => {

    const gridRef                       = useRef(null)
    const {CustomToolbar, RefreshButton, SearchPanel, ColumnChooser, EnlargeButton, height, CustomButton } = useDXCustomToolbar(gridRef)
    const categories                    = useCategories()
    const itemCategories                = useItemCategories()
    const cartolaQuery                  = useCartola('default')
    const { notifyResultado }           = useNotifyRefetch()

    const handleSave = useCallback( () => {
        const { dataSource } = gridRef?.current?.props ?? []
        const rest = { bank: 'itau', instance: 'default' }
        cartolaQuery.add.mutateAsync({...rest, date: cartola?.fecha, cartola: dataSource }).then(notifyResultado)
    }, [gridRef?.current?.props?.dataSource])


    const refreshCartola = useCallback( () => itemCategories.refetch().then( () => {
      cartola.refetch();
      cartolaQuery.refetch()
    }), [])


  return (
    <>
      <CustomToolbar title={`Cartola ${cartola?.fecha ?? ''}`} ComponentIcon={<BsFileEarmarkSpreadsheet className="mt-1 ms-3 me-3" /> }>
          <RefreshButton onClick={ refreshCartola } />
          <EnlargeButton />
          <ColumnChooser />
          <SearchPanel />
          <CustomButton onClick={ handleSave } cantidad={cartola?.data?.dataSource?.length} >
          <GiSave size={20} />
          </CustomButton>
      </CustomToolbar>
        <DataGrid
            ref={gridRef}
            className="grid1"
            dataSource={ cartola?.data?.dataSource }
            columnAutoWidth={true}
            height={height}
            onRowUpdating={ itemCategories.handleUpdate }
            paging={{ visible: true, pageSize: 50 }}
            pager={{ showPageSizeSelector: true, allowedPageSizes: [50, 100, 200], showInfo: true }}
            headerFilter={{ visible: true }}
            >
            <GroupPanel visible={true}  />  
            <FilterPanel visible={true} />
            {
            cartola?.data?.columns?.map( c => <Column dataField={c} key={c} name={c} allowEditing={false} visible={ !invisibles.includes(c) } /> )
            }
            { (cartola?.data?.dataSource?.length > 0) && <Column dataField="referencia" allowEditing={true} /> }
            { (cartola?.data?.dataSource?.length > 0) && 
            <Column dataField="importance" caption="Importancia"  allowEditing={true} >
              <Lookup dataSource={importanceList} />
            </Column>
            }
            { (cartola?.data?.dataSource?.length > 0) &&
            <Column key="cate" dataField="category" caption={trans("Categoría")} allowEditing={true} width={150} >
                <Lookup dataSource={ categories?.data?.categories } valueExpr="_id" displayExpr="name" />
            </Column>
            }
            <Summary>
              <GroupItem
                column="montoTotal"
                summaryType="sum"
                valueFormat="currency"
                showInGroupFooter={true}
                displayFormat="Total: {0}" />
              <GroupItem
                column="valorCuota"
                summaryType="sum"
                valueFormat="currency"
                showInGroupFooter={false}
                displayFormat="Tot.Cuota: {0}"
                alignByColumn={true} />
            </Summary>
            <SortByGroupSummaryInfo summaryItem="sum" />
            <Editing allowUpdating={true} useIcons={true} mode="form" />
        </DataGrid>
    </>
  )
}
