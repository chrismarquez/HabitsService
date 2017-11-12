
import DecoratorScore from "./DecoratorScore";


export default class EasyScore extends DecoratorScore {

    public getScore(): number {
        return 2 * this.habitScore.getScore();
    }

}