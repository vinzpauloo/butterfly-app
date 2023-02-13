import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

import HorizontalSlider from "features/sectionList/components/HorizontalSlider";
import VerticalSlider from "features/sectionList/components/VerticalSlider";
import SingleVideo from "features/sectionList/components/SingleVideo";
import DividerContainer from "features/sectionList/components/DividerContainer";
import GridVideos from "features/sectionList/components/GridVideos";
import SectionHeader from "features/sectionList/components/SectionHeader";
import { useQuery } from "@tanstack/react-query";
import { SubNav } from "hooks/useSubNav";
import BottomMessage from "components/BottomMessage";
import Container from "components/Container";
import CarouselContainer from "features/ads/components/CarouselContainer";
import { ScrollView } from "react-native-gesture-handler";

const LayoutContainer = ({ title, dataLength, index, children }) => {
  return (
    <>
      <SectionHeader title={title} />
      {children}
      {dataLength !== index ? <DividerContainer /> : null}
    </>
  );
};

const SectionContent = ({
  single,
  multiple,
  title,
  templateId,
  dataLength,
  index,
}) => {
  const templates = {
    videoSlider: <HorizontalSlider data={multiple} />,
    reelslider: <VerticalSlider data={multiple} />,
    singleVideo: <SingleVideo data={single} />,
    singleVideoWithGrid: (
      <>
        <SingleVideo data={single} />
        <DividerContainer />
        <GridVideos data={multiple} />
      </>
    ),
    singleVideoList: <GridVideos data={multiple} />,
  };

  return (
    <LayoutContainer title={title} dataLength={dataLength} index={index}>
      {templates[templateId]}
    </LayoutContainer>
  );
};

const DynamicTabContent = ({ tabTitle }) => {
  const { getWorkGroup } = SubNav();
  const { data, isLoading, isSuccess, isError } = useQuery(
    [`tabName${tabTitle}`],
    () => getWorkGroup(tabTitle)
  );

  useEffect(() => {
    if (isSuccess) {
      console.log("@@@", data);
    }
  }, []);

  return (
    <Container>
      <ScrollView>
        <CarouselContainer />
        {data?.map((item, index) => (
          <SectionContent
            key={index}
            title={item.title}
            single={item.single}
            multiple={item.multiple}
            templateId={item.template_id}
            dataLength={data.length - 1}
            index={index}
          />
        ))}
        <BottomMessage />
      </ScrollView>
    </Container>
  );
};

export default DynamicTabContent;

const styles = StyleSheet.create({});
