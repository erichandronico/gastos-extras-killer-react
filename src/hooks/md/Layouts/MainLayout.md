## Componente ReactJS: MainLayout

El componente `MainLayout` de ReactJS es utilizado en la aplicación FuelOnet para definir el layout general de la misma. Este layout consiste en una barra lateral de navegación y un área principal de contenido.

### Importaciones

El componente hace uso de dos importaciones:

```jsx
import { FonHead } from "./HeadServer/FonHead"
import { SideBar } from "./SideBar/SideBar"
```

### Propiedades

El componente `MainLayout` recibe una única propiedad:

- `children`: componente hijo que se renderizará dentro del área principal de contenido del layout.

### Renderizado

El componente `MainLayout` renderiza dos componentes:

```jsx
<SideBar />
<div className="contenido">
    <FonHead />
    <div className="container-fluid ps-4 mt-3 ms-3 pe-5">
        {children}
    </div>
</div>
```

### Uso

Para utilizar el componente `MainLayout` en una aplicación ReactJS, se debe importar el componente desde el archivo donde se encuentra definido y utilizarlo en el componente principal de la aplicación. Se debe pasar como propiedad el componente que se desea renderizar dentro del área de contenido del layout.

```jsx
import { MainLayout } from './MainLayout';

function App() {
  return (
    <MainLayout>
      {/* Componente que se renderizará dentro del área de contenido */}
    </MainLayout>
  );
}
```