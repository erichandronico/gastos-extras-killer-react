import _ from "lodash";
import { Button, SelectBox, TextBox } from "devextreme-react";
import StringUtility, { trans } from "../../helpers/utils";
import { useEffect, useState } from "react";


export const useToolbarUpdNew = () => {

    const [isNew, setIsNew]                             = useState(false);
    const [selectedItem, setSelectedItem]               = useState(undefined);
    const [newItemName, setNewItemName]                 = useState(undefined);
    const [disableSaveButton, setDisableSaveButton]     = useState(true);

    const onValueChanged    =  ({ selectedItem }) => setSelectedItem(selectedItem)
    const onNewItemName         =  ({ value }) => setNewItemName(value)

    useEffect(() => {
        if (isNew) setDisableSaveButton(!newItemName);
      }, [isNew, newItemName]);

    const Selector = ({dataSource, valueExpr, displayExpr, width=220}) => (
        <SelectBox  
            className='devextreme-filters' 
            dataSource={dataSource} 
            valueExpr={valueExpr} 
            displayExpr={displayExpr} 
            width={width} 
            label={ trans( StringUtility.toTitleCase(displayExpr) ) } 
            onSelectionChanged={ onValueChanged } 
            disabled={isNew} 
            value={ _.get( selectedItem, valueExpr) }
        />)
    
    const onSaveClick = ({updateFn, newFn}) => {
         return (isNew) ? newFn() : updateFn()
    }

    const AddButton     = () =>  <Button className='devextreme-filters' icon="add" hint={trans('Nuevo')} onClick={ () => setIsNew(true) } disabled={isNew}/>
    const NewItemInput  = ({label}) => <TextBox className='devextreme-filters' value={newItemName}  label={ trans(label) } name={label} onValueChanged={ onNewItemName } visible={isNew} disabled={!isNew} /> 

    const SaveButton    = ({updateFn, newFn}) => <Button className='devextreme-filters' hint={trans("Guardar")} icon="save" disabled={disableSaveButton} onClick={ () => onSaveClick({updateFn, newFn}) } />
    const SaveButtons    = ({updateFn, newFn}) => (
      <>
        <Button className='devextreme-filters' hint={trans("Guardar")} icon="save" disabled={disableSaveButton} onClick={ () => onSaveClick({updateFn, newFn}) } />
        <Button className='devextreme-filters' icon="close" hint={trans('Cancelar')} onClick={ () => { setDisableSaveButton(true); setIsNew(false) } } disabled={disableSaveButton} visible={isNew} />
      </>
    );
    const CancelButton  = () => <Button className='devextreme-filters' icon="close" hint={trans('Cancelar')} onClick={ () => { setDisableSaveButton(true); setIsNew(false) } } disabled={disableSaveButton} visible={isNew} />
    const Separator     = () => <div className='toolbar-separator-bajo'></div>    

  return { Selector, selectedItem, AddButton, NewItemInput, SaveButton, SaveButtons, setDisableSaveButton, CancelButton, Separator, isNew, newItemName }
}
