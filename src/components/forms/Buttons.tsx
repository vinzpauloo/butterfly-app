import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";


const Buttons = ({props}) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.text}>{props}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FF474E',
        height: 50,
        borderRadius: 5,
        alignItems:'center',
        justifyContent: 'center',
        padding: 10
    },
    text: {
        color: '#FFFFFF'
    }
})

export default Buttons;
