import IScoreRange from "./IScoreRange";
import IHabitScore from "../IHabitScore";
import BlueRange from "./BlueRange"
import GreenRange from "./GreenRange";
import YellowRange from "./YellowRange";
import OrangeRange from "./OrangeRange";
import { readSync } from "fs";
import RedRange from "./RedRange";

export default class RangeFactory {

    public static create(habitScore: IHabitScore, currentScore: number): IScoreRange {
        if (currentScore > 50) {
            return new BlueRange(habitScore);
        } else if (currentScore > 40) {
            return new GreenRange(habitScore);
        } else if (currentScore > 10) {
            return new YellowRange(habitScore);
        } else if (currentScore > 0) {
            return new OrangeRange(habitScore);
        } else {
            return new RedRange(habitScore);
        }
    }

}