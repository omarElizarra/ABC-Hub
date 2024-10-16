# Sistema de Administración para AVC

## Descripción del Proyecto

Este proyecto consiste en un sistema de administración en línea para la empresa AVC, diseñado para facilitar la gestión de pedidos, productos y usuarios a través de diferentes perfiles. Utiliza tecnologías modernas como Angular 18 para el FrontEnd, C# para el BackEnd y SQL Server como base de datos, además de Windows Forms para la interfaz de escritorio.

## Tecnologías Utilizadas

- **FrontEnd**:
  - **Angular 18**: Framework para crear aplicaciones web interactivas y dinámicas.
  - **Windows Forms (C#)**: Interfaz de usuario para la gestión administrativa en entorno de escritorio.

- **BackEnd**:
  - **.NET Core**: Framework para construir servicios web robustos y escalables.
  - **C#**: Lenguaje de programación utilizado en el desarrollo de la lógica del servidor.

- **Base de Datos**:
  - **SQL Server**: Sistema de gestión de bases de datos relacional utilizado para almacenar y gestionar datos.

## Funcionalidades Principales

- **Administradores**:
  - Creación y gestión de usuarios y perfiles.
  
- **Vendedores**:
  - Creación de pedidos (sin necesidad de verificar existencias).
  - Consulta de pedidos y generación de reportes de existencias.

- **Personal Administrativo**:
  - Consulta y surtido de pedidos.
  - Registro de productos y existencias.

## Estructura del Proyecto

1. **Base de Datos**: Implementación de una base de datos relacional en SQL Server, con tablas, Stored Procedures, Vistas, Índices y Triggers.
   
2. **FrontEnd**:
   - Aplicación web desarrollada en Angular 18 con funcionalidades para vendedores y personal administrativo.
   - Aplicación de escritorio en Windows Forms para la gestión administrativa.

3. **BackEnd**:
   - Servicios web desarrollados en .NET Core que interactúan con la base de datos y exponen las APIs necesarias.

## Instalación

Para ejecutar el proyecto, sigue los pasos a continuación:

1. Clona este repositorio.
2. Configura la base de datos en SQL Server con los scripts proporcionados en la carpeta `DBScripts`.
3. Ejecuta la aplicación de Windows Forms y la aplicación web según las instrucciones en sus respectivas carpetas.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas colaborar, por favor crea un issue o envía un pull request.

