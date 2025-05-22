import { StyleSheet, TextInput, View, Text, Pressable} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import React, {useState} from "react";
import {useCharacter, useCharacterUpdater} from '@/components/characterUpdater';
import headerRandomizer from "@/components/headerRandomizer";
import DisplayPassivesOnIndexTab from "@/components/displayPassivesOnIndexTab";
import {UsingSpellSlotsIndexTab} from "@/components/usingSpellSlotsIndexTab";
import {DisplayEquippedOnIndex} from "@/components/displayEquippedOnIndex";



let headerImage :React.JSX.Element = headerRandomizer();
export default function MainCharacterSyndrome() {
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();

    let [incrementHP, setIncrementHP] = useState("0");

    function resistanceImmunityDisplayString(listOfResistImmune: string[]){
        let setOfResistImmune = new Set(listOfResistImmune);
        let displayString = "";
        setOfResistImmune.forEach((item) => {
            if (displayString != "") {displayString += ", "}
            displayString += item;
        })
        return <Text style={[
            styles.labels,
            {
                fontSize: 15,
                borderRadius: 7,
                borderWidth: 2,
                borderColor: "orange",
                marginHorizontal: 5,
            }
        ]}>{displayString}</Text>;
    }



  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#1D3D47', dark: '#1D3D47' }}
      headerImage={
          headerImage
      }>

        <View style={{backgroundColor: 'black', alignItems: "center", alignSelf: "center"}}>
            <Text style={{
                color: "white",
                textAlign: "center",
                fontSize: 20,
                borderWidth: 2,
                borderColor: "orange",
                borderRadius: 5,
                padding: 6,
            }}>AC: {character.armorClass}</Text>
            <Text style={{color: "white", fontSize: 28}}>Current HP is {character.currentHP} / {character.maxHP}</Text>
            <Text>
                <Pressable
                    style={{
                        backgroundColor: "maroon",
                        padding: 13,
                        borderRadius: 12,
                        width: 122,
                        height: 42}}
                    onPress={() => {
                        if (typeof(character.currentHP) != "number"){characterUpdater({type: "updateCurrentHP", value: character.maxHP})}
                        if (!isNaN(parseInt(incrementHP))){
                            if (parseInt(incrementHP) < 0){incrementHP = "" +  Math.abs(parseInt(incrementHP))}
                            if (character.currentHP - parseInt(incrementHP) < 0) {
                                characterUpdater({type: "updateCurrentHP", value: 0})
                        } else {
                                characterUpdater({type: "updateCurrentHP", value: (character.currentHP - parseInt(incrementHP))})
                        }
                    }
                }}>
                    <Text style={{color: "white", fontSize: 12}}>Take {incrementHP} Damage</Text>
                </Pressable>

                <Pressable
                    style={{
                        backgroundColor: "green",
                        padding: 13,
                        borderRadius: 12,
                        width: 93,
                        height: 42}}
                    onPress={() => {
                        if (typeof(character.currentHP) != "number"){characterUpdater({type: "updateCurrentHP", value: character.maxHP})}
                        if (!isNaN(parseInt(incrementHP))){
                            if (parseInt(incrementHP) < 0){incrementHP = "" +  Math.abs(parseInt(incrementHP))}
                            if (character.currentHP + parseInt(incrementHP) > character.maxHP) {
                                characterUpdater({type: "updateCurrentHP", value: character.maxHP})
                        } else {
                            characterUpdater({type: "updateCurrentHP", value: (character.currentHP + parseInt(incrementHP))})
                        }
                }}}>
                    <Text style={{color: "white", fontSize: 12}}>Heal {incrementHP} HP</Text>
                </Pressable>
                <TextInput
                    keyboardType='numeric'
                    onChangeText={setIncrementHP}
                    maxLength={3}
                    style={{
                        borderStyle: "solid",
                        borderWidth: 3,
                        borderColor: "white",
                        width: 80,
                        color: "grey",
                    }}
                />
            </Text>
        </View>

        {(character.resistances.length + character.immunities.length > 0) && <View style={{
            borderWidth: 2,
            borderColor: "orange",
            borderRadius: 10,
            backgroundColor: "blue",

        }}>
            <View style={{alignSelf: "center", flexDirection: "row", width: 350}}>
                {character.resistances.length > 0 && <View style={{flex: character.immunities.length > 0 ? 0.50 : 1}}>
                    <Text style={styles.labels}>Resistance to:</Text>
                    {resistanceImmunityDisplayString(character.resistances)}
                </View>}
                {character.immunities.length > 0 && <View style={{flex: character.resistances.length > 0 ? 0.50 : 1}}>
                    <Text style={styles.labels}>Immunity to:</Text>
                    {resistanceImmunityDisplayString(character.immunities)}
                </View>}
            </View>
        </View>}



        <UsingSpellSlotsIndexTab />
        <DisplayEquippedOnIndex />
        <DisplayPassivesOnIndexTab />


    </ParallaxScrollView>
  );


}




const styles = StyleSheet.create({
  headImage: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
    labels: {
        color: "white",
        textAlign: "center",
        fontSize: 12,
    },
});
