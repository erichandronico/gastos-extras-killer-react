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
  const queryCategories       = useCategories()
    const { notifyResultado } = useNotifyRefetch()

  const handleUpdate = useCallback( ({oldData, newData}) => {
    itemCategories.add.mutateAsync({ ...oldData, ...newData  }).then(notifyResultado)
  } ,[])

  const handleRemove = useCallback( ({oldData}) => {
    itemCategories.del.mutateAsync(oldData).then(notifyResultado)
  } ,[])

  const calculaCategoriesFilterExpr = ( filterValues ) => {

    switch (typeof filterValues) {
        
        case 'object':  //Cuando el filtro es un array
            return  ( {categories} ) => {
                if (filterValues.length === 0) return true;
                return ( categories.find( ({_id}) => filterValues.join(',').includes(_id.toString() ) ) !== undefined )

            };

        case 'string':
            return  ( {categories} ) => {
                if (filterValues.length === 0) return true;
                return ( categories.find( ({_id}) => _id.includes(filterValues) ) !== undefined )
                return  ( categories.find( f => f.includes(filterValues) ) !== undefined );
            };
    
        default:
            break;
    }

};

  const handleOnEditorPreparing = useCallback( (e) => {
    if ((e.parentType === "dataRow" || e.parentType === "filterRow") && e.dataField === "categories") {
        e.editorName = "dxTagBox"
        e.editorOptions.dataSource = queryCategories?.data?.categories
        e.editorOptions.showSelectionControls = true;
        e.editorOptions.displayExpr = "name";
        e.editorOptions.valueExpr = "_id";
        e.editorOptions.value = e.value || [];
        e.editorOptions.onValueChanged =  ({value}) => {
            e.setValue(value);
        }
    }

  }, [queryCategories?.data])

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
          onEditorPreparing={handleOnEditorPreparing}
         >
          <HeaderFilter visible={true} />
          <Column dataField="_id" visible={false} allowEditing={false} />
          <Column dataField="instance" visible={false} allowEditing={false} />
          <Column dataField="name" caption="Descripción" allowEditing={false} />
          <Column dataField="codigoReferencia" allowEditing={false} />
          <Column dataField="montoOperacion" allowEditing={false} format="currency" />
          { queryCategories?.data?.categories &&
            <Column
                key="categories"
                dataField="categories"
                caption={trans("Categorías")}
                allowEditing={true}
                width={150}
                calculateDisplayValue       = { ({categories}) => categories?.map( cid => queryCategories?.data?.getCategoryById(cid)?.name ).join(', ') }
                calculateFilterExpression   = { (filterValues) => calculaCategoriesFilterExpr(filterValues) }
                cellRender={(cellData) => {
                    const badges = cellData.value.map(categoryId => {
                        const category = queryCategories?.data?.categories?.find(cat => cat._id === categoryId);
                        return category ? (
                            <span
                                key={categoryId}
                                className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-0 mb-0"
                            >
                                {category.name}
                            </span>
                        ) : null;
                    });

                    return <div>{badges}</div>;
                }}
            />
          }
          <Column dataField="referencia" caption="Referencia Compra" allowEditing={true} />
          <Column dataField="importance" caption="Importancia"  allowEditing={true} >
            <Lookup dataSource={importanceList} />
          </Column>
          <Column dataField="excluded" caption="Excluído" allowEditing={true} dataType="boolean" />
          <Editing allowUpdating={true} allowDeleting={true} useIcons={true} mode="form" />
          
        </DataGrid>
    </MainLayout>
  )
}
