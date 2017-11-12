import IScoreRange from "./IScoreRange";
import IHabitScore from "./IHabitScore";
import BadScore from "./BadScore";
import GoodScore from "./GoodScore";

export default class RangeFactory {

    public static create(habitScore: IHabitScore, cur: number): IScoreRange {
        let score = habitScore.getScore();
        if (score > 50) {
            return new BlueScore(habitScore);
        }
        return new BlueScore(habitScore);
    }

}

class BlueScore extends IScoreRange {

    public getScore(): number {
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