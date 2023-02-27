import React, {useState} from "react";
import { useQuery } from "@tanstack/react-query";

import {Feeds} from "hooks/useFeeds";

import StickyTabs from "layouts/StickyTabs";
import FeedList from "layouts/FeedList";

import MomentHeader from "components/headers/MomentHeader"
import FeedItemSkeleton from "components/skeletons/FeedItemSkeleton";
import StickyTabFeeds from "features/feedsList/components/StickyTabFeeds";
import {useRoute} from "@react-navigation/native";

const RecommendedLayout = ({ recommendedData, id }) => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const {getFeeds} = Feeds();
    const { isLoading } = useQuery({
        queryKey: ["recommendedFeeds", id, page],
        queryFn: () =>
            getFeeds({
                recommended: true,
                with: [`user`, `comment`, `like`].toString(),
                page: page,
                user_id: id,
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


const LatestLayout = ({latestData, id}) => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const {getFeeds} = Feeds();
    const { isLoading } = useQuery({
        queryKey: ["latestFeeds", id, page],
        queryFn: () =>
            getFeeds({
                latest: true,
                with: [`user`, `comment`, `like`].toString(),
                page: page,
                user_id: id,
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

const VideoLayout = ({videoData, id}) => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const {getFeeds} = Feeds();
    const { isLoading } = useQuery({
        queryKey: ["videoFeeds", id, page],
        queryFn: () =>
            getFeeds({
                video_only: true,
                with: [`user`, `comment`, `like`].toString(),
                page: page,
                user_id: id,
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

const PhotoLayout = ({photoData, id}) => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const {getFeeds} = Feeds();
    const { isLoading } = useQuery({
        queryKey: ["photoFeeds", id, page],
        queryFn: () =>
            getFeeds({
                images_only: true,
                with: [`user`, `comment`, `like`].toString(),
                page: page,
                user_id: id,
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

const ServicesLayout = ({servicesData, id}) => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const {getFeeds} = Feeds();
    const { isLoading } = useQuery({
        queryKey: ["servicesFeeds", id, page],
        queryFn: () =>
            getFeeds({
                services_only: true,
                with: [`user`, `comment`, `like`].toString(),
                page: page,
                user_id: id,
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

const Moment = ({data}) => {
    const route = useRoute<any>();
    console.log(`TEST@@@@`,route.params)

    const tabsData = {
        Header: MomentHeader,
        tabItems: [
            {
                name: "recommended",
                label: "推荐",
                Content: <RecommendedLayout recommendedData={data}/>
            },
            {
                name: "latest",
                label: "最新",
                Content: <LatestLayout latestData={data}/>
            },
            {
                name: "videos",
                label: "视频",
                Content: <VideoLayout videoData={data}/>
            },
            {
                name: "photo",
                label: "图片",
                Content: <PhotoLayout photoData={data}/>
            },
            {
                name: "services",
                label: "服务",
                Content: <ServicesLayout servicesData={data}/>
            },
        ],
    };
    return <StickyTabs data={tabsData}/>;
};

export default Moment;
