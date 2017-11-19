import IHabitScore from "../src/Components/IHabitScore";
import BaseHabitScore from "../src/Components/BaseHabitScore";
import RangeFactory from "../src/Components/ColorRanges/RangeFactory";
import IScoreRange from "../src/Components/ColorRanges/IScoreRange";
import BlueScore from "../src/Components/ColorRanges/BlueRange";
import MediumScore from "../src/Components/MediumScore";
import GoodScore from "../src/Components/GoodScore";
import BadScore from "../src/Components/BadScore";
import HardScore from "../src/Components/HardScore";


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
        let goodCustomHabit: IHabitScore = new GoodScore(mediumHabit);
        let badCustomHabit: IHabitScore = new BadScore(mediumHabit);
        let range: IScoreRange = RangeFactory.create(goodCustomHabit, currentScore);
        expect(range.getDeltaScore()).toEqual(1);
        range = RangeFactory.create(badCustomHabit, currentScore);
        expect(range.getDeltaScore()).toEqual(-4);
    });

    it("GreenRange", () => {
        let currentScore = 43;
        let hardHabit: IHabitScore = new HardScore(score);
        let goodCustomHabit: IHabitScore = new GoodScore(hardHabit);
        let badCustomHabit: IHabitScore = new BadScore(hardHabit);
        let range: IScoreRange = RangeFactory.create(goodCustomHabit, currentScore);
        expect(range.getDeltaScore()).toEqual(3);
        range = RangeFactory.create(badCustomHabit, currentScore);
        expect(range.getDeltaScore()).toEqual(-6);
    });

});