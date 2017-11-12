import DecoratorScore from "./DecoratorScore";

export default class BadScore extends DecoratorScore {

    public getScore(): number {
        return -1 * this.habitScore.getScore();
    }

}