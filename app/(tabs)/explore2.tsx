import { Image, StyleSheet, Text, View, TextInput} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useState} from "react";


export default function HomeScreen() {
    let [maxHP, setMaxHP] = useState(54);
    let [increment, setIncrement] = useState(maxHP);
    let [current, setCurrent] = useState(maxHP);


    let name :string = "fail";
    AsyncStorage.setItem("char", "gamidoi");
    name = AsyncStorage.getItem("char");
    let testString :string = "poopidoodle";
    AsyncStorage.setItem(testString + " dandy", "testResultWin");
    let testResult = AsyncStorage.getItem("poopidoodle dandy");




    return (

        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/headerImageDragons.jpg')}
                    style={styles.reactLogo}
                />
            }>
            <Text style={{color: "white", fontSize: 30, backgroundColor: "black"}}>{name} loves to win with {testResult}</Text>


        </ParallaxScrollView>
    );


}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: "100%",
        width: "100%",
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
