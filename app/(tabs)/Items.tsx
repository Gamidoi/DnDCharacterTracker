import React from "react";
import headerRandomizer from "@/components/headerRandomizer";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";
import {Text} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";


let headerImage :React.JSX.Element = headerRandomizer();
export default function MainCharacterSyndrome() {
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();
    return (<ParallaxScrollView
        headerBackgroundColor={{ light: '#1D3D47', dark: '#1D3D47' }}
        headerImage={
            headerImage
        }>
        <Text style={{color: "white", fontSize: 45, alignSelf: "center"}}>Under Construction, Come Back Soon!!!</Text>

    </ParallaxScrollView>)
}