import FeedList from "layouts/FeedList";
import MasonryPhotos from "layouts/MasonryPhotos";


export const momentSubNav = {
	initialRoute: "推荐",
	screens: [
		{
			name: "推荐",
			component: (props) => <FeedList {...props} title={"recommended"} />,
		},
		{
			name: "最新",
			component: (props) => <FeedList {...props} title={"latest"} />,
		},
		{
			name: "视频",
			component: (props) => <FeedList {...props} title={"videos"} />,
		},
		{
			name: "图片",
			component: (props) => <FeedList {...props} title={"photo"} />,
		},
		{
			name: "服务",
			component: (props) => <FeedList {...props} title={"services"} />,
		},
	],
};
