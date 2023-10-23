## Authorization Component

Este componente se encarga de verificar la autorización y renderizar sus hijos si el usuario tiene el permiso requerido.

### Props

- `requiredPermission` (string, obligatorio): el nombre del permiso requerido para renderizar los hijos.
- `children` (node, obligatorio): los hijos a renderizar si el usuario tiene el permiso requerido.

### Uso

```jsx
import Authorization from "./Authorization";

<Authorization requiredPermission="canViewDashboard">
  <Dashboard />
</Authorization>
````

### Cómo funciona

Este componente funciona realizando los siguientes pasos:

1. Utiliza el hook `useSelector` para obtener el `rolId` desde el slice `ui.faenaActual` del store de Redux.
2. Utiliza el hook `usePermissions` para hacer una consulta a la API de los permisos asociados con el `roleId` del usuario.
3. Renderiza `null` si los permisos aún no han sido consultados (`queryPermissions.isFetched` es `false`).
4. Verifica si el usuario tiene el permiso requerido verificando si el array `permissionNames` devuelto por la API incluye el `requiredPermission`.
5. Renderiza `null` si el usuario no tiene el permiso requerido, de lo contrario renderiza los `children`.
