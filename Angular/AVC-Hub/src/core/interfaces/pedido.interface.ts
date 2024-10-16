export {
    IPedido,
    IDetallePedido
}


interface IPedido {
    iD_Pedido?: number;
    iD_Vendedor: number;
    fecha?: Date;
    nombre_Cliente: string;
    total_Piezas: number;
    iD_Producto?: number
}

interface IDetallePedido {
    ID_Detalle?: number;
    ID_Pedido: number;
    ID_Producto: number;
    Cantidad: number;
}