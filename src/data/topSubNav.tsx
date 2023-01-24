import { DynamicScreen } from "screens/Home/tabs/Home";

export const topSubNav = {
  initialRoute: "精选",
  screens: [
    {
      name: "精选",
      component: (props) => <DynamicScreen {...props} title={"selections"} />,
    },
    {
      name: "最新",
      component: (props) => <DynamicScreen {...props} title={"latest"} />,
    },
    {
      name: "原创",
      component: (props) => <DynamicScreen {...props} title={"original"} />,
    },
    {
      name: "自制",
      component: (props) => <DynamicScreen {...props} title={"homeMade"} />,
    },
    {
      name: "热门",
      component: (props) => <DynamicScreen {...props} title={"hot"} />,
    },
    {
      name: "国产",
      component: (props) => <DynamicScreen {...props} title={"local"} />,
    },
    {
      name: "网黄",
      component: (props) => <DynamicScreen {...props} title={"pornStart"} />,
    },
    {
      name: "萝莉",
      component: (props) => <DynamicScreen {...props} title={"loli"} />,
    },
    {
      name: "AV",
      component: (props) => <DynamicScreen {...props} title={"avModels"} />,
    },
    {
      name: "动漫",
      component: (props) => <DynamicScreen {...props} title={"hentai"} />,
    },
  ],
};
