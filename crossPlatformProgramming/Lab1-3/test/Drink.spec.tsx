import Juice from "../src/classes/Juice";
import Soda from "../src/classes/Soda";
import Tea from "../src/classes/Tea";
import DrinkFactory from "../src/classes/DrinkFactory";

describe("Drink Classes", () => {
   it("should create a Juice instance", () => {
      //name, volume, calories, fruitType
      expect(() => new Juice("Orange Juice", -1, 50, "Orange")).toThrow(
         new Error("Volume cannot be negative")
      );
   });

   it("should create a Soda instance", () => {
      //name, volume, calories, sugarContent
      expect(() => new Soda("Cola", 1.5, 150, -30)).toThrow(
         new Error("Sugar content cannot be negative")
      );
   });

   it("should create a Tea instance", () => {
      //name, volume, calories, teaType
      expect(() => new Tea("Green Tea", 0.5, -4, "Green")).toThrow(
         new Error("Calories cannot be negative")
      );
   });

   it("should create a Juice instance using factory", () => {
      expect(() =>
         DrinkFactory.createDrink({
            type: "juice",
            name: "Apple Juice",
            volume: 1,
            calories: 45,
            fruitType: "Apple",
         })
      ).toBeTruthy();
   });

   it("should create a Juice instance using factory", () => {
      expect(() =>
         DrinkFactory.createDrink({
            type: "juice",
            name: "Apple Juice",
            volume: -1,
            calories: 45,
            fruitType: "Apple",
         })
      ).toThrow(new Error("Volume cannot be negative"));
   });

   it("should create a Soda instance using factory", () => {
      expect(() =>
         DrinkFactory.createDrink({
            type: "soda",
            name: "Pepsi",
            volume: 1,
            calories: 100,
            sugarContent: 30,
         })
      ).toBeTruthy();
   });

   it("should create a Tea instance using factory", () => {
      expect(() =>
         DrinkFactory.createDrink({
            type: "tea",
            name: "Black Tea",
            volume: 1,
            calories: 2,
            teaType: "Black",
         })
      ).toBeTruthy();
   });

   it("should throw an error for unknown drink type", () => {
      expect(() =>
         DrinkFactory.createDrink({
            type: "unknown",
            name: "Mystery",
            volume: 1,
            calories: 50,
         })
      ).toThrow(new Error("Unknown beverage type"));
   });
});
