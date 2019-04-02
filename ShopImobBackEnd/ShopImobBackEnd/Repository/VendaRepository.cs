using ShopImobBackEnd.DTO;
using ShopImobBackEnd.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;


namespace ShopImobBackEnd.Repository
{
    public class VendaRepository : BaseRepository
    {
        private Venda venda;
        private VendedorRepository _VendedorRepository;
        private ProdutoRepository _ProdutoRepository;

        public VendedorRepository VendedorRepository
        {
            get
            {
                if (_VendedorRepository == null)
                    _VendedorRepository = new VendedorRepository();
                return _VendedorRepository;
            }
            set { _VendedorRepository = value; }
        }
        public ProdutoRepository ProdutoRepository
        {
            get
            {
                if (_ProdutoRepository == null)
                    _ProdutoRepository = new ProdutoRepository();
                return _ProdutoRepository;
            }
            set { _ProdutoRepository = value; }
        }

        private static readonly Expression<Func<Venda, VendaDTO>> AsVendaDTO =
           x => new VendaDTO
           {
               Id = x.Id_Venda,
               Id_Vendedor = x.fk_vendedor,
               Id_Produto = x.fk_produto,
               DataVenda = x.DataVenda,
               Quantidade = x.Quantidade,
               ValorComissao = x.ValorComissao,
               ValorTotal = x.ValorTotal,
               NomeVendedor = x.Vendedor.Nome,
               NomeProduto = x.Produto.Nome
           };

        public VendaDTO GetOne(int id)
        {
            VendaDTO venda = db.Venda.Include(v => v.Vendedor)
                                     .Include(v => v.Produto)
                    .Where(s => s.Id_Venda == id)
                    .Select(AsVendaDTO)
                    .FirstOrDefault();
            return venda;
        }
        public IQueryable<VendaDTO> GetDTO()
        {
            return db.Venda.Include(s => s.Vendedor).Include(s => s.Produto).Select(AsVendaDTO);
        }
        public IQueryable<VendaDTO> GetRelatorio()
        {
            var result = db.Venda.Include(s => s.Vendedor).Include(s => s.Produto).Select(AsVendaDTO);

            result = result.Where(x => x.DataVenda == DateTime.Now.Date);

            return result;
        }
        public List<Venda> GetByIdVenda(int id)
        {
            return db.Venda.Where(x => x.fk_vendedor == id).ToList();
        }
        public List<Venda> GetByIdProduto(int id)
        {
            return db.Venda.Where(x => x.fk_produto == id).ToList();
        }

        public Venda GetById(int Id)
        {
            return db.Venda.FirstOrDefault(x => x.Id_Venda == Id);
        }

        public List<Venda> GetAll()
        {
            return db.Venda.OrderBy(x => x.DataVenda).ToList();
        }

        public void Save(Venda entidade)
        {
            db.Venda.Add(entidade);
            db.SaveChanges();
        }

        public void Update(int Id, Venda entidade)
        {
            venda = this.GetById(Id);
            venda.DataVenda = entidade.DataVenda;
            venda.ValorComissao = entidade.ValorComissao;
            venda.ValorTotal = entidade.ValorTotal;
            venda.Quantidade = entidade.Quantidade;
            venda.fk_vendedor = entidade.fk_vendedor;
            venda.fk_produto = entidade.fk_produto;

            db.Entry(venda).State = EntityState.Modified;
            db.SaveChanges();
        }

        public void Delete(Venda entity)
        {
            db.Venda.Remove(entity);
            db.SaveChanges();
        }
    }
}