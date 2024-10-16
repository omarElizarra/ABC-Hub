namespace AVB_Hub.Models
{
    public class PedidoConDetalle
    {
      
        public int ID_Vendedor { get; set; }
        
        public string Nombre_Cliente { get; set; }
        public int Total_Piezas { get; set; }

        public int ID_Producto { get; set; }
    }

}