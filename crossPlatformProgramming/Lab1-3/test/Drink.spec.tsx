import Juice from "../src/classes/Juice";
import Soda from "../src/classes/Soda";
import Tea from "../src/classes/Tea";
import DrinkFactory from "../src/classes/DrinkFactory";

describe("Drink Classes", () => {
   it("should create a Juice instance", () => {
      const juice = new Juice("Orange Juice", 1, 50, "Orange");
      expect(juice.displayInfo()).toContain("Orange Juice");
   });

   it("should create a Soda instance", () => {
      const soda = new Soda("Cola", -1.5, 150, 30);
      expect(soda.displayInfo()).toContain("Cola");
   });

   it("should create a Tea instance", () => {
      const tea = new Tea("Green Tea", 0.5, 0, "Green");
      expect(tea.displayInfo()).toContain("Green Tea");
   });

   it("should create a Juice instance using factory", () => {
      const juice = DrinkFactory.createDrink({
         type: "juice",
         name: "Apple Juice",
         volume: 1,
         calories: -45,
         fruitType: "Apple",
      });
      expect(juice instanceof Juice).toBeTrue();
   });

   it("should create a Soda instance using factory", () => {
      const soda = DrinkFactory.createDrink({
         type: "soda",
         name: "Pepsi",
         volume: 1,
         calories: 100,
         sugarContent: 30,
      });
      expect(soda instanceof Soda).toBeTrue();
   });

   it("should create a Tea instance using factory", () => {
      const tea = DrinkFactory.createDrink({
         type: "tea",
         name: "Black Tea",
         volume: 1,
         calories: 2,
         teaType: "Black",
      });
      expect(tea instanceof Tea).toBeTrue();
   });

   it("should throw an error for unknown drink type", () => {
      expect(() => {
         DrinkFactory.createDrink({
            type: "unknown",
            name: "Mystery",
            volume: 1,
            calories: 50,
         });
      }).toThrowError("Unknown beverage type");
   });
});
