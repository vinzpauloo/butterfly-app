type reelsVideo = {
  id: number;
  userName: string;
  uri: string;
  thumbnail: string
  description: string;
  tags: string[];
  likes: number;
  amountOfComments: number;
  avatarUri: string;
};

export const reelsVideos: reelsVideo[] = [
  {
    id: 1,
    userName: "User cutedog",
    uri: "https://v.pinimg.com/videos/mc/720p/f6/88/88/f68888290d70aca3cbd4ad9cd3aa732f.mp4",
    thumbnail: "https://images.unsplash.com/photo-1521567097888-2c5fc40a8660?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dGh1bWJuYWlsJTIwcG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    description: "Cute dog shaking hands",
    tags: ["cute", "puppy"],
    likes: 4321,
    amountOfComments: 2841,
    avatarUri: "https://wallpaperaccess.com/full/1669289.jpg",
  },
  {
    id: 15,
    userName: "Landscape Video 1",
    uri: "http://d3rlna7iyyu8wu.cloudfront.net/skip_armstrong/skip_armstrong_stereo_subs.m3u8",
    thumbnail: "https://images.unsplash.com/photo-1518518873111-6ca469aa4560?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dGh1bWJuYWlsJTIwcG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    description: "Landscape video testing",
    tags: ["landscape", "HLS"],
    likes: 4321,
    amountOfComments: 2841,
    avatarUri: "https://wallpaperaccess.com/full/1669289.jpg",
  },
  {
    id: 2,
    userName: "band 1",
    uri: "https://assets.mixkit.co/videos/preview/mixkit-pop-rock-band-performing-a-song-5121-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1533618561606-3b2a0766d159?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dGh1bWJuYWlsJTIwcG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    description: "Cute dog shaking hands",
    tags: ["band", "guitar"],
    likes: 4321,
    amountOfComments: 2841,
    avatarUri: "https://wallpaperaccess.com/full/1669289.jpg",
  },
  {
    id: 25,
    userName: "Landscape Video 2",
    uri: "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    thumbnail: "https://images.unsplash.com/photo-1526265218618-bdbe4fdb5360?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8dGh1bWJuYWlsJTIwcG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    description: "Landscape video testing",
    tags: ["landscape", "HLS"],
    likes: 4321,
    amountOfComments: 2841,
    avatarUri: "https://wallpaperaccess.com/full/1669289.jpg",
  },
  {
    id: 3,
    userName: "User meow",
    uri: "https://v.pinimg.com/videos/mc/720p/11/05/2c/11052c35282355459147eabe31cf3c75.mp4",
    thumbnail: "https://images.unsplash.com/photo-1533618821901-9e69d5f5360e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dGh1bWJuYWlsJTIwcG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    description: "Doggies eating candy",
    tags: ["cute", "puppy"],
    likes: 2411,
    amountOfComments: 1222,
    avatarUri: "https://wallpaperaccess.com/thumb/266770.jpg",
  },
  {
    id: 35,
    userName: "Landscape Video 3",
    uri: "https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8",
    thumbnail: "https://images.unsplash.com/photo-1528120364248-fd5eceee4991?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dGh1bWJuYWlsJTIwcG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    description: "Landscape video testing",
    tags: ["landscape", "HLS"],
    likes: 2411,
    amountOfComments: 1222,
    avatarUri: "https://wallpaperaccess.com/thumb/266770.jpg",
  },
  {
    id: 4,
    userName: "bartender",
    uri: "https://assets.mixkit.co/videos/preview/mixkit-serving-drink-in-a-small-metal-mixer-5129-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1518102439785-01f8b89b00b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHRodW1ibmFpbCUyMHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    description: "Doggies eating candy",
    tags: ["drink", "bar"],
    likes: 2411,
    amountOfComments: 1222,
    avatarUri: "https://wallpaperaccess.com/thumb/266770.jpg",
  },
  {
    id: 5,
    userName: "sports",
    uri: "https://assets.mixkit.co/videos/preview/mixkit-close-up-view-of-woman-stretching-before-exercising-5356-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1511270482690-96fb038c120c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHRodW1ibmFpbCUyMHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    description: "Doggies eating candy",
    tags: ["sports", "stretch"],
    likes: 2411,
    amountOfComments: 1222,
    avatarUri: "https://wallpaperaccess.com/thumb/266770.jpg",
  },
  {
    id: 6,
    userName: "User yummy",
    uri: "https://v.pinimg.com/videos/mc/720p/c9/22/d8/c922d8391146cc2fdbeb367e8da0d61f.mp4",
    thumbnail: "https://images.unsplash.com/photo-1525097195208-d368f7a2cf75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHRodW1ibmFpbCUyMHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    description: "Brown little puppy",
    tags: ["cute", "puppy"],
    likes: 3100,
    amountOfComments: 801,
    avatarUri: "https://wallpaperaccess.com/thumb/384178.jpg",
  },
  {
    id: 7,
    userName: "User person 1",
    uri: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-with-a-cold-and-pale-appearance-39877-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1526801733059-2b5e72872e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fHRodW1ibmFpbCUyMHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    description: "Brown little puppy",
    tags: ["cute", "puppy"],
    likes: 1200,
    amountOfComments: 51,
    avatarUri: "https://wallpaperaccess.com/thumb/384178.jpg",
  },
  {
    id: 8,
    userName: "User person 2",
    uri: "https://assets.mixkit.co/videos/preview/mixkit-cheerful-man-moves-forward-dancing-in-the-middle-of-nature-32746-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1520699918507-3c3e05c46b0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fHRodW1ibmFpbCUyMHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    description: "Brown little puppy",
    tags: ["cute", "puppy"],
    likes: 1200,
    amountOfComments: 51,
    avatarUri: "https://wallpaperaccess.com/thumb/384178.jpg",
  },
  {
    id: 9,
    userName: "User person 3",
    uri: "https://assets.mixkit.co/videos/preview/mixkit-blogging-girl-down-the-street-with-his-cell-34487-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1615385164509-79243b513da2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fHRodW1ibmFpbCUyMHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    description: "Brown little puppy",
    tags: ["scene", "city"],
    likes: 1200,
    amountOfComments: 51,
    avatarUri: "https://wallpaperaccess.com/thumb/384178.jpg",
  },
  {
    id: 10,
    userName: "Scene 1",
    uri: "https://assets.mixkit.co/videos/preview/mixkit-under-a-peripheral-road-with-two-avenues-on-the-sides-34560-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1526304481252-a144d8025a73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fHRodW1ibmFpbCUyMHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    description: "Brown little puppy",
    tags: ["scene", "city"],
    likes: 1200,
    amountOfComments: 51,
    avatarUri: "https://wallpaperaccess.com/thumb/384178.jpg",
  },
  {
    id: 11,
    userName: "Scene 2",
    uri: "https://assets.mixkit.co/videos/preview/mixkit-city-traffic-on-bridges-and-streets-34565-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1583748493291-7938f0657681?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fHRodW1ibmFpbCUyMHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    description: "Brown little puppy",
    tags: ["scene", "city"],
    likes: 1200,
    amountOfComments: 51,
    avatarUri: "https://wallpaperaccess.com/thumb/384178.jpg",
  },
  {
    id: 12,
    userName: "Scene 3",
    uri: "https://assets.mixkit.co/videos/preview/mixkit-shadow-of-a-persons-hand-waving-3924-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1526801505392-f7e63693233d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDl8fHRodW1ibmFpbCUyMHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    description: "Brown little puppy",
    tags: ["scene", "city"],
    likes: 1200,
    amountOfComments: 51,
    avatarUri: "https://wallpaperaccess.com/thumb/384178.jpg",
  },
];
