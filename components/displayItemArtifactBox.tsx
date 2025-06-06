import {Item} from "@/assets/classes/item";
import {StyleSheet, View, Text} from "react-native";
import React from "react";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";
import {ItemChargesInteraction} from "@/components/itemChargesInteractionTool";
import {ItemQuantityAdjustTool} from "@/components/itemQuantityAdjustTool";
import {getDiceRollAsString} from "@/assets/functionLibrary/getDiceRollAsString";
import {DisplayItemAttunementButtons} from "@/components/displayItemAttunementButtons";



 export type DisplayItemArtifactBoxProps = {
     item: Item;
 }
export function DisplayItemArtifactBox({item}: DisplayItemArtifactBoxProps) {
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();

    return (<View style={styles.itemArtifactBox}>
        <Text style={styles.itemName}>{item.name}</Text>

        <ItemChargesInteraction item={item} getRolledDiceAsString={getDiceRollAsString(item.refreshRoll)} />
        <DisplayItemAttunementButtons item={item} />
        <Text style={styles.label}>Value: {item.value}gp</Text>
        <Text style={styles.label}>Quantity Owned</Text>
        <ItemQuantityAdjustTool item={item} />
        {item.description != "" && <Text style={styles.descriptionText}>{item.description}</Text>}
    </View>)
}
const styles = StyleSheet.create({
    itemArtifactBox: {
        backgroundColor: "darkslateblue",
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