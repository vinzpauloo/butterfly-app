import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import { HStack } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";

import { GLOBAL_COLORS } from "global";

import {useQueryClient} from '@tanstack/react-query'

const SingleFeedHeader = ({ title }) => {
    const navigation = useNavigation<any>();
    const route = useRoute();
    const id:any = route.params;

    const queryClient = useQueryClient();

    const handlePress = () => {
        queryClient.invalidateQueries(["likeChecker", id?.foreign_id]);
        navigation.goBack();
    }

    return (
        <HStack
            style={styles.titleAndBackContainer}
            alignItems={"center"}
            padding={3}
        >
            <TouchableOpacity onPress={handlePress}>
                <AntDesign name="left" size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.flex}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </HStack>
    );
};

const styles = StyleSheet.create({
    titleAndBackContainer: {
        backgroundColor: GLOBAL_COLORS.headerBasicBg,
    },
    title: {
        color: GLOBAL_COLORS.primaryTextColor,
        textAlign: "center",
        fontSize: 20,
    },
    flex: {
        flex: 1
    }
});

export default SingleFeedHeader;
