import React from "react";
import StickyTabs from "layouts/StickyTabs";
import Moment from "./tabs/Moment";
import Projects from "./tabs/Projects";
import SingleUserHeader from "components/headers/SingleUserHeader";

const SingleUserScreen = () => {
	const tabsData = {
		Header: SingleUserHeader,
		tabItems: [
			{
				name: "moment",
				label: "动态",
				Content: <Moment />,
			},
			{
				name: "projects",
				label: "作品",
				Content: <Projects />,
			},
		],
	};
	
	return <StickyTabs data={tabsData} />
}

export default SingleUserScreen;