import { describe, expect, test } from "vitest";
import { RobotCleaner } from "../classes/RobotCleaner";

describe("Robot", () => {
   test("Robot have to move", () => {
      const robot = new RobotCleaner();
      expect(robot.move()).toBe("Robot is moving");
   });

   test("Damage is bigger than health", () => {
      const robot = new RobotCleaner();
      robot.takeDamage(300);
      expect(robot.getHealth()).toBe(0);
   });

   test("Negative damage error", () => {
      const robot = new RobotCleaner();
      expect(() => robot.takeDamage(-30)).toThrow(new Error("Damage cannot be negative"));
   });

   test("Damage reduces health correctly", () => {
      const robot = new RobotCleaner();
      robot.takeDamage(30);
      expect(robot.getHealth()).toBe(70);
   });

   test("Repair points are bigger than health", () => {
      const robot = new RobotCleaner();
      robot.takeDamage(30);
      robot.repair(40);
      expect(robot.getHealth()).toBe(100);
   });

   test("Negative repair points error", () => {
      const robot = new RobotCleaner();
      expect(() => robot.repair(-30)).toThrow(new Error("Repair points cannot be negative"));
   });

   test("Correctly repairing", () => {
      const robot = new RobotCleaner();
      robot.takeDamage(50);
      robot.repair(30);
      expect(robot.getHealth()).toBe(80);
   });

   test("Robot have to clean", () => {
      const robot = new RobotCleaner();
      expect(robot.clean()).toBe("Robot is cleaning");
   });
});
