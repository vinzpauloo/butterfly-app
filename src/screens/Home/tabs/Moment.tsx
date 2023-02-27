import React, {useState} from "react";
import { useQuery } from "@tanstack/react-query";

import {Feeds} from "hooks/useFeeds";

import StickyTabs from "layouts/StickyTabs";
import FeedList from "layouts/FeedList";

import MomentHeader from "components/headers/MomentHeader"
import StickyTabFeeds from "features/feedsList/components/StickyTabFeeds";
const RecommendedLayout = () => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const {getFeeds} = Feeds();
    const { isLoading } = useQuery({
        queryKey: ["recommendedFeeds", page],
        queryFn: () =>
            getFeeds({
                recommended: true,
                with: [`user`, `comment`, `like`].toString(),
                page: page,
                ads: false,
            }),
        onSuccess: (data) => {
            setLastPage(data.last_page);
            setData((prev) => [...prev].concat(data.data))
        },
        onError: (error) => {
            console.log(`Error`, error);
        }
    })
    return (
        <StickyTabFeeds
            isLoading={isLoading}
            page={page}
            setPage={setPage}
            lastPage={lastPage}
            layout={<FeedList data={data}/>}
        />
    )
}

const LatestLayout = () => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const {getFeeds} = Feeds();
    const { isLoading } = useQuery({
        queryKey: ["latestFeeds", page],
        queryFn: () =>
            getFeeds({
                latest: true,
                with: [`user`, `comment`, `like`].toString(),
                page: page,
                ads: false,
            }),
        onSuccess: (data) => {
            setLastPage(data.last_page);
            setData((prev) => [...prev].concat(data.data))
        },
        onError: (error) => {
            console.log(`Error`, error);
        }
    })
    return (
        <StickyTabFeeds
            isLoading={isLoading}
            page={page}
            setPage={setPage}
            lastPage={lastPage}
            layout={<FeedList data={data}/>}
        />
    )
}

const VideoLayout = () => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const {getFeeds} = Feeds();
    const { isLoading } = useQuery({
        queryKey: ["videoFeeds", page],
        queryFn: () =>
            getFeeds({
                video_only: true,
                with: [`user`, `comment`, `like`].toString(),
                page: page,
                ads: false,
            }),
        onSuccess: (data) => {
            setLastPage(data.last_page);
            setData((prev) => [...prev].concat(data.data))
        },
        onError: (error) => {
            console.log(`Error`, error);
        }
    })
    return (
        <StickyTabFeeds
            isLoading={isLoading}
            page={page}
            setPage={setPage}
            lastPage={lastPage}
            layout={<FeedList data={data}/>}
        />
    )
}

const PhotoLayout = () => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const {getFeeds} = Feeds();
    const { isLoading } = useQuery({
        queryKey: ["photoFeeds", page],
        queryFn: () =>
            getFeeds({
                images_only: true,
                with: [`user`, `comment`, `like`].toString(),
                page: page,
                ads: false,
            }),
        onSuccess: (data) => {
            setLastPage(data.last_page);
            setData((prev) => [...prev].concat(data.data))
        },
        onError: (error) => {
            console.log(`Error`, error);
        }
    })
    return (
        <StickyTabFeeds
            isLoading={isLoading}
            page={page}
            setPage={setPage}
            lastPage={lastPage}
            layout={<FeedList data={data}/>}
        />
    )
}

const ServicesLayout = () => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const {getFeeds} = Feeds();
    const { isLoading } = useQuery({
        queryKey: ["servicesFeeds", page],
        queryFn: () =>
            getFeeds({
                services_only: true,
                with: [`user`, `comment`, `like`].toString(),
                page: page,
                ads: false,
            }),
        onSuccess: (data) => {
            setLastPage(data.last_page);
            setData((prev) => [...prev].concat(data.data))
        },
        onError: (error) => {
            console.log(`Error`, error);
        }
    })
    return (
        <StickyTabFeeds
            isLoading={isLoading}
            page={page}
            setPage={setPage}
            lastPage={lastPage}
            layout={<FeedList data={data}/>}
        />
    )
}

const Moment = () => {
    const tabsData = {
        Header: MomentHeader,
        tabItems: [
            {
                name: "recommended",
                label: "推荐",
                Content: <RecommendedLayout/>
            },
            {
                name: "latest",
                label: "最新",
                Content: <LatestLayout/>
            },
            {
                name: "videos",
                label: "视频",
                Content: <VideoLayout/>
            },
            {
                name: "photo",
                label: "图片",
                Content: <PhotoLayout/>
            },
            {
                name: "services",
                label: "服务",
                Content: <ServicesLayout/>
            },
        ],
    };
    return <StickyTabs data={tabsData}/>;
};

export default Moment;
