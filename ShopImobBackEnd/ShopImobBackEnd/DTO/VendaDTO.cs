using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShopImobBackEnd.DTO
{
    public class VendaDTO
    {
        public int Id { get; set; }
        public DateTime DataVenda { get; set; }
        public decimal ValorComissao { get; set; }
        public decimal ValorTotal { get; set; }
        public int Id_Vendedor { get; set; }
        public int Id_Produto { get; set; }
        public int Quantidade { get; set; }

        public string NomeVendedor { get; set; }
        public string NomeProduto { get; set; }

    }
}