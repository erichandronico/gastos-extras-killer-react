import { Button, DataGrid } from "devextreme-react"
import { Editing, Item, Toolbar } from "devextreme-react/data-grid"
import { TbTableImport } from "react-icons/tb"
import { trans } from "../../helpers/utils"
import { DxLoadPanel } from "../../components/Graficos/dx/DxLoadPanel"
import { ReportLayout } from "../../components/Layouts/ReportLayout"



export const useImportGrid = () => {

    const ImportGrid = ( {importedData, title, handleUpdating, showModal, setShowModal} ) => (
        <ReportLayout>
            <DataGrid 
                className='grid1 mt-4' 
                id="imported"
                height={700}
                dataSource={ importedData?.dataSource ?? [] } 
                showColumnLines={false}
                showRowLines={true}
                searchPanel={{ visible: true }}
                columnChooser={{enabled: true }}
                onRowUpdating={ handleUpdating }
                >
                <Editing allowUpdating={true} allowAdding={true} mode="popup" useIcons={true} labelMode='floating' colCount={3} popup={{ title: trans(title), showTitle: true, width: 750 }} form={{ labelMode: 'floating', colCount: 3 }} />
                <Toolbar>
                    { !showModal &&
                    <Item location="before">
                        <h4 className='ps-0' style={ { 'fontFamily': 'titillium_weblight' } }>
                            <TbTableImport style={{width: 40, marginTop: '-5px' }} />{ trans(title) }
                        </h4>
                    </Item>
                    }          
                    <Item name="addRowButton" />
                    { !showModal &&
                    <Item location="after">
                        <Button hint={ trans('Pantalla Completa') } type="normal" stylingMode="outlined"  icon="fas fa-expand" onClick={ () => setShowModal(true) } />
                    </Item>
                    } 
                    <Item name="columnChooserButton" />
                    <Item name="searchPanel" />
                </Toolbar>
            </DataGrid>
            { importedData?.loading && <DxLoadPanel componente='#imported' fondo='gris' opacidad={0.5} /> }
        </ReportLayout> 
    )


     return {ImportGrid}             
}