import {Item} from "@/assets/classes/item";
import {StyleSheet, View, Text, Pressable} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React, {useState} from "react";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";
import {itemQuantityAdjustTool} from "@/components/itemQuantityAdjustTool";


export function displayItemConsumableBox(item: Item) {
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();

    function getRolledDiceAsString(){
        let diceString = ""
        let rolledDice = item.roll;
        if (rolledDice[1] > 0){ diceString += " " + rolledDice[1] + "d4";
            if ( rolledDice[2] > 0 || rolledDice[3] > 0 || rolledDice[4] > 0 || rolledDice[5] > 0 || rolledDice[6] > 0 || rolledDice[7] > 0){diceString += " +"}
        }
        if (rolledDice[2] > 0){ diceString += " " + rolledDice[2] + "d6";
            if (rolledDice[3] > 0 || rolledDice[4] > 0 || rolledDice[5] > 0 || rolledDice[6] > 0 || rolledDice[7] > 0){diceString += " +"}
        }
        if (rolledDice[3] > 0){ diceString += " " + rolledDice[3] + "d8";
            if (rolledDice[4] > 0 || rolledDice[5] > 0 || rolledDice[6] > 0 || rolledDice[7] > 0){diceString += " +"}
        }
        if (rolledDice[4] > 0){ diceString += " " + rolledDice[4] + "d10";
            if (rolledDice[5] > 0 || rolledDice[6] > 0 || rolledDice[7] > 0){diceString += " +"}
        }
        if (rolledDice[5] > 0){ diceString += " " + rolledDice[5] + "d12";
            if (rolledDice[6] > 0 || rolledDice[7] > 0){diceString += " +"}
        }
        if (rolledDice[6] > 0){ diceString += " " + rolledDice[6] + "d20";
            if (rolledDice[7] > 0){diceString += " +"}
        }
        if (rolledDice[7] > 0){ diceString += " " + rolledDice[7] + "d100";
        }
        if (rolledDice[8] > 0){ diceString += " +" + rolledDice[8]; }
        return diceString;
    }

    return (<View style={styles.itemConsumableBox}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.label}>Quantity</Text>
        {itemQuantityAdjustTool(item)}
        <Text style={styles.label}>Value: {item.value}gp</Text>
        {item.roll[0] && <Text style={styles.diceDisplay}>{getRolledDiceAsString()}</Text>}


        <Text style={styles.descriptionText}>{item.description}</Text>
    </View>)
}
const styles = StyleSheet.create({
    itemConsumableBox: {
        backgroundColor: "teal",
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
})