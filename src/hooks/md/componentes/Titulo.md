## Componente ReactJS: Titulo

El componente `Titulo` de ReactJS es utilizado en la aplicación FuelOnet para generar títulos en la interfaz de usuario. El título puede contener una imagen de botón con un tooltip, un título principal y un subtítulo. El título principal puede dividirse en dos líneas, para lo cual se debe enviar el texto separado por un espacio en la propiedad `title`. El componente también puede recibir componentes adicionales que se renderizarán en la parte derecha del título.

### Propiedades

El componente `Titulo` recibe las siguientes propiedades opcionales:

- `title`: texto que se mostrará como título principal. Puede contener dos líneas separadas por un espacio. Por defecto es `' '`.
- `componentes`: array de componentes que se renderizarán en la parte derecha del título. Por defecto es `[]`.
- `flaco`: booleano que indica si el título tendrá un estilo "flaco" (tamaño reducido). Por defecto es `false`.
- `toggleFn`: función que se ejecutará al hacer clic en el botón de la izquierda del título. Por defecto es una función vacía.
- `btnIcon`: icono que se mostrará en el botón de la izquierda del título. Por defecto es `undefined`.
- `btnHint`: texto que se mostrará como tooltip al pasar el ratón sobre el botón de la izquierda del título. Por defecto es `undefined`.
- `btnClass`: clase CSS que se aplicará al botón de la izquierda del título. Por defecto es `'button'`.

### Renderizado

El componente `Titulo` renderiza un componente que contiene el título y los componentes adicionales:

```jsx
<div className="row">
    <div className={ `header_2_titulo_flex ${ flaco && 'small' } ` }>
        <div className="col-8">
            {
                !flaco &&
                <div className="tit_txt_1 ms-1 me-3 animate__animated animate__fadeInLeft">
                    {
                        (btnIcon) 
                            ? 
                                <div style={{marginTop: 3, marginLeft: -7}} >
                                    <button onClick={toggleFn} hint={btnHint} id="boton-sandwich" className={`button ${btnClass}`} >
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </button>
                                </div>
                            : 
                                <i className="fas fa-angle-right"></i>
                    }
                </div>
            }
            <div className={`tit_txt_1 animate__animated animate__fadeInDown  ${ flaco && 'small-text'}`}  >{ tituloP1 }</div>
            <div className={`tit_txt_2 animate__animated animate__fadeInRight ${ flaco && 'small-text'}`}  >{ tituloP2 }</div>
        </div>
        <div className="filtros-reverse col-4">
            { 
                componentes.map( c => (
                    {...c}
                ))
            }
        </div>
    </div>
</div>
```

### Uso

Para utilizar el componente `Titulo` en una aplicación ReactJS, se debe importar el componente desde el archivo donde se encuentra definido y utilizarlo en el componente donde se desea renderizar el título. Se pueden pasar las propiedades opcionales si se desea modificar el contenido o el estilo del título.

```jsx
import { Titulo } from './Titulo';

function MiPagina() {
  return (
    <Titulo
        title="Título"
        componentes={[
            <Button key="1" text="Botón 1" />,
            <Button key="2" text="Botón 2" />,
        ]}
        flaco={true}
        toggleFn={() => console.log('Se hizo clic en el botón de la izquierda')}
        btnIcon="icono-del-botón"
        btnHint="Tooltip del botón de la izquierda"
        btnClass="mi-clase-css-del-botón-de-la-izquierda"
    />
    );
}
```


```jsx
import { Titulo } from './Titulo';

function MiPagina() {
  return (
    <Titulo
        title="Título"
        componentes={[
            <Button key="1" text="Botón 1" />,
            <Button key="2" text="Botón 2" />,
        ]}
    />
  );
}
