import fetch from "node-fetch";
import Habit from "../Models/Habit";

export default class ReportNotifier {

    public static async newHabit(habit: Habit) {
        fetch(ReportNotifier.url, {
            "body": JSON.stringify(habit),
            "headers": ReportNotifier.headers,
            "method": "POST"
        })
        .catch(err => console.error(err));
    }

    public static async updateHabit(habit: Habit) {
        fetch(ReportNotifier.url, {
            "body": JSON.stringify(habit),
            "headers": ReportNotifier.headers,
            "method": "PUT"
        })
        .catch(err => console.error(err));
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
        })
        .catch(err => console.error(err));
    }

    private static readonly url: string = "memogcia.me";
    private static get headers(): any {
        const headers: any = {};
        headers["Content-Type"] = "application/json";
        return headers;
    }

}
