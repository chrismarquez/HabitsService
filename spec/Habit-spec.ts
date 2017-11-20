import BadScore from "../src/Components/BadScore";
import BaseHabitScore from "../src/Components/BaseHabitScore";
import EasyScore from "../src/Components/EasyScore";
import GoodScore from "../src/Components/GoodScore";
import HardScore from "../src/Components/HardScore";
import IHabitScore from "../src/Components/IHabitScore";
import MediumScore from "../src/Components/MediumScore";

let score: IHabitScore;

describe("Habit Scores", () => {

    beforeAll(() => score = new BaseHabitScore());

    it("Base Habit", () => {
        expect(score.getScore()).toEqual(1);
    });

    it("Easy Habit", () => {
        const easyHabit: IHabitScore = new EasyScore(score);
        expect(easyHabit.getScore()).toEqual(2);
    });

    it("Medium Habit", () => {
        const mediumHabit: IHabitScore = new MediumScore(score);
        expect(mediumHabit.getScore()).toEqual(4);
    });

    it("Hard Habit", () => {
        const hardHabit: IHabitScore = new HardScore(score);
        expect(hardHabit.getScore()).toEqual(6);
    });

    it("Good Habit", () => {
        const goodHabit: IHabitScore = new GoodScore(score);
        expect(goodHabit.getScore()).toEqual(score.getScore());
    });

    it("Bad Habit", () => {
        const badHabit: IHabitScore = new BadScore(score);
        expect(badHabit.getScore()).toEqual(-1 * score.getScore());
    });

});
