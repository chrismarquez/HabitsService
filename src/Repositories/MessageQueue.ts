import * as Azure from "azure";

export default class MessageQueue {

    public static async connect(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            MessageQueue.serviceBus.createQueueIfNotExists(
                MessageQueue.queueName,
                (err) => err ? reject() : resolve()
            );
        });
    }

    public static async send(message: any): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            MessageQueue.serviceBus.sendQueueMessage(
                MessageQueue.queueName,
                message,
                (err) => err ? reject() : resolve()
            );
        });
    }

    public static async receive(): Promise<any> {
        return new Promise<void>((resolve, reject) => {
            MessageQueue.serviceBus.receiveQueueMessage(
                MessageQueue.queueName,
                (err, message) => err ? reject() : resolve(message.body)
            );
        });
    }

    private static connectionString = "Endpoint=sb://planning.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=BkvFUTrySdRH9cphmJOMGAlL6Am5EFRdImPA9wC7C5s=";
    private static queueName = "test";
    private static serviceBus = Azure.createServiceBusService(MessageQueue.connectionString);

}
