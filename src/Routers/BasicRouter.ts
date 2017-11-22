
import * as Express from "express";
import IHabitRepository from "../Repositories/IHabitRepository";
import RepositorySelector from "../Repositories/RepositorySelector";

import Habit from "../Models/Habit";

import ConflictError from "../Errors/ConflictError";
import exceptionally from "../Errors/Exceptionally";
import NotFoundError from "../Errors/NotFoundError";
import UnauthorizedError from "../Errors/UnauthorizedError";
import ReportNotifier from "../Repositories/ReportNotifier";

const router: Express.Router = Express.Router();

router.get("/", (req, res) => exceptionally(res, async () => {
    const userId = req.header("userId") as string;
    if (userId === undefined) throw new UnauthorizedError("userId not provided");
    const repository: IHabitRepository = await RepositorySelector.repository;
    const habits = await repository.getAll(userId);
    res.statusCode = 200;
    res.json(habits);
}));

router.post("/", (req, res) => exceptionally(res, async () => {
    const habit: Habit = req.body;
    habit.score = 10;
    habit.color = "OrangeRange";
    ReportNotifier.newHabit(habit).then(ack => console.log(ack));
    const repository: IHabitRepository = await RepositorySelector.repository;
    const result = await repository.create(habit.userId, habit);
    res.statusCode = 204;
    res.end();
}));

export default router;
