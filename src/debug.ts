import BaseHabitScore from "./Components/BaseHabitScore";
import IHabitScore from "./Components/IHabitScore";
import MediumScore from "./Components/MediumScore";
import BadScore from "./Components/BadScore";
import IScoreRange from "./Components/IScoreRange";
import RangeFactory from "./Components/ColorRanges/RangeFactory";


let score: IHabitScore = new BaseHabitScore();
score = new MediumScore(score);
score = new BadScore(score);

let scoreRange: IScoreRange = RangeFactory.create(score, 30);

console.log(scoreRange.getColor());
console.log(scoreRange.getScore());