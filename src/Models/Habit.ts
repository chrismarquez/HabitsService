
export default interface Habit {
    userId: string;
    title: string;
    duration: Duration;
    difficulty: string;
    type: string;
}

interface Duration {
    hours: number;
    minutes: number;
}