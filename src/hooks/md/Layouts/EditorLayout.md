## Componente ReactJS: EditorLayout

El componente `EditorLayout` de ReactJS es utilizado en la aplicación FuelOnet para definir el layout de los cuadros de edición, como por ejemplo, el editor de dispositivos. Este layout consiste en un contenedor típico de un DataGrid.

### Propiedades

El componente `EditorLayout` recibe tres propiedades opcionales:

- `children`: componente hijo que se renderizará dentro del contenedor del layout.
- `blanco`: booleano que indica si el fondo del contenedor será blanco. Por defecto es `true`.
- `border`: booleano que indica si el contenedor tendrá un borde. Por defecto es `true`.

### Renderizado

El componente `EditorLayout` renderiza un único componente:

```jsx
<div className={`row ${ blanco && 'fondo_blanco' } ${ border && 'borde'} redondeado_m  mt-2 mb-2 p-3`}>
    <div  className="col-12 p-4">
        { children }
    </div>
</div>
```

### Uso

Para utilizar el componente `EditorLayout` en una aplicación ReactJS, se debe importar el componente desde el archivo donde se encuentra definido y utilizarlo en el componente donde se desea renderizar el cuadro de edición. Se pueden pasar las propiedades opcionales si se desea cambiar el fondo o el borde del contenedor, o se pueden utilizar los valores por defecto.

```jsx
import { EditorLayout } from './EditorLayout';

function DispositivosEditor() {
  return (
    <EditorLayout blanco={false}>
      {/* Componente que se renderizará dentro del contenedor */}
    </EditorLayout>
  );
}
```

```jsx
import { EditorLayout } from './EditorLayout';

function DispositivosEditor() {
  return (
    <EditorLayout>
      {/* Componente que se renderizará dentro del contenedor */}
    </EditorLayout>
  );
}
```