import { useCallback, useRef, useState } from "react"
import MainLayout from "../../Layouts/MainLayout"
import { Titulo } from "../Paneles/Titulo"
import { trans } from "../../helpers/utils"
import {FaHistory} from 'react-icons/fa'
import { DataGrid, SelectBox } from "devextreme-react"
import { useDXCustomToolbar } from "../../hooks/jsx/useDXCustomToolbar"
import { BsFileEarmarkSpreadsheet } from "react-icons/bs"
import { Column, Editing, FilterPanel, GroupItem, GroupPanel, Lookup, SortByGroupSummaryInfo, Summary } from "devextreme-react/data-grid"
import { useCategories } from "../../hooks/queries/useCategories"
import { GiSave } from 'react-icons/Gi'
import { useItemCategories } from "../../hooks/queries/useItemCategory"
import { useCartola, useCartolas } from "../../hooks/queries/useCartola"
import { useNotifyRefetch } from "../../hooks/useNotifyRefetch"
import Swal from "sweetalert2"
import CartolaHistoricaChart from "./CartolaHistoricaChart"
import { TremorTab } from "../../Layouts/TremorTab"
import { TabPanel } from "@tremor/react"


export const CartolaHistorica = () => {
  // const file = useFileContent()
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
  


  const handleUpdate = useCallback( async ({oldData, newData}) => {
    const { descripcion } = oldData;
    const { category }    = newData;

    // Mostrar un cuadro de diálogo de confirmación
    const result = await Swal.fire({
      title: 'Confirmación',
      text: '¿Deseas guardar el cambio para todos los registros?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    });


    // Verificar la respuesta del usuario
    if (result.isConfirmed) {
      // Si el usuario confirma, realizar la actualización en todos los registros
      itemCategories.add.mutateAsync({ instance: 'default', name: descripcion, category }).then(notifyResultado);
    } else {
      // Si el usuario cancela, no hacer nada o mostrar un mensaje de cancelación
      Swal.fire('Cancelado', 'Los cambios no se guardaron para todos los registros.', 'info');
    }

    // itemCategories.add.mutateAsync( { instance: 'default', name: descripcion, category }).then(notifyResultado)
  }, [])



  return (
    <MainLayout>
      <Titulo texto={ trans('Cartola Histórica') } Icono={<FaHistory /> } />

      <TremorTab tabList={['Cartola','Categoría vs Fecha']}>

        <TabPanel>

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
            { (cartolaQuery?.data?.dataSource?.length > 0) &&
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

            <Editing allowUpdating={true} useIcons={true} mode="cell" />
          </DataGrid>


        </TabPanel>
        <TabPanel>
          <CartolaHistoricaChart />
        </TabPanel>
      </TremorTab>

    </MainLayout>
  )
}
