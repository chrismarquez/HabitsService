import IHabitScore from "../src/Components/IHabitScore";
import BaseHabitScore from "../src/Components/BaseHabitScore";
import RangeFactory from "../src/Components/ColorRanges/RangeFactory";
import IScoreRange from "../src/Components/ColorRanges/IScoreRange";
import BlueScore from "../src/Components/ColorRanges/BlueRange";
import MediumScore from "../src/Components/MediumScore";
import GoodScore from "../src/Components/GoodScore";
import BadScore from "../src/Components/BadScore";
import HardScore from "../src/Components/HardScore";
import EasyScore from "../src/Components/EasyScore";
import { currentId } from "async_hooks";


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
        let currentScore = 56;
        let mediumHabit: IHabitScore = new MediumScore(score);
        testOfGoodAndBad(mediumHabit, currentScore, 1, -4);
    });

    it("GreenRange", () => {
        let currentScore = 43;
        let hardHabit: IHabitScore = new HardScore(score);
        testOfGoodAndBad(hardHabit, currentScore, 3, -6);
    });

    it("YellowRange", () => {
        let currentScore = 22;
        let easyHabit: IHabitScore = new EasyScore(score);
        testOfGoodAndBad(easyHabit, currentScore, 2, -2);
    });

    it("OrangeRange", () => {
        let currentScore = 8;
        let hardHabit: IHabitScore = new HardScore(score);
        testOfGoodAndBad(hardHabit, currentScore, 6, -9);
    });

    it("RedRange", () => {
        let currentScore = -5;
        let mediumHabit: IHabitScore = new MediumScore(score);
        testOfGoodAndBad(mediumHabit, currentScore, 4, -8);
    });

    function testOfGoodAndBad(
        habit: IHabitScore,
        currentScore: number, 
        expectedGoodDelta: number,
        expectedBadDelta: number
    ): void {
        let goodCustomHabit: IHabitScore = new GoodScore(habit);
        let badCustomHabit: IHabitScore = new BadScore(habit);
        let range: IScoreRange = RangeFactory.create(goodCustomHabit, currentScore);
        expect(range.getDeltaScore()).toEqual(expectedGoodDelta);
        range = RangeFactory.create(badCustomHabit, currentScore);
        expect(range.getDeltaScore()).toEqual(expectedBadDelta);
    }

});