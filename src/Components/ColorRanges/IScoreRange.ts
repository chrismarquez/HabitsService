import IHabitScore from "../IHabitScore";


export default abstract class IScoreRange {

    protected readonly habitScore: IHabitScore;
    
    public constructor(habitScore: IHabitScore) {
        this.habitScore = habitScore;
    }
    
    public abstract getDeltaScore(): number;
    
    public getColor(): string {
        return this.constructor.name;
    }
}