using System;
using System.Configuration;
using System.Collections.Generic;
using System.Data;
using Microsoft.Data.SqlClient;

namespace DataAccess

{
    public abstract class ConnectionToSql
    {
        private readonly string _connectionString;
        public ConnectionToSql()
        {
            _connectionString = ConfigurationManager.ConnectionStrings["sqlConnection"].ConnectionString;


            using (SqlConnection conn = new SqlConnection(_connectionString)) {
               conn.Open();
                Console.WriteLine("Coneccion a BD");
            }

           
            try
            {
                SqlConnection connection = new SqlConnection(_connectionString);
                connection.Open();
                if ((connection.State & ConnectionState.Open) > 0)
                {
                    Console.WriteLine("Conexión OK!");
                    connection.Close();
                }
                else
                {
                    Console.WriteLine("Conexión falló");
                }
            }
            catch
            {
                Console.WriteLine("Conexión falló");
            }
           
        }

    }

        //protected SqlConnection GetConnection()
        //{
           // return new SqlConnection(_connectionString);
        //}

        //protected ConectionSql GetConection()
        //{
        //    return new ConectionSql(_connectionString);
        //}
    
}
