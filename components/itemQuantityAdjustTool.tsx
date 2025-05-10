import {Pressable, StyleSheet, Text, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";
import {Item} from "@/assets/classes/item";

export function itemQuantityAdjustTool(item: Item) {
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();
    return (
        <View style={styles.useButtonsRow}>
            <Pressable onPress={() => {
                characterUpdater({type: "useConsumable", itemName: item.name, value: "subtract"});
            }}>
                <MaterialCommunityIcons size={28} name="arrow-left-bold-outline" color={"red"} />
            </Pressable>
            <Text style={styles.quantityBox}>{item.quantity}</Text>
            <Pressable onPress={() => {
                characterUpdater({type: "useConsumable", itemName: item.name, value: "add"});
            }}>
                <MaterialCommunityIcons size={28} name="arrow-right-bold-outline" color={"blue"} />
            </Pressable>
        </View>
    )
}



const styles = StyleSheet.create({
    quantityBox: {
        color: "white",
        backgroundColor: "purple",
        textAlign: "center",
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: "orange",
        fontSize: 20,
        width: 100,
    },
    useButtonsRow: {
        alignSelf: "center",
        justifyContent: "center",
        flexDirection: "row",
        width: 350,
    },
})