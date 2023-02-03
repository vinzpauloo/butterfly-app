import React, { useState } from 'react';
import {View, StyleSheet, TextInput, Text} from "react-native";

const InputText = ({placeholder, placeholderTextColor, maxLength}) => {

    const [text, setText] = useState('');
    const charactersLeft = maxLength - text.length;
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    return (
        <View>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                maxLength={maxLength}
                onChangeText={(newText) => setText(newText)}
                style={[styles.textInput, { borderColor: isFocused ? '#FF474E' : 'grey'}]}
                onFocus={handleFocus}
                onBlur={handleBlur}
                multiline
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
    },
    characterCount: {
        textAlign: "right",
        color: "#FFFFFF",
        fontSize: 12
    }
})

export default InputText
