import { describe, expect, test } from "vitest";
import { RobotScientist } from "../classes/RobotScientist";

describe("Robot", () => {
   test("Robot have to moving", () => {
      const robot = new RobotScientist();
      expect(robot.move()).toBe("Robot is moving");
   });

   test("Damage is bigger than health", () => {
      const robot = new RobotScientist();
      robot.takeDamage(300);
      expect(robot.getHealth()).toBe(0);
   });

   test("Negative damage error", () => {
      const robot = new RobotScientist();
      expect(() => robot.takeDamage(-30)).toThrow(
         new Error("Damage cannot be negative")
      );
   });

   test("Damage reduces health correctly", () => {
      const robot = new RobotScientist();
      robot.takeDamage(30);
      expect(robot.getHealth()).toBe(70);
   });

   test("Repair points are bigger than health", () => {
      const robot = new RobotScientist();
      robot.takeDamage(30);
      robot.repair(40);
      expect(robot.getHealth()).toBe(100);
   });

   test("Negative repair points error", () => {
      const robot = new RobotScientist();
      expect(() => robot.repair(-30)).toThrow(
         new Error("Repair points cannot be negative")
      );
   });

   test("Correctly repairing", () => {
      const robot = new RobotScientist();
      robot.takeDamage(50);
      robot.repair(30);
      expect(robot.getHealth()).toBe(80);
   });

   test("Robot have to cook science stuff", () => {
      const robot = new RobotScientist();
      expect(robot.specialAbility()).toBe("Robot is cooking science stuff");
   });
});
