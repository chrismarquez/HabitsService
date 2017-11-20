import BadScore from "../src/Components/BadScore";
import BaseHabitScore from "../src/Components/BaseHabitScore";
import BlueScore from "../src/Components/ColorRanges/BlueRange";
import IScoreRange from "../src/Components/ColorRanges/IScoreRange";
import RangeFactory from "../src/Components/ColorRanges/RangeFactory";
import EasyScore from "../src/Components/EasyScore";
import GoodScore from "../src/Components/GoodScore";
import HardScore from "../src/Components/HardScore";
import IHabitScore from "../src/Components/IHabitScore";
import MediumScore from "../src/Components/MediumScore";

let score: IHabitScore;

describe("Score Ranges", () => {

    beforeAll(() => score = new BaseHabitScore());

    it("Range Factory", () => {
        let range: IScoreRange = RangeFactory.create(score, 55);
        expect(range.getColor()).toEqual("BlueRange");
        range = RangeFactory.create(score, 42);
        expect(range.getColor()).toEqual("GreenRange");
        range = RangeFactory.create(score, 26);
        expect(range.getColor()).toEqual("YellowRange");
        range = RangeFactory.create(score, 3);
        expect(range.getColor()).toEqual("OrangeRange");
        range = RangeFactory.create(score, -9);
        expect(range.getColor()).toEqual("RedRange");
    });

    it("BlueRange", () => {
        const currentScore = 56;
        const mediumHabit: IHabitScore = new MediumScore(score);
        testOfGoodAndBad(mediumHabit, currentScore, 1, -4);
    });

    it("GreenRange", () => {
        const currentScore = 43;
        const hardHabit: IHabitScore = new HardScore(score);
        testOfGoodAndBad(hardHabit, currentScore, 3, -6);
    });

    it("YellowRange", () => {
        const currentScore = 22;
        const easyHabit: IHabitScore = new EasyScore(score);
        testOfGoodAndBad(easyHabit, currentScore, 2, -2);
    });

    it("OrangeRange", () => {
        const currentScore = 8;
        const hardHabit: IHabitScore = new HardScore(score);
        testOfGoodAndBad(hardHabit, currentScore, 6, -9);
    });

    it("RedRange", () => {
        const currentScore = -5;
        const mediumHabit: IHabitScore = new MediumScore(score);
        testOfGoodAndBad(mediumHabit, currentScore, 4, -8);
    });

    function testOfGoodAndBad(
        habit: IHabitScore,
        currentScore: number,
        expectedGoodDelta: number,
        expectedBadDelta: number
    ): void {
        const goodCustomHabit: IHabitScore = new GoodScore(habit);
        const badCustomHabit: IHabitScore = new BadScore(habit);
        let range: IScoreRange = RangeFactory.create(goodCustomHabit, currentScore);
        expect(range.getDeltaScore()).toEqual(expectedGoodDelta);
        range = RangeFactory.create(badCustomHabit, currentScore);
        expect(range.getDeltaScore()).toEqual(expectedBadDelta);
    }

});
