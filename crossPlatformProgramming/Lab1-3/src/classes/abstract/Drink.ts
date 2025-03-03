abstract class Drink {
   name: string;
   volume: number;
   calories: number;

   constructor(name: string, volume: number, calories: number) {
      if (volume < 0) throw new Error("Volume cannot be negative");
      if (calories < 0) throw new Error("Calories cannot be negative");

      this.name = name;
      this.volume = volume;
      this.calories = calories;
   }

   getVolume() {
      return this.volume;
   }

   abstract displayInfo(): string;
}

export default Drink;
