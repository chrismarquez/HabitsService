import IHabitRepository from "./IHabitRepository";

import MongoDatabase from "../DatabaseDriver/MongoDatabase";

import Habit from "../Models/Habit";

import ConflictError from "../Errors/ConflictError";
import NotFoundError from "../Errors/NotFoundError";

export default class MongoRepository implements IHabitRepository {

    public static async getInstance(): Promise<MongoRepository> {
        if (MongoRepository.instance === undefined) {
            MongoRepository.instance = new MongoRepository();
            await MongoDatabase.connect(MongoRepository.instance.databaseName);
        }
        return MongoRepository.instance;
    }

    private static instance: MongoRepository;

    private readonly databaseName: string = "planning";
    private readonly collectionName: string = "habits";

    private constructor() {

    }

    public async getAll(userId: string): Promise<Habit[]> {
        const habits: Habit[] = await MongoDatabase.read({
            "userId": userId
        }, this.collectionName);
        habits.forEach((habit: any) => delete habit._id);
        return habits;
    }

    public async get(userId: string, title: string): Promise<Habit> {
        const habitExists = await this.habitExists(userId, title);
        if (!habitExists) throw new NotFoundError("Habit does not exist");
        const habits: Habit[] = await MongoDatabase.read({
            "title": title,
            "userId": userId
        }, this.collectionName);
        const habit = habits[0] as any;
        delete habit._id;
        return habit as Habit;
    }

    public async create(userId: string, habit: Habit): Promise<boolean> {
        const copy = JSON.parse(JSON.stringify(habit));
        const habitExists = await this.habitExists(userId, copy.title);
        if (habitExists) throw new ConflictError("Habit already exists");
        return await MongoDatabase.create(copy, this.collectionName);
    }

    public async update(userId: string, habit: Habit): Promise<boolean> {
        const habitExists = await this.habitExists(userId, habit.title);
        if (!habitExists) { throw new NotFoundError("Habit does not exist"); }
        return await MongoDatabase.update({
            "title": habit.title,
            "userId": userId
        }, habit, this.collectionName);
    }

    public async delete(userId: string, title: string): Promise<boolean> {
        const habitExists = await this.habitExists(userId, title);
        if (!habitExists) { throw new NotFoundError("Habit does not exist"); }
        const result = await MongoDatabase.delete({
            "title": title,
            "userId": userId
        }, this.collectionName);
        return result === 1;
    }

    private async habitExists(userId: string, title: string): Promise<boolean> {
        return await MongoDatabase.exists({
            "title": title,
            "userId": userId
        }, this.collectionName);
    }

}
