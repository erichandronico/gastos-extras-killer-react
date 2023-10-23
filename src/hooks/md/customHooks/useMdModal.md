# useMdModal Custom Hook

El custom hook `useMdModal` proporciona funciones y componentes relacionados con la apertura de un modal para mostrar contenido Markdown.

### Uso

```jsx
import { useMdModal } from 'ruta/al/customHook';

const MyComponent = () => {
  const { LaunchButton, MdModal } = useMdModal();

  // Resto de tu código...
};
```

```jsx
const MyComponent = () => {
  const { LaunchButton, MdModal } = useMdModal();

  return (
    <div>
      <LaunchButton title="Título del botón" align="end" />
      <MdModal title="Título del modal" file={archivoMarkdown} icon="fas fa-info" />
    </div>
  );
};
```

### Componentes y funciones disponibles

- `LaunchButton`: Un componente que muestra un botón para abrir el modal. Recibe las siguientes propiedades:
  - `title` (string, obligatorio): El título del botón.
  - `align` (string, opcional): La alineación del botón (por defecto: `'end'`). Puede ser `'start'`, `'center'` o `'end'`.

- `MdModal`: Un componente que muestra un modal con contenido Markdown. Recibe las siguientes propiedades:
  - `title` (string, obligatorio): El título del modal.
  - `file` (string, obligatorio): La ruta al archivo Markdown a mostrar.
  - `icon` (string, opcional): El nombre del icono a mostrar en el encabezado del modal (por defecto: `'fas fa-info'`).

### Ejemplo de uso

```jsx
import { useMdModal } from 'ruta/al/customHook';

const MyComponent = () => {
  const { LaunchButton, MdModal } = useMdModal();

  return (
    <div>
      <LaunchButton title="Ayuda" align="end" />
      <MdModal title="Información" file="/ruta/al/archivo.md" icon="fas fa-info" />
    </div>
  );
};
```
