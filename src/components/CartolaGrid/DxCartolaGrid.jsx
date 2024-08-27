import { DataGrid } from "devextreme-react";
import { Column, Editing, FilterPanel, GroupItem, GroupPanel, Lookup, SortByGroupSummaryInfo, Summary } from "devextreme-react/data-grid";
import { trans } from "../../helpers/utils";
import { useDXCustomToolbar } from "../../hooks/jsx/useDXCustomToolbar";
import { useCategories } from "../../hooks/queries/useCategories";
import { useItemCategories } from "../../hooks/queries/useItemCategory";
import { useCallback, useRef } from "react";
import { useCartola } from "../../hooks/queries/useCartola";
import { useNotifyRefetch } from "../../hooks/useNotifyRefetch";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import { GiSave } from 'react-icons/Gi';

const importanceList = ['básico', 'necesario', 'lo quería', 'no era necesario'];
const invisibles = ['lugarOperacion', 'montoTotal'];

export const DxCartolaGrid = ({ cartola, hystorySelector = false }) => {

    const gridRef = useRef(null);
    const { CustomToolbar, RefreshButton, SearchPanel, ColumnChooser, EnlargeButton, height, CustomButton } = useDXCustomToolbar(gridRef);
    const queryCategories = useCategories();
    const itemCategories = useItemCategories();
    const cartolaQuery = useCartola('default');
    const { notifyResultado } = useNotifyRefetch();
    

    const handleSave = useCallback(() => {
        const { dataSource } = gridRef?.current?.props ?? [];
        const rest = { bank: 'itau', instance: 'default' };
        cartolaQuery.add.mutateAsync({ ...rest, date: cartola?.data?.fecha, cartola: dataSource }).then(notifyResultado);
    }, [gridRef?.current?.props?.dataSource, cartolaQuery?.data, cartola, itemCategories?.data]);

    const refreshCartola = useCallback(() => itemCategories.refetch().then(() => {
        cartola.refetch();
        cartolaQuery.refetch();
    }), [itemCategories, cartola, cartolaQuery]);


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
        <>
            <CustomToolbar title={`Cartola ${cartola?.data?.fecha ?? ''}`} ComponentIcon={<BsFileEarmarkSpreadsheet className="mt-1 ms-3 me-3" />}>
                <RefreshButton onClick={refreshCartola} />
                <EnlargeButton />
                <ColumnChooser />
                <SearchPanel />
                <CustomButton onClick={handleSave} cantidad={cartola?.data?.dataSource?.length}>
                    <GiSave size={20} />
                </CustomButton>
            </CustomToolbar>
            <DataGrid
                ref={gridRef}
                className="grid1"
                dataSource={cartola?.data?.dataSource}
                columnAutoWidth={true}
                height={height}
                onRowUpdating={itemCategories.handleUpdate}
                paging={{ visible: true, pageSize: 50 }}
                pager={{ showPageSizeSelector: true, allowedPageSizes: [50, 100, 200], showInfo: true }}
                headerFilter={{ visible: true }}
                onEditorPreparing={handleOnEditorPreparing}
            >
                <GroupPanel visible={true} />
                <FilterPanel visible={true} />
                {
                    cartola?.data?.columns?.map(c => (
                        <Column dataField={c} key={c} name={c} allowEditing={false} visible={!invisibles.includes(c)} />
                    ))
                }
                {cartola?.data?.dataSource?.length > 0 && <Column dataField="referencia" allowEditing={true} />}
                {cartola?.data?.dataSource?.length > 0 &&
                    <Column dataField="importance" caption="Importancia" allowEditing={true}>
                        <Lookup dataSource={importanceList} />
                    </Column>
                }
                {cartola?.data?.dataSource?.length > 0 && queryCategories?.data?.categories &&
                    <Column
                        key="categories"
                        dataField="categories"
                        caption={trans("Categorías")}
                        allowEditing={true}
                        width={150}
                        calculateDisplayValue       = { ({categories}) => categories?.map( cid => queryCategories?.data?.getCategoryById(cid)?.name ).join(', ') }
                        calculateFilterExpression   = { (filterValues) => calculaCategoriesFilterExpr(filterValues) }
                        cellRender={(cellData) => {
                            const badges = cellData?.value?.map(categoryId => {
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
    );
};
