
import * as Express from "express";
import Habit from "../Models/Habit";

import exceptionally from "../Errors/Exceptionally";
import IHabitRepository from "../Repositories/IHabitRepository";
import RepositorySelector from "../Repositories/RepositorySelector";

const router: Express.Router = Express.Router();

router.get("/:title", (req, res) => exceptionally(res, async () => {
    const title = req.params.title as string;
    console.log(title);
    const userId = req.header("userId") as string;
    const repository: IHabitRepository = await RepositorySelector.repository;
    const habit: Habit = await repository.get(userId, title);
    res.statusCode = 200;
    res.json(habit);
}));

router.delete("/:title", (req, res) => exceptionally(res, async () => {
    const title = req.params.title as string;
    const userId = req.header("userId") as string;
    const repository: IHabitRepository = await RepositorySelector.repository;
    await repository.delete(userId, title);
    res.statusCode = 204;
    res.end();
}));

router.put("/:title", (req, res) => exceptionally(res, async () => {
    const title = req.params.title as string;
    const habit: Habit = req.body;
    const repository: IHabitRepository = await RepositorySelector.repository;
    const currentHabit: Habit = await repository.get(habit.userId, title);
    habit.color = currentHabit.color;
    habit.score = currentHabit.score;
    await repository.update(habit.userId, habit);
    res.statusCode = 201;
    res.end();
}));

export default router;
