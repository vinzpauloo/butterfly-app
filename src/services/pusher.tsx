import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from "@pusher/pusher-websocket-react-native";

const pusher = Pusher.getInstance();

export const initializePusher = async () => {
  console.log("Initializing pusher ...");

  // await pusher.init({
  //   apiKey: "921682a15d6e7db468a3",
  //   cluster: "ap1",
  // });

  await pusher.init({
    apiKey: "abcd",
    cluster: "mt1",
    authEndpoint: "http://192.168.50.205/broadcasting/auth",
  });

  await pusher.connect();
  await pusher.subscribe({
    channelName: "Test-Channel",
    onEvent: (event: PusherEvent) => {
      console.log(`Event received: ${event}`);
    },
    onSubscriptionSucceeded: (data: any) => {
      console.log("Subscription success");
      console.log(data);
    },
    onSubscriptionError: (channelName: string, message: string, e: any) => {
      console.log("Subscription failed");
      console.log(`channelName ${channelName}`);
      console.log(`message ${message}`);
      console.log(e);
    },
  });

  console.log("Pusher initialized!");
};
