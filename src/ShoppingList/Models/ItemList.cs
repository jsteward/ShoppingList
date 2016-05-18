using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingList.Models
{
    public class ItemList
    {
        public int Id { get; set; }
        public string ListName { get; set; }
        public List<Item> Items { get; set; }

    }
}
