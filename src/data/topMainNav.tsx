import Following from "screens/Home/tabs/Following";
import Home from "screens/Home/tabs/Home";
import Moment from "screens/Home/tabs/Moment";
import Photography from "screens/Home/tabs/Photography";

export const topMainNav = {
  initialRoute: "首页",
  screens: [
    {
      name: "关注",
      component: (props) => <Following {...props} />,
    },
    {
      name: "首页",
      component: (props) => <Home {...props} />,
    },
    {
      name: "动态",
      component: (props) => <Moment {...props} />,
    },
    {
      name: "约会",
      component: (props) => <Photography {...props} />,
    },
  ],
};
