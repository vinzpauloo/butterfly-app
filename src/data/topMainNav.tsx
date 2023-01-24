import Date from "screens/Home/tabs/Date";
import Feeds from "screens/Home/tabs/Feeds";
import Home from "screens/Home/tabs/Home";
import Moment from "screens/Home/tabs/Moment";
import Photography from "screens/Home/tabs/Photography";

export const topMainNav = {
  initialRoute: "首页",
  screens: [
    {
      name: "关注",
      component: (props) => <Feeds {...props} />,
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
    {
      name: "写真",
      component: (props) => <Date {...props} />,
    },
  ],
};
