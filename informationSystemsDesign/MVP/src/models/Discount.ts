class Discount {
   private price: number;
   private quantity: number;

   constructor() {
      this.price = 0;
      this.quantity = 0;
   }

   public setData(price: number, quantity: number) {
      this.price = price;
      this.quantity = quantity;
   }

   public calculateDiscount(): number {
      return this.price * (this.quantity / 10);
   }
}

export default Discount;
