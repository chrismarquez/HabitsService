import IHabitScore from "./IHabitScore";

export default class BaseHabitScore implements IHabitScore {

    public getScore(): number {
        return 1;
    }

}
