using System.ComponentModel.DataAnnotations.Schema;

namespace AVB_Hub.Models
{
    [Table("Pedido")]
    public class Pedido
    {
        public int ID_Pedido { get; set; }
        public int ID_Vendedor { get; set; }
        public DateTime Fecha { get; set; } = DateTime.Now;
        public string Nombre_Cliente { get; set; }
        public int Total_Piezas { get; set; }
    }
}

