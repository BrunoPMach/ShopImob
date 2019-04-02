using Newtonsoft.Json;
using ShopImobBackEnd.Models;
using ShopImobBackEnd.Repository;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace ShopImobBackEnd.Controllers
{
    [EnableCors("*", "*", "*")]
    public class ProdutoController : ApiController
    {
        private ProdutoRepository _ProdutoRepository;
        private Produto entidade;
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

        public IEnumerable<Produto> Get()
        {
            try
            {
                return ProdutoRepository.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [ResponseType(typeof(Produto))]
        public Produto Get(int id)
        {
            try
            {
                return ProdutoRepository.GetById(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [ResponseType(typeof(Produto))]
        public IHttpActionResult Post(Produto produto)
        {
            try
            {
                ProdutoRepository.Save(produto);
                return StatusCode(HttpStatusCode.OK);
            }
            catch (Exception)
            {
                return StatusCode(HttpStatusCode.BadRequest);

            }
        }

        [ResponseType(typeof(void))]
        public IHttpActionResult Put(int id, Produto produto)
        {
            try
            {
                ProdutoRepository.Update(id, produto);
                return StatusCode(HttpStatusCode.OK);
            }
            catch (Exception)
            {
                return StatusCode(HttpStatusCode.BadRequest);
            }
        }

        [ResponseType(typeof(Produto))]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                entidade = ProdutoRepository.GetById(id);
                ProdutoRepository.Delete(entidade);
                return StatusCode(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return StatusCode(HttpStatusCode.BadRequest);
            }
        }
    }
}
