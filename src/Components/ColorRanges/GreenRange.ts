import BadScore from "../BadScore";
import GoodScore from "../GoodScore";
import IScoreRange from "./IScoreRange";

export default class GreenRange extends IScoreRange {

    public getDeltaScore(): number {
        switch (this.habitScore.constructor) {
        case GoodScore:
            return this.habitScore.getScore() / 2;
        case BadScore:
            return this.habitScore.getScore();
        default:
            throw new Error("Unsupported");
        }
    }

}
