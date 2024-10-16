# Proyecto de Servicios en C#

Este proyecto es una API RESTful construida con ASP.NET Core para la gestión de usuarios, pedidos y productos. Utiliza Entity Framework Core para el acceso a datos y SQL Server como base de datos.

## Características

- CRUD de usuarios
- Validación de credenciales de usuario
- Gestión de pedidos y detalles de pedidos
- Gestión de productos y existencias

## Requisitos Previos

- .NET 8 SDK
- SQL Server
- Visual Studio 2022 o Visual Studio Code

## 1. Configuracion de cadena de conexión a la base de datos en `appsettings.json`

```json
"ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=NombreDeTuBaseDeDatos;Trusted_Connection=True;MultipleActiveResultSets=true"
}


```
## 2. Restaura los paquetes NuGet y construye el proyecto:

```bash
dotnet restore
dotnet build
```

## Endpoints de la API

### Usuarios

    - POST /api/Usuarios: Crear un nuevo usuario

    - GET /api/Usuarios: Obtener la lista de usuarios

    - GET /api/Usuarios/{id}: Obtener un usuario específico por ID

    - PUT /api/Usuarios/{id}: Actualizar un usuario existente

    - DELETE /api/Usuarios/{id}: Eliminar un usuario

    - POST /api/Usuarios/ValidarCredenciales: Validar credenciales de usuario

 ### Pedidos

    - POST /api/Pedidos: Crear un nuevo pedido con detalles

    - GET /api/Pedidos: Obtener la lista de pedidos

    - GET /api/Pedidos/{id}: Obtener un pedido específico por ID

 ### Productos

    - POST /api/Productos: Agregar un nuevo producto

    - PUT /api/Productos/agregarExistencias: Agregar existencias a un producto

    - GET /api/Productos: Obtener la lista de productos

    - GET /api/Productos/clave/{clave}: Obtener un producto específico por clave

 ### Registro de Existencias

    - POST /api/RegistroExistencias: Registrar nuevas existencias de productos

### Seguridad

 La seguridad de la API está configurada utilizando políticas de CORS para permitir solicitudes desde diferentes orígenes.