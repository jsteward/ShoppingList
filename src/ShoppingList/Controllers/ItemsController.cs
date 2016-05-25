using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;
using ShoppingList.Models;

namespace ShoppingList.Controllers
{

    [Route("api/[controller]")]
    public class ItemsController : Controller
    {
      
        [FromServices]
        public ShoppingListContext Context  { get; set; }
    // GET: api/items/{listId}

        [HttpGet]
        [Route("/api/lists/{listId}/items")]
        public IActionResult GetAll(int listId)
        {
            var items = Context.Items.Where(x=>x.ItemListId == listId).OrderByDescending(x=>x.Id);
            return new ObjectResult(items);
        }

        

        // GET api/items/{id}
        
        
        [Route("/api/lists/{listId}/items/{itemId}")]
        public IActionResult Get(int id)
        {
            return new ObjectResult(Context.Items.FirstOrDefault(x => x.Id == id));
            
        }

        // POST api/item
        [HttpPost]
        [Route("/api/lists/{listId}/items")]
        public IActionResult Post([FromBody]Item item)
        {
            Context.Items.Add(item);
            Context.SaveChanges();
            return new ObjectResult(item);
        }

        // PUT api/item/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Item item)
        {
            var updatedItem = Context.Items.FirstOrDefault(x => x.Id == id);
            if (updatedItem != null)
            {
                updatedItem.Complete = item.Complete;
                updatedItem.Name = item.Name;
                updatedItem.Notes = item.Notes;
                updatedItem.Quantity = item.Quantity;
                Context.Items.Update(updatedItem);
                Context.SaveChanges();
            }
        }

        // DELETE api/item/5
        [HttpDelete]
        [Route("/api/lists/items/{itemId}")]
        public void Delete(int itemId)
        {
            var item = Context.Items.FirstOrDefault(x => x.Id == itemId);

            if (item != null) Context.Remove((object) item);
            Context.SaveChanges();
        }
    }
}
