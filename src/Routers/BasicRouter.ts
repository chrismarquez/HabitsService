
import * as Express from "express"
import IHabitRepository from "../Repositories/IHabitRepository";
import Habit from "../Models/Habit";
import ConflictError from "../Errors/ConflictError";
import NotFoundError from "../Errors/NotFoundError";
import exceptionally from "../Errors/Exceptionally"
import RepositorySelector from "../Repositories/RepositorySelector";
import UnauthorizedError from "../Errors/UnauthorizedError";

let router: Express.Router = Express.Router();

router.get("/", (req, res) => exceptionally(res, async () => {
    let userId = req.header("userId") as string;
    if (userId == undefined) throw new UnauthorizedError("userId not provided");
    let repository: IHabitRepository = await RepositorySelector.repository;
    let habits = await repository.getAll(userId);
    res.statusCode = 200;
    res.json(habits);
}));

router.post("/", (req, res) => exceptionally(res, async () => {
    let habit: Habit = req.body;
    habit.score = 10;
    habit.color = "OrangeRange";
    let repository: IHabitRepository = await RepositorySelector.repository;
    let result = await repository.create(habit.userId, habit);
    res.statusCode = 204;
    res.end();
}));

export default router;