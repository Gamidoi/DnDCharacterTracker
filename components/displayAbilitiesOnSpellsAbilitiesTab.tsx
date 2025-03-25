import {Pressable, StyleSheet, Text, View} from "react-native";
import {Ability} from "@/assets/classes/ability";
import {Character} from "@/assets/classes/character";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";
import React from "react";
import {MaterialCommunityIcons} from "@expo/vector-icons";



export default function DisplayAbilitiesOnSpellsAbilitiesTab(){
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();

    function displayAbilitiesByType(abilityTriggerGroup: string){
         return character.abilities.map((ability) => {
            if (ability.usesType != "Passive") {
                return (<View style={styles.abilityBox}>
                    <Text style={styles.abilityName}>{ability.name}</Text>
                    <Text style={styles.labels}>Uses{ability.uses > 4 ? "" : ability.uses === 1 ? " Button" : " Buttons"}</Text>
                    {ability.uses === 1 && <View style={styles.useButtonsRow}>
                        <Pressable style={styles.usesButton1} onPress={()=>{
                            characterUpdater({type: "updateAbilityUsageSlot", useSlot: 0, abilityName: ability.name})}}>
                            <Text style={styles.ButtonX}>{ability.usedInstances[0] === "X" ? "X" : " "}</Text>
                        </Pressable>
                    </View>}
                    {ability.uses === 2 && <View style={styles.useButtonsRow}>
                        <Pressable style={styles.usesButton2} onPress={()=>{
                            characterUpdater({type: "updateAbilityUsageSlot", useSlot: 0, abilityName: ability.name})}}>
                            <Text style={styles.ButtonX}>{ability.usedInstances[0] === "X" ? "X" : " "}</Text>
                        </Pressable>
                        <Pressable style={styles.usesButton2} onPress={()=>{
                            characterUpdater({type: "updateAbilityUsageSlot", useSlot: 1, abilityName: ability.name})}}>
                            <Text style={styles.ButtonX}>{ability.usedInstances[1] === "X" ? "X" : " "}</Text>
                        </Pressable>
                    </View>}
                    {ability.uses === 3 && <View style={styles.useButtonsRow}>
                        <Pressable style={styles.usesButton3} onPress={()=>{
                            characterUpdater({type: "updateAbilityUsageSlot", useSlot: 0, abilityName: ability.name})}}>
                            <Text style={styles.ButtonX}>{ability.usedInstances[0] === "X" ? "X" : " "}</Text>
                        </Pressable>
                        <Pressable style={styles.usesButton3} onPress={()=>{
                            characterUpdater({type: "updateAbilityUsageSlot", useSlot: 1, abilityName: ability.name})}}>
                            <Text style={styles.ButtonX}>{ability.usedInstances[1] === "X" ? "X" : " "}</Text>
                        </Pressable>
                        <Pressable style={styles.usesButton3} onPress={()=>{
                            characterUpdater({type: "updateAbilityUsageSlot", useSlot: 2, abilityName: ability.name})}}>
                            <Text style={styles.ButtonX}>{ability.usedInstances[2] === "X" ? "X" : " "}</Text>
                        </Pressable>
                    </View>}
                    {ability.uses === 4 && <View style={styles.useButtonsRow}>
                        <Pressable style={styles.usesButton4} onPress={()=>{
                            characterUpdater({type: "updateAbilityUsageSlot", useSlot: 0, abilityName: ability.name})}}>
                            <Text style={styles.ButtonX}>{ability.usedInstances[0] === "X" ? "X" : " "}</Text>
                        </Pressable>
                        <Pressable style={styles.usesButton4} onPress={()=>{
                            characterUpdater({type: "updateAbilityUsageSlot", useSlot: 1, abilityName: ability.name})}}>
                            <Text style={styles.ButtonX}>{ability.usedInstances[1] === "X" ? "X" : " "}</Text>
                        </Pressable>
                        <Pressable style={styles.usesButton4} onPress={()=>{
                            characterUpdater({type: "updateAbilityUsageSlot", useSlot: 2, abilityName: ability.name})}}>
                            <Text style={styles.ButtonX}>{ability.usedInstances[2] === "X" ? "X" : " "}</Text>
                        </Pressable>
                        <Pressable style={styles.usesButton4} onPress={()=>{
                            characterUpdater({type: "updateAbilityUsageSlot", useSlot: 3, abilityName: ability.name})}}>
                            <Text style={styles.ButtonX}>{ability.usedInstances[3] === "X" ? "X" : " "}</Text>
                        </Pressable>
                    </View>}
                    {ability.uses > 4 && <View style={styles.useButtonsRow}>
                        <Pressable onPress={() => {
                            characterUpdater({type: "abilityUnusedQuantityAdjust", abilityName: ability.name, value: "subtract"})
                        }}>
                            <MaterialCommunityIcons size={28} name="arrow-left-bold-outline" color={"red"} />
                        </Pressable>
                        <Text style={styles.quantityBox}>{ability.unusedQuantity}</Text>
                        <Pressable onPress={() => {
                            characterUpdater({type: "abilityUnusedQuantityAdjust", abilityName: ability.name, value: "add"})
                        }}>
                            <MaterialCommunityIcons size={28} name="arrow-right-bold-outline" color={"blue"} />
                        </Pressable>
                    </View>}


                    {ability.description != "" && <Text style={styles.descriptionText}>{ability.description}</Text>}
                </View>)
            }
        })
    }

    return (
        <View>
            {displayAbilitiesByType("On Hit")}

            {character.abilities.map((ability) => {
                if (ability.usesType === "Passive") {
                    return (<View style={styles.abilityBox}>
                        <Text style={styles.abilityName}>{ability.name}</Text>
                        {ability.description != "" && <Text style={styles.descriptionText}>{ability.description}</Text>}
                    </View>)
                }
            })}
        </View>
    )

}


const styles = StyleSheet.create({
    abilityBox: {
        backgroundColor: "teal",
        borderRadius: 10,
        borderWidth: 4,
        borderColor: "orange",
        marginBottom: 10,
    },
    abilityName: {
        color: "white",
        fontSize: 30,
        textAlign: "center"
    },
    labels: {
        color: "white",
        textAlign: "center",
        fontSize: 12,
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
    diceDisplay: {
        color: "white",
        textAlign: "center",
        backgroundColor: "black",
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "orange",
        padding: 5,
        fontSize: 20,
    },
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
        margin: -13,
        fontSize: 40,
        textAlign: 'center',
    },
})