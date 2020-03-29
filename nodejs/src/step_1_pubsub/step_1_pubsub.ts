
import { PubSub, Message } from '@google-cloud/pubsub';

const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;

// TODO(masabrina): change subscription name to codelab
const SUBSCRIPTION_NAME = 'masabrina-codelab'


async function main() {
  // Get the subscription object.
  const pubsub = new PubSub({projectId: GOOGLE_CLOUD_PROJECT});
  const subscription = pubsub.subscription(SUBSCRIPTION_NAME);

  console.log(`Listening for messages on ${subscription.name}`);
  console.log(`Exit with Ctrl-\\`);

  // Register a listener for `message` events.
  const messageHandler = (message: Message) => {
    console.log(`Received message ${message.id}:`);
    console.log(`${message.data}`);

    // Ack (acknowledge receipt of) message.
    message.ack();
  };

  subscription.on('message', messageHandler);
  subscription.on('error', (error) => {console.log(error)});
};

main();