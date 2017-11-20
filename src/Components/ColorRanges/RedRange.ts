import BadScore from "../BadScore";
import GoodScore from "../GoodScore";
import IScoreRange from "./IScoreRange";

export default class RedRange extends IScoreRange {

    public getDeltaScore(): number {
        switch (this.habitScore.constructor) {
        case GoodScore:
            return this.habitScore.getScore();
        case BadScore:
            return this.habitScore.getScore() * 2;
        default:
            throw new Error("Unsupported");
        }
    }

}
