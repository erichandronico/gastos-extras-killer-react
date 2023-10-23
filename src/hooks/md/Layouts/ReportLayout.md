## Componente ReactJS: ReportLayout

El componente `ReportLayout` de ReactJS es utilizado en la aplicación FuelOnet para definir el layout de los reportes, como por ejemplo, el reporte de abastecimientos.

### Propiedades

El componente `ReportLayout` recibe una única propiedad:

- `children`: componente hijo que se renderizará dentro del contenedor del layout.

### Renderizado

El componente `ReportLayout` renderiza un único componente:

```jsx
<div className="row fondo_blanco borde redondeado_m  mt-2 mb-4 p-3">
    <div  className="col-12 ">
        { children }
    </div>
</div>
````

### Uso
Para utilizar el componente `ReportLayout` en una aplicación ReactJS, se debe importar el componente desde el archivo donde se encuentra definido y utilizarlo en el componente donde se desea renderizar el reporte.

```jsx
import { ReportLayout } from './ReportLayout';

function AbastecimientosReporte() {
  return (
    <ReportLayout>
      {/* Componente que se renderizará dentro del contenedor */}
    </ReportLayout>
  );
}
```