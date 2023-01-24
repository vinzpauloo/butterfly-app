import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from "@pusher/pusher-websocket-react-native";

const pusher = Pusher.getInstance();

export const initializePusher = async () => {
  console.log("Initializing pusher ...");

  await pusher.init({
    apiKey: "921682a15d6e7db468a3",
    cluster: "ap1",
  });

  await pusher.connect();
  await pusher.subscribe({
    channelName: "my-channel",
    onEvent: (event: PusherEvent) => {
      console.log(`Event received: ${event}`);
    },
  });

  console.log("Pusher initialized!");
};
