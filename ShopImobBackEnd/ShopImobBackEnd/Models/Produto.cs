using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ShopImobBackEnd.Models
{
    public class Produto
    {
        [Key]
        public int Id_Produto { get; set; }
        [Required]
        [MaxLength(150)]
        public string Nome { get; set; }
        [Required]
        public decimal Valor { get; set; }
        public virtual ICollection<Produto> ListProduto { get; set; }
    }
}