import Drink from "./abstract/Drink";

class Tea extends Drink {
   constructor(
      name: string,
      volume: number,
      calories: number,
      public teaType: string
   ) {
      super(name, volume, calories);
   }

   displayInfo(): string {
      return `Tea: ${this.name}, Volume: ${this.volume}L, Calories: ${this.calories}, Tea Type: ${this.teaType}`;
   }
}

export default Tea;
