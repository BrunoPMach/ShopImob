using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopImobBackEnd.Models
{
    public class Venda
    {
        [Key]
        public int Id_Venda { get; set; }
        [Required]
        public DateTime DataVenda { get; set; }
        [Required]
        public decimal ValorComissao { get; set; }
        [Required]
        public decimal ValorTotal { get; set; }
        [Required]
        public int Quantidade { get; set; }

        public int fk_vendedor { get; set; }

        public int fk_produto { get; set; }

        [ForeignKey("fk_vendedor")]
        public Vendedor Vendedor { get; set; }
        
        [ForeignKey("fk_produto")]
        public Produto Produto { get; set; }


    }
}