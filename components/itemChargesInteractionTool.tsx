import {Platform, Pressable, StyleSheet, Text, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";
import {Item} from "@/assets/classes/item";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";





export function itemChargesInteraction(item: Item, getRolledDiceAsString: string) {
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();
    return (<>{item.uses > 0 && <>
        <Text style={styles.label}>{item.uses === 1 ? "" : "Max "}{item.uses} Charge{item.uses === 1 ? "" : "s"}, Refresh{
            item.refreshQuantity === "All" ? " All" :
                item.refreshQuantity === "Rolled" ? "" + getRolledDiceAsString :
                    item.refreshQuantity === "1" ? "" :
                        item.uses === 1 ? "" :
                            " " + item.refreshQuantity
        } {item.refreshOn === "Dawn" ? "at Dawn" :
            item.refreshOn === "Short Rest" ? "on Short Rest" :
                "on Long Rest"
        }</Text>
        {
            item.uses === 1 && <View style={styles.useButtonsRow}>
                <Pressable style={styles.usesButton1} onPress={() => {
                    characterUpdater({type: "usingItemChargesButtons", index: 0, itemName: item.name})
                }}>
                    <Text style={styles.ButtonX}>{item.usedInstances[0] === "X" ? "X" : " "}</Text>
                </Pressable>
            </View>
        }
        {
            item.uses === 2 && <View style={styles.useButtonsRow}>
                <Pressable style={styles.usesButton2} onPress={() => {
                    characterUpdater({type: "usingItemChargesButtons", index: 0, itemName: item.name})
                }}>
                    <Text style={styles.ButtonX}>{item.usedInstances[0] === "X" ? "X" : " "}</Text>
                </Pressable>
                <Pressable style={styles.usesButton2} onPress={() => {
                    characterUpdater({type: "usingItemChargesButtons", index: 1, itemName: item.name})
                }}>
                    <Text style={styles.ButtonX}>{item.usedInstances[1] === "X" ? "X" : " "}</Text>
                </Pressable>
            </View>
        }
        {
            item.uses === 3 && <View style={styles.useButtonsRow}>
                <Pressable style={styles.usesButton3} onPress={() => {
                    characterUpdater({type: "usingItemChargesButtons", index: 0, itemName: item.name})
                }}>
                    <Text style={styles.ButtonX}>{item.usedInstances[0] === "X" ? "X" : " "}</Text>
                </Pressable>
                <Pressable style={styles.usesButton3} onPress={() => {
                    characterUpdater({type: "usingItemChargesButtons", index: 1, itemName: item.name})
                }}>
                    <Text style={styles.ButtonX}>{item.usedInstances[1] === "X" ? "X" : " "}</Text>
                </Pressable>
                <Pressable style={styles.usesButton3} onPress={() => {
                    characterUpdater({type: "usingItemChargesButtons", index: 2, itemName: item.name})
                }}>
                    <Text style={styles.ButtonX}>{item.usedInstances[2] === "X" ? "X" : " "}</Text>
                </Pressable>
            </View>
        }
        {
            item.uses === 4 && <View style={styles.useButtonsRow}>
                <Pressable style={styles.usesButton4} onPress={() => {
                    characterUpdater({type: "usingItemChargesButtons", index: 0, itemName: item.name})
                }}>
                    <Text style={styles.ButtonX}>{item.usedInstances[0] === "X" ? "X" : " "}</Text>
                </Pressable>
                <Pressable style={styles.usesButton4} onPress={() => {
                    characterUpdater({type: "usingItemChargesButtons", index: 1, itemName: item.name})
                }}>
                    <Text style={styles.ButtonX}>{item.usedInstances[1] === "X" ? "X" : " "}</Text>
                </Pressable>
                <Pressable style={styles.usesButton4} onPress={() => {
                    characterUpdater({type: "usingItemChargesButtons", index: 2, itemName: item.name})
                }}>
                    <Text style={styles.ButtonX}>{item.usedInstances[2] === "X" ? "X" : " "}</Text>
                </Pressable>
                <Pressable style={styles.usesButton4} onPress={() => {
                    characterUpdater({type: "usingItemChargesButtons", index: 3, itemName: item.name})
                }}>
                    <Text style={styles.ButtonX}>{item.usedInstances[3] === "X" ? "X" : " "}</Text>
                </Pressable>
            </View>
        }

        {
            item.uses > 4 && <View style={styles.useButtonsRow}>
                <Pressable onPress={() => {
                    characterUpdater({type: "usingItemChargesCounter", itemName: item.name, value: "subtract"})
                }}>
                    <MaterialCommunityIcons size={38} name="arrow-left-bold-outline" color={"red"}/>
                </Pressable>
                <Text style={styles.quantityBox}>{item.unusedQuantity}</Text>
                <Pressable onPress={() => {
                    characterUpdater({type: "usingItemChargesCounter", itemName: item.name, value: "add"})
                }}>
                    <MaterialCommunityIcons size={38} name="arrow-right-bold-outline" color={"blue"}/>
                </Pressable>
            </View>
        }
    </>}</>)
}

const styles = StyleSheet.create({
    label: {
        color: "white",
        textAlign: "center",
        fontSize: 12,
    },
    useButtonsRow: {
        alignSelf: "center",
        justifyContent: "center",
        flexDirection: "row",
        width: 350,
    },
    usesButton1: {
        color: 'white',
        backgroundColor: 'purple',
        height: 35,
        width: "95%",
        borderRadius: 15,
        borderColor: "orange",
        borderWidth: 2,
    },
    usesButton2: {
        color: 'white',
        backgroundColor: 'purple',
        height: 35,
        width: "45%",
        borderRadius: 12,
        borderColor: "orange",
        borderWidth: 2,
    },
    usesButton3: {
        color: 'white',
        backgroundColor: 'purple',
        height: 35,
        width: "29.5%",
        borderRadius: 8,
        borderColor: "orange",
        borderWidth: 2,
    },
    usesButton4: {
        color: 'white',
        backgroundColor: 'purple',
        height: 35,
        width: "21.9%",
        borderRadius: 5,
        borderColor: "orange",
        borderWidth: 2,
    },
    ButtonX: {
        padding: 0,
        color: 'black',
        fontWeight: 'bold',
        margin: Platform.OS === "web" ? -13 : -15,
        fontSize: 40,
        textAlign: 'center',
    },
    quantityBox: {
        color: "white",
        backgroundColor: "purple",
        textAlign: "center",
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: "orange",
        fontSize: 28,
        width: 100,
    },
})