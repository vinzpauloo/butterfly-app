import MasonryPhotos from "layouts/MasonryPhotos";

export const photographySubNav = {
  initialRoute: "综合",
  screens: [
    {
      name: "综合",
      component: (props) => (
        <MasonryPhotos {...props} title={"comprehensive"} />
      ),
    },
    {
      name: "最热",
      component: (props) => <MasonryPhotos {...props} title={"hottest"} />,
    },
    {
      name: "最新",
      component: (props) => <MasonryPhotos {...props} title={"newest"} />,
    },
  ],
};
