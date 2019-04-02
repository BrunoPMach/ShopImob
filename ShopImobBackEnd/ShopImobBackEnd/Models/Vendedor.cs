using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ShopImobBackEnd.Models
{
    public class Vendedor
    {
        [Key]
        public int Id_Vendedor { get; set; }
        [Required]
        [MaxLength(150)]
        public string Nome { get; set; }
        [Required]
        public DateTime DataNascimento { get; set; }
        [Required]
        [MaxLength(1)]
        public string Genero { get; set; }
        [Required]
        [MaxLength(11)]
        public string Documento { get; set; }
        [Required]
        [MaxLength(200)]
        public string Endereco { get; set; }
        [Required]
        public decimal Salario { get; set; }
        public virtual ICollection<Vendedor> ListVendedor { get; set; }
    }
}