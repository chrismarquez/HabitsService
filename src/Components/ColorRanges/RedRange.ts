import IScoreRange from "./IScoreRange";
import GoodScore from "../GoodScore";
import BadScore from "../BadScore";


export default class RedRange extends IScoreRange {

    public getDeltaScore(): number {
        switch(this.habitScore.constructor) {
        case GoodScore:
            return this.habitScore.getScore();
        case BadScore:
            return this.habitScore.getScore() * 2;
        default:
            throw new Error("Unsupported");
        }
    }
    
}