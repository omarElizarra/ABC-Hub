using AVB_Hub.Data;
using AVB_Hub.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Threading.Tasks;

namespace AVB_Hub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistroExistenciasController : ControllerBase
    {
        private readonly AppDbContexto _contexto;
        private readonly IConfiguration _configuration;

        public RegistroExistenciasController(AppDbContexto context, IConfiguration configuration)
        {
            _contexto = context;
            _configuration = configuration;
        }

        // Método POST para registrar existencias
        [HttpPost]
        public async Task<IActionResult> RegistrarExistencias([FromBody] RegistroExistencias registroExistencias)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                connection.Open();

                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        // Actualizar existencias del producto
                        /*
                        using (var command = new SqlCommand("UPDATE Producto SET Existencias = Existencias + @Cantidad WHERE ID_Producto = @ID_Producto", connection, transaction))
                        {
                            command.Parameters.AddWithValue("@ID_Producto", registroExistencias.ID_Producto);
                            command.Parameters.AddWithValue("@Cantidad", registroExistencias.Cantidad_Agregada);

                            await command.ExecuteNonQueryAsync();
                        }
                        */

                        // Registrar el cambio de existencias
                        using (var command = new SqlCommand("INSERT INTO Registro_Existencias (ID_Producto, Cantidad_Agregada, Fecha) VALUES (@ID_Producto, @Cantidad, GETDATE())", connection, transaction))
                        {
                            command.Parameters.AddWithValue("@ID_Producto", registroExistencias.ID_Producto);
                            command.Parameters.AddWithValue("@Cantidad", registroExistencias.Cantidad_Agregada);

                            await command.ExecuteNonQueryAsync();
                        }

                        // Confirmar la transacción
                        transaction.Commit();
                    }
                    catch (Exception)
                    {
                        // En caso de error, revertir la transacción
                        transaction.Rollback();
                        throw;
                    }
                }

                connection.Close();
            }

            return Ok(new { message = "Existencias registradas con éxito." });
        }
    }

}
