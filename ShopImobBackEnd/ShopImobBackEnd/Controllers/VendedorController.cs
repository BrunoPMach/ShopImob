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
    public class VendedorController : ApiController
    {
        private VendedorRepository _VendedorRepository;
        private Vendedor entidade;
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

        public IEnumerable<Vendedor> Get()
        {
            try
            {
                return VendedorRepository.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [ResponseType(typeof(Vendedor))]
        public Vendedor Get(int id)
        {
            try
            {
                return VendedorRepository.GetById(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [ResponseType(typeof(Vendedor))]
        public IHttpActionResult Post(Vendedor vendedor)
        {
            try
            {
                VendedorRepository.Save(vendedor);
                return StatusCode(HttpStatusCode.OK);
            }
            catch (Exception)
            {
                return StatusCode(HttpStatusCode.BadRequest);
            }
        }

        [ResponseType(typeof(void))]
        public IHttpActionResult Put(int id, Vendedor vendedor)
        {
            try
            {
                VendedorRepository.Update(id, vendedor);
                return StatusCode(HttpStatusCode.OK);
            }
            catch (Exception)
            {
                return StatusCode(HttpStatusCode.BadRequest);
            }
        }

        [ResponseType(typeof(Vendedor))]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                entidade = VendedorRepository.GetById(id);
                VendedorRepository.Delete(entidade);
                return StatusCode(HttpStatusCode.OK);
            }
            catch (Exception)
            {
                return StatusCode(HttpStatusCode.BadRequest);
            }
        }
    }
}
