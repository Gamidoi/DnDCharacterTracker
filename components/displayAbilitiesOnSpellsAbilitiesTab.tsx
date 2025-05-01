import {Platform, Pressable, StyleSheet, Text, View} from "react-native";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";
import React from "react";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import PerAbilityDisplayResistImmune from "@/components/perAbilityDisplayResistImmune";
import DisplayPassivesOnIndexTab from "@/components/displayPassivesOnIndexTab";



export default function DisplayAbilitiesOnSpellsAbilitiesTab(){
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();


    function useQuantityLabel(usesType: string, uses: number): string{
        let tempStatMod = 1;
        if (usesType === "STR"){
            tempStatMod = Math.floor((character.STR -10)/2);
            if (tempStatMod < 1){tempStatMod = 1;}
            return "STR("+ tempStatMod + ")";
        }
        if (usesType === "DEX"){
            tempStatMod = Math.floor((character.DEX -10)/2);
            if (tempStatMod < 1){tempStatMod = 1;}
            return "DEX("+ tempStatMod + ")";
        }
        if (usesType === "CON"){
            tempStatMod = Math.floor((character.CON -10)/2);
            if (tempStatMod < 1){tempStatMod = 1;}
            return "CON("+ tempStatMod + ")";
        }
        if (usesType === "INT"){
            tempStatMod = Math.floor((character.INT -10)/2);
            if (tempStatMod < 1){tempStatMod = 1;}
            return "INT("+ tempStatMod + ")";
        }
        if (usesType === "WIS"){
            tempStatMod = Math.floor((character.WIS -10)/2);
            if (tempStatMod < 1){tempStatMod = 1;}
            return "WIS("+ tempStatMod + ")";
        }
        if (usesType === "CHA"){
            tempStatMod = Math.floor((character.CHA -10)/2);
            if (tempStatMod < 1){tempStatMod = 1;}
            return "CHA("+ tempStatMod + ")";
        }
        if (usesType === "Proficiency"){
            return "Proficiency("+ character.proficiency + ")";
        }
        if (usesType === "Level"){
            return "Level("+ character.characterLevel + ")";
        }
        if (usesType === "1"){
            return "1";
        }
        if (usesType === "2"){
            return "2";
        }
        if (usesType === "Set Number"){
            return ("" + uses);
        }
        return ""
    }

    function getRolledDiceAsString(rolledDice :[boolean, number, number, number, number, number, number, number, number]){
        let diceString = ""
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


    function displayAbilitiesByType(abilityTriggerGroup: string){
         return character.abilities.map((ability) => {
            if (ability.usesTrigger != "Passive") {
                return (<View style={styles.abilityBox}>
                    <Text style={styles.abilityName}>{ability.name}</Text>
                    <Text style={styles.labels}>Uses{ability.uses > 4 ? "" : ability.uses === 1 ? " Button" : " Buttons"}</Text>


                    {ability.uses === 1 && <View style={styles.useButtonsRow}>
                        <Pressable style={styles.usesButton1} onPress={()=>{
                            characterUpdater({type: "updateAbilityUsageSlot", useSlot: 0, abilityName: ability.name})
                            if (ability.persistence[0] && ability.usedInstances[0] != "X"){characterUpdater({type: "changeActiveAbilityState", abilityName: ability.name, value: true})}
                            if (ability.persistence[0] && !ability.persistence[1] && ability.resistance.length + ability.immunity.length > 0 && ability.usedInstances[0] != "X")
                                {characterUpdater({type: "addResistanceAndImmunities", abilityName: ability.name})}
                        }}>
                            <Text style={styles.ButtonX}>{ability.usedInstances[0] === "X" ? "X" : " "}</Text>
                        </Pressable>
                    </View>}
                    {ability.uses === 2 && <View style={styles.useButtonsRow}>
                        <Pressable style={styles.usesButton2} onPress={()=>{
                            characterUpdater({type: "updateAbilityUsageSlot", useSlot: 0, abilityName: ability.name})
                            if (ability.persistence[0] && ability.usedInstances[0] != "X"){characterUpdater({type: "changeActiveAbilityState", abilityName: ability.name, value: true})}
                            if (ability.persistence[0] && !ability.persistence[1] && ability.resistance.length + ability.immunity.length > 0 && ability.usedInstances[0] != "X")
                                {characterUpdater({type: "addResistanceAndImmunities", abilityName: ability.name})}
                        }}>
                            <Text style={styles.ButtonX}>{ability.usedInstances[0] === "X" ? "X" : " "}</Text>
                        </Pressable>
                        <Pressable style={styles.usesButton2} onPress={()=>{
                            characterUpdater({type: "updateAbilityUsageSlot", useSlot: 1, abilityName: ability.name})
                            if (ability.persistence[0] && ability.usedInstances[1] != "X"){characterUpdater({type: "changeActiveAbilityState", abilityName: ability.name, value: true})}
                            if (ability.persistence[0] && !ability.persistence[1] && ability.resistance.length + ability.immunity.length > 0 && ability.usedInstances[1] != "X")
                                {characterUpdater({type: "addResistanceAndImmunities", abilityName: ability.name})}
                        }}>
                            <Text style={styles.ButtonX}>{ability.usedInstances[1] === "X" ? "X" : " "}</Text>
                        </Pressable>
                    </View>}
                    {ability.uses === 3 && <View style={styles.useButtonsRow}>
                        <Pressable style={styles.usesButton3} onPress={()=>{
                            characterUpdater({type: "updateAbilityUsageSlot", useSlot: 0, abilityName: ability.name})
                            if (ability.persistence[0] && ability.usedInstances[0] != "X"){characterUpdater({type: "changeActiveAbilityState", abilityName: ability.name, value: true})}
                            if (ability.persistence[0] && !ability.persistence[1] && ability.resistance.length + ability.immunity.length > 0 && ability.usedInstances[0] != "X")
                                {characterUpdater({type: "addResistanceAndImmunities", abilityName: ability.name})}
                        }}>
                            <Text style={styles.ButtonX}>{ability.usedInstances[0] === "X" ? "X" : " "}</Text>
                        </Pressable>
                        <Pressable style={styles.usesButton3} onPress={()=>{
                            characterUpdater({type: "updateAbilityUsageSlot", useSlot: 1, abilityName: ability.name})
                            if (ability.persistence[0] && ability.usedInstances[1] != "X"){characterUpdater({type: "changeActiveAbilityState", abilityName: ability.name, value: true})}
                            if (ability.persistence[0] && !ability.persistence[1] && ability.resistance.length + ability.immunity.length > 0 && ability.usedInstances[1] != "X")
                                {characterUpdater({type: "addResistanceAndImmunities", abilityName: ability.name})}
                        }}>
                            <Text style={styles.ButtonX}>{ability.usedInstances[1] === "X" ? "X" : " "}</Text>
                        </Pressable>
                        <Pressable style={styles.usesButton3} onPress={()=>{
                            characterUpdater({type: "updateAbilityUsageSlot", useSlot: 2, abilityName: ability.name})
                            if (ability.persistence[0] && ability.usedInstances[2] != "X"){characterUpdater({type: "changeActiveAbilityState", abilityName: ability.name, value: true})}
                            if (ability.persistence[0] && !ability.persistence[1] && ability.resistance.length + ability.immunity.length > 0 && ability.usedInstances[2] != "X")
                                {characterUpdater({type: "addResistanceAndImmunities", abilityName: ability.name})}
                        }}>
                            <Text style={styles.ButtonX}>{ability.usedInstances[2] === "X" ? "X" : " "}</Text>
                        </Pressable>
                    </View>}
                    {ability.uses === 4 && <View style={styles.useButtonsRow}>
                        <Pressable style={styles.usesButton4} onPress={()=>{
                            characterUpdater({type: "updateAbilityUsageSlot", useSlot: 0, abilityName: ability.name})
                            if (ability.persistence[0] && ability.usedInstances[0] != "X"){characterUpdater({type: "changeActiveAbilityState", abilityName: ability.name, value: true})}
                            if (ability.persistence[0] && !ability.persistence[1] && ability.resistance.length + ability.immunity.length > 0 && ability.usedInstances[0] != "X")
                                {characterUpdater({type: "addResistanceAndImmunities", abilityName: ability.name})}
                        }}>
                            <Text style={styles.ButtonX}>{ability.usedInstances[0] === "X" ? "X" : " "}</Text>
                        </Pressable>
                        <Pressable style={styles.usesButton4} onPress={()=>{
                            characterUpdater({type: "updateAbilityUsageSlot", useSlot: 1, abilityName: ability.name})
                            if (ability.persistence[0] && ability.usedInstances[1] != "X"){characterUpdater({type: "changeActiveAbilityState", abilityName: ability.name, value: true})}
                            if (ability.persistence[0] && !ability.persistence[1] && ability.resistance.length + ability.immunity.length > 0 && ability.usedInstances[1] != "X")
                                {characterUpdater({type: "addResistanceAndImmunities", abilityName: ability.name})}
                        }}>
                            <Text style={styles.ButtonX}>{ability.usedInstances[1] === "X" ? "X" : " "}</Text>
                        </Pressable>
                        <Pressable style={styles.usesButton4} onPress={()=>{
                            characterUpdater({type: "updateAbilityUsageSlot", useSlot: 2, abilityName: ability.name})
                            if (ability.persistence[0] && ability.usedInstances[2] != "X"){characterUpdater({type: "changeActiveAbilityState", abilityName: ability.name, value: true})}
                            if (ability.persistence[0] && !ability.persistence[1] && ability.resistance.length + ability.immunity.length > 0 && ability.usedInstances[2] != "X")
                                {characterUpdater({type: "addResistanceAndImmunities", abilityName: ability.name})}
                        }}>
                            <Text style={styles.ButtonX}>{ability.usedInstances[2] === "X" ? "X" : " "}</Text>
                        </Pressable>
                        <Pressable style={styles.usesButton4} onPress={()=>{
                            characterUpdater({type: "updateAbilityUsageSlot", useSlot: 3, abilityName: ability.name})
                            if (ability.persistence[0] && ability.usedInstances[3] != "X"){characterUpdater({type: "changeActiveAbilityState", abilityName: ability.name, value: true})}
                            if (ability.persistence[0] && !ability.persistence[1] && ability.resistance.length + ability.immunity.length > 0 && ability.usedInstances[3] != "X")
                                {characterUpdater({type: "addResistanceAndImmunities", abilityName: ability.name})}
                        }}>
                            <Text style={styles.ButtonX}>{ability.usedInstances[3] === "X" ? "X" : " "}</Text>
                        </Pressable>
                    </View>}


                    {ability.uses > 4 && <View style={styles.useButtonsRow}>
                        <Pressable onPress={() => {
                            characterUpdater({type: "abilityUnusedQuantityAdjust", abilityName: ability.name, value: "subtract"})
                            if (ability.persistence[0]){characterUpdater({type: "changeActiveAbilityState", abilityName: ability.name, value: true})}
                            if (ability.persistence[0] && !ability.persistence[1] && ability.resistance.length + ability.immunity.length > 0)
                                {characterUpdater({type: "addResistanceAndImmunities", abilityName: ability.name})}
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


                    <Text style={styles.labels}>{useQuantityLabel(ability.usesQuantityStat, ability.uses)} Use{ability.uses === 1 ? "" : "s"} Refresh{ability.uses === 1 ? "es" : ""} on {ability.refreshOn}</Text>

                    {ability.persistence[0] && <View style={{
                        backgroundColor: ability.persistence[1] ? "red" : "grey",
                        borderColor: "orange",
                        borderWidth: 2,
                        borderRadius: 15,
                        width: 125,
                        alignSelf: "center",
                    }}>
                        <Pressable style={{alignSelf: "center"}}
                            onPress={() => {
                                characterUpdater({type: "changeActiveAbilityState", abilityName: ability.name, value: false})
                                if (ability.persistence[0] && ability.persistence[1] && ability.resistance.length + ability.immunity.length > 0)
                                {characterUpdater({type: "subtractResistanceAndImmunities", abilityName: ability.name})}}}>
                                <Text style={{
                                    color: "white",
                                    fontSize: 25,
                                    textAlign: "center",
                                }}>{ability.persistence[1] ? "Active" : "Inactive"}</Text>
                                {ability.persistence[1] && <Text style={{
                                    color: "white",
                                    fontSize: 8,
                                    textAlign: "center",
                                }}>press to turn off</Text>}
                        </Pressable>
                    </View>}

                    <View style={{alignSelf: "center"}}>
                        {ability.roll[0] && <Text style={styles.diceDisplay}>{getRolledDiceAsString(ability.roll)}</Text>}
                    </View>
                    {PerAbilityDisplayResistImmune(ability)}

                    {ability.description != "" && <Text style={styles.descriptionText}>{ability.description}</Text>}
                </View>)
            }
        })
    }

    return (
        <View>
            {displayAbilitiesByType("On Hit")}
            {DisplayPassivesOnIndexTab()}
        </View>
    )

}


const styles = StyleSheet.create({
    labels: {
        color: "white",
        textAlign: "center",
        fontSize: 12,
    },
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
        margin: Platform.OS === "web" ? -13 : -15,
        fontSize: 40,
        textAlign: 'center',
    },
})