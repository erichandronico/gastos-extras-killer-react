import { useCallback, useRef, useState } from "react"
import { BsFileEarmarkSpreadsheet } from "react-icons/bs"
import { Column, Editing, FilterPanel, GroupItem, GroupPanel, Lookup, SortByGroupSummaryInfo, Summary } from "devextreme-react/data-grid"
import { DataGrid, SelectBox } from "devextreme-react"
import { useDXCustomToolbar } from "../../hooks/jsx/useDXCustomToolbar"
import { useCategories } from "../../hooks/queries/useCategories"
import { useItemCategories } from "../../hooks/queries/useItemCategory"
import { useCartola, useCartolas } from "../../hooks/queries/useCartola"
import { useNotifyRefetch } from "../../hooks/useNotifyRefetch"
import Swal from "sweetalert2"
import { GiSave } from 'react-icons/Gi'

export const CartolaHistoricaGrid = () => {

    const gridRef = useRef(null)
    const {CustomToolbar, RefreshButton, SearchPanel, ColumnChooser, EnlargeButton, height, CustomButton } = useDXCustomToolbar(gridRef)
    
    const [cartolaFilters, setCartolaFilters] = useState({})
  
    const categories                    = useCategories()
    const itemCategories                = useItemCategories()
    const cartolaQuery                  = useCartola('default', cartolaFilters?.bank, cartolaFilters?.date)
    const cartolas                      = useCartolas()
    const { notifyResultado }           = useNotifyRefetch()

    const handleSave = useCallback( () => {
      const { dataSource } = gridRef?.current?.props ?? []
      const rest = { bank: 'itau', instance: 'default' }
      cartolaQuery.add.mutateAsync({...rest, date: cartolaQuery?.data?.fecha, cartola: dataSource }).then(notifyResultado)
    }, [gridRef?.current?.props?.dataSource])
  
  
    const refreshCartola = useCallback( () => 
      itemCategories.refetch().then( cartolaQuery.refetch() )
    , [])
  
  
    const handleSelectCartola = useCallback( ({selectedItem}) => {
      setCartolaFilters(selectedItem)
    } ,[])
    
  
  
const handleUpdate = useCallback(async ({ oldData, newData }) => {
      const { descripcion } = oldData;
      const { categories } = newData; // Adaptado para manejar un arreglo de categorías
  
      const result = await Swal.fire({
        title: 'Confirmación',
        text: '¿Deseas guardar el cambio para todos los registros?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      });
  
      if (result.isConfirmed) {
        itemCategories.add.mutateAsync({ instance: 'default', name: descripcion, categories }).then(notifyResultado);
      } else {
        Swal.fire('Cancelado', 'Los cambios no se guardaron para todos los registros.', 'info');
      }
    }, []);



  return (
    <>
        <CustomToolbar title={`Cartola ${cartolaFilters.date ?? ''}`} ComponentIcon={<BsFileEarmarkSpreadsheet className="mt-1 ms-3 me-3" /> }>
            <RefreshButton onClick={ refreshCartola } />
            <SelectBox dataSource={cartolas?.data?.cartolas} valueExpr={"id"} displayExpr={"id"} className="mt-1 text-xs" onSelectionChanged={handleSelectCartola} value={ cartolaFilters?.id } />
            <EnlargeButton />
            <ColumnChooser />
            <SearchPanel />
            <CustomButton onClick={ handleSave } cantidad={cartolaQuery?.data?.dataSource?.length} >
                <GiSave size={20} />
            </CustomButton>
        </CustomToolbar>
        <DataGrid
            ref={gridRef}
            className="grid1"
            dataSource={  cartolaQuery?.data?.dataSource }
            columnAutoWidth={true}
            height={height}
            onRowUpdating={ handleUpdate }
            pager={{ showPageSizeSelector: true, allowedPageSizes: [50, 100, 200], showInfo: true }}
            >
            <GroupPanel visible={true}  />  
            <FilterPanel visible={true} />
            {
                cartolaQuery?.data?.columns?.map( c => <Column dataField={c} key={c} name={c} allowEditing={false} /> )
            }
            {(cartolaQuery?.data?.dataSource?.length > 0) &&
              <Column key="categories" dataField="categories" caption="Categorías" allowEditing={true} width={150}
                cellRender={(cellData) => {
                  const categoryNames = cellData.value.map(categoryId => {
                    const category = categories?.data?.categories?.find(cat => cat._id === categoryId);
                    return category ? category.name : '';
                  }).join(', ');
              
                  return <span>{categoryNames}</span>;
                }}
                >
                <Lookup dataSource={categories?.data?.categories} valueExpr="_id" displayExpr="name" />
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

            <Editing allowUpdating={true} useIcons={true} mode="cell" />
        </DataGrid>
    </>
  )
}
