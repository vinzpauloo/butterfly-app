import Recommended from "screens/SingleTag/tabs/Recommended";
import Moment from "screens/SingleTag/tabs/Moment";

export const singleTagSubNav = {
  initialRoute: "推荐",
  screens: [
    {
      name: "推荐",
      component: Recommended,
    },
    {
      name: "动态",
      component: Moment,
    },
  ],
};
