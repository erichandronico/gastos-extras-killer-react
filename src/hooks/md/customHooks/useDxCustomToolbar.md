# Documentación del Custom Hook `useDXCustomToolbar`

Este hook crea una barra de herramientas personalizada (`CustomToolbar`) para el componente `DataGrid` de DevExtreme.

## Métodos Privados

1. `handleSearchInput(e)`: Esta función interna gestiona la entrada de búsqueda en la barra de herramientas. Recibe un evento como parámetro y obtiene el valor de entrada del evento. Usa un tiempo de espera (`setTimeout`) para realizar la búsqueda en `DataGrid` después de medio segundo (500 milisegundos) desde la última entrada de teclado.

## Componentes que retorna

1. `RefreshButton`: Este componente representa un botón que se utiliza para actualizar los datos de `DataGrid`. Recibe un manejador `onClick` como propiedad.

2. `FullscreenButton`: Este botón permite cambiar la visualización de `DataGrid` a pantalla completa. Recibe las propiedades del state `showModal` y `setShowModal`.

3. `AddRowButton`: Este botón agrega una nueva fila a la `DataGrid`.

4. `ColumnChooser`: Este botón abre el seleccionador de columnas para `DataGrid`.

5. `SearchPanel`: Este componente presenta un cuadro de texto que permite al usuario buscar dentro de la `DataGrid`.

6. `LockButton`: Este botón permite bloquear elementos seleccionados en `DataGrid`. Recibe `selection`y `onClick`.

7. `UnlockButton`: Este botón permite desbloquear elementos seleccionados en `DataGrid`. Recibe `selection`y `onClick`.

8. `CustomToolbar`: Este es el componente principal que representa la barra de herramientas personalizada. Recibe `children`o componente hijo, `title`, `ComponentIcon` (ícono para el titulo formato html <></>), y `showModal` como propiedades.

9. `ToolbarSplitter`: Este componente proporciona un divisor visual en la barra de herramientas para separar diferentes grupos de botones. No recibe ninguna propiedad.

10. `CustomButton`: Este es un botón personalizado que puede contener cualquier elemento hijo. Recibe las propiedades `title`, `disabled`, `onClick`, y `children`, `badgeEnabled`, y `cantidad`. `title` es el texto que se muestra al pasar el cursor sobre el botón, `disabled` determina si el botón está deshabilitado o no, `onClick` es el manejador para el evento de clic del botón, y `children` son los elementos hijos que se mostrarán dentro del botón. La propiedad `cantidad` se usa para mostrar un indicador de conteo en el botón, y `badgeEnabled` determina si este indicador debe mostrarse o no.

11. `ClearSelectionButton`: Este botón permite borrar la selección actual en `DataGrid`. Recibe la propiedad `cantidad` que indica el número de elementos seleccionados.

12. `TextAndSave`: Este componente consta de un cuadro de texto y un botón para guardar el valor ingresado en el cuadro de texto. Recibe las propiedades `title`, `onClick`, y `clearOnSave`. `title` es el título del cuadro de texto, `onClick` es el manejador para el evento de clic del botón guardar, y `clearOnSave` determina si el cuadro de texto se limpia después de guardar.


## Importar el Hook

Debes importar el hook `useDXCustomToolbar` en tu componente. La línea de código para hacerlo sería:

```jsx
import { useDXCustomToolbar } from '[ruta_del_archivo]';
```

Luego, debes extraer los componentes que necesites, enviando una referencia al `DataGrid`

```jsx

    const gridRef = useRef(null);

    const { RefreshButton, FullscreenButton, SearchPanel } = useDXCustomToolbar(gridRef);

    ...

    <DataGrid ref={gridRef} ...

```


## Ejemplo de uso

Se puede usar en combinación con otro Hook como por ejemplo, `useExportGrid`, el cuál ya devuelve una referencia al `DataGrid`

```jsx

    const {ExportExcel, ExportPDF, gridRef}     = useExportGrid()

    const { CustomToolbar, RefreshButton, 
            LockButton, UnlockButton, 
            FullscreenButton, AddRowButton,
            ColumnChooser, SearchPanel,
            CustomButton, ClearSelectionButton} = useDXCustomToolbar(gridRef);
    
    const miManejadorGuardar = ({value}) => console.log(value)

    return (
        <>
            <CustomToolbar 
                title={textTrans.dispositivos} 
                ComponentIcon={<i className="far fa-caex me-1" style={{width: 40 }}></i>} 
                showModal={showModal} 
                >
                <RefreshButton  onClick={ () => queryMeans.refetch() } />
                <ExportExcel    title={ textTrans.dispositivos } />
                <ExportPDF      title={ textTrans.dispositivos } />
                <LockButton     selection={selection} onClick={ () => handleChangeLock({status: 1})} />
                <UnlockButton   selection={selection} onClick={ () => handleChangeLock({status: 2})} />
                <FullscreenButton {...{showModal, setShowModal}} />
                <AddRowButton />
                <ColumnChooser />
                <ToolbarSplitter />
                <CustomButton title="Mi Botón Personalizado" onClick={miManejadorDeClics}>
                    <i className="mi-icono-personalizado"></i>
                </CustomButton>
                <ToolbarSplitter />
                <ClearSelectionButton cantidad={miCantidad} />
                <SearchPanel />
                <TextAndSave title="miTitulo" onClick={miManejadorGuardar} clearOnSave={true} />
            </CustomToolbar>

            <DataGrid
                ref={gridRef} ...
            />
        </>
)
```

En este ejemplo, `CustomToolbar` se utiliza para encapsular los botones y el panel de búsqueda. Se proporciona un `title` y un `ComponentIcon` para el `CustomToolbar`, y se pasan varios botones como hijos. Cada botón tiene su propio manejador de clics y propiedades específicas.

El componente `DataGrid` recibe `gridRef` como referencia para permitir que las funciones de los botones interactúen con la grilla de datos.