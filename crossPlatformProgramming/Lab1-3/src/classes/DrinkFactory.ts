import Drink from "./abstract/Drink";
import Juice from "./Juice";
import Soda from "./Soda";
import Tea from "./Tea";

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
      } else if (item.type === "tea") {
         return new Tea(item.name, item.volume, item.calories, item.teaType);
      } else {
         throw new Error("Unknown beverage type");
      }
   }
}

export default DrinkFactory;
