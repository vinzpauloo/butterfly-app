import React from "react";
import {FlatList, Text, StyleSheet} from "react-native";

import {HStack} from "native-base";

import {privacyPolicyData} from "data/privacyPolicyData";

const PrivacyPolicyFlatList = ({list1, list2, list3, list4, list5, list6, list7, list8}) => {

    return (
        <>
            {list1 ? (
                <FlatList
                    data={privacyPolicyData}
                    renderItem={({ item }) => (
                        <>
                            {item.listData.map((item, index)=> (
                                <HStack ml={10} alignItems={'flex-start'}>
                                    <Text style={styles.bullet}>&#8226;</Text>
                                    <Text style={styles.itemText}>{item.text}</Text>
                                </HStack>
                            ))}
                        </>
                    )}
                />
            ) : list2 ? (
                <FlatList
                    data={privacyPolicyData}
                    renderItem={({ item }) => (
                        <>
                            {item.listData2.map((item, index)=> (
                                <HStack ml={10} alignItems={'flex-start'}>
                                    <Text style={styles.bullet}>&#8226;</Text>
                                    <Text style={styles.itemText}>{item.text}</Text>
                                </HStack>
                            ))}
                        </>
                    )}
                />
            ) : list3 ? (
                <FlatList
                    data={privacyPolicyData}
                    renderItem={({ item }) => (
                        <>
                            {item.listData3.map((item, index)=> (
                                <HStack ml={10} alignItems={'flex-start'}>
                                    <Text style={styles.bullet}>&#8226;</Text>
                                    <Text style={styles.itemText}>{item.text}</Text>
                                </HStack>
                            ))}
                        </>
                    )}
                />
            ) : list4 ? (
                <FlatList
                    data={privacyPolicyData}
                    renderItem={({ item }) => (
                        <>
                            {item.listData4.map((item, index)=> (
                                <HStack ml={10} alignItems={'flex-start'}>
                                    <Text style={styles.bullet}>&#8226;</Text>
                                    <Text style={styles.itemText}>{item.text}</Text>
                                </HStack>
                            ))}
                        </>
                    )}
                />
            ) : list5 ? (
                <FlatList
                    data={privacyPolicyData}
                    renderItem={({ item }) => (
                        <>
                            {item.listData5.map((item, index)=> (
                                <HStack ml={10} alignItems={'flex-start'}>
                                    <Text style={styles.bullet}>&#8226;</Text>
                                    <Text style={styles.itemText}>{item.text}</Text>
                                </HStack>
                            ))}
                        </>
                    )}
                />
            ) : list6 ? (
                <FlatList
                    data={privacyPolicyData}
                    renderItem={({ item }) => (
                        <>
                            {item.listData6.map((item, index)=> (
                                <HStack ml={10} alignItems={'flex-start'}>
                                    <Text style={styles.bullet}>&#8226;</Text>
                                    <Text style={styles.itemText}>{item.text}</Text>
                                </HStack>
                            ))}
                        </>
                    )}
                />
            ) : list7 ? (
                <FlatList
                    data={privacyPolicyData}
                    renderItem={({ item }) => (
                        <>
                            {item.listData7.map((item, index)=> (
                                <HStack ml={10} alignItems={'flex-start'}>
                                    <Text style={styles.bullet}>&#8226;</Text>
                                    <Text style={styles.itemText}>{item.text}</Text>
                                </HStack>
                            ))}
                        </>
                    )}
                />
            ) : list8 && (
                <FlatList
                    data={privacyPolicyData}
                    renderItem={({ item }) => (
                        <>
                            {item.listData8.map((item, index)=> (
                                <HStack ml={10} alignItems={'flex-start'}>
                                    <Text style={styles.bullet}>&#8226;</Text>
                                    <Text style={styles.itemText}>{item.text}</Text>
                                </HStack>
                            ))}
                        </>
                    )}
                />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    bullet: {
        fontSize: 15,
        marginRight: 5,
        color: '#FFF'
    },
    itemText: {
        fontSize: 12,
        color: '#FFF',
    },
})

export default PrivacyPolicyFlatList;
