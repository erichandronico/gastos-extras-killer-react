## Componente ReactJS: FonModal

El componente `FonModal` de ReactJS es utilizado en la aplicación FuelOnet para generar modales en la interfaz de usuario. El modal puede contener un título, un icono, un contenido y se puede personalizar su tamaño. El componente utiliza `react-bootstrap` para generar el modal.

### Propiedades

El componente `FonModal` recibe las siguientes propiedades:

- `showModal`: booleano que indica si el modal debe mostrarse.
- `setShowModal`: función que se ejecutará al hacer clic en el botón de cerrar el modal.
- `titulo`: texto que se mostrará como título del modal.
- `icono`: icono que se mostrará junto al título del modal.
- `contenido`: contenido que se mostrará dentro del cuerpo del modal.
- `fullscreen`: booleano que indica si el modal se mostrará en modo de pantalla completa. Por defecto es `true`.
- `customSize`: booleano que indica si se usará un tamaño personalizado para el modal. Por defecto es `false`.

### Renderizado

El componente `FonModal` renderiza un componente que contiene el modal:

```jsx
<Modal 
    show={showModal} 
    className={`ps-5 pt-3 pe-3`}
    fullscreen={fullscreen}  
    size={ (!fullscreen) && "lg"} 
    dialogClassName={ customSize && 'modal-pro' }
    onHide={() => setShowModal(false)}
    centered
>
    <Modal.Header closeButton className='me-3' >
        <Modal.Title className="ps-3 pt-2">
            <h3 style={ { 'fontFamily': 'titillium_weblight' } }>
                <i className={` ${icono} me-3`} style={{heigth: 40 }}></i>
                { titulo }
            </h3>
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        { contenido }
    </Modal.Body>
</Modal>
```

### Uso

Para utilizar el componente `FonModal` en una aplicación ReactJS, se debe importar el componente desde el archivo donde se encuentra definido y utilizarlo en el componente donde se desea renderizar el modal. Se deben pasar las propiedades obligatorias `showModal`, `setShowModal`, `titulo` y `contenido`. Se pueden pasar las propiedades opcionales para personalizar el modal.

```jsx
import { FonModal } from './FonModal';

function MiPagina() {
  const [ showModal, setShowModal ] = useState( false );
  return (
    <>
        <button onClick={() => setShowModal(true)}>Abrir modal</button>
        <FonModal 
            showModal={showModal} 
            setShowModal={setShowModal}
            titulo="Título del modal"
            icono="fas fa-info-circle"
            contenido="Contenido del modal"
            fullscreen={true}
            customSize={false}
        />
    </>
  );
}
```
