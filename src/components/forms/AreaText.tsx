import React, { useState } from 'react';
import {View, StyleSheet, TextInput, Text} from "react-native";
import {TextArea} from "native-base";

const AreaText = ({placeholder, placeholderTextColor, maxLength}) => {

    const [text, setText] = useState('');
    const charactersLeft = maxLength - text.length;
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    return (
        <View>
            <TextArea
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                maxLength={maxLength}
                onChangeText={(newText) => setText(newText)}
                style={[styles.textInput, {borderColor: isFocused ? '#FF474E' : 'grey'}]}
                onFocus={handleFocus}
                onBlur={handleBlur}
                multiline
                h={200}
                numberOfLines={20}
                autoCompleteType={undefined}
                borderWidth={0}
                backgroundColor={'none'}
            />
            {maxLength && (
                <Text style={styles.characterCount}>
                    {charactersLeft}/{maxLength}
                </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        color: "#FFFFFF",
        padding: 10,
        borderRadius: 5,
        fontSize: 15
    },
    characterCount: {
        textAlign: "right",
        position: "absolute",
        bottom: 20,
        right: 20,
        color: "#FFFFFF",
        fontSize: 12
    }
})

export default AreaText
