using System;
using System.Data;
using Oracle.ManagedDataAccess.Client;

namespace GamersUserName.Models
{
    public class UserConexion
    {
        private string _connectionString;

        #region Cadena: de conexión a la base de Datos
        public UserConexion()
        {
            _connectionString = "Data Source=(DESCRIPTION =(ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST=Localhost)(PORT=1521)))(CONNECT_DATA=(SERVICE_NAME=RproODS)));User Id=SYS;Password=ka8to0;";
        }

        // Propiedad pública para acceder a la cadena de conexión
        public string ConnectionString
        {
            get { return _connectionString; }
        }

        // Método para probar la conexión
        public string TestConnection()
        {
            OracleConnection connection = null;
            try
            {
                connection = new OracleConnection(_connectionString);
                connection.Open();

                if (connection.State == ConnectionState.Open)
                {
                    return "✅ Conexión exitosa a la base de datos RproODS.";
                }
                else
                {
                    return "❌ La conexión no se pudo establecer.";
                }
            }
            catch (Exception ex)
            {
                return $"❌ Error al conectar con la base de datos: {ex.Message}";
            }
            finally
            {
                // ✅ Asegurar que la conexión se cierre y libere correctamente
                if (connection != null && connection.State == ConnectionState.Open)
                {
                    connection.Close();
                }
                connection?.Dispose();
            }
        }
        #endregion

        #region Funcion: para conectar conla tabla que queremos
        public DataTable LeerTablaUserGamers()
        {
            DataTable tabla = new DataTable();
            string strErrorMessage = "";
            OracleConnection connection = null;

            try
            {
                // 📌 Construcción segura de la consulta SQL
                string query = $"SELECT * FROM RPS.UserGamers ORDER BY USERNAME";

                connection = new OracleConnection(_connectionString);
                connection.Open();

                // ✅ Validar si la conexión fue exitosa antes de ejecutar la consulta
                if (connection.State == ConnectionState.Open)
                {
                    Console.WriteLine("✅ Conexión establecida correctamente.");
                }
                else
                {
                    Console.WriteLine("❌ No se pudo establecer la conexión.");
                    return new DataTable(); // Devuelve tabla vacía si hay problemas
                }

                using (OracleCommand cmd = new OracleCommand(query, connection))
                {
                    using (OracleDataAdapter adaptador = new OracleDataAdapter(cmd))
                    {
                        adaptador.Fill(tabla);
                        Console.WriteLine($"🔍 Registros obtenidos: {tabla.Rows.Count}"); // Validación para ver cuántos registros hay
                    }
                }
            }
            catch (Exception ex)
            {
                strErrorMessage = "❌ Error leyendo la tabla UserGamers: " + ex.Message;
                Console.WriteLine(strErrorMessage);
            }
            finally
            {
                // ✅ Cierra la conexión correctamente
                if (connection != null && connection.State == ConnectionState.Open)
                {
                    connection.Close();
                    connection.Dispose();
                }
            }

            return tabla; // Retorna la tabla, aunque esté vacía
        }
        #endregion

        #region Funcion para obtener los resultados de la consulta
        public DataTable ObtenerUsuariosGamers()
        {
            try
            {
                DataTable dtUsuarios = LeerTablaUserGamers();

                if (dtUsuarios != null && dtUsuarios.Rows.Count > 0)
                {
                    return dtUsuarios;
                }
                else
                {
                    Console.WriteLine("⚠️ No se encontraron usuarios.");
                    return null;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error al obtener usuarios: {ex.Message}");
                return null;
            }
        }
        #endregion
    }


}
