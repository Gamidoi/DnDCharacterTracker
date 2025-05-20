import {Item} from "@/assets/classes/item";
import {StyleSheet, View, Text, Pressable} from "react-native";
import React from "react";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";
import {ItemChargesInteraction} from "@/components/itemChargesInteractionTool";
import {ItemQuantityAdjustTool} from "@/components/itemQuantityAdjustTool";
import {getDiceRollAsString} from "@/assets/functionLibrary/getDiceRollAsString";
import {getStatMod} from "@/assets/functionLibrary/getCoreStatMod";
import {DisplayItemAttunementButtons} from "@/components/displayItemAttunementButtons";
import {preventEquipIfNeedsAttunement} from "@/assets/functionLibrary/preventEquipIfNeedsAttunement";



export type DisplayItemArmorBoxProps = {
    item: Item;
}
export function DisplayItemArmorBox({item}: DisplayItemArmorBoxProps) {
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();

    function ACIfWorn(){
        let DexBonusToAC = getStatMod(character.DEX);
        if (DexBonusToAC > item.AC[1]) {DexBonusToAC = item.AC[1];}
        return (item.AC[0] + DexBonusToAC);
    }


    return (<View style={styles.itemArmorBox}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.ACDisplay}>AC: {item.AC[0]}{item.AC[1] > 0 ? " + Dex (Max +" + item.AC[1] + ")" : ""}</Text>
        <Text style={styles.statAdjustedACDisplay}>{ACIfWorn()}</Text>

        <ItemChargesInteraction item={item} getRolledDiceAsString={getDiceRollAsString(item.refreshRoll)} />

        <Text style={styles.label}>Equip Armor?</Text>
        <View style={{flexDirection: "row", alignSelf: "center"}}><Pressable onPress={() => {
            if (preventEquipIfNeedsAttunement(item, character)){
                characterUpdater({type: "equipArmor", value: item.name});
            }
            }}>
                <Text style={[
                    styles.equipButton,
                    {backgroundColor: character.armor?.name === item.name ? "darkgray" :
                            preventEquipIfNeedsAttunement(item, character) ? "darkgoldenrod" : "maroon"
                    }]}>{item.name}</Text>
            </Pressable>
        </View>

        {(character.armor?.name === item.name) && <Text style={styles.label}>Armor is Already Equipped</Text>}
        <DisplayItemAttunementButtons item={item} />
        <Text style={styles.label}>Value: {item.value}gp</Text>
        <Text style={styles.label}>Quantity Owned</Text>
        <ItemQuantityAdjustTool item={item} />
        {item.description != "" && <Text style={styles.descriptionText}>{item.description}</Text>}
    </View>)
}
const styles = StyleSheet.create({
    itemArmorBox: {
        backgroundColor: "darkgreen",
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
    ACDisplay: {
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
    statAdjustedACDisplay: {
        color: "white",
        alignSelf: "center",
        textAlign: "center",
        backgroundColor: "maroon",
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "orange",
        padding: 5,
        fontSize: 20,
        width: 120,
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