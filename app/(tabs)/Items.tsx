import React from "react";
import headerRandomizer from "@/components/headerRandomizer";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";
import {Text, View} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import {MoneyManager} from "@/components/moneyManager";
import {displayItemsOnItemsTab} from "@/components/displayItemsOnItemsTab";


let headerImage :React.JSX.Element = headerRandomizer();
export default function MainCharacterSyndrome() {
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();
    return (<ParallaxScrollView
        headerBackgroundColor={{ light: '#1D3D47', dark: '#1D3D47' }}
        headerImage={
            headerImage
        }>
        <View>{MoneyManager(true)}</View>
        <View>{displayItemsOnItemsTab()}</View>

    </ParallaxScrollView>)
}