import Product from "../types/product";
import Discount from "../models/Discount";

class CartController {
   private discount: Discount;
   private product: Product;

   constructor() {
      this.discount = new Discount();
      this.product = { price: 0, quantity: 0 };
   }

   public setProduct(product: Product) {
      this.product = { price: product.price, quantity: product.quantity };
   }

   public getDiscount() {
      this.discount.setData(this.product.price, this.product.quantity);
      return this.discount.calculateDiscount();
   }
}

export default new CartController();
