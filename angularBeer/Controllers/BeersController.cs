using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using angularBeer.Models;
using System.Threading;

namespace angularBeer.Controllers
{
    public class BeersController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Beers
        public IQueryable<Beer> GetBeers()
        {
            return db.Beers;
        }

        // GET: api/Beers/5
        [ResponseType(typeof(Beer))]
        public async Task<IHttpActionResult> GetBeer(int id)
        {
            Beer beer = await db.Beers.FindAsync(id);
            if (beer == null)
            {
                return NotFound();
            }

            return Ok(beer);
        }

        // PUT: api/Beers/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutBeer(int id, Beer beer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != beer.Id)
            {
                return BadRequest();
            }

            db.Entry(beer).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BeerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Beers
        [ResponseType(typeof(Beer))]
        public async Task<IHttpActionResult> PostBeer(Beer beer)
        {
            Thread.Sleep(2000);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Beers.Add(beer);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = beer.Id }, beer);
        }

        // DELETE: api/Beers/5
        [ResponseType(typeof(Beer))]
        public async Task<IHttpActionResult> DeleteBeer(int id)
        {
            Beer beer = await db.Beers.FindAsync(id);
            if (beer == null)
            {
                return NotFound();
            }

            db.Beers.Remove(beer);
            await db.SaveChangesAsync();

            return Ok(beer);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BeerExists(int id)
        {
            return db.Beers.Count(e => e.Id == id) > 0;
        }
    }
}