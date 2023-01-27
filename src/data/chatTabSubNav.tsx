import All  from "screens/Chat/tabs/All";
import Information  from "screens/Chat/tabs/Information";

export const chatTabSubNav = {
	initialRoute: "全部",
	screens: [
		{
			name: "全部",
			component: (props) => <All {...props} title={"all"} />,
		},
		{
			name: "消息",
			component: (props) => <Information {...props} title={"information"} />,
		},
	],
};
