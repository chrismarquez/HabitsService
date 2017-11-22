import fetch from "node-fetch";
import Habit from "../Models/Habit";

export default class ReportNotifier {

    public static async newHabit(habit: Habit) {
        fetch(ReportNotifier.url, {
            "body": JSON.stringify(habit),
            "headers": ReportNotifier.headers,
            "method": "POST"
        });
    }

    public static async updateHabit(habit: Habit) {
        fetch(ReportNotifier.url, {
            "body": JSON.stringify(habit),
            "headers": ReportNotifier.headers,
            "method": "PUT"
        });
    }

    public static async deleteHabit(userId: string, title: string) {
        const payload: any =  {
            "title": title,
            "userId": userId
        };
        fetch(ReportNotifier.url, {
            "body": JSON.stringify(payload),
            "headers": ReportNotifier.headers,
            "method": "POST"
        });
    }

    private static readonly url: string = "memogcia.me";
    private static get headers(): any {
        const headers: any = {};
        headers["Content-Type"] = "application/json";
        return headers;
    }

}
