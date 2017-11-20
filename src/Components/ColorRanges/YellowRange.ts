import IScoreRange from "./IScoreRange";

export default class YellowRange extends IScoreRange {

    public getDeltaScore(): number {
        return this.habitScore.getScore();
    }

}
