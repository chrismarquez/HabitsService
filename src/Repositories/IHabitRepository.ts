import Habit from "../Models/Habit"

export default interface IHabitRepository {
    getAll(userId: string): Promise<Habit[]>;
    get(userId: string, title: string): Promise<Habit>;
    create(userId: string, habit: Habit): Promise<boolean>;
    update(userId: string, habit: Habit): Promise<boolean>;
    delete(userId: string, title: string): Promise<boolean>;
}