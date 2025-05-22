import React from "react";
import headerRandomizer from "@/components/headerRandomizer";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import {MoneyManager} from "@/components/moneyManager";
import {DisplayItemsOnItemsTab} from "@/components/displayItemsOnItemsTab";


let headerImage :React.JSX.Element = headerRandomizer();
export default function MainCharacterSyndrome() {
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();
    return (<ParallaxScrollView
        headerBackgroundColor={{ light: '#1D3D47', dark: '#1D3D47' }}
        headerImage={
            headerImage
        }>
        <MoneyManager displayOn={true} displayMoneyChanger={false} />
        <DisplayItemsOnItemsTab />

    </ParallaxScrollView>)
}