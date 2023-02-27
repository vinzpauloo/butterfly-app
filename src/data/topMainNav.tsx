import Following from "screens/Home/tabs/Following";
import Home from "screens/Home/tabs/Home";
import Moment from "screens/Home/tabs/Moment";
import Photography from "screens/Home/tabs/Photography";

export const topMainNav = {
  initialRoute: "首页",
  screens: [
    {
      name: "关注",
      component: () => <Following />,
    },
    {
      name: "首页",
      component: () => <Home />,
    },
    {
      name: "动态",
      component: () => <Moment />,
    },
    {
      name: "写真",
      component: () => <Photography />,
    },
  ],
};
