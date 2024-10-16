using AVB_Hub.Data;
using AVB_Hub.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace AVB_Hub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController :  ControllerBase
    {
        private readonly AppDbContexto _context;
        private readonly IConfiguration _configuration;

        public ProductosController(AppDbContexto context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: api/Productos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producto>>> GetProductos()
        {
            return await _context.Productos.FromSqlRaw("SELECT * FROM vw_ReporteExistencias").ToListAsync();
        }

        // GET: api/Productos/clave/{clave}
        [HttpGet("clave/{clave}")]
        public async Task<ActionResult<Producto>> GetProductoPorClave(string clave)
        {
            var producto = await _context.Productos
                .FromSqlRaw("SELECT * FROM vw_ReporteExistencias WHERE Clave = {0}", clave)
                .FirstOrDefaultAsync();

            if (producto == null)
            {
                return NotFound();
            }

            return producto;
        }

        // Método POST para agregar un nuevo producto
        [HttpPost]
        public async Task<IActionResult> AgregarProducto([FromBody] Producto producto)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                connection.Open();

                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        // Agregar producto
                        using (var command = new SqlCommand("sp_AgregarProducto", connection, transaction))
                        {
                            command.CommandType = CommandType.StoredProcedure;
                            command.Parameters.AddWithValue("@Clave", producto.Clave);
                            command.Parameters.AddWithValue("@Nombre", producto.Nombre);
                            command.Parameters.AddWithValue("@Existencias", producto.Existencias);

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

            return Ok(new { message = "Producto agregado con éxito." });
        }



    }



}
