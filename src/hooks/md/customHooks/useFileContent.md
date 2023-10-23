# Documentación del customHook `useFileContent`

Este customHook de React se utiliza para leer el contenido de un archivo CSV y convertirlo en formato JSON.

## Uso

Para utilizar este customHook, primero debes importarlo en tu archivo de componente:

```javascript
import { useFileContent } from "../hooks/useFileContent";
```

Luego, dentro de tu componente, puedes utilizar el hook de la siguiente manera:

```javascript
const { content, info, fileUploadContentChange, reset } = useFileContent();

// `content` es el contenido del archivo CSV convertido en formato JSON.
// `info` es un objeto con información sobre el archivo cargado.
// `fileUploadContentChange` es una función que se llama cuando se carga un archivo.
// `reset` es una función que se llama para restablecer el estado del hook a su valor inicial.
```

El hook devuelve un objeto con cuatro elementos:

- `content` (JSON, opcional): el contenido del archivo CSV convertido en formato JSON. Es `null` inicialmente.
- `info` (objeto, opcional): un objeto con información sobre el archivo cargado. Contiene las propiedades `name`, `lastModified`, `size` y `type`. Es un objeto vacío inicialmente.
- `fileUploadContentChange` (función, obligatorio): una función que se llama cuando se carga un archivo. Recibe el evento del cambio de carga de archivos.
- `reset` (función, obligatorio): una función que se llama para restablecer el estado del hook a su valor inicial.

## Propiedades de `fileUploadContentChange`

La propiedad `fileUploadContentChange` toma un evento como parámetro. Este evento se dispara cuando se selecciona un archivo para cargar. El archivo seleccionado se lee con `FileReader` y se convierte a formato JSON utilizando la función `csvToJson`.

Si el archivo no es un archivo de texto o no se puede leer, se mostrará una notificación de error y no se actualizará el estado del hook.

## Ejemplo completo

```jsx
import { useFileContent } from "../hooks/useFileContent";

const MyComponent = () => {
  const { content, info, fileUploadContentChange, reset } = useFileContent();

  return (
    <div>
      <h1>Mi componente</h1>
      <input type="file" onChange={fileUploadContentChange} />
      {content && (
        <div>
          <h2>Contenido del archivo</h2>
          <pre>{JSON.stringify(content, null, 2)}</pre>
        </div>
      )}
      <button onClick={reset}>Reset</button>
    </div>
  );
};
```

## Ejemplo devextreme:

```jsx

import { useFileContent } from "../hooks/useFileContent";

const MyComponent = () => {

    const file = useFileContent();
    console.log( file.info, file.content)

return (
    <div>
        <form encType="multipart/form-data" action="" >
            <FileUploader 
                className="" 
                selectButtonText={ trans('Buscar Archivo') } 
                labelText={trans("Suéltalo Aquí")}
                accept="text/*"
                uploadMode="useForm" 
                disabled={false}
                onValueChanged={ file.fileUploadContentChange }
                />
        </form>
    </div>
  );
};
```

En este ejemplo, se utiliza el hook `useFileContent` para cargar un archivo CSV y mostrar su contenido en la pantalla. El archivo se carga utilizando un elemento `input` de tipo `file`. El contenido del archivo se muestra en formato JSON utilizando la función `JSON.stringify`.
