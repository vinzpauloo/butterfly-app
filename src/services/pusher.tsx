import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from "@pusher/pusher-websocket-react-native";

const pusher = Pusher.getInstance();

const initializePusher = () => {
  const pusherInitialization = async () => {
    console.log("Initializing pusher ...");

    await pusher.init({
      apiKey: "6b6a1e3f7013fd890234",
      cluster: "ap1",
    });
    await pusher.connect();

    console.log("Pusher initialized!");
  };

  const subscribeToChannel = async (
    channelName: string,
    callback: (data: any) => void
  ) => {
    const channel = await pusher.subscribe({
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
  };

  const practicePusher = async (id) => {
    console.log("Initializing pusher ...");
    // await pusher.init({
    //   apiKey: "921682a15d6e7db468a3",
    //   cluster: "ap1",
    // });

    // await pusher.init({
    //   apiKey: "abcd",
    //   cluster: "mt1",
    //   authEndpoint: "http://192.168.50.205/broadcasting/auth",
    // });

    await pusher.init({
      apiKey: "6b6a1e3f7013fd890234",
      cluster: "ap1",
    });
    await pusher.connect();

    await pusher.subscribe({
      channelName: id, //"01h0pscg2b2acdgc7fgby17ceb"
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

  return { pusherInitialization, subscribeToChannel, practicePusher };
};

export default initializePusher;
