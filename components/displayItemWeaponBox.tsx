import {Item} from "@/assets/classes/item";
import {StyleSheet, View, Text, Pressable, Platform} from "react-native";
import React, {useState} from "react";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";
import {itemChargesInteraction} from "@/components/itemChargesInteractionTool";
import {itemQuantityAdjustTool} from "@/components/itemQuantityAdjustTool";
import {getDiceRollAsString} from "@/assets/functionLibrary/getDiceRollAsString";
import {getStatMod} from "@/assets/functionLibrary/getCoreStatMod";


export function displayItemWeaponBox(item: Item) {
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();

    let toAttackModifier = getStatMod(character.STR) + character.proficiency + item.roll[8];
    let actualDamageRollSTR: [boolean, number, number, number, number, number, number, number, number] = [item.roll[0], item.roll[1],
        item.roll[2], item.roll[3], item.roll[4], item.roll[5], item.roll[6], item.roll[7], item.roll[8] + getStatMod(character.STR)];

    return (<View style={styles.itemWeaponBox}>
        <Text style={styles.itemName}>{item.name}</Text>
        {item.roll[0] && <Text style={styles.diceDisplay}>{getDiceRollAsString(item.roll)}</Text>}
        {<Text style={styles.statAdjustedRollDisplay}>STR weapon {
            toAttackModifier > 0 ? "+" + toAttackModifier : "-" + toAttackModifier
        } to hit for{
            getDiceRollAsString(actualDamageRollSTR)}</Text>}
        {(item.twoHanded || item.requiresAttunment) && <View style={styles.tagsBox}>
            {item.twoHanded && <Text style={styles.specificTag}>Two Handed</Text>}
            {item.requiresAttunment && <Text style={styles.specificTag}>Attunement</Text>}
        </View>}

        {itemChargesInteraction(item, getDiceRollAsString(item.refreshRoll))}


        <Text style={styles.label}>Equip Weapon?</Text>
        {item.twoHanded ? <View style={{flexDirection: "row", alignSelf: "center"}}><Pressable onPress={() => {
            characterUpdater({type: "equipWeapon1", value: item.name});
            characterUpdater({type: "equipWeapon2", value: item.name});
        }}>
            <Text style={[
                styles.equipButton,
                {backgroundColor: character.weapon1 === item.name ? "darkgray" : "darkgoldenrod"
                }]}>Both Hands</Text>
            </Pressable></View> :
            <View style={{flexDirection: "row", alignSelf: "center"}}>
                <Pressable onPress={() => {
                    characterUpdater({type: "equipWeapon1", value: item.name});
                }}>
                    <Text style={[
                        styles.equipButton,
                        {backgroundColor: character.weapon1 === item.name ? "darkgray" : "darkgoldenrod"
                        }]}>Left Hand</Text>
                </Pressable>
                <Pressable onPress={() => {
                    characterUpdater({type: "equipWeapon2", value: item.name});
                }}>
                    <Text style={[
                        styles.equipButton,
                        {backgroundColor: character.weapon2 === item.name ? "darkgray" : "darkgoldenrod"
                        }]}>Right Hand</Text>
                </Pressable>
            </View>}
        {((character.weapon1 === item.name) || (character.weapon2 === item.name)) && <Text style={styles.label}>Weapon is Already Equipped</Text>}


        <Text style={styles.label}>Value: {item.value}gp</Text>
        <Text style={styles.label}>Quantity Owned</Text>
        {itemQuantityAdjustTool(item)}
        {item.description != "" && <Text style={styles.descriptionText}>{item.description}</Text>}
    </View>)
}
const styles = StyleSheet.create({
    itemWeaponBox: {
        backgroundColor: "saddlebrown",
        borderRadius: 10,
        borderWidth: 4,
        borderColor: "orange",
        marginBottom: 10,
    },
    itemName: {
        color: "white",
        fontSize: 30,
        textAlign: "center"
    },
    descriptionText: {
        color: "white",
        textAlign: "center",
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "maroon",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "orange",
    },
    label: {
        color: "white",
        textAlign: "center",
        fontSize: 12,
    },
    diceDisplay: {
        color: "white",
        textAlign: "center",
        backgroundColor: "black",
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "orange",
        padding: 2,
        fontSize: 11,
        width: 160,
        alignSelf: "center",
    },
    statAdjustedRollDisplay: {
        color: "white",
        textAlign: "center",
        backgroundColor: "maroon",
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "orange",
        padding: 5,
        fontSize: 20,
    },
    tagsBox: {
        borderWidth: 2,
        borderColor: "orange",
        borderRadius: 10,
        backgroundColor: "teal",
        flexDirection: "row",
        alignSelf: "center",
        paddingHorizontal: 8
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
    specificTag: {
        color: "white",
        fontSize: 12,
        borderWidth: 2,
        borderColor: "orange",
        borderRadius: 10,
        backgroundColor: "saddlebrown",
        margin: 3,
        padding: 4,
    },
})