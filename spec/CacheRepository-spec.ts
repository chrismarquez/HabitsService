import Habit from "../src/Models/Habit";
import CacheRepository from "../src/Repositories/CacheRepository";

let repository: CacheRepository;
let result: boolean;
const baseTestHabit: Habit = {
    color: "YellowRange",
    difficulty: "medium",
    score: 20,
    title: "Test Habit",
    type: "both",
    userId: "chrismarquez"
};

describe("Tests for CacheRepository", () => {

    beforeAll(async () => repository = await CacheRepository.getInstance());

    beforeEach(async () => result = await repository.create(baseTestHabit.userId, baseTestHabit));

    afterEach(async () => await repository.delete(baseTestHabit.userId, baseTestHabit.title));

    it("Create Habit", async () => {
        expect(result).toEqual(true);
    });

    it("Read Habit", async () => {
        const databaseHabit = await repository.get(baseTestHabit.userId, baseTestHabit.title);
        expect(databaseHabit).toEqual(baseTestHabit);
    });

    it("Update Habit", async () => {
        const localHabit: Habit = await repository.get(
            baseTestHabit.userId,
            baseTestHabit.title
        );
        localHabit.difficulty = "hard";
        localHabit.type = "good";
        const updateResult = await repository.update(
            localHabit.userId,
            localHabit
        );
        expect(updateResult).toEqual(true);
        const databaseHabit = await repository.get(
            baseTestHabit.userId,
            baseTestHabit.title
        );
        expect(databaseHabit).toEqual(localHabit);
    });

    it("Delete Habit", async () => {
        const localHabit: Habit = await repository.get(
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
        const deleteResult = await repository.delete(
            localHabit.userId,
            localHabit.title
        );
        count = (await repository.getAll(baseTestHabit.userId)).length;
        expect(count).toEqual(1);
    });

});
