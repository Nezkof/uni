import { Robot } from "./Robot";

export class RobotScientist extends Robot {
   constructor() {
      super();
   }

   specialAbility() {
      return "Robot is cooking science stuff";
   }
}
