import Drink from "./abstract/Drink";

class Juice extends Drink {
   constructor(
      name: string,
      volume: number,
      calories: number,
      public fruitType: string
   ) {
      super(name, volume, calories);
   }

   displayInfo(): string {
      return `Juice: ${this.name}, Volume: ${this.volume}L, Calories: ${this.calories}, Fruit Type: ${this.fruitType}`;
   }
}

export default Juice;
