
import GoodHabit from "../src/Components/GoodHabit";

let goodHabit: GoodHabit;
const baseScore = 2;

describe("GoodHabit Test", () => {
    beforeEach(() => goodHabit = new GoodHabit({ getBaseScore: () => baseScore }));
    it("Get Score", () => {
        let score = goodHabit.getScore();
        expect(score).toBe(0);
    });

    it("Mark as Done", () => {
        goodHabit.markDone();
        let score = goodHabit.getScore();
        expect(score).toBe(2);
        goodHabit.markDone();
        score = goodHabit.getScore();
        expect(score).toBe(4);
    });

});