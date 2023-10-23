# `useVisibleButton` Hook

Este hook proporciona funcionalidad para mostrar y ocultar contenido con un botón.

## Props de `VisibleButton`

- `text`: Clave de cadena que se traduce para el texto del botón.
- `children`: Contenido a mostrar u ocultar con el botón.

## Salida del Hook

El hook devuelve un objeto con los siguientes elementos:

- `VisibleButton`: Un componente que encapsula tanto el botón de visualización como el contenido que se quiere mostrar u ocultar.

- `isVisible`: Una variable de estado que indica si el contenido asociado está actualmente visible o no. Puede ser útil en escenarios en los que quieras tomar decisiones basadas en la visibilidad del contenido en otros lugares de tu componente.


## Uso

```jsx
import { useVisibleButton } from "ruta/del/hook/useVisibleButton";

const MiComponente = () => {
    const { VisibleButton, isVisible } = useVisibleButton();

    return (
        <>
            <VisibleButton text="mostrarOcultar">
                <div>
                    Contenido a mostrar u ocultar
                </div>
            </VisibleButton>
            
            {isVisible && <div>El contenido está visible.</div>}
        </>
    );
}
```

