using Newtonsoft.Json;
using ShopImobBackEnd.DTO;
using ShopImobBackEnd.Models;
using ShopImobBackEnd.Repository;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace ShopImobBackEnd.Controllers
{
    [EnableCors("*", "*", "*")]
    public class VendaController : ApiController
    {
        private VendaRepository _VendaRepository;
        private Venda entidade;
        public VendaRepository VendaRepository
        {
            get
            {
                if (_VendaRepository == null)
                    _VendaRepository = new VendaRepository();
                return _VendaRepository;
            }
            set { _VendaRepository = value; }
        }

        public IQueryable<VendaDTO> Get()
        {
            try
            {
                IQueryable<VendaDTO> list = VendaRepository.GetDTO();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [Route("Venda/Relatorio")]
        public IQueryable<VendaDTO> GetRelatorio()
        {
            //todas as vendas do dia e calcular a comissão dos
            //vendedores.
            try
            {
                IQueryable<VendaDTO> list = VendaRepository.GetRelatorio();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        [ResponseType(typeof(Venda))]
        public Venda Get(int id)
        {
            try
            {
                return VendaRepository.GetById(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [ResponseType(typeof(Venda))]
        public IHttpActionResult Post(Venda venda)
        {
            try
            {
                VendaRepository.Save(venda);
                return StatusCode(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return StatusCode(HttpStatusCode.BadRequest);
            }
        }

        [ResponseType(typeof(void))]
        public IHttpActionResult Put(int id, Venda venda)
        {
            try
            {
                VendaRepository.Update(id, venda);
                return StatusCode(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return StatusCode(HttpStatusCode.BadRequest);
            }
        }

        [ResponseType(typeof(Venda))]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                entidade = VendaRepository.GetById(id);
                VendaRepository.Delete(entidade);
                return StatusCode(HttpStatusCode.OK);
            }
            catch (Exception)
            {
                return StatusCode(HttpStatusCode.BadRequest);
            }
        }
    }
}
