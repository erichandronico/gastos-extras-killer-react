# Documentación del custom hook useExportGrid

Este custom hook llamado `useExportGrid` exporta una serie de funciones y objetos para exportar una grilla de datos en un formato determinado.

## Uso

1. Importar el hook: `import { useExportGrid } from "path/to/custom-hook";`
2. Llamar al hook dentro de un componente de React: `const { gridRef, handleExportToPDF, handleExportToExcel, ExportExcel, ExportPDF } = useExportGrid();`
3. El hook devuelve los siguientes objetos y funciones:

### `gridRef`

Una referencia mutable que apunta al objeto `Grid` generado por DevExtreme.

### `handleExportToPDF(title: string)`

Una función que toma un parámetro `title` que es el nombre del archivo PDF a exportar. Cuando se llama a esta función, se genera un archivo PDF de la grilla de datos y se descarga automáticamente.

### `handleExportToExcel(title: string)`

Una función que toma un parámetro `title` que es el nombre del archivo Excel a exportar. Cuando se llama a esta función, se genera un archivo Excel de la grilla de datos y se descarga automáticamente.

### `ExportExcel`

Un componente de React que renderiza un botón con un ícono de Excel. Al hacer clic en el botón, se llama a la función `handleExportToExcel`.

### `ExportPDF`

Un componente de React que renderiza un botón con un ícono de PDF. Al hacer clic en el botón, se llama a la función `handleExportToPDF`.


## Ejemplo: utilizando el Hook dentro de un Toolbar de DataGrid

```jsx
import DataGrid, { Toolbar, Item } from "devextreme-react/data-grid";
import { useExportGrid } from "./path/to/custom-hook";


const dataSource = [
  { id: 1, name: "John", age: 28 },
  { id: 2, name: "Alice", age: 32 },
  { id: 3, name: "Bob", age: 45 },
  { id: 4, name: "Jane", age: 24 },
  { id: 5, name: "Tom", age: 37 },
];



const App = () => {

  const { ExportExcel, ExportPDF, gridRef } = useExportGrid();

  return (
    <DataGrid 
      dataSource={ dataSource }
      ref={ gridRef } 
      >
      <Toolbar>
        <Item>
          <ExportExcel title="usuarios" />
        </Item>
        <Item>
          <ExportPDF   title="usuarios" />
        </Item>
      </Toolbar>
    </DataGrid>
  );
};

export default App;

```
