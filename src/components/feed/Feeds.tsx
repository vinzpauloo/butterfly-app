import { StyleSheet, VirtualizedList } from "react-native";
import React from "react";
import FeedContent from "./FeedContent";
import Container from "components/Container";

const Feeds = ({ data }) => {
  return (
    <Container>
      {/* <ScrollView style={{ flex: 1 }}>
        <FeedContent />
      </ScrollView> */}
      <VirtualizedList
        data={data}
        initialNumToRender={data.length}
        getItem={(_data: unknown, index: number) => ({
          id: index,
          item: data[index],
        })}
        getItemCount={() => data.length}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item, index }) => (
          <FeedContent key={index} data={item} />
        )}
      />
    </Container>
  );
};

export default Feeds;

const styles = StyleSheet.create({});
