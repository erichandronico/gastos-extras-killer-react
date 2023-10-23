## `useToolbarUpdNew` Hook

Este hook proporciona una serie de componentes y funcionalidades relacionadas con un conjunto de operaciones comunes para manipular datos, específicamente agregar nuevos registros y actualizar registros existentes en una interfaz que utiliza una barra de herramientas.

### **Salida del Hook**

El hook devuelve un objeto con los siguientes elementos:

1. `Selector`: Un componente selector que utiliza el `SelectBox` de DevExtreme.
2. `selectedItem`: El elemento seleccionado en el `Selector`.
3. `AddButton`: Un botón para habilitar la creación de un nuevo elemento.
4. `NewItemInput`: Una entrada de texto para ingresar el nombre del nuevo elemento.
5. `SaveButton`: Un botón para guardar cambios.
6. `SaveButtons`: Conjunto de botones que incluyen el botón para guardar y el botón para cancelar.
7. `setDisableSaveButton`: Una función para actualizar el estado `disableSaveButton`.
8. `CancelButton`: Un botón para cancelar la operación.
9. `Separator`: Un componente que actúa como separador.
10. `isNew`: Un estado booleano para la creación de nuevos elementos.
11. `newItemName`: Un estado para el nombre del nuevo elemento.

### **Uso**

1. **Importar el hook**:

```jsx
import { useToolbarUpdNew } from "ruta/del/hook/useToolbarUpdNew";
```

2. **Utilizar el hook**:

```jsx
const { 
Selector, 
selectedItem, 
AddButton, 
NewItemInput, 
SaveButton, 
SaveButtons, 
CancelButton, 
Separator, 
isNew, 
newItemName 
} = useToolbarUpdNew();
```

3. **Integrar los componentes en tu renderizado**:

## Componentes y funcionalidades:

`Selector`:
- `Props`: dataSource, valueExpr, displayExpr, width (por defecto 220).

`AddButton`: Inicia la creación de un nuevo elemento.

`NewItemInput`:
- `Props`: label (Etiqueta para el campo de entrada).

`SaveButton` y `SaveButtons`:
- `Props`: `updateFn` y `newFn`.

`CancelButton`: Cancela la operación en curso.

`Separator`: Componente de separación.



## Ejemplo de Uso del Hook `useToolbarUpdNew`

A continuación, se presenta un ejemplo sencillo de cómo usar el hook `useToolbarUpdNew` en un componente React.

### **1. Importación y Uso del Hook**:

```jsx
import { useToolbarUpdNew } from "ruta/del/hook/useToolbarUpdNew";

const MyComponent = () => {
    const { 
      Selector, 
      selectedItem, 
      AddButton, 
      NewItemInput, 
      SaveButton, 
      SaveButtons, 
      CancelButton, 
      Separator, 
      isNew, 
      newItemName 
    } = useToolbarUpdNew();

    const updateFn = () => {
        // Lógica para actualizar el item seleccionado
    };

    const newFn = () => {
        // Lógica para agregar un nuevo item con el valor de 'newItemName'
    };

    return (
        <div className="toolbar-container">
            <Selector 
                dataSource={[/* Lista de datos */]} 
                valueExpr="id" 
                displayExpr="name" 
            />
            <Separator />
            <AddButton />
            <NewItemInput label="Nuevo Item" />
            <SaveButtons updateFn={updateFn} newFn={newFn} /> 
            //SaveButtons incluye save y cancel button
        </div>
    );
};

export default MyComponent;
