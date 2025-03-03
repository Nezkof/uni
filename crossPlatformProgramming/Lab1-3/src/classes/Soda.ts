import Drink from "./abstract/Drink";

class Soda extends Drink {
   constructor(
      name: string,
      volume: number,
      calories: number,
      public sugarContent: number
   ) {
      super(name, volume, calories);
      if (sugarContent < 0) throw new Error("Sugar content cannot be negative");
   }

   displayInfo(): string {
      return `Soda: ${this.name}, Volume: ${this.volume}L, Calories: ${this.calories}, Sugar Content: ${this.sugarContent}g`;
   }
}

export default Soda;
