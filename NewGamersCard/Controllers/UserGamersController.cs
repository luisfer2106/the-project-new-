using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;
using GamersUserName.Models;

namespace NewGamersCard.Controllers
{
    [RoutePrefix("api/UserGamers")]
    public class UserGamersController : ApiController
    {
        private readonly UserConexion _dbConnection = new UserConexion();

        [HttpGet]
        [Route("")]
        public IHttpActionResult Get()
        {
            try
            {
                string resultadoConexion = _dbConnection.TestConnection();
                if (!resultadoConexion.Contains("✅"))
                {
                    return BadRequest(resultadoConexion);
                }

                DataTable dtUsuarios = _dbConnection.ObtenerUsuariosGamers();

                if (dtUsuarios != null && dtUsuarios.Rows.Count > 0)
                {
                    var listaUsuarios = dtUsuarios.AsEnumerable().Select(row => new
                    {
                        Username = row["USERNAME"].ToString(),
                        Nombre = row["NOMBRE"].ToString(),
                        Apellido = row["APELLIDO"].ToString(),
                        CorreoElectronico = row["CORREO_ELECTRONICO"].ToString(),
                        CedulaRif = row["CEDULA_RIF"].ToString(),
                        NumeroTelefono = row["NUMERO_TELEFONO"].ToString(),
                        ContraseñaHash = row["CONTRASEÑA_HASH"].ToString()
                    }).ToList();

                    return Json(listaUsuarios);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
