# Documentación del customHook `useModal`

Este customHook de React se utiliza para mostrar y ocultar un modal en una aplicación.

## Uso

Para utilizar este customHook, primero debes importarlo en tu archivo de componente:

```javascript
import { useModal } from "../hooks/useModal";
```

Luego, dentro de tu componente, puedes utilizar el hook de la siguiente manera:

```javascript
const { Modal, setShowModal, showModal } = useModal();

// Luego, para mostrar el modal, llama a setShowModal(true). 
// Para ocultarlo, llama a setShowModal(false).
```

El hook devuelve un objeto con tres elementos:

- `Modal`: es un componente que toma tres props (`titulo`, `icono` y `children`) y devuelve un componente `FonModal`. Este componente se utiliza para mostrar el modal en la pantalla.
- `setShowModal`: es una función que se utiliza para establecer el estado de `showModal` en `true` o `false`. Esto determina si el modal está visible o no en la pantalla.
- `showModal`: es un estado que indica si el modal está actualmente visible o no.

Para mostrar el modal, puedes utilizar el componente `Modal` de la siguiente manera:

```jsx
{showModal && (
  <Modal
    titulo="Título del modal"
    icono="fas fa-info-circle"
  >
    <p>Contenido del modal</p>
  </Modal>
)}
```

El componente `Modal` toma las siguientes propiedades:

- `titulo` (string, opcional): el título que se mostrará en el modal.
- `icono` (string, opcional): el nombre del icono que se mostrará en el modal (se utiliza la biblioteca de iconos [FontAwesome](https://fontawesome.com/)).
- `children` (JSX, obligatorio): el contenido que se mostrará dentro del modal.

## Ejemplo completo

```jsx
import { useModal } from "../hooks/useModal";

const MyComponent = () => {
  const { Modal, setShowModal, showModal } = useModal();

  return (
    <div>
      <h1>Mi componente</h1>
      <button onClick={() => setShowModal(true)}>Mostrar modal</button>
      {showModal && (
        <Modal
          titulo="Título del modal"
          icono="fas fa-info-circle"
        >
          <p>Contenido del modal</p>
        </Modal>
      )}
    </div>
  );
};
```

¡Copia el código y utilízalo en tu aplicación!
