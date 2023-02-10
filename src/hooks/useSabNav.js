import request from "utils/request";

export default class SubNav {
  static getSubNav() {
    return request({
      url: "/navbar/butterfly-project",
      method: "GET",
    });
  }

  static getWorkGroup(tabName) {
    return request({
      url: `/workgroup/${tabName}`,
      method: "GET",
    });
  }
}
