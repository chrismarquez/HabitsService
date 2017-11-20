import Habit from "../Models/Habit"
import IHabitRepository from "../Repositories/IHabitRepository";
import RepositorySelector from "../Repositories/RepositorySelector";
import IHabitScore from "./IHabitScore";
import GoodScore from "./GoodScore";
import EasyScore from "./EasyScore";
import MediumScore from "./MediumScore";
import HardScore from "./HardScore";
import BaseHabitScore from "./BaseHabitScore";
import BadScore from "./BadScore";
import IScoreRange from "./ColorRanges/IScoreRange";
import RangeFactory from "./ColorRanges/RangeFactory";


export default class ScoreMarker {

    public static async habitCompleted(
        userId: string, 
        title: string, 
        completed: boolean
    ): Promise<void> {
        const repository: IHabitRepository = await RepositorySelector.repository;
        const currentHabit = await repository.get(userId, title);
        let habitScore: IHabitScore = new BaseHabitScore();
        habitScore = ScoreMarker.selectDifficulty(habitScore, currentHabit);
        habitScore = ScoreMarker.selectGoodness(habitScore, currentHabit);
        const scoreRange: IScoreRange = RangeFactory.create(habitScore, currentHabit.score);
        currentHabit.score += scoreRange.getDeltaScore();
        currentHabit.color = RangeFactory.create(habitScore, currentHabit.score).getColor();
        await repository.update(userId, currentHabit);
    }

    private static selectDifficulty(habitScore: IHabitScore, habit: Habit): IHabitScore {
        switch(habit.difficulty) {
        case "easy":
            return new EasyScore(habitScore);
        case "medium":
            return new MediumScore(habitScore);
        case "hard":
            return new HardScore(habitScore);
        default: 
            throw new Error("Unsupported");
        }
    }

    private static selectGoodness(habitScore: IHabitScore, habit: Habit): IHabitScore {
        switch(habit.type) {
        case "good":
            return new GoodScore(habitScore);
        case "bad":
            return new BadScore(habitScore);
        default: 
            throw new Error("Unsupported");
        }
    }

}