import React, {useEffect} from "react";
import {ScrollView, Text, TouchableOpacity, View, BackHandler, StyleSheet} from "react-native";

import {HStack, VStack} from "native-base";

import {StackActions, useNavigation} from "@react-navigation/native";

import {globalStyle} from "globalStyles";
import Buttons from "components/forms/Buttons";

const TermsOfService = ({}) => {
    const navigation = useNavigation<any>();

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                BackHandler.exitApp();
                return true;
            },
        );
        return () => backHandler.remove();
    }, []);
    return (
        <ScrollView style={styles.container}>
            <VStack alignItems={'center'} space={7} p={5} mt={200}>
                <Text style={styles.title}>Are you 18 years of age or older?</Text>

               <View>
                   <Text style={styles.info}>You must be 18 years or older and agree to our Terms of Use to access and use this website.</Text>
                   <Text style={styles.info}>By clicking ENTER below, you certify that you are 18 years or older and that you accept our Terms of Use.</Text>
               </View>

                   <HStack space={5}>
                       <View style={styles.btnContainer}>
                           <Buttons title={'ENTER'} onPress={() => navigation.dispatch(StackActions.replace('Preloading'))} color={'black'} backgroundColor={'#FFF'}/>
                       </View>

                       <View style={styles.btnContainer}>
                           <Buttons title={'NO'} onPress={() => BackHandler.exitApp()} backgroundColor={'purple'} color={'white'}/>
                       </View>
                   </HStack>

                <TouchableOpacity onPress={() => navigation.navigate('ServiceProvisions')}>
                    <Text style={styles.tos}>TERMS OF USE</Text>
                </TouchableOpacity>
            </VStack>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyle.primaryColor
    },
    title: {
        color: globalStyle.btnColor,
        fontSize: 20,
        fontWeight: '600'
    },
    info: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 12
    },
    btnContainer: {
        width: 150
    },
    tos: {
        color: 'grey'
    }
})

export default TermsOfService;
