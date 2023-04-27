import { Dimensions, StyleSheet } from "react-native";
import React, { useState } from "react";

import RenderHTML from "react-native-render-html";
import { Box, ScrollView } from "native-base";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "@react-navigation/native";

import Container from "components/Container";
import CustomerService from "services/api/CustomerService";
import LoadingSpinner from "components/LoadingSpinner";
import { userStore } from "../../../../zustand/userStore";

const index = () => {
  const { api_token } = userStore((state) => state);
  const { getCertificate } = CustomerService();
  const { params } = useRoute<any>();

  const [data, setData] = useState("");

  const { isLoading, isRefetching } = useQuery({
    queryKey: ["Certificate", params.api_params],
    queryFn: () =>
      getCertificate({
        data: { details: params.api_params },
        token: api_token,
      }),
    onSuccess: (data) => {
      setData(data);
    },
    onError: (error) => {
      console.log(`Certificate ${params.api_params}: `, error);
    },
  });

  if (isLoading || isRefetching) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <ScrollView>
        <Box p={5}>
          <RenderHTML
            source={{ html: data[params.api_params] }}
            baseStyle={styles.renderHTML}
            contentWidth={Dimensions.get("window").width}
          />
        </Box>
      </ScrollView>
    </Container>
  );
};

export default index;

const styles = StyleSheet.create({
  renderHTML: {
    color: "white",
    fontSize: 16,
  },
});
