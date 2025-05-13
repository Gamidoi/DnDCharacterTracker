import {Item} from "@/assets/classes/item";
import {Pressable, StyleSheet, Text, View} from "react-native";
import React from "react";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";
import {preventEquipIfNeedsAttunement} from "@/assets/functionLibrary/preventEquipIfNeedsAttunement";


export function displayItemAttunementButtons(item: Item) {
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();


    return (<>{item.requiresAttunment && <View>
        <Text style={[
            styles.label, {
                backgroundColor: !preventEquipIfNeedsAttunement(item, character) ? "yellow" : "",
                color: !preventEquipIfNeedsAttunement(item, character) ? "black" : "white"
            }]}>Requires Attunement</Text>
        <View style={{flexDirection: "row", alignSelf: "center"}}>
            <Pressable onPress={() => {
                characterUpdater({type: "attune1", value: item.name});
            }}>
                <Text style={[
                    styles.equipButton,
                    {backgroundColor: character.attunement1?.name === item.name ? "darkgray" : "darkgoldenrod"
                    }]}>Slot 1</Text>
            </Pressable>
            <Pressable onPress={() => {
                characterUpdater({type: "attune2", value: item.name});
            }}>
                <Text style={[
                    styles.equipButton,
                    {backgroundColor: character.attunement2?.name === item.name ? "darkgray" : "darkgoldenrod"
                    }]}>Slot 2</Text>
            </Pressable>
            <Pressable onPress={() => {
                characterUpdater({type: "attune3", value: item.name});
            }}>
                <Text style={[
                    styles.equipButton,
                    {backgroundColor: character.attunement3?.name === item.name ? "darkgray" : "darkgoldenrod"
                    }]}>Slot 3 </Text>
            </Pressable>
        </View>
    </View>}</>)
}


const styles = StyleSheet.create({
    label: {
        color: "white",
        textAlign: "center",
        fontSize: 12,
    },
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