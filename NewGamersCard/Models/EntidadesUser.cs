using System;
using System.ComponentModel.DataAnnotations;

namespace GamersUserName.Models
{
    public class EntidadesUser
    {
        [Required]
        [RegularExpression(@"^[^\s]+$", ErrorMessage = "El campo USERNAME no puede contener espacios.")]
        public string USERNAME { get; set; }

        [Required]
        public string NOMBRE { get; set; }

        [Required]
        public string APELLIDO { get; set; }

        [Required]
        [RegularExpression(@"^\d+$", ErrorMessage = "El campo CEDULA_RIF debe contener solo números.")]
        public string CEDULA_RIF { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "El formato del CORREO ELECTRONICO no es válido.")]
        public string CORREO_ELECTRONICO { get; set; }

        [Required]
        [RegularExpression(@"^\d+$", ErrorMessage = "El campo NUMERO_TELEFONO debe contener solo números.")]
        public string NUMERO_TELEFONO { get; set; }

        [Required]
        [MinLength(8, ErrorMessage = "La contraseña debe tener al menos 8 caracteres.")]
        public string CONTRASEÑA_HASH { get; set; }
    }
}
