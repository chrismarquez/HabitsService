
export default interface Habit {
    userId: string;
    title: string;
    difficulty: string;
    type: string;
    score: number;
    color: string;
    data?: string;
}
