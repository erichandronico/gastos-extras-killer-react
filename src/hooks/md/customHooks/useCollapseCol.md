# Documentación del Custom Hook `useCollapseCol`

Este custom Hook de React devuelve tres componentes React: `Titulo`, `FormCol` y `WideCol`. El objetivo principal de este Hook es permitir que un formulario en una columna se pueda expandir y contraer, así como también ajustar el ancho de las columnas.

Para utilizar este Hook, primero debes importarlo a tu archivo de React:

```javascript
import { useCollapseCol } from "./ruta-al-archivo/useCollapseCol";
```

Una vez importado, puedes usar el Hook en tu componente React:

```javascript
const MiComponente = () => {

  const { Titulo, FormCol, WideCol } = useCollapseCol();

  return (
    <div>
      <Titulo title="Título del formulario" />
      <div className="row">
      
        <WideCol>
          // contenido de la columna ancha aquí
        </WideCol>

        <FormCol>
          // contenido del formulario aquí
        </FormCol>

      </div>
    </div>
  );
}
```


### Explicación del Código

El componente `Titulo` es un componente personalizado que toma las siguientes propiedades:

- `title`: El título que se mostrará en el componente de título. Es un parámetro de entrada.

E internamente utiliza:
- `toggleFn`: Una función que cambiará el estado de la variable `colsClassState` que es manejada por el Hook. Esta función se utiliza para expandir y contraer la columna del formulario.
- `btnIcon`: Una cadena que especifica el icono que se mostrará en el botón. Esta propiedad se utiliza para personalizar el botón dentro del componente de título.
- `btnHint`: Una cadena que especifica el texto que se mostrará al pasar el cursor sobre el botón. Esta propiedad se utiliza para personalizar el botón dentro del componente de título.
- `btnClass`: Una cadena que especifica la clase CSS que se utilizará para el botón. Esta propiedad se utiliza para personalizar el botón dentro del componente de título.

El componente `FormCol` es un componente personalizado que toma un hijo, `children`. Este componente utiliza las propiedades del objeto `colsClassState` para establecer las clases CSS y la altura del componente. El componente `FormCol` se utiliza para mostrar un formulario en una columna que se puede expandir y contraer mediante el botón que se encuentra en el componente `Titulo`.

El componente `WideCol` es similar al componente `FormCol` pero se utiliza para mostrar una columna más ancha que se expande y contrae junto con el componente `FormCol`.

El objeto `toggleClasses` define las diferentes propiedades de estilo que se utilizan en los componentes personalizados. Estas propiedades definen las clases CSS que se utilizan para establecer el ancho, la altura, la visibilidad y otros estilos para los componentes `FormCol` y `WideCol`.

El Hook `useCollapseCol` utiliza el Hook `useState` para inicializar y cambiar la variable `colsClassState` que mantiene el estado de los componentes. El Hook también define una función `toggleForm` que cambia el estado de `colsClassState` cuando se llama.

