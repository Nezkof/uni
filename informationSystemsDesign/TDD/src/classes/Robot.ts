export class Robot {
   private health: number;

   constructor() {
      this.health = 100;
   }

   move() {
      return "Robot is moving";
   }

   takeDamage(damage: number) {
      if (damage < 0) {
         throw new Error("Damage cannot be negative");
      }

      if (damage > this.health) this.health = 0;
      else this.health -= damage;
   }

   repair(amount: number) {
      if (amount < 0) {
         throw new Error("Repair points cannot be negative");
      }

      this.health += amount;

      if (this.health > 100) this.health = 100;
   }

   getHealth(): number {
      return this.health;
   }
}
