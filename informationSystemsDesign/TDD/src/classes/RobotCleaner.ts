import { Robot } from "./Robot";

export class RobotCleaner extends Robot {
   constructor() {
      super();
   }

   clean() {
      return "Robot is cleaning";
   }
}
