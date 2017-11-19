import IHabitScore from "../src/Components/IHabitScore";
import BaseHabitScore from "../src/Components/BaseHabitScore";
import EasyScore from "../src/Components/EasyScore";
import MediumScore from "../src/Components/MediumScore";
import HardScore from "../src/Components/HardScore";
import GoodScore from "../src/Components/GoodScore";
import BadScore from "../src/Components/BadScore";

let score: IHabitScore;

describe("Habit Scores", () => {

    beforeAll(() => score = new BaseHabitScore());

    it("Base Habit", () => {
        expect(score.getScore()).toEqual(1);
    });

    it("Easy Habit", () => {
        let easyHabit: IHabitScore = new EasyScore(score);
        expect(easyHabit.getScore()).toEqual(2);
    });

    it("Medium Habit", () => {
        let mediumHabit: IHabitScore = new MediumScore(score);
        expect(mediumHabit.getScore()).toEqual(4);
    });

    it("Hard Habit", () => {
        let hardHabit: IHabitScore = new HardScore(score);
        expect(hardHabit.getScore()).toEqual(6);
    });

    it("Good Habit", () => {
        let goodHabit: IHabitScore = new GoodScore(score);
        expect(goodHabit.getScore()).toEqual(score.getScore());
    });

    it("Bad Habit", () => {
        let badHabit: IHabitScore = new BadScore(score);
        expect(badHabit.getScore()).toEqual(-1 * score.getScore());
    });

});