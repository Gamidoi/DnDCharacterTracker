import {StyleSheet, Text, View, Pressable, TextInput} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from "react";
import {Spell} from "@/assets/classes/spell";
import {Character} from "@/assets/classes/character";
import {FontAwesome, MaterialCommunityIcons} from "@expo/vector-icons";



export default function newSpellCreationTool(currentCharacter :Character) {
    let [newSpellCreationToolDisplay, setNewSpellCreationToolDisplay] = useState(false);
    let [newSpellConfirmationCount, setNewSpellConfirmationCount] = useState(0);
    let [deleteSpellToolDisplay, setDeleteSpellToolDisplay] = useState(false);
    let [deleteSpellName, setDeleteSpellName] = useState("");
    let [deleteSpellIndex, setDeleteSpellIndex] = useState(0);
    let [spellConfirmDelete, setSpellConfirmDelete] = useState(false);

    let [spellNameVariable, setSpellNameVariable] = useState("");
    let [spellLevelVariable, setSpellLevelVariable] = useState("0");
    let [spellVerbalVariable, setSpellVerbalVariable] = useState(false);
    let [spellSomaticVariable, setSpellSomaticVariable] = useState(false);
    let [spellMaterialBooleanVariable, setSpellMaterialBooleanVariable] = useState(false,);
    let [spellMaterialDescriptionVariable, setSpellMaterialDescriptionVariable] = useState("");
    let [spellConcentrationVariable, setSpellConcentrationVariable] = useState(false);
    let [spellRitualVariable, setSpellRitualVariable] = useState(false);
    let [spellTimeVariable, setSpellTimeVariable] = useState("action");
    let [spellDurationVariable, setSpellDurationVariable] = useState("instant");
    let [spellRangeVariable, setSpellRangeVariable] = useState("touch");
    let [spellTargetVariable, setSpellTargetVariable] = useState("self");
    let isAttack :[boolean, string] = [false, "INT"];
    let [spellIsAttack, setSpellIsAttack] = useState(isAttack);
    let [spellIsSaveDC, setSpellIsSaveDC] = useState(isAttack);
    let [spellSaveType, setSpellSaveType] = useState("DEX");
    let [spellDamageVariable, setSpellDamageVariable] = useState(false);
    let [damageD4, setDamageD4] = useState("0");
    let [damageD6, setDamageD6] = useState("0");
    let [damageD8, setDamageD8] = useState("0");
    let [damageD10, setDamageD10] = useState("0");
    let [damageD12, setDamageD12] = useState("0");
    let [damageBonus, setDamageBonus] = useState("0");
    let [spellDescription, setSpellDescription] = useState("");



    return(<View>
        <View style={styles.toolBoxStyle}>
            <Pressable onPress={() => {setNewSpellCreationToolDisplay(!newSpellCreationToolDisplay)}}>
            {!newSpellCreationToolDisplay && <Text style={{color: "white", textAlign: "center", height: 40, marginTop: 15}}>Open New Spell Tool</Text>}
            {newSpellCreationToolDisplay && <Text style={{color: "white", textAlign: "center", marginBottom: 20}}>Close New Spell Tool</Text>}
            </Pressable>
            {newSpellCreationToolDisplay && <View>
                <View style={{flexDirection: "row", alignSelf: "center", marginBottom: 10}}>
                    <View style={{flex: 0.7}}>
                        <Text style={styles.lables}>Spell Name</Text>
                        <TextInput
                            onChangeText={setSpellNameVariable}
                            placeholder={"Spellname"}
                            placeholderTextColor={"grey"}
                            style={{
                                fontSize: 22,
                                borderStyle: "solid",
                                borderWidth: 3,
                                borderColor: "white",
                                width: 250,
                                alignSelf: "center",
                                color: "white",
                                textAlign: "center",
                                padding: 0,
                            }}/>
                    </View>
                    <View style={{flex: 0.3, alignSelf: "center"}}>
                        <Text style={styles.lables}>Spell Level</Text>
                        <TextInput
                            onChangeText={setSpellLevelVariable}
                            placeholder={"0"}
                            keyboardType={"numeric"}
                            maxLength={1}
                            placeholderTextColor={"grey"}
                            style={{
                                fontSize: 22,
                                borderStyle: "solid",
                                borderWidth: 3,
                                borderColor: "white",
                                width: 100,
                                padding: 0,
                                alignSelf: "center",
                                color: "white",
                                textAlign: "center",
                                marginLeft: 10
                            }}/>
                    </View>
                </View>
                <View style={{flexDirection: "row", alignSelf: "center", marginBottom: 5}}>
                    <View style={{flex: 0.2}}>
                        <Text style={styles.lables}>Verbal</Text>
                        <Pressable
                            style={styles.newSpellToolToggleButtons}
                            onPress={() => {setSpellVerbalVariable(!spellVerbalVariable)}}>
                            <Text style={styles.toggleButtonLables}>{spellVerbalVariable ? "Yes" : "No"}</Text>
                        </Pressable>
                    </View>
                    <View style={{flex: 0.2}}>
                        <Text style={styles.lables}>Somatic</Text>
                        <Pressable
                            style={styles.newSpellToolToggleButtons}
                            onPress={() => {setSpellSomaticVariable(!spellSomaticVariable)}}>
                            <Text style={styles.toggleButtonLables}>{spellSomaticVariable ? "Yes" : "No"}</Text>
                        </Pressable>
                    </View>
                    <View style={{flex: 0.2}}>
                        <Text style={styles.lables}>Material</Text>
                        <Pressable
                            style={styles.newSpellToolToggleButtons}
                            onPress={() => {setSpellMaterialBooleanVariable(!spellMaterialBooleanVariable)}}>
                            <Text style={styles.toggleButtonLables}>{spellMaterialBooleanVariable ? "Yes" : "No"}</Text>
                        </Pressable>
                    </View>
                    <View style={{flex: 0.2}}>
                        <Text style={styles.lables}>Concentrate</Text>
                        <Pressable
                            style={styles.newSpellToolToggleButtons}
                            onPress={() => {setSpellConcentrationVariable(!spellConcentrationVariable)}}>
                            <Text style={styles.toggleButtonLables}>{spellConcentrationVariable ? "Yes" : "No"}</Text>
                        </Pressable></View>
                    <View style={{flex: 0.2}}>
                        <Text style={styles.lables}>Ritual</Text>
                        <Pressable
                            style={styles.newSpellToolToggleButtons}
                            onPress={() => {setSpellRitualVariable(!spellRitualVariable)}}>
                            <Text style={styles.toggleButtonLables}>{spellRitualVariable ? "Yes" : "No"}</Text>
                        </Pressable></View>
                </View>
                {spellMaterialBooleanVariable && <Text style={styles.lables}>If specified, what are the Material Components?</Text>}
                {spellMaterialBooleanVariable && <TextInput
                    onChangeText={setSpellMaterialDescriptionVariable}
                    placeholder={"Bat Guano worth 25gp"}
                    placeholderTextColor={"grey"}
                    multiline={true}
                    style={{
                        fontSize: 22,
                        borderStyle: "solid",
                        borderWidth: 3,
                        borderColor: "white",
                        width: 300,
                        padding: 0,
                        alignSelf: "center",
                        color: "white",
                        textAlign: "center",
                        marginBottom: 10
                }}/>}
                <View style={{flexDirection: "row", alignSelf: "center", marginBottom: 10}}>
                    -------------------------
                </View>
                <View style={{flexDirection: "row", alignSelf: "center", marginBottom: 5}}>
                    <View style={{flex: 0.5}}>
                        <Text style={styles.lables}>Casting Time</Text>
                        <TextInput
                            onChangeText={setSpellTimeVariable}
                            placeholder={"action"}
                            placeholderTextColor={"grey"}
                            style={{
                                fontSize: 22,
                                borderStyle: "solid",
                                borderWidth: 3,
                                borderColor: "white",
                                width: 180,
                                padding: 0,
                                alignSelf: "center",
                                color: "white",
                                textAlign: "center"
                            }}/>
                    </View>
                    <View style={{flex: 0.5}}>
                        <Text style={styles.lables}>Spell Duration</Text>
                        <TextInput
                        onChangeText={setSpellDurationVariable}
                        placeholder={"instant"}
                        placeholderTextColor={"grey"}
                        style={{
                            fontSize: 22,
                            borderStyle: "solid",
                            borderWidth: 3,
                            borderColor: "white",
                            width: 180,
                            padding: 0,
                            alignSelf: "center",
                            color: "white",
                            textAlign: "center"
                        }}/>
                    </View>
                </View>
                <View style={{flexDirection: "row", alignSelf: "center", marginBottom: 10}}>
                    <View style={{flex: 0.5}}>
                        <Text style={styles.lables}>Spell Range</Text>
                        <TextInput
                            onChangeText={setSpellRangeVariable}
                            placeholder={"5 Ft"}
                            placeholderTextColor={"grey"}
                            style={{
                                fontSize: 22,
                                borderStyle: "solid",
                                borderWidth: 3,
                                borderColor: "white",
                                width: 180,
                                padding: 0,
                                alignSelf: "center",
                                color: "white",
                                textAlign: "center"
                            }}/>
                    </View>
                    <View style={{flex: 0.5}}>
                        <Text style={styles.lables}>Spell Target</Text>
                        <TextInput
                            onChangeText={setSpellTargetVariable}
                            placeholder={"creature"}
                            placeholderTextColor={"grey"}
                            style={{
                                fontSize: 22,
                                borderStyle: "solid",
                                borderWidth: 3,
                                borderColor: "white",
                                width: 180,
                                padding: 0,
                                alignSelf: "center",
                                color: "white",
                                textAlign: "center"
                            }}/>
                    </View>
                </View>
                <Text style={styles.lables}>What Type of Roll?</Text>
                <View style={{flexDirection: "row", alignSelf: "center", marginBottom: 10}}>
                    {!spellIsAttack[0] && <Pressable style={[styles.attackSaveNeitherButtonsOff, {borderBottomStartRadius: 10, borderTopStartRadius: 10}]} onPress={() => {
                        setSpellIsAttack([true, spellIsAttack[1]]);
                        setSpellIsSaveDC([false, spellIsSaveDC[1]]);
                    }}>
                        <Text style={styles.toggleButtonLables}>Spell Attack</Text>
                    </Pressable>}
                    {spellIsAttack[0] && <Pressable style={[styles.attackSaveNeitherButtonsOn, {borderBottomStartRadius: 10, borderTopStartRadius: 10}]} onPress={() => {
                    setSpellIsAttack([false, spellIsAttack[1]]);
                    setSpellIsSaveDC([false, spellIsSaveDC[1]]);
                    }}>
                        <Text style={styles.toggleButtonLables}>Spell Attack</Text>
                    </Pressable>}

                    {(!spellIsSaveDC[0] && !spellIsAttack[0]) && <Pressable style={styles.attackSaveNeitherButtonsOn} onPress={() => {
                        setSpellIsAttack([false, spellIsAttack[1]]);
                        setSpellIsSaveDC([false, spellIsSaveDC[1]]);
                    }}>
                        <Text style={[styles.toggleButtonLables, {marginTop: 10}]}>Neither</Text>
                    </Pressable>}
                    {(spellIsSaveDC[0] || spellIsAttack[0]) && <Pressable style={styles.attackSaveNeitherButtonsOff} onPress={() => {
                        setSpellIsAttack([false, spellIsAttack[1]]);
                        setSpellIsSaveDC([false, spellIsSaveDC[1]]);
                    }}>
                        <Text style={[styles.toggleButtonLables, {marginTop: 10}]}>Neither</Text>
                    </Pressable>}

                    {!spellIsSaveDC[0] && <Pressable style={[styles.attackSaveNeitherButtonsOff, {borderBottomEndRadius: 10, borderTopEndRadius: 10}]} onPress={() => {
                        setSpellIsAttack([false, spellIsAttack[1]]);
                        setSpellIsSaveDC([true, spellIsSaveDC[1]]);
                    }}>
                        <Text style={styles.toggleButtonLables}>Saving Throw</Text>
                    </Pressable>}
                    {spellIsSaveDC[0] && <Pressable style={[styles.attackSaveNeitherButtonsOn, {borderBottomEndRadius: 10, borderTopEndRadius: 10}]} onPress={() => {
                        setSpellIsAttack([false, spellIsAttack[1]]);
                        setSpellIsSaveDC([false, spellIsSaveDC[1]]);
                    }}>
                        <Text style={styles.toggleButtonLables}>Saving Throw</Text>
                    </Pressable>}
                </View>

                {spellIsSaveDC[0] && <Text style={styles.lables}>What is the Saving Throw?</Text>}
                {spellIsSaveDC[0] && <View style={{flexDirection: "row", alignSelf: "center"}}>
                    {spellSaveType == "STR" && <Pressable style={[styles.saveTypeToggleON, {borderBottomStartRadius: 10, borderTopStartRadius: 10}]} onPress={() =>
                    {setSpellSaveType("STR")}}><Text style={styles.saveStatLable}>STR</Text></Pressable>}
                    {spellSaveType != "STR" && <Pressable style={[styles.saveTypeToggleOff, {borderBottomStartRadius: 10, borderTopStartRadius: 10}]} onPress={() =>
                    {setSpellSaveType("STR")}}><Text style={styles.saveStatLable}>STR</Text></Pressable>}
                    {spellSaveType == "DEX" && <Pressable style={styles.saveTypeToggleON} onPress={() =>
                    {setSpellSaveType("DEX")}}><Text style={styles.saveStatLable}>DEX</Text></Pressable>}
                    {spellSaveType != "DEX" && <Pressable style={styles.saveTypeToggleOff} onPress={() =>
                    {setSpellSaveType("DEX")}}><Text style={styles.saveStatLable}>DEX</Text></Pressable>}
                    {spellSaveType == "CON" && <Pressable style={styles.saveTypeToggleON} onPress={() =>
                    {setSpellSaveType("CON")}}><Text style={styles.saveStatLable}>CON</Text></Pressable>}
                    {spellSaveType != "CON" && <Pressable style={styles.saveTypeToggleOff} onPress={() =>
                    {setSpellSaveType("CON")}}><Text style={styles.saveStatLable}>CON</Text></Pressable>}
                    {spellSaveType == "INT" && <Pressable style={styles.saveTypeToggleON} onPress={() =>
                    {setSpellSaveType("INT")}}><Text style={styles.saveStatLable}>INT</Text></Pressable>}
                    {spellSaveType != "INT" && <Pressable style={styles.saveTypeToggleOff} onPress={() =>
                    {setSpellSaveType("INT")}}><Text style={styles.saveStatLable}>INT</Text></Pressable>}
                    {spellSaveType == "WIS" && <Pressable style={styles.saveTypeToggleON} onPress={() =>
                    {setSpellSaveType("WIS")}}><Text style={styles.saveStatLable}>WIS</Text></Pressable>}
                    {spellSaveType != "WIS" && <Pressable style={styles.saveTypeToggleOff} onPress={() =>
                    {setSpellSaveType("WIS")}}><Text style={styles.saveStatLable}>WIS</Text></Pressable>}
                    {spellSaveType == "CHA" && <Pressable style={[styles.saveTypeToggleON, {borderBottomEndRadius: 10, borderTopEndRadius: 10}]} onPress={() =>
                    {setSpellSaveType("CHA")}}><Text style={styles.saveStatLable}>CHA</Text></Pressable>}
                    {spellSaveType != "CHA" && <Pressable style={[styles.saveTypeToggleOff, {borderBottomEndRadius: 10, borderTopEndRadius: 10}]} onPress={() =>
                    {setSpellSaveType("CHA")}}><Text style={styles.saveStatLable}>CHA</Text></Pressable>}
                </View>}


                <Text style={styles.lables}>Spell Casting Stat</Text>
                <View style={{flexDirection: "row", alignSelf: "center"}}>
                    {spellIsSaveDC[1] == "INT" && <Pressable style={[styles.spellCastingStatButtonsOn, {borderStartStartRadius: 10}]} onPress={() => {
                        setSpellIsAttack([spellIsAttack[0], "INT"]);
                        setSpellIsSaveDC([spellIsSaveDC[0], "INT"]);
                    }}>
                        <Text style={[styles.toggleButtonLables]}>INT</Text>
                    </Pressable>}
                    {spellIsSaveDC[1] != "INT" && <Pressable style={[styles.spellCastingStatButtonsOff, {borderStartStartRadius: 10}]} onPress={() => {
                        setSpellIsAttack([spellIsAttack[0], "INT"]);
                        setSpellIsSaveDC([spellIsSaveDC[0], "INT"]);
                    }}>
                        <Text style={[styles.toggleButtonLables]}>INT</Text>
                    </Pressable>}
                    {spellIsSaveDC[1] == "WIS" && <Pressable style={styles.spellCastingStatButtonsOn} onPress={() => {
                        setSpellIsAttack([spellIsAttack[0], "WIS"]);
                        setSpellIsSaveDC([spellIsSaveDC[0], "WIS"]);
                    }}>
                        <Text style={[styles.toggleButtonLables]}>WIS</Text>
                    </Pressable>}
                    {spellIsSaveDC[1] != "WIS" && <Pressable style={styles.spellCastingStatButtonsOff} onPress={() => {
                        setSpellIsAttack([spellIsAttack[0], "WIS"]);
                        setSpellIsSaveDC([spellIsSaveDC[0], "WIS"]);
                    }}>
                        <Text style={[styles.toggleButtonLables]}>WIS</Text>
                    </Pressable>}
                    {spellIsSaveDC[1] == "CHA" && <Pressable style={[styles.spellCastingStatButtonsOn, {borderTopEndRadius: 10}]} onPress={() => {
                        setSpellIsAttack([spellIsAttack[0], "CHA"]);
                        setSpellIsSaveDC([spellIsSaveDC[0], "CHA"]);
                    }}>
                        <Text style={[styles.toggleButtonLables]}>CHA</Text>
                    </Pressable>}
                    {spellIsSaveDC[1] != "CHA" && <Pressable style={[styles.spellCastingStatButtonsOff, {borderTopEndRadius: 10}]} onPress={() => {
                        setSpellIsAttack([spellIsAttack[0], "CHA"]);
                        setSpellIsSaveDC([spellIsSaveDC[0], "CHA"]);
                    }}>
                        <Text style={[styles.toggleButtonLables]}>CHA</Text>
                    </Pressable>}
                </View>

                <Text style={
                    [styles.lables, {
                        backgroundColor: "grey",
                        borderColor: "orange",
                        borderWidth: 4,
                        width: 330,
                        alignSelf: "center",
                    }]}>Very Unusual Spell Casting Stats for Homebrew.</Text>
                <View style={{flexDirection: "row", alignSelf: "center", marginBottom: 10}}>
                    {spellIsSaveDC[1] == "STR" && <Pressable style={[styles.spellCastingStatButtonsOn, {borderBottomStartRadius: 10}]} onPress={() => {
                        setSpellIsAttack([spellIsAttack[0], "STR"]);
                        setSpellIsSaveDC([spellIsSaveDC[0], "STR"]);
                    }}>
                        <Text style={[styles.toggleButtonLables]}>STR</Text>
                    </Pressable>}
                    {spellIsSaveDC[1] != "STR" && <Pressable style={[styles.spellCastingStatButtonsOff, {borderBottomStartRadius: 10}]} onPress={() => {
                        setSpellIsAttack([spellIsAttack[0], "STR"]);
                        setSpellIsSaveDC([spellIsSaveDC[0], "STR"]);
                    }}>
                        <Text style={[styles.toggleButtonLables]}>STR</Text>
                    </Pressable>}
                    {spellIsSaveDC[1] == "DEX" && <Pressable style={styles.spellCastingStatButtonsOn} onPress={() => {
                        setSpellIsAttack([spellIsAttack[0], "DEX"]);
                        setSpellIsSaveDC([spellIsSaveDC[0], "DEX"]);
                    }}>
                        <Text style={[styles.toggleButtonLables]}>DEX</Text>
                    </Pressable>}
                    {spellIsSaveDC[1] != "DEX" && <Pressable style={styles.spellCastingStatButtonsOff} onPress={() => {
                        setSpellIsAttack([spellIsAttack[0], "DEX"]);
                        setSpellIsSaveDC([spellIsSaveDC[0], "DEX"]);
                    }}>
                        <Text style={[styles.toggleButtonLables]}>DEX</Text>
                    </Pressable>}
                    {spellIsSaveDC[1] == "CON" && <Pressable style={[styles.spellCastingStatButtonsOn, {borderBottomEndRadius: 10}]} onPress={() => {
                        setSpellIsAttack([spellIsAttack[0], "CON"]);
                        setSpellIsSaveDC([spellIsSaveDC[0], "CON"]);
                    }}>
                        <Text style={[styles.toggleButtonLables]}>CON</Text>
                    </Pressable>}
                    {spellIsSaveDC[1] != "CON" && <Pressable style={[styles.spellCastingStatButtonsOff, {borderBottomEndRadius: 10}]} onPress={() => {
                        setSpellIsAttack([spellIsAttack[0], "CON"]);
                        setSpellIsSaveDC([spellIsSaveDC[0], "CON"]);
                    }}>
                        <Text style={[styles.toggleButtonLables]}>CON</Text>
                    </Pressable>}
                </View>


                <View><Text style={styles.lables}>Does the Spell Roll for Damage/Healing/Other?</Text>
                    <Pressable style={[styles.newSpellToolToggleButtons, {width: 150, height: 40}]} onPress={() => {
                        setSpellDamageVariable(!spellDamageVariable)
                    }}>
                        {spellDamageVariable && <Text style={styles.toggleButtonLables}>Yes</Text>}
                        {!spellDamageVariable && <Text style={styles.toggleButtonLables}>No</Text>}
                    </Pressable>
                    {spellDamageVariable && <View style={{flexDirection: "row", alignSelf: "center"}}>
                        <View style={{flex: 0.1666}}><Text style={styles.lables}>D4s</Text>
                            <TextInput
                                onChangeText={setDamageD4}
                                placeholder={"0"}
                                keyboardType={"numeric"}
                                maxLength={2}
                                placeholderTextColor={"grey"}
                                style={styles.damageDiceEntry}/></View>
                        <View style={{flex: 0.1666}}><Text style={styles.lables}>D6s</Text>
                            <TextInput
                                onChangeText={setDamageD6}
                                placeholder={"0"}
                                keyboardType={"numeric"}
                                maxLength={2}
                                placeholderTextColor={"grey"}
                                style={styles.damageDiceEntry}/></View>
                        <View style={{flex: 0.1666}}><Text style={styles.lables}>D8s</Text>
                            <TextInput
                                onChangeText={setDamageD8}
                                placeholder={"0"}
                                keyboardType={"numeric"}
                                maxLength={2}
                                placeholderTextColor={"grey"}
                                style={styles.damageDiceEntry}/></View>
                        <View style={{flex: 0.1666}}><Text style={styles.lables}>D10s</Text>
                            <TextInput
                                onChangeText={setDamageD10}
                                placeholder={"0"}
                                keyboardType={"numeric"}
                                maxLength={2}
                                placeholderTextColor={"grey"}
                                style={styles.damageDiceEntry}/></View>
                        <View style={{flex: 0.1666}}><Text style={styles.lables}>D12s</Text>
                            <TextInput
                                onChangeText={setDamageD12}
                                placeholder={"0"}
                                keyboardType={"numeric"}
                                maxLength={2}
                                placeholderTextColor={"grey"}
                                style={styles.damageDiceEntry}/></View>
                        <View style={{flex: 0.1666}}><Text style={styles.lables}>bonus</Text>
                            <TextInput
                                onChangeText={setDamageBonus}
                                placeholder={"0"}
                                keyboardType={"numeric"}
                                maxLength={2}
                                placeholderTextColor={"grey"}
                                style={styles.damageDiceEntry}/></View>
                    </View>}
                </View>


                <Text style={styles.lables}>Verbose Description</Text>
                <TextInput
                    onChangeText={setSpellDescription}
                    placeholder={"throw a flaming ball of bat guano at your enemies, it is highly effective at hurting them 8d8 fire damage"}
                    placeholderTextColor={"grey"}
                    textAlignVertical={"top"}
                    multiline={true}
                    style={{
                        fontSize: 18,
                        borderStyle: "solid",
                        borderWidth: 3,
                        borderColor: "white",
                        alignSelf: "center",
                        color: "white",
                        textAlign: "center",
                        width: 350,
                        minHeight: 200,
                    }}/>

                {(newSpellConfirmationCount > 0) &&
                    <Pressable  style={styles.confirmationButton} onPress={() => {setNewSpellConfirmationCount(0);}}>
                        <Text style={styles.confirmationBox}>Confirmed! New Spell</Text>
                        <Text style={styles.confirmationBox}>"{spellNameVariable}"</Text>
                        <Text style={styles.confirmationBox}>Created! {newSpellConfirmationCount} time(s)!</Text>
                    </Pressable>}


                <Pressable
                    style={styles.toolBoxButton}
                    onPress={() => {
                        if (spellNameVariable != ""){

                            let newSpell = new Spell(spellNameVariable, parseInt(spellLevelVariable), spellVerbalVariable, spellSomaticVariable,
                                [spellMaterialBooleanVariable, spellMaterialDescriptionVariable], spellConcentrationVariable, spellRitualVariable,
                                spellTimeVariable, spellDurationVariable, spellRangeVariable, spellTargetVariable, spellIsAttack,
                                [spellIsSaveDC[0], spellIsSaveDC[1], spellSaveType],
                                [spellDamageVariable, parseInt(damageD4), parseInt(damageD6), parseInt(damageD8), parseInt(damageD10), parseInt(damageD12), parseInt(damageBonus)],
                                [true, spellDescription]);
                            setNewSpellConfirmationCount(newSpellConfirmationCount + 1);
                            currentCharacter.spells.push(newSpell);
                            AsyncStorage.setItem("newCharacter" + currentCharacter.charName, JSON.stringify(currentCharacter));
                    }}}>
                    <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Create New Spell: {spellNameVariable}</Text>
                    <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>For {currentCharacter.charName}</Text>
                </Pressable>
            </View>}
        </View>


        <View style={[styles.toolBoxStyle, {marginTop: 17}]}>
            <Pressable onPress={() => {setDeleteSpellToolDisplay(!deleteSpellToolDisplay)}}>
                {!deleteSpellToolDisplay && <Text style={{color: "white", textAlign: "center", height: 40, marginTop: 15}}>Open Spell Deletion Tool</Text>}
                {deleteSpellToolDisplay && <Text style={{color: "white", textAlign: "center", marginBottom: 20}}>Close Spell Deletion Tool</Text>}
                {deleteSpellToolDisplay && <Text style={{color: "white", textAlign: "center", marginBottom: 20}}>Choose Spell Below</Text>}
            </Pressable>
            <View style={{alignSelf: "center"}}>
            {currentCharacter.spells.map((pickedSpellForDeletion :Spell, pickedSpellIndex :number) => {
                return(
                    deleteSpellToolDisplay && <View><Pressable onPress={() => {
                        setSpellConfirmDelete(!spellConfirmDelete);
                        setDeleteSpellName(pickedSpellForDeletion.name);
                        setDeleteSpellIndex(pickedSpellIndex);
                    }}><Text style={{
                        fontSize: 20,
                        backgroundColor: "maroon",
                        textAlign: "center",
                        margin: 10,
                        height: 50,
                        borderRadius: 30,
                        width: 260,
                        color: "white",
                        paddingTop: 10,
                        borderColor: "orange",
                        borderWidth: 3,
                    }}>{pickedSpellForDeletion.name}</Text></Pressable></View>
                )})}</View>
            {(deleteSpellToolDisplay && spellConfirmDelete) &&
                <Pressable onPress={() => {
                    setSpellConfirmDelete(false);}}>
                    <Text style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 25,
                        backgroundColor: "blue",
                        margin: 15,
                        borderRadius: 10
                    }}>Cancel Spell {deleteSpellName} Deletion?<FontAwesome size={28} name="smile-o" color={"green"} /></Text></Pressable>}
            {(deleteSpellToolDisplay && spellConfirmDelete) &&
                <Pressable onPress={() => {
                    setSpellConfirmDelete(false);
                    currentCharacter.spells.splice(deleteSpellIndex, 1)
                    AsyncStorage.setItem("newCharacter" + currentCharacter.charName, JSON.stringify(currentCharacter));

                }}>
                    <Text style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 25,
                        backgroundColor: "blue",
                        margin: 15,
                        borderRadius: 10
                    }}>Confirm Spell {deleteSpellName} Deletion?<MaterialCommunityIcons size={28} name="skull-crossbones-outline" color={"red"} /></Text></Pressable>}

        </View>







        </View>
)}

const styles = StyleSheet.create({
    toolBoxStyle: {
        backgroundColor: "teal",
        borderRadius: 12,
    },
    toolBoxButton: {
        backgroundColor: "maroon",
        alignSelf: "center",
        padding: 13,
        borderRadius: 30,
        width: 300,
        //height: 42,
    },
    lables: {
        color: "white",
        textAlign: "center",
        fontSize: 12,
    },
    toggleButtonLables: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
    },
    attackSaveNeitherButtonsOff: {
        flex: 0.3,
        backgroundColor: "grey",
        borderColor: "orange",
        borderWidth: 4,
        height: 65,
    },
    attackSaveNeitherButtonsOn: {
        flex: 0.3,
        backgroundColor: "maroon",
        borderColor: "orange",
        borderWidth: 4,
        height: 65,
    },
    spellCastingStatButtonsOff: {
        flex: 0.3,
        backgroundColor: "grey",
        borderColor: "orange",
        borderWidth: 4,
        height: 40,
    },
    spellCastingStatButtonsOn: {
        flex: 0.3,
        backgroundColor: "maroon",
        borderColor: "orange",
        borderWidth: 4,
        height: 40,
    },
    newSpellToolToggleButtons: {
        backgroundColor: "maroon",
        height: 40,
        width: 60,
        padding: 2,
        borderRadius: 8,
        borderWidth: 3,
        borderColor: "orange",
        alignSelf: "center",
    },
    saveTypeToggleON: {
        flex: 0.15,
        backgroundColor: "maroon",
        height: 40,
        borderColor: "orange",
        borderWidth: 3,
    },
    saveTypeToggleOff: {
        flex: 0.15,
        backgroundColor: "grey",
        height: 40,
        borderColor: "orange",
        borderWidth: 3,
    },
    saveStatLable: {
        textAlign: "center",
        color: "white",
        fontSize: 12,
        marginTop: 8
    },
    damageDiceEntry: {
        fontSize: 22,
        borderStyle: "solid",
        borderWidth: 3,
        borderColor: "white",
        width: 58,
        padding: 0,
        alignSelf: "center",
        color: "white",
        textAlign: "center"
    },
    confirmationBox: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    },
    confirmationButton: {
        margin: 15,
        backgroundColor: "blue",
        borderRadius: 10,
    },
})