# Documentación del componente `ImportGrid`

Este componente de React se utiliza para mostrar datos importados en una tabla. Utiliza la librería `devextreme-react` para renderizar la tabla.

## Props

El componente acepta las siguientes props:

- `importedData` (object, obligatorio): un objeto con los datos importados. Debe contener la propiedad `dataSource`, que es un array con los datos a mostrar en la tabla.
- `title` (string, obligatorio): el título de la tabla.
- `handleUpdating` (función, opcional): una función que se llama cuando se actualiza una fila de la tabla.
- `showModal` (boolean, obligatorio): un booleano que indica si se está mostrando un modal en la pantalla.
- `setShowModal` (función, obligatorio): una función que se utiliza para establecer el estado de `showModal`.

## Uso

Para utilizar este componente, primero debes importarlo en tu archivo de componente:

```javascript
import { ImportGrid } from "../components/ImportGrid";
```

Luego, dentro de tu componente, puedes utilizar el componente de la siguiente manera:

```jsx
<ImportGrid
  importedData={importedData}
  title="Título de la tabla"
  handleUpdating={handleUpdating}
  showModal={showModal}
  setShowModal={setShowModal}
/>
```

El componente muestra una tabla con los datos importados. El título de la tabla se muestra en la parte superior izquierda. Los botones para agregar una fila, mostrar el panel de búsqueda y mostrar el selector de columnas se encuentran en la parte superior derecha de la tabla.

El componente acepta un prop `handleUpdating` opcional que se llama cuando se actualiza una fila de la tabla. También acepta un prop `showModal` obligatorio que indica si se está mostrando un modal en la pantalla. Este prop se utiliza para mostrar un botón para abrir el modal en la parte superior derecha de la tabla.

## Ejemplo completo

```jsx
import { ImportGrid } from "../components/ImportGrid";

const MyComponent = () => {
  const importedData = { dataSource: [{ id: 1, name: "John Doe" }, { id: 2, name: "Jane Doe" }] };
  const [showModal, setShowModal] = useState(false);
  const handleUpdating = () => console.log("Row updating");

  return (
    <div>
      <h1>Mi componente</h1>
      <ImportGrid
        importedData={importedData}
        title="Tabla de importación"
        handleUpdating={handleUpdating}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};
```

En este ejemplo, se utiliza el componente `ImportGrid` para mostrar una tabla con datos importados. El título de la tabla es "Tabla de importación". Cuando se actualiza una fila de la tabla, se llama a la función `handle
