import { StyleSheet, View } from "react-native";
import React, { useState } from "react";

import BottomMessage from "components/BottomMessage";
import Container from "components/Container";
import CarouselContainer from "features/ads/components/CarouselContainer";
import DividerContainer from "features/sectionList/components/DividerContainer";
import HorizontalSlider from "features/sectionList/components/HorizontalSlider";
import GridVideos from "features/sectionList/components/GridVideos";
import Loading from "components/Loading";
import SectionHeader from "features/sectionList/components/SectionHeader";
import SingleVideo from "features/sectionList/components/SingleVideo";
import VerticalSlider from "features/sectionList/components/VerticalSlider";
import VideoListSkeleton from "components/skeletons/VideoListSkeleton";
import { useQuery } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";
import { SubNav } from "hooks/useSubNav";

const LayoutContainer = ({ id, title, dataLength, index, children }) => {
  return (
    <>
      <SectionHeader title={title} id={id} />
      {children}
      {dataLength !== index ? <DividerContainer /> : null}
    </>
  );
};

const SectionContent = ({
  id,
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
    grid: <GridVideos data={multiple} />,
  };

  return (
    <LayoutContainer
      id={id}
      title={title}
      dataLength={dataLength}
      index={index}
    >
      {templates[templateId]}
    </LayoutContainer>
  );
};

const DynamicTabContent = ({ tabTitle }) => {
  const [paginate, setPaginate] = useState(2);
  const [lastPage, setLastPage] = useState(0);
  const [startScroll, setStartScroll] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const { getWorkGroup } = SubNav();
  const { isLoading } = useQuery({
    queryKey: [`tabName${tabTitle}`, page],
    queryFn: () =>
      getWorkGroup({ navbar: tabTitle, paginate: paginate, page: page }),
    onError: (error) => {
      console.log(`tabName-${tabTitle}`, error);
    },
    onSuccess: (data) => {
      setLastPage(data.last_page);
      setData((prev) => [...prev].concat(data.data));
    },
  });

  const reachEnd = () => {
    if (startScroll) return null;
    if (!isLoading) {
      if (lastPage !== page) {
        setPage((prev) => prev + 1);
        setStartScroll(true);
      }
    }
  };

  return (
    <Container>
      {isLoading && page === 1 ? (
        <VideoListSkeleton />
      ) : (
        <FlashList
          data={data}
          onEndReachedThreshold={0.01} // always make this default to 0.01 to have no bug for fetching data for the onEndReached -> https://github.com/facebook/react-native/issues/14015#issuecomment-346547942
          onMomentumScrollBegin={() => setStartScroll(false)}
          onEndReached={reachEnd}
          bounces={false}
          estimatedItemSize={200}
          keyExtractor={(item, index) => "" + index}
          renderItem={({ item, index }: any) => {
            return (
              <SectionContent
                key={index}
                id={item._id}
                title={item.title}
                single={item.single}
                multiple={item.multiple}
                templateId={item.template_id}
                dataLength={data.length - 1}
                index={index}
              />
            );
          }}
          ListHeaderComponent={() => <CarouselContainer />}
          ListFooterComponent={() => (
            <>
              {/* the gap will be remove if the lastpage is been fetch */}
              {lastPage !== page || (lastPage === page && isLoading) ? (
                <View style={{ marginBottom: 60 }}>
                  {/* to have a gap in bottom part of section to see the loading icon */}
                  {isLoading ? <Loading /> : null}
                </View>
              ) : null}
              {lastPage === page && !isLoading ? <BottomMessage /> : null}
            </>
          )}
        />
      )}
    </Container>
  );
};

export default DynamicTabContent;

const styles = StyleSheet.create({});

//  <ScrollView
//         onMomentumScrollEnd={(e) => {
//           const scrollPosition = e.nativeEvent.contentOffset.y;
//           const contentHeight = e.nativeEvent.contentSize.height;
//           const isScrolledToBottom = contentHeight + scrollPosition;

//           console.log(
//             "!!!!",
//             // isScrolledToBottom,
//             contentHeight,
//             scrollPosition
//           );

//           // if (isScrolledToBottom > contentHeight) {
//           //   if (lastPage !== page) {
//           //     setPage((prev) => prev + 1);
//           //   }
//           // }
//         }}
//       >
//         <CarouselContainer />
//         {isLoading ? (
//           <VideoListSkeleton /> // skeleton for no data ready
//         ) : (
//           data?.map((item, index) => (
//             <SectionContent
//               key={index}
//               title={item.title}
//               single={item.single}
//               multiple={item.multiple}
//               templateId={item.template_id}
//               dataLength={data.length - 1}
//               index={index}
//             />
//           ))
//         )}
//         {isLoading ? <Loading /> : null}

//         {lastPage === page ? <BottomMessage /> : null}
//       </ScrollView>

// <VirtualizedList
//   onEndReachedThreshold={0.01}
//   onEndReached={() => {
//     console.log("$$$", page, lastPage);
//     if (!isLoading) {
//       if (lastPage !== page) {
//         setPage((prev) => prev + 1);
//       }
//     }
//   }}
//   getItemCount={() => data.length}
//   getItem={(_data: unknown, index: number) => ({
//     id: index,
//     item: data[index],
//   })}
//   keyExtractor={(item: any) => item.id}
//   renderItem={({ item, index }: any) => {
//     return (
//       <SectionContent
//         key={index}
//         title={item.item.title}
//         single={item.item.single}
//         multiple={item.item.multiple}
//         templateId={item.item.template_id}
//         dataLength={data.length - 1}
//         index={index}
//       />
//     );
//   }}
//   ListHeaderComponent={() => <CarouselContainer />}
//   ListFooterComponent={() =>
//     lastPage === page ? <BottomMessage /> : null
//   }
//   refreshing={isLoading}
// />
// <FlatList
//   data={data}
//   onEndReachedThreshold={0.01}
//   onEndReached={() => {
//     console.log("$$$", page, lastPage);
//     if (!isLoading) {
//       if (lastPage !== page) {
//         setPage((prev) => prev + 1);
//       }
//     }
//   }}
//   keyExtractor={(item, index) => "" + index}
//   renderItem={({ item, index }: any) => {
//     return (
//       <SectionContent
//         key={index}
//         title={item.title}
//         single={item.single}
//         multiple={item.multiple}
//         templateId={item.template_id}
//         dataLength={data.length - 1}
//         index={index}
//       />
//     );
//   }}
//   ListHeaderComponent={() => <CarouselContainer />}
//   ListFooterComponent={() =>
//     lastPage === page ? <BottomMessage /> : null
//   }
// />
