import { DynamicScreen } from "screens/Home/tabs/Home";
import CarouselContainer from "features/ads/components/CarouselContainer";
import { bannerImage } from "data/bannerImages";

const Header = () => {
  return (
    <CarouselContainer images={bannerImage} />
  )
}

export const topSubNav = {
  Header,
  tabItems: [
    { name : "selections",
      label: "精选",
      Content: <DynamicScreen title={"selections"} />,
    },
    { name : "latest",
      label: "最新",
      Content: <DynamicScreen title={"latest"} />,
    },
    { name : "original",
      label: "原创",
      Content: <DynamicScreen title={"original"} />,
    },
    { name : "homeMade",
      label: "自制",
      Content: <DynamicScreen title={"homeMade"} />,
    },
    { name : "hot",
      label: "热门",
      Content: <DynamicScreen title={"hot"} />,
    },
    { name : "local",
      label: "国产",
      Content: <DynamicScreen title={"local"} />,
    },
    { name : "pornStars",
      label: "网黄",
      Content: <DynamicScreen title={"pornStars"} />,
    },
    { name : "loli",
      label: "萝莉",
      Content: <DynamicScreen title={"loli"} />,
    },
    { name : "avModels",
      label: "AV",
      Content: <DynamicScreen title={"avModels"} />,
    },
    { name : "hentai",
      label: "动漫",
      Content: <DynamicScreen title={"hentai"} />,
    },
  ],
};
