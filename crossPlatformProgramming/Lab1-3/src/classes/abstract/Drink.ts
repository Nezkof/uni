abstract class Drink {
   name: string;
   volume: number;
   calories: number;

   constructor(name: string, volume: number, calories: number) {
      if (volume < 0) volume = 0;
      if (calories < 0) calories = 0;

      this.name = name;
      this.volume = volume;
      this.calories = calories;
   }

   getVolume() {
      return this.volume;
   }

   displayInfo(): string {
      return `a`;
   }
}

export default Drink;
