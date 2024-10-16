namespace AVB_Hub.Models
{
    public class RegistroExistencias
    {
        public int ID_Registro { get; set; }
        public int ID_Producto { get; set; }
        public int Cantidad_Agregada { get; set; }
        public DateTime Fecha { get; set; } = DateTime.Now;

    }
}