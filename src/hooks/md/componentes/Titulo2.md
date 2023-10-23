## Componente ReactJS: Titulo2

El componente `Titulo2` de ReactJS es utilizado en la aplicación FuelOnet para generar títulos con subtítulos en la interfaz de usuario. El título y el subtítulo se reciben como propiedades.

### Propiedades

El componente `Titulo2` recibe las siguientes propiedades:

- `title`: texto que se mostrará como título principal.
- `subtitle`: texto que se mostrará como subtítulo.

### Renderizado

El componente `Titulo2` renderiza un componente que contiene el título y el subtítulo:

```jsx
<div className="ps-2 row animate__animated animate__fadeInLeft">
    <div className="header_2_titulo col-12">
        <div className="tit_txt_2">{ trans(title) }</div>
    </div>
    <div className="header_2_grafico col-12">
        <div className="header_2_txt">{ trans(subtitle) }</div>
    </div>
</div>
```

### Uso

Para utilizar el componente `Titulo2` en una aplicación ReactJS, se debe importar el componente desde el archivo donde se encuentra definido y utilizarlo en el componente donde se desea renderizar el título. Se deben pasar las propiedades `title` y `subtitle` con los textos correspondientes.

```jsx
import { Titulo2 } from './Titulo2';

function MiPagina() {
  return (
    <Titulo2 title="Título" subtitle="Subtítulo" />
  );
}
```
