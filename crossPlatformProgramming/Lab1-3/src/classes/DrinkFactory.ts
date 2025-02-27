import Drink from "./abstract/Drink";
import Juice from "./Juice";
import Soda from "./Soda";

class DrinkFactory {
   static createDrink(item: any): Drink {
      if (item.type === "juice") {
         return new Juice(
            item.name,
            item.volume,
            item.calories,
            item.fruitType
         );
      } else if (item.type === "soda") {
         return new Soda(
            item.name,
            item.volume,
            item.calories,
            item.sugarContent
         );
      } else {
         throw new Error("Unknown beverage type");
      }
   }
}

export default DrinkFactory;
