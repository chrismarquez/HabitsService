import fetch from "node-fetch";
import { Headers } from "request";
import Habit from "../Models/Habit";

export default class ReportNotifier {

    public static async newHabit(habit: Habit) {
        return await fetch(ReportNotifier.url, {
            "body": JSON.stringify(habit),
            "headers": ReportNotifier.headers,
            "method": "POST"
        });
    }

    public static async updateHabit(habit: Habit) {
        return await fetch(ReportNotifier.url, {
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
        return await fetch(ReportNotifier.url, {
            "body": JSON.stringify(payload),
            "headers": ReportNotifier.headers,
            "method": "POST"
        });
    }

    private static readonly url: string = "";
    private static get headers(): Headers {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        return headers;
    }

}