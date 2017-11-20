import { readSync } from "fs";
import IHabitScore from "../IHabitScore";
import BlueRange from "./BlueRange";
import GreenRange from "./GreenRange";
import IScoreRange from "./IScoreRange";
import OrangeRange from "./OrangeRange";
import RedRange from "./RedRange";
import YellowRange from "./YellowRange";

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
