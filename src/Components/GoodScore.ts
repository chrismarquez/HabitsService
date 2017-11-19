import DecoratorScore from "./DecoratorScore";

export default class GoodScore extends DecoratorScore {
    
    public getScore(): number {
        return this.habitScore.getScore();
    }

}