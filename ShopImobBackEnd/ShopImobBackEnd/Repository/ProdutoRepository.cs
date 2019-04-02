using ShopImobBackEnd.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ShopImobBackEnd.Repository
{
    public class ProdutoRepository : BaseRepository
    {
        private Produto p;
        public Produto GetById(int Id)
        {
            return db.Produto.FirstOrDefault(x => x.Id_Produto == Id);
        }

        public List<Produto> GetAll()
        {
            return db.Produto.OrderBy(x => x.Nome).ToList();
        }

        public List<Produto> GetByName(string Nome)
        {
            return db.Produto.Where(x => x.Nome.Contains(Nome)).OrderBy(x => x.Nome).ToList();
        }

        public void Save(Produto entidade)
        {
            db.Produto.Add(entidade);
            db.SaveChanges();
        }

        public void Update(int Id, Produto entidade)
        {
            p = this.GetById(Id);
            p.Nome = entidade.Nome;
            p.Valor = entidade.Valor;
            db.Entry(p).State = EntityState.Modified;
            db.SaveChanges();
        }

        public void Delete(Produto entidade)
        {
            db.Produto.Remove(entidade);
            db.SaveChanges();
        }
    }
}