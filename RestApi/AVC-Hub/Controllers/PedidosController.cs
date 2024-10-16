using AVB_Hub.Data;
using AVB_Hub.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AVB_Hub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidosController : ControllerBase
    {

        private readonly AppDbContexto _context;
        private readonly IConfiguration _configuration;

        public PedidosController(AppDbContexto context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: api/Pedidos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pedido>>> GetPedidos()
        {
            return await _context.Pedidos.ToListAsync();
        }

        // GET: api/Pedidos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Pedido>> GetPedido(int id)
        {
            var pedido = await _context.Pedidos.FindAsync(id);

            if (pedido == null)
            {
                return NotFound();
            }

            return pedido;
        }


        [HttpPost]
        public async Task<IActionResult> RegistrarPedidoConDetalle(PedidoConDetalle pedidoConDetalle)
        {
            int pedidoId;

            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                connection.Open();

                // Iniciar una transacción
                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        // Registrar el pedido
                        using (var command = new SqlCommand("sp_RegistrarPedido", connection, transaction))
                        {
                            command.CommandType = CommandType.StoredProcedure;
                            command.Parameters.AddWithValue("@ID_Vendedor", pedidoConDetalle.ID_Vendedor);
                            command.Parameters.AddWithValue("@Nombre_Cliente", pedidoConDetalle.Nombre_Cliente);
                            command.Parameters.AddWithValue("@Total_Piezas", pedidoConDetalle.Total_Piezas);

                            var idPedidoParam = new SqlParameter("@ID_Pedido", SqlDbType.Int) { Direction = ParameterDirection.Output };
                            command.Parameters.Add(idPedidoParam);
                            await command.ExecuteNonQueryAsync();
                            pedidoId = (int)idPedidoParam.Value;

                            Console.WriteLine(pedidoId);
                        }

                        // Agregar detalles del pedido

                        using (var command = new SqlCommand("sp_AgregarDetallePedido", connection, transaction))
                        {
                            command.CommandType = CommandType.StoredProcedure;
                            command.Parameters.AddWithValue("@ID_Pedido", pedidoId);
                            command.Parameters.AddWithValue("@ID_Producto", pedidoConDetalle.ID_Producto);
                            command.Parameters.AddWithValue("@Cantidad", pedidoConDetalle.Total_Piezas);

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

            return Ok(new { message="Pedido y detalles registrados con éxito."});

        }
        

        }
    }
