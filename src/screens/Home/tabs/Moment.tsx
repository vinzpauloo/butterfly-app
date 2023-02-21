import React from "react";
import { useQuery } from "@tanstack/react-query";

import {Feeds} from "hooks/useFeeds";

import StickyTabs from "layouts/StickyTabs";
import FeedList from "layouts/FeedList";

import MomentHeader from "components/headers/MomentHeader"
import FeedItemSkeleton from "components/skeletons/FeedItemSkeleton";

const RecommendedLayout = ({data}) => {
    const {getFeeds} = Feeds();
    const {data: recommendedLayout, isLoading} = useQuery({
        queryKey: ["recommendedFeeds"],
        queryFn: () => getFeeds({recommended: true, with: [`user`, `comment`, `like`].toString()}),
        onSuccess: (data) => {
            console.log(`Success`, data);
        },
        onError: (error) => {
            console.log(`Error`, error);
        }
    })
    if (isLoading) {
        return <FeedItemSkeleton/>
    }
    return <FeedList data={recommendedLayout.data}/>
}

const LatestLayout = ({data}) => {
    const {getFeeds} = Feeds();
    const {data: latestLayout, isLoading} = useQuery({
        queryKey: ["latestFeeds"],
        queryFn: () => getFeeds({latest: true, with: [`user`,`comment`,`like`].toString()}),
        onSuccess: (data) => {
            console.log(`Success`, data);
        },
        onError: (error) => {
            console.log(`Error`, error);
        }
    })
    if (isLoading) {
        return <FeedItemSkeleton/>
    }
    return <FeedList data={latestLayout.data}/>
}

const VideoLayout = ({data}) => {
    const {getFeeds} = Feeds();
    const {data: videoLayout, isLoading} = useQuery({
        queryKey: ["videoFeeds"],
        queryFn: () => getFeeds({video_only: true, with: [`user`,`comment`,`like`].toString()}),
        onSuccess: (data) => {
            console.log(`Success`, data);
        },
        onError: (error) => {
            console.log(`Error`, error);
        }
    })
    if (isLoading) {
        return <FeedItemSkeleton/>
    }
    return <FeedList data={videoLayout.data}/>
}

const PhotoLayout = ({data}) => {
    const {getFeeds} = Feeds();
    const {data: photoLayout, isLoading} = useQuery({
        queryKey: ["photoFeeds"],
        queryFn: () => getFeeds({images_only: true, with: [`user`,`comment`,`like`].toString()}),
        onSuccess: (data) => {
            console.log(`Success`, data);
        },
        onError: (error) => {
            console.log(`Error`, error);
        }
    })
    if (isLoading) {
        return <FeedItemSkeleton/>
    }
    return <FeedList data={photoLayout.data}/>
}

const ServicesLayout = ({data}) => {
    const {getFeeds} = Feeds();
    const {data: servicesLayout, isLoading} = useQuery({
        queryKey: ["servicesFeeds"],
        queryFn: () => getFeeds({services_only: true, with:[`user`,`comment`,`like`].toString()}),
        onSuccess: (data) => {
            console.log(`Success`, data);
        },
        onError: (error) => {
            console.log(`Error`, error);
        }
    })
    if (isLoading) {
        return <FeedItemSkeleton/>
    }
    return <FeedList data={servicesLayout.data}/>
}

const Moment = ({data}) => {
    const tabsData = {
        Header: MomentHeader,
        tabItems: [
            {
                name: "recommended",
                label: "推荐",
                Content: <RecommendedLayout data={data}/>
            },
            {
                name: "latest",
                label: "最新",
                Content: <LatestLayout data={data}/>
            },
            {
                name: "videos",
                label: "视频",
                Content: <VideoLayout data={data}/>
            },
            {
                name: "photo",
                label: "图片",
                Content: <PhotoLayout data={data}/>
            },
            {
                name: "services",
                label: "服务",
                Content: <ServicesLayout data={data}/>
            },
        ],
    };
    return <StickyTabs data={tabsData}/>;
};

export default Moment;
