import React, { useState } from "react";
import { Text } from "react-native";

import { useQuery } from "@tanstack/react-query";

import FeedService from "services/api/FeedService";

import StickyTabs from "layouts/StickyTabs";
import FeedList from "layouts/FeedList";
import MomentHeader from "components/headers/MomentHeader";
import StickyTabFeeds from "features/feedsList/components/StickyTabFeeds";
import { userStore } from "../../../zustand/userStore";

const RecommendedLayout = ({ token }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const { getFeeds } = FeedService();
  const { isLoading } = useQuery({
    queryKey: ["recommendedFeeds", page],
    queryFn: () =>
      getFeeds({
        data: {
          recommended: true,
          with: "user,comment,like",
          page: page,
        },
        token,
      }),
    onSuccess: (data) => {
      setLastPage(data.last_page);
      setData((prev) => [...prev].concat(data.data));
    },
    onError: (error) => {
      console.log(`Error`, error);
    },
  });
  return (
    <StickyTabFeeds
      isLoading={isLoading}
      page={page}
      setPage={setPage}
      lastPage={lastPage}
      layout={<FeedList data={data} />}
    />
  );
};

const LatestLayout = ({ token }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const { getFeeds } = FeedService();
  const { isLoading } = useQuery({
    queryKey: ["latestFeeds", page],
    queryFn: () =>
      getFeeds({
        data: {
          latest: true,
          with: "user,comment,like",
          page: page,
        },
        token,
      }),
    onSuccess: (data) => {
      setLastPage(data.last_page);
      setData((prev) => [...prev].concat(data.data));
    },
    onError: (error) => {
      console.log(`Error`, error);
    },
  });
  return (
    <StickyTabFeeds
      isLoading={isLoading}
      page={page}
      setPage={setPage}
      lastPage={lastPage}
      layout={<FeedList data={data} />}
    />
  );
};

const VideoLayout = ({ token }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const { getFeeds } = FeedService();
  const { isLoading } = useQuery({
    queryKey: ["videoFeeds", page],
    queryFn: () =>
      getFeeds({
        data: {
          video_only: true,
          with: "user,comment,like",
          page: page,
        },
        token,
      }),
    onSuccess: (data) => {
      setLastPage(data.last_page);
      setData((prev) => [...prev].concat(data.data));
    },
    onError: (error) => {
      console.log(`Error`, error);
    },
  });
  return (
    <StickyTabFeeds
      isLoading={isLoading}
      page={page}
      setPage={setPage}
      lastPage={lastPage}
      layout={<FeedList data={data} />}
    />
  );
};

const PhotoLayout = ({ token }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const { getFeeds } = FeedService();
  const { isLoading } = useQuery({
    queryKey: ["photoFeeds", page],
    queryFn: () =>
      getFeeds({
        data: {
          images_only: true,
          with: "user,comment,like",
          page: page,
        },
        token,
      }),
    onSuccess: (data) => {
      setLastPage(data.last_page);
      setData((prev) => [...prev].concat(data.data));
    },
    onError: (error) => {
      console.log(`Error`, error);
    },
  });
  return (
    <StickyTabFeeds
      isLoading={isLoading}
      page={page}
      setPage={setPage}
      lastPage={lastPage}
      layout={<FeedList data={data} />}
    />
  );
};

const ServicesLayout = ({ token }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const { getFeeds } = FeedService();
  const { isLoading } = useQuery({
    queryKey: ["servicesFeeds", page],
    queryFn: () =>
      getFeeds({
        data: {
          services_only: true,
          with: "user,comment,like",
          page: page,
        },
        token,
      }),
    onSuccess: (data) => {
      setLastPage(data.last_page);
      setData((prev) => [...prev].concat(data.data));
    },
    onError: (error) => {
      console.log(`Error`, error);
    },
  });
  return (
    <StickyTabFeeds
      isLoading={isLoading}
      page={page}
      setPage={setPage}
      lastPage={lastPage}
      layout={<FeedList data={data} />}
    />
  );
};

const Moment = () => {
  const token = userStore((state) => state.api_token);

  const tabsData = {
    Header: MomentHeader,
    tabItems: [
      {
        name: "recommended",
        label: "推荐",
        Content: <RecommendedLayout token={token} />,
      },
      {
        name: "latest",
        label: "最新",
        Content: <LatestLayout token={token} />,
      },
      {
        name: "videos",
        label: "视频",
        Content: <VideoLayout token={token} />,
      },
      {
        name: "photo",
        label: "图片",
        Content: <PhotoLayout token={token} />,
      },
      {
        name: "services",
        label: "服务",
        Content: <ServicesLayout token={token} />,
      },
    ],
  };
  return <StickyTabs data={tabsData} />;
};

export default Moment;
