import MasonryPhotos from "layouts/MasonryPhotos";

export const photographySubNav = {
  initialRoute: "综合",
  screens: [
    {
      name: "综合",
      component: (props) => <MasonryPhotos {...props} filter={"all"} />,
    },
    {
      name: "最热",
      component: (props) => <MasonryPhotos {...props} filter={"hottest"} />,
    },
    {
      name: "最新",
      component: (props) => <MasonryPhotos {...props} filter={"latest"} />,
    },
  ],
};
