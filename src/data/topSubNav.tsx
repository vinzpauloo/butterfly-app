import { DynamicScreen } from "screens/Home/tabs/Home";

export const topSubNav = {
  initialRoute: "精选",
  screens: [
    {
      name: "精选",
      component: (props) => <DynamicScreen {...props} title={"Selections"} />,
    },
    {
      name: "最新",
      component: (props) => <DynamicScreen {...props} title={"Latest"} />,
    },
    {
      name: "原创",
      component: (props) => <DynamicScreen {...props} title={"Original"} />,
    },
    {
      name: "自制",
      component: (props) => <DynamicScreen {...props} title={"HomeMade"} />,
    },
    {
      name: "热门",
      component: (props) => <DynamicScreen {...props} title={"Hot"} />,
    },
    {
      name: "国产",
      component: (props) => <DynamicScreen {...props} title={"Local"} />,
    },
    {
      name: "网黄",
      component: (props) => <DynamicScreen {...props} title={"PornStart"} />,
    },
    {
      name: "萝莉",
      component: (props) => <DynamicScreen {...props} title={"Loli"} />,
    },
    {
      name: "AV",
      component: (props) => <DynamicScreen {...props} title={"AV"} />,
    },
    {
      name: "动漫",
      component: (props) => <DynamicScreen {...props} title={"Hentai"} />,
    },
  ],
};
