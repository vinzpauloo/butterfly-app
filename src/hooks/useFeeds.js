import request from "lib/request";

export const Feeds = () => {

    const getFeeds = (data) => {
        return request({
            url: `/feed`,
            method: "GET",
            params: data
        })
    }

    const getSpecificFeed = (id) => {
        return request ({
            url: `/feed/${id}`,
            method: 'GET',
        })
    }
    return { getFeeds, getSpecificFeed };
};
