import request from "lib/request";

export const Customer = () => {
  const getCustomerInfo = (id) => {
    return request({
      url: `/customer/details/${id}`,
      method: "GET",
    });
  };

  return { getCustomerInfo };
};
