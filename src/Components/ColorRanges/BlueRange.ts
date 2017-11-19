import IScoreRange from "./IScoreRange"
import GoodScore from "../GoodScore"
import BadScore from "../BadScore"

export default class BlueRange extends IScoreRange {
    
    public getDeltaScore(): number {
        switch(this.habitScore.constructor) {
        case GoodScore:
            return 1;
        case BadScore:
            return this.habitScore.getScore();
        default:
            throw new Error("Unsupported");
        }
    }
}