import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
const Buttons = ({title, onPress, backgroundColor, color}) => {

    const dynamicStyles = StyleSheet.create({
        container: {
            backgroundColor,
            height: 50,
            borderRadius: 5,
            alignItems:'center',
            justifyContent: 'center',
            padding: 10
        },
        text: {
            color,
        }
    })

    return (
        <TouchableOpacity style={dynamicStyles.container} onPress={onPress}>
            <Text style={dynamicStyles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Buttons;
