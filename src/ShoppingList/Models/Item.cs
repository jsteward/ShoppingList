using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime;
using System.Threading.Tasks;

namespace ShoppingList.Models
{
    public class Item
    {
        public int Id { get; set; }
        public int ItemListId { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public string Notes { get; set; }
        public bool Complete { get; set; }
    }
}
