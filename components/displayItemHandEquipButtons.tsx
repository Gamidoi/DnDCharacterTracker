import {Item} from "@/assets/classes/item";
import {Pressable, StyleSheet, Text, View} from "react-native";
import React from "react";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";
import {preventEquipIfNeedsAttunement} from "@/assets/functionLibrary/preventEquipIfNeedsAttunement";


export function displayItemHandEquipButtons(item: Item) {
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();


    return (<>
        {(item.twoHanded && item.type === "Weapon") ? <View style={{flexDirection: "row", alignSelf: "center"}}><Pressable onPress={() => {
                if (preventEquipIfNeedsAttunement(item, character)) {
                    characterUpdater({type: "equipWeapon1", value: item.name});
                    characterUpdater({type: "equipWeapon2", value: item.name});
                }
            }}>
                <Text style={[
                    styles.equipButton,
                    {backgroundColor: character.weapon1?.name === item.name ? "darkgray" :
                            preventEquipIfNeedsAttunement(item, character) ? "darkgoldenrod" : "maroon"
                    }]}>Both Hands</Text>
            </Pressable></View> :
            <View style={{flexDirection: "row", alignSelf: "center"}}>
                <Pressable onPress={() => {
                    if (preventEquipIfNeedsAttunement(item, character)) {
                        characterUpdater({type: "equipWeapon1", value: item.name});
                    }
                }}>
                    <Text style={[
                        styles.equipButton,
                        {backgroundColor: character.weapon1?.name === item.name ? "darkgray" :
                                preventEquipIfNeedsAttunement(item, character) ? "darkgoldenrod" : "maroon"
                        }]}>Left Hand</Text>
                </Pressable>
                <Pressable onPress={() => {
                    if (preventEquipIfNeedsAttunement(item, character)) {
                        characterUpdater({type: "equipWeapon2", value: item.name});
                    }
                }}>
                    <Text style={[
                        styles.equipButton,
                        {backgroundColor: character.weapon2?.name === item.name ? "darkgray" :
                                preventEquipIfNeedsAttunement(item, character) ? "darkgoldenrod" : "maroon"
                        }]}>Right Hand</Text>
                </Pressable>
            </View>}
    </>)
}


const styles = StyleSheet.create({
    equipButton: {
        color: "white",
        borderWidth: 2,
        borderColor: "orange",
        borderRadius: 10,
        backgroundColor: "darkgoldenrod",
        flexDirection: "row",
        alignSelf: "center",
        padding: 13
    },
})