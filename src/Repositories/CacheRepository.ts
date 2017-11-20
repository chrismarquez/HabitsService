import ConflictError from "../Errors/ConflictError";
import NotFoundError from "../Errors/NotFoundError";
import Habit from "../Models/Habit";
import IHabitRepository from "./IHabitRepository";

export default class CacheRepository implements IHabitRepository {

    public static getInstance(): Promise<CacheRepository> {
        if (CacheRepository.instance === undefined) {
            CacheRepository.instance = new CacheRepository();
        }
        return Promise.resolve(CacheRepository.instance);
    }

    private static instance: CacheRepository;

    private allHabits: Habit[];

    private constructor() {
        this.allHabits = [];
    }

    public getAll(userId: string): Promise<Habit[]> {
        const userHabits: Habit[] = [];
        this.allHabits.forEach(habit => {
            if (habit.userId === userId) {
                userHabits.push(habit);
            }
        });
        return Promise.resolve(userHabits);
    }

    public get(userId: string, title: string): Promise<Habit> {
        for (const habit of this.allHabits) {
            const correctUser = habit.userId === userId;
            const correctTitle = habit.title === title;
            if (correctTitle && correctUser) {
                const copy = JSON.parse(JSON.stringify(habit));
                return Promise.resolve(copy);
            }
        }
        throw new NotFoundError("Habit does not exist");
    }

    public create(userId: string, habit: Habit): Promise<boolean> {
        const habitExists = this.habitExists(userId, habit.title);
        if (habitExists) throw new ConflictError("Habit already exists");
        const copy = JSON.parse(JSON.stringify(habit));
        this.allHabits.push(copy);
        return Promise.resolve(true);
    }

    public async update(userId: string, habit: Habit): Promise<boolean> {
        const habitExists = this.habitExists(userId, habit.title);
        if (!habitExists) throw new NotFoundError("Habit does not exist");
        await this.delete(userId, habit.title);
        await this.create(userId, habit);
        return Promise.resolve(true);
    }

    public async delete(userId: string, title: string): Promise<boolean> {
        const habitExists = this.habitExists(userId, title);
        if (!habitExists) throw new NotFoundError("Habit does not exist");
        const index = this.allHabits.findIndex(habit => {
            const correctUser = habit.userId === userId;
            const correctTitle = habit.title === title;
            return correctTitle && correctUser;
        });
        this.allHabits.splice(index, 1);
        return Promise.resolve(true);
    }

    private habitExists(userId: string, title: string): boolean {
        for (const habit of this.allHabits) {
            const correctUser = habit.userId === userId;
            const correctTitle = habit.title === title;
            if (correctTitle && correctUser) return true;
        }
        return false;
    }

}
