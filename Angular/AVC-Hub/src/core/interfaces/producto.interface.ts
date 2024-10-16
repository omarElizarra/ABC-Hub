export {
    IProducto,
    IRegistroExistencias
}

interface IProducto {
    iD_Producto?: number;
    clave: string;
    nombre: string;
    existencias: number;
}

interface IRegistroExistencias {
    iD_Registro?: number;
    iD_Producto: number;
    cantidad_Agregada: number;
    fecha?: Date;
}
