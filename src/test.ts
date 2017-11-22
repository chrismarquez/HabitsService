import MessageQueue from "./Repositories/MessageQueue";

async function main(): Promise<void> {
    const payload = {
        hello: "there"
    };
    await MessageQueue.send(JSON.stringify(payload));
    const message = await MessageQueue.receive();
    console.log(JSON.parse(message));
}

main();
