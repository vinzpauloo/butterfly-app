import request from "utils/request";

export default class SubNav {
  static getSubNav(title) {
    return request({
      url: `/workgroup/${title}`,
      method: "GET",
    });
  }
}
