using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVVM.Models
{
    public class CartItem
    {
        public decimal Price { get; set; }
        public int Quantity { get; set; }

        public decimal Discount => Price * (Quantity / 10m);
    }
}