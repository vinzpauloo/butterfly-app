import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from "@pusher/pusher-websocket-react-native";

const pusher = Pusher.getInstance();

const initializePusher = () => {
  const pusherInitialization = async (
    channelName: string,
    callback: (data: any) => void
  ) => {
    console.log("@@ Initializing pusher ...");

    await pusher.init({
      apiKey: "f9aaec2a9032709a666e",
      cluster: "ap1",
    });
    await pusher.connect();

    await pusher.subscribe({
      channelName,
      onEvent: (event: PusherEvent) => {
        callback(event);
        console.log(`Event received: ${event}`);
      },
      onSubscriptionSucceeded: (data: any) => {
        console.log("Subscription success", data);
      },
      onSubscriptionError: (channelName: string, message: string, e: any) => {
        console.log("Subscription failed");
        console.log(`channelName ${channelName}`);
        console.log(`message ${message}`);
        console.log(e);
      },
    });

    console.log("@@ Pusher initialized!");
  };

  return { pusherInitialization };
};

export default initializePusher;
