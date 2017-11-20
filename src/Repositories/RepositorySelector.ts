import IHabitRepository from "./IHabitRepository";
import MongoRepository from "./MongoRepository";

export default class RepositorySelector {

    private static readonly storageOption: number = 2;

    public static get repository(): Promise<IHabitRepository> {
        switch (process.argv[RepositorySelector.storageOption]) {
        case "storage":
            return MongoRepository.getInstance();
        default:
            throw new Error("Unsupported");
        }
    }

}
