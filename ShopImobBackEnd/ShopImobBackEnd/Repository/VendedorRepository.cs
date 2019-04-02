using ShopImobBackEnd.Models;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace ShopImobBackEnd.Repository
{
    public class VendedorRepository : BaseRepository
    {
        private Vendedor vd;
        public Vendedor GetById(int Id)
        {
            return db.Vendedor.FirstOrDefault(x => x.Id_Vendedor == Id);
        }

        public List<Vendedor> GetAll()
        {
            return db.Vendedor.OrderBy(x => x.Nome).ToList();
        }

        public List<Vendedor> GetByName(string Nome)
        {
            return db.Vendedor.Where(x => x.Nome.Contains(Nome)).OrderBy(x => x.Nome).ToList();
        }

        public void Save(Vendedor entidade)
        {
            db.Vendedor.Add(entidade);
            db.SaveChanges();
        }

        public void Update(int Id, Vendedor entidade)
        {
            vd = this.GetById(Id);
            vd.Nome = entidade.Nome;
            vd.Documento = entidade.Documento;
            vd.Salario = entidade.Salario;
            vd.DataNascimento = entidade.DataNascimento;
            vd.Genero = entidade.Genero;
            vd.Endereco = entidade.Endereco;
            db.Entry(vd).State = EntityState.Modified;
            db.SaveChanges();
        }

        public void Delete(Vendedor entidade)
        {
            db.Vendedor.Remove(entidade);
            db.SaveChanges();
        }
    }
}