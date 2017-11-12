import MongoRepository from "../src/Repositories/MongoRepository";
import Habit from "../src/Models/Habit";

let repository: MongoRepository;
let result: boolean;
const baseTestHabit: Habit = {
    difficulty: "medium",
    duration: {
        hours: 2,
        minutes: 30
    },
    title: "Test Habit",
    type: "both",
    userId: "chrismarquez"
};

describe("Tests for MongoRepository", () => {

    beforeAll(async () => repository = await MongoRepository.getInstance());

    beforeEach(async () => result = await repository.create(baseTestHabit.userId, baseTestHabit));

    afterEach(async () => await repository.delete(baseTestHabit.userId, baseTestHabit.title));

    it("Create Habit", async () => {
        expect(result).toEqual(true);
    });

    it("Read Habit", async () => {
        const databaseHabit = await repository.get(baseTestHabit.userId, baseTestHabit.title);
        expect(databaseHabit).toEqual(baseTestHabit);
    })

    it("Update Habit", async () => {
        let localHabit: Habit = await repository.get(
            baseTestHabit.userId,
            baseTestHabit.title
        );
        localHabit.difficulty = "hard";
        localHabit.type = "good";
        const result = await repository.update(
            localHabit.userId,
            localHabit
        );
        expect(result).toEqual(true);
        let databaseHabit = await repository.get(
            baseTestHabit.userId,
            baseTestHabit.title
        );
        expect(databaseHabit).toEqual(localHabit);
    });

    it("Delete Habit", async () => {
        let localHabit: Habit = await repository.get(
            baseTestHabit.userId,
            baseTestHabit.title
        );
        localHabit.title  = "Another habit";
        await repository.create(
            localHabit.userId,
            localHabit
        );
        let count = (await repository.getAll(baseTestHabit.userId)).length;
        expect(count).toEqual(2);
        const result = await repository.delete(
            localHabit.userId,
            localHabit.title
        );
        count = (await repository.getAll(baseTestHabit.userId)).length;
        expect(count).toEqual(1);
    });

});