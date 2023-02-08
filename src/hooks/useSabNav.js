import request from "utils/request";

export default class SubNav {
  static request(title) {
    return request({
      url: `/workgroup/${title}`,
      method: "GET",
    });
  }
}
