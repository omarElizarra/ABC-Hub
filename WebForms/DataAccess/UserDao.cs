using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;


namespace DataAccess
{
    public class UserDao:ConnectionToSql
    {
        public bool login(string user, string psw) {
             //using (var connection = new GetConnection()) { 
                 //connection.Open();
                 using (var comm = new SqlCommand()) {
                //comm.Connection = connection;
                
                     comm.CommandText = "SELECT * FROM USUARIO WHERE Nombre_Usuario=@User and Contraseña=@psw";
                     comm.Parameters.AddWithValue("@user", user);
                     comm.Parameters.AddWithValue("@psw", psw);
                    SqlDataReader reader = comm.ExecuteReader();
                     if (reader.Read()) {
                         return true;
                     }
                     else { 
                         return false;
                     }
                 //}
             }
        }
       
        
    }
}
