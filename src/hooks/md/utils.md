## Funciones de utilidad

### Funciones de cadenas

- `yyyymmdd(date)`: Convierte una fecha en formato `YYYY-MM-DD`.
- `cleanData(cadena)`: Elimina caracteres especiales de una cadena.
- `isJson(str)`: Verifica si una cadena es un objeto JSON.
- `queryString(obj)`: Convierte un objeto en una cadena de consulta.
- `StringUtility`: Clase con métodos para convertir una cadena a diferentes formatos (camelCase, Title Case, Pascal Case, Constant Case, Dot Case, Kebab Case, Lower Case, Path Case, Snake Case, Sentence Case).
- `StringUtility.toCamelCase(str)`: Convierte una cadena a camelCase.
- `StringUtility.toTitleCase(str)`: Convierte una cadena a título.
- `StringUtility.toPascalCase(str)`: Convierte una cadena a PascalCase.
- `StringUtility.toConstantCase(str)`: Convierte una cadena a CONSTANT_CASE.
- `StringUtility.toDotCase(str)`: Convierte una cadena a dot.case.
- `StringUtility.toKebabCase(str)`: Convierte una cadena a kebab-case.
- `StringUtility.toLowerCase(str)`: Convierte una cadena a minúsculas.
- `StringUtility.toPathCase(str)`: Convierte una cadena a path/case.
- `StringUtility.toSnakeCase(str)`: Convierte una cadena a snake_case.
- `StringUtility.toSentenceCase(str)`: Convierte una cadena a oración.
- `stringSimilarity(str, arreglo)`: Busca una entrada de texto `str` en un arreglo y devuelve la palabra más similar


### Funciones de filtrado

- `getStatusFilter(value)`: Retorna un objeto de filtro según el valor de `value`.
- `filterArrayByTagBox(arreglo, tagBoxSelected, field)`: Filtra un arreglo por un campo, según una selección de un `tagbox`.
- `filterArrayBySelectBox(arreglo, selectBoxValue, field)`: Filtra un arreglo por un campo, según una selección de un `selectbox`.

### Funciones de ordenamiento

- `sortArrObj(array, key, asc=1)`: Ordena un arreglo de objetos según el valor de una clave determinada, en orden ascendente o descendente.
- `sortDesc(arreglo, orderBy = 'updated.userDate', asc=-1)`: Ordena un arreglo de objetos en orden descendente según el valor de una clave determinada.
- `sortAsc(arreglo, orderBy = 'updated.userDate', asc=1)`: Ordena un arreglo de objetos en orden ascendente según el valor de una clave determinada.
- `sortArrAscByDbDate(arr, sortBy = 'updated.dbDate')`: Ordena un arreglo de objetos por fecha en orden ascendente.
- `sortArrDescByDbDate(arr, sortBy = 'updated.dbDate')`: Ordena un arreglo de objetos por fecha en orden descendente.

### Funciones de agrupamiento

- `groupBy(array, paramsToSum = ['Litros', 'Despachos'], keys)`: Agrupa un arreglo de objetos por una o varias claves y suma los valores de algunos parámetros.
- `flattenObject(obj)`: Convierte un objeto en un arreglo de objetos.


### Funciones de manipulación de datos

- `groupBy(array, paramsToSum, keys)`: Agrupa un arreglo de objetos por una o más claves, y suma los valores de una o más propiedades.
- `flattenObject(obj)`: Convierte un objeto en un arreglo de objetos.
- `updateDataSource(dataSource, upd)`: Actualiza un objeto en un arreglo de objetos.
- `addNewToDataSourceByCode(dataSource, nuevo)`: Agrega un nuevo objeto en un arreglo de objetos, si el código no existe.
- `addNewDeptToDataSourceByCode(dataSource, nuevo)`: Agrega un nuevo objeto en un arreglo de objetos, si el código o el identificador del departamento no existen.
- `addNewToDataSourceByNombre(dataSource, nuevo)`: Agrega un nuevo objeto en un arreglo de objetos, si el nombre no existe.
- `addNewToDataSourceByName(dataSource, nuevo)`: Agrega un nuevo objeto en un arreglo de objetos, si el nombre no existe.
- `getOldDataColumns(backlogArray)`: Retorna un arreglo con las columnas afectadas en un registro.
- `getChangesColumns(backlogArray)`: Retorna un arreglo con los cambios realizados en un registro.
- `getBacklogGridFromArray(backlogArray)`: Retorna un arreglo de objetos con la evolución de un registro.

### Otras funciones

- `setPointKSeparator(number)`: Formatea un número como una cadena, separando los miles con un punto y usando una coma como separador decimal.
- `notifyResultado(resp, tipo)`: Muestra una notificación según el resultado de una acción.
- `asyncCompose(...functions)(input)`: Ejecuta una

### Funciones de manipulación de arreglos

- `distinct(array)`: Retorna un arreglo con valores distintos.
- `objDistinct(array)`: Retorna un arreglo de objetos distintos.
- `objDistinctByKeys(arreglo=[], keys=[])`: Retorna un arreglo de claves distintas contenidas en objetos de un arreglo.
- `areDistinctObjects(array)`: Verifica si los objetos de un arreglo son distintos.
- `areDistinct(obj1, obj2)`: Verifica si dos objetos son distintos.
- `replaceKeys(arr, keyList)`: reemplaza los nombres de las claves de un arreglo de objetos `arr` que coinciden con la lista de valores keyList, por el nombre de la clave de keyList.
- `aplanaTodo(arr)`: recorre el arreglo y de cada objeto extrae un nivel de hijos y los pasa al nivel de padre
 
 Ejemplo:

 ```javascript
    const fleetsKeyList = {
        name:           ['frota', 'fleet', 'fleet_name', 'flota', 'nome_frota'],
        code:           ['codigo_frota', 'codigo_de_flota'],
        empresaName:    ['empresa_nombre', 'nombre_empresa']
    };

    const dataSource = [
        { frota: 'Frota 1', dept: 'Dept 1'},
        { frota: 'Frota 2', dept: 'Dept 2'},
    ]

    const response = replaceKeys( dataSource, fleetKeyList )

    //Devuelve
    //
    // console.log( response )
    //
    // [
    //     { name: 'Frota 1', dept: 'Dept 1'},
    //     { name: 'Frota 2', dept: 'Dept 2'}
    // 
 ```

## Funciones con objetos

- `objectToString(obj)`: recibe un objeto y devuelve un `string` del tipo `clave1: valor1, clave 2: valor 2, ...`


## Funciones que responden Booleanos


- `hasKey(dim, key)`: retorna true si en el arreglo `dim` existen objetos con la clave `key`
- `checkKeys(keyList,dataSource)`: Retorna true si todos los objetos del arreglo de datos `dataSource` tienen las claves de la lista `keyList`

- `checkKeysWithBlankStrings(keyList,dataSource)`: igual que `checkKeys` pero además chequea que si el valor es un string, sea distinto de trim('') (espacios o string vacío)