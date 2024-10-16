-- Creaci�n de la base de datos
CREATE DATABASE AVC_Administracion;
GO

USE AVC_Administracion;
GO


-- Tabla de Rol
CREATE TABLE Rol (
    ID_Rol INT IDENTITY(1,1) PRIMARY KEY,
    Perfil NVARCHAR(50) NOT NULL UNIQUE,
    
);

insert into Rol (Perfil)Values ('Administrador') 
insert into Rol (Perfil)Values ('Vendedor') 
insert into Rol (Perfil)Values ('Administrativo') 

-- Tabla de Usuarios
CREATE TABLE Usuarios (
    ID_Usuario INT IDENTITY(1,1) PRIMARY KEY,
	Nombre_Usuario NVARCHAR(50) NOT NULL UNIQUE,
    Nombre NVARCHAR(100) NOT NULL,
	Apellido_Paterno NVARCHAR(100) NOT NULL,
	Apellido_Materno NVARCHAR(100) NOT NULL,
    Correo NVARCHAR(100) NOT NULL UNIQUE,
    Contrase�a NVARCHAR(255) NOT NULL,
    ID_Rol NVARCHAR(50) NOT NULL -- Administrador, Vendedor, Administrativo
	CONSTRAINT FK_Rol_Usuario FOREIGN KEY (ID_Rol) REFERENCES Rol(ID_Rol)
);

INSERT INTO Usuario ( [Nombre_Usuario], [Nombre], [Apellido_Paterno], [Apellido_Materno], [Correo], [Contraseña], [ID_Rol])
VALUES
('admin', 'jose', 'perez', 'lopez', 'test@dominio.com', 'avc123', 1),
('vendedor1', 'Manuel', 'diaz', 'cruz', 'ventas@avc.com', 'ventas12', 2),
('manu87', 'manuel', 'ortega', 'lira', 'manu@dom.com', '87manu', 3);


-- Tabla de Productos
CREATE TABLE Producto (
    ID_Producto INT IDENTITY(1,1) PRIMARY KEY,
    Clave NVARCHAR(50) NOT NULL UNIQUE,
    Nombre NVARCHAR(100) NOT NULL,
    Existencias INT NOT NULL
);

-- Tabla de Pedidos
CREATE TABLE Pedido (
    ID_Pedido INT IDENTITY(1,1) PRIMARY KEY,
    ID_Vendedor INT NOT NULL, -- Referencia a Usuario
    Fecha DATETIME DEFAULT GETDATE(),
    Nombre_Cliente NVARCHAR(100) NOT NULL,
    Total_Piezas INT NOT NULL,
    CONSTRAINT FK_Pedido_Usuario FOREIGN KEY (ID_Vendedor) REFERENCES Usuario(ID_Usuario)
);

-- Tabla de Detalle de Pedido
CREATE TABLE Detalle_Pedido (
    ID_Detalle INT IDENTITY(1,1) PRIMARY KEY,
    ID_Pedido INT NOT NULL, -- Referencia a Pedido
    ID_Producto INT NOT NULL, -- Referencia a Producto
    Cantidad INT NOT NULL,
    CONSTRAINT FK_Detalle_Pedido_Pedido FOREIGN KEY (ID_Pedido) REFERENCES Pedido(ID_Pedido),
    CONSTRAINT FK_Detalle_Pedido_Producto FOREIGN KEY (ID_Producto) REFERENCES Producto(ID_Producto)
);

-- Tabla para Registrar las existencias (Hist�rico de cambios)
CREATE TABLE Registro_Existencias (
    ID_Registro INT IDENTITY(1,1) PRIMARY KEY,
    ID_Producto INT NOT NULL,
    Cantidad_Agregada INT NOT NULL,
    Fecha DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Registro_Existencias_Producto FOREIGN KEY (ID_Producto) REFERENCES Producto(ID_Producto)
);

-- Procedimiento almacenado para agregar un nuevo producto
CREATE PROCEDURE sp_AgregarProducto
    @Clave NVARCHAR(50),
    @Nombre NVARCHAR(100),
    @Existencias INT
AS
BEGIN
    INSERT INTO Producto (Clave, Nombre, Existencias)
    VALUES (@Clave, @Nombre, @Existencias);
END;
GO

--update Procedimiento almacenado para registrar un nuevo pedido
CREATE PROCEDURE sp_RegistrarPedido
    @ID_Vendedor INT,
    @Nombre_Cliente NVARCHAR(100),
    @Total_Piezas INT,
    @ID_Pedido INT OUTPUT
AS
BEGIN
    INSERT INTO Pedido (ID_Vendedor, Nombre_Cliente, Total_Piezas)
    VALUES (@ID_Vendedor, @Nombre_Cliente, @Total_Piezas);

    SET @ID_Pedido = SCOPE_IDENTITY(); -- Obtiene el ID del �ltimo registro insertado
END;
GO

-- Procedimiento almacenado para agregar un detalle de pedido
CREATE PROCEDURE sp_AgregarDetallePedido
    @ID_Pedido INT,
    @ID_Producto INT,
    @Cantidad INT
AS
BEGIN
    INSERT INTO Detalle_Pedido (ID_Pedido, ID_Producto, Cantidad)
    VALUES (@ID_Pedido, @ID_Producto, @Cantidad);
END;
GO

-- Vista para consultar las existencias de productos
CREATE VIEW vw_ReporteExistencias AS
SELECT 
    p.ID_Producto,
    p.Clave,
    p.Nombre,
    p.Existencias
FROM Producto p;
GO

-- Trigger para actualizar existencias al registrar un pedido
CREATE TRIGGER trg_ActualizarExistencias
ON Detalle_Pedido
AFTER INSERT
AS
BEGIN
    DECLARE @ID_Producto INT, @Cantidad INT;

    SELECT @ID_Producto = i.ID_Producto, @Cantidad = i.Cantidad
    FROM inserted i;

    UPDATE Producto
    SET Existencias = Existencias - @Cantidad
    WHERE ID_Producto = @ID_Producto;
END;
GO

-- �ndice para mejorar la consulta de productos por clave
CREATE INDEX idx_Producto_Clave
ON Producto(Clave);
GO


