import Discount from "../models/Discount";
import Product from "../types/product";

export class CartPresenter {
   private discountModel: Discount;
   private updateView: (discount: number) => void;

   constructor(updateView: (discount: number) => void) {
      this.discountModel = new Discount();
      this.updateView = updateView;
   }

   public calculateDiscount(product: Product) {
      this.discountModel.setData(product.price, product.quantity);
      const result = this.discountModel.calculateDiscount();
      this.updateView(result);
   }
}
