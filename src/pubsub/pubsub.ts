import { PubSub } from "@google-cloud/pubsub";

// Ref: https://cloud.google.com/pubsub/docs/publisher

process.env.GOOGLE_APPLICATION_CREDENTIALS = "./credentials/access.json";
const client = new PubSub();

export async function publishMessage(
  topic: string,
  data: string | object
): Promise<string> {
  const dataBuffer = Buffer.from(data);
  const messageId = await client.topic(topic).publish(dataBuffer);
  return messageId;
}

export async function listenForMessages(
  subscriptionName: string,
  timeout = 60,
  cb: (m: string) => void
): Promise<any> {
  const subscription = client.subscription(subscriptionName);

  // Create an event handler to handle messages
  let messageCount = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messageHandler = (message: {
    id: string;
    data: any;
    attributes: any;
    ack: () => void;
  }) => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);
    messageCount += 1;

    // "Ack" (acknowledge receipt of) the message
    message.ack();
    cb(`message: ${message.data}`);
  };

  // Listen for new messages until timeout is hit
  subscription.on("message", messageHandler);

  setTimeout(() => {
    subscription.removeListener("message", messageHandler);
    console.log(`${messageCount} message(s) received.`);
    cb(`message: ${messageCount}`);
  }, timeout * 1000);
}

export async function DeleteTopic(topicName: string) {
  //const topicName = 'topic-npubsub';
  const [topic] = await client.topic(topicName).delete();
  return topic;
}

export async function CreateTopic(topicName: string) {
  const [topic] = await client.createTopic(topicName);
  return topic;
}

export async function CreateTopicSubscription() {
  const topicName = "topic-npubsub";
  const subscriptionName = "sub-npubsub";

  const [sub] = await client
    .topic(topicName)
    .createSubscription(subscriptionName);
  console.log(`Subscription ${subscriptionName} created.`);
  return sub;
}
