import IHabitScore from "./IHabitScore";

export default abstract class DecoratorScore implements IHabitScore {

    protected readonly habitScore: IHabitScore;

    public constructor(habitScore: IHabitScore) {
        this.habitScore = habitScore;
    }

    public abstract getScore(): number;

}
