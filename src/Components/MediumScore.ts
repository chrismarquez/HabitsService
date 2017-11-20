
import DecoratorScore from "./DecoratorScore";

export default class MediumScore extends DecoratorScore {

    public getScore(): number {
        return 4 * this.habitScore.getScore();
    }

}
