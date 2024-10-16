using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AVB_Hub.Models
{
    [Table("Usuario")]
    
    public class Usuario
    {
        
        [Column("ID_Usuario")]
        public int IdUsuario { get;  }

        [Column("Nombre_Usuario")]
        public string NombreUsuario { get; set; }

        [Column("Nombre")]
        public string Nombre { get; set; }

        [Column("Apellido_Paterno")]
        public string ApellidoPaterno { get; set; }

        [Column("Apellido_Materno")]
        public string ApellidoMaterno { get; set; }

        [Column("Correo")]
        public string Correo { get; set; }

        [Column("Contraseña")]
        public required string Psw { get; set; }


        [Column("ID_Rol")]
        public int IdRol { get; set; }
    }
}
