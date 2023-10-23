
# ToolbarUpdNew
La barra de herramientas ToolbarUpdNew es un componente de React que proporciona una interfaz de usuario para guardar y crear un nuevo elemento. Este componente utiliza tres componentes de devextreme-react para mostrar una lista de elementos, un campo de entrada de texto para el nuevo elemento y botones para guardar y cancelar.

## Propiedades

### `itemsSelectBox`

Un objeto que contiene los elementos para obtener y modificar. El objeto debe tener las siguientes propiedades:

- `dataSource`: la fuente de datos para el `SelectBox`.
- `valueExpr`: la expresión que se utiliza para obtener el valor seleccionado en el `SelectBox`.
- `displayExpr`: la expresión que se utiliza para mostrar los elementos en el `SelectBox`.
- `onSelectionChanged`: la función que se ejecuta cuando se cambia la selección en el `SelectBox`.

### `newNameTextBox`

Un objeto que contiene la información necesaria para mostrar un campo de entrada de texto para el nombre del nuevo elemento. El objeto debe tener las siguientes propiedades:

- `value`: el valor actual del campo de entrada de texto, es el nombre del nuevo item. Por lo general es un state. Ejemplo: name
- `label (opcional)`: etiqueta del campo, ejemplo: Nombre. Se traduce automáticamente.
- `onValueChanged`: la función que se ejecuta cuando cambia el valor del campo de entrada de texto, por lo general es un setState. Ejemplo: setName

### `saveButtonOnClick`

La función que se ejecuta cuando se hace clic en el botón "Guardar".

### `isNew`

Un valor booleano del state que indica si se está creando un nuevo elemento.

### `setIsNew`

State que se ejecuta para actualizar el valor de `isNew`.

### `disableSaveButton`

Un valor booleano del state que indica si el botón "Guardar" está deshabilitado.

### `setDisableSaveButton`

State que se ejecuta para actualizar el valor de `disableSaveButton`.


## Ejemplo de Uso
```jsx
import { useState } from "react";
import { ToolbarUpdNew } from "./components/ToolbarUpdNew";

export const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItemName, setNewItemName] = useState("");
  const [isNewItem, setIsNewItem] = useState(false);
  const [disableSaveButton, setDisableSaveButton] = useState(true);

  const handleSaveButtonClick = () => {
    console.log(`Guardando nuevo elemento "${newItemName}"`);
    setDisableSaveButton(true);
    setIsNewItem(false);
    setNewItemName("");
  };

  const handleNewItemNameChange = (e) => {
    setNewItemName(e.value);
    setDisableSaveButton(e.value.trim() === "" || selectedItem === null);
  };

  const handleItemSelectionChange = (e) => {
    setSelectedItem(e.selectedItem);
    setDisableSaveButton(newItemName.trim() === "" || e.selectedItem === null);
  };

  const itemsSelectBox = {
    dataSource: [
      { id: 1, name: "Elemento 1" },
      { id: 2, name: "Elemento 2" },
      { id: 3, name: "Elemento 3" },
    ],
    valueExpr: "id",
    displayExpr: "name",
    onSelectionChanged: handleItemSelectionChange,
  };

  const newNameTextBox = {
    value: newItemName,
    label: "Nombre del nuevo elemento",
    onValueChanged: handleNewItemNameChange,
  };

  return (
    <div className="App">
      <ToolbarUpdNew
        itemsSelectBox={itemsSelectBox}
        newNameTextBox={newNameTextBox}
        saveButtonOnClick={handleSaveButtonClick}
        isNew={isNewItem}
        setIsNew={setIsNewItem}
        disableSaveButton={disableSaveButton}
        setDisableSaveButton={setDisableSaveButton}
      />
    </div>
  );
};
   
```

### Recomendación: memorizar las funciones. Ejemplo
```jsx
const itemsSelectBox = useMemo( () => (
    {
        dataSource:           queryRoleList.data,
        valueExpr:            "_id",
        displayExpr:          "name",
        onSelectionChanged:   ({ selectedItem }) => setSelectedRole(selectedItem),
    }), [queryRoleList.data] );

const newNameTextBox = useMemo( () => (
    {
        value:            roleName,
        label:            "Nombre del Rol",
        onValueChanged:   ({ value }) => setRoleName(value),
    }), [roleName] );

const saveButtonOnClick = useCallback(() => { console.log('Guardando') }, []);
```