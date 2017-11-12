import DecoratorScore from "./DecoratorScore";

export default class HardScore extends DecoratorScore { 

    public getScore(): number {
        return 6 * this.habitScore.getScore();
    }

}