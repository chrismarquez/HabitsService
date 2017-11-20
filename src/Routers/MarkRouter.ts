
import * as Express from "express";
import ScoreMarker from "../Components/ScoreMaker";
import exceptionally from "../Errors/Exceptionally";
import IHabitRepository from "../Repositories/IHabitRepository";
import MongoRepository from "../Repositories/MongoRepository";
import RepositorySelector from "../Repositories/RepositorySelector";

const router: Express.Router = Express.Router();

router.put("/:title", (req, res) => exceptionally(res, async () => {
    const userId = req.body.userId as string;
    const title = req.params.title as string;
    const completed = req.body.completed as boolean;
    await ScoreMarker.habitCompleted(userId, title, completed);
    const repository = await RepositorySelector.repository;
    res.statusCode = 200;
    const markedHabit = await repository.get(userId, title);
    res.json(markedHabit);
}));

export default router;
