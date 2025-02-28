import { Image, StyleSheet, Text, View, TextInput, Pressable} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from "react";
import {Character, updateProficiency, updateSpellcastingLevel} from '@/assets/classes/character';
import {FontAwesome, MaterialCommunityIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import newSpellCreationTool from "@/components/newSpellCreationTool";
import AdjustCoreStatSaves from "@/components/adjustCoreStatSaves";
import AttributionSection from "@/components/attributionSection";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";






let initializingName :string|null;
let getNameAsString = async () => {
    return await AsyncStorage.getItem("currentCharacterName");
}
let character :Character;
let getCurrentCharacterObjectStringPromise = async (string :string|null) => {
    return await AsyncStorage.getItem("newCharacter" + string);
}

getNameAsString().then(nameString => {
    initializingName = nameString;
    getCurrentCharacterObjectStringPromise("newCharacterLucca").then((objectString :string|null) => {
        if (objectString != null) {
            character = JSON.parse(objectString);
        }
    })});


let allCharacterNamesInitial :string[] = [];
let getAllCharacterNames = async () => {
    return await AsyncStorage.getAllKeys();
}
getAllCharacterNames().then(keysString => {
    keysString.forEach((key) => {
        if (key.startsWith("newCharacter")) {
        allCharacterNamesInitial.push(key.replace("newCharacter", ''))}
    });
})




export default function levelUpTab() {
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();

    let [spellCastingLevel, setSpellCastingLevel] = useState(character.spellcastingLevel);
    let [warlockCastingLevel, setWarlockCastingLevel] = useState(character.warlockCasterLevel);
    let [fullCasterLevel, setFullCasterLevel] = useState(character.fullCasterLevel);
    let [halfCasterLevel, setHalfCasterLevel] = useState(character.halfCasterLevel);
    let [currentCharacterLevel, setCurrentCharacterLevel] = useState(character.characterLevel);
    let [currentProficiency, setCurrentProficiency] = useState(character.proficiency);
    let [allCharacterNames, setAllCharacterNames] = useState(allCharacterNamesInitial);

    let [detectChange, setDetectChange] = useState<boolean>(false);
    let [nameChangeVariable, setNameChangeVariable] = useState("");
    let [abilityScoreChangeVariable, setAbilityScoreChangeVariable] = useState("");
    let [fullCasterLevelsChangeVariable, setFullCasterLevelsChangeVariable] = useState("");
    let [halfCasterLevelsChangeVariable, setHalfCasterLevelsChangeVariable] = useState("");
    let [warlockCasterLevelsChangeVariable, setWarlockCasterLevelsChangeVariable] = useState("");
    let [HPChangeVariable, setHPChangeVariable] = useState("");
    let [characterLevelChangeVariable, setCharacterLevelChangeVariable] = useState("");
    let [confirmDelete, setConfirmDelete] = useState(false);
    let [deletionName, setDeletionName] = useState("");

    let [addCharacterBoxDisplayStatus, SetAddCharacterBoxDisplayStatus] = useState(false);
    let [addHPAdjustBoxDisplayStatus, SetAddHPAdjustBoxDisplayStatusStatus] = useState(false);
    let [addSpellAndCharacterLevelBoxDisplayStatus, SetAddSpellAndCharacterLevelBoxDisplayStatus] = useState(false);
    let [addAbilityScoreBoxDisplayStatus, setAddAbilityScoreBoxDisplayStatus] = useState(false);
    let [addSkillsBoxDisplayStatus, setAddSkillsBoxDisplayStatus] = useState(false);
    let [loadCharacterBoxDisplayStatus, setLoadCharacterBoxDisplayStatus] = useState(false);
    let [deleteCharacterBoxDisplayStatus, setDeleteCharacterBoxDisplayStatus] = useState(false);

    let [skillChangeConfirmationCount, setSkillChangeConfirmationCount] = useState(0);
    let [addCharacterConfirmationCount, setAddCharacterConfirmationCount] = useState(0);
    let [addHPAdjustConfirmationCount, setAddHPAdjustConfirmationCount] = useState(0);
    let [addSpellandCharacterLevelConfirmationCount, setAddSpellAndCharaterLevelConfirmationCount] = useState(0);
    let [addAbilityScoreConfirmationCount, setAddAbilityScoreConfirmationCount] = useState(0);
    let [loadCharacterConfirmationCount, setLoadCharacterConfirmationCount] = useState(0);
    let [deleteCharacterConfirmationCount, setDeleteCharacterConfirmationCount] = useState(0);

    let [athletics, setAthletics ] = useState(character.athletics);
    let [acrobatics, setAcrobatics] = useState(character.acrobatics);
    let [sleightOfHand, setSleightOfHand] = useState(character.sleightOfHand);
    let [stealth, setStealth ] = useState(character.stealth);
    let [arcana, setArcana ] = useState(character.arcana);
    let [history, setHistory ] = useState(character.history);
    let [investigation, setInvestigation ] = useState(character.investigation);
    let [nature, setNature ] = useState(character.nature);
    let [religion, setReligion ] = useState(character.religion);
    let [animalHandling, setAnimalHandling ] = useState(character.animalHandling);
    let [insight, setInsight ] = useState(character.insight);
    let [medicine, setMedicine ] = useState(character.medicine);
    let [perception, setPerception ] = useState(character.perception);
    let [survival, setSurvival ] = useState(character.survival);
    let [deception, setDeception ] = useState(character.deception);
    let [intimidation, setIntimidation ] = useState(character.intimidation);
    let [performance, setPerformance ] = useState(character.performance);
    let [persuasion,setPersuasion ] = useState(character.persuasion);


    function headerRandomizer(){
        let randomNumber = Math.random() * 4;
        if (randomNumber < 1) {return (
            <Image
                source={require("@/assets/images/glowingWomanOutlineInForest.jpg")}
                style={styles.headImage}/>)}
        if (randomNumber < 2) {return (
            <Image
                source={require("@/assets/images/hatchingTechnoEggInGreenForest.jpg")}
                style={styles.headImage}/>)}
        if (randomNumber < 3) {return (
            <Image
                source={require("@/assets/images/manStaringDownRiotInChasm.jpg")}
                style={styles.headImage}/>)}
        return (
            <Image
                source={require("@/assets/images/spectralDragonAttackingVillage.jpg")}
                style={styles.headImage}/>)}


    function displayCoreStats(){


        return(
        <View style={{flexDirection: "row", alignSelf: "center", backgroundColor: "grey"}}>
            <View style={styles.coreStatBox}>
                {<Text style={{color: "white", textAlign: "center"}}>STR</Text>}
                {<Text style={{color: "white", textAlign: "center"}}>{character.STR}</Text>}
            </View>
            <View style={styles.coreStatBox}>
                {<Text style={{color: "white", textAlign: "center"}}>DEX</Text>}
                {<Text style={{color: "white", textAlign: "center"}}>{character.DEX}</Text>}
            </View>
            <View style={styles.coreStatBox}>
                {<Text style={{color: "white", textAlign: "center"}}>CON</Text>}
                {<Text style={{color: "white", textAlign: "center"}}>{character.CON}</Text>}
            </View>
            <View style={styles.coreStatBox}>
                {<Text style={{color: "white", textAlign: "center"}}>INT</Text>}
                {<Text style={{color: "white", textAlign: "center"}}>{character.INT}</Text>}
            </View>
            <View style={styles.coreStatBox}>
                {<Text style={{color: "white", textAlign: "center"}}>WIS</Text>}
                {<Text style={{color: "white", textAlign: "center"}}>{character.WIS}</Text>}
            </View>
            <View style={styles.coreStatBox}>
                {<Text style={{color: "white", textAlign: "center"}}>CHA</Text>}
                {<Text style={{color: "white", textAlign: "center"}}>{character.CHA}</Text>}
            </View>
        </View>)
    }


    function updateAllStatsToNewCharacter(){
        setCurrentCharacterLevel(character.characterLevel);
        setCurrentProficiency(character.proficiency)
        setSpellCastingLevel(character.spellcastingLevel);
        setFullCasterLevel(character.fullCasterLevel);
        setHalfCasterLevel(character.halfCasterLevel)
        setWarlockCastingLevel(character.warlockCasterLevel);
        setAthletics(character.athletics);
        setAcrobatics(character.acrobatics);
        setSleightOfHand(character.sleightOfHand);
        setStealth(character.stealth);
        setArcana(character.arcana);
        setHistory(character.history);
        setInvestigation(character.investigation);
        setNature(character.nature);
        setReligion(character.religion);
        setAnimalHandling(character.animalHandling);
        setInsight(character.insight);
        setMedicine(character.medicine);
        setPerception(character.perception);
        setSurvival(character.survival);
        setDeception(character.deception);
        setIntimidation(character.intimidation);
        setPerformance(character.performance);
        setPersuasion(character.persuasion);
        setDetectChange(false)
        return false;
    }

    function getSpellCastingLevelAsString(){
        let spellLevelString :number = parseInt(fullCasterLevelsChangeVariable) + (parseInt(halfCasterLevelsChangeVariable) / 2);
        if (isNaN(spellLevelString)){
            if (!isNaN(parseInt(fullCasterLevelsChangeVariable))){return (fullCasterLevelsChangeVariable);}
            if (!isNaN(parseInt(halfCasterLevelsChangeVariable))){return ("" + Math.floor(parseInt(halfCasterLevelsChangeVariable) / 2));}
            return "";
        }
        return ("" + spellLevelString);
    }



    return (

        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                headerRandomizer()
            }>
            <View>
                <Text style={{color: "white", fontSize: 50, backgroundColor: "tan", textAlign: "center"}}>{character.charName}</Text>
                <Text style={{color: "white", fontSize: 30, backgroundColor: "black", textAlign: "center"}}> Max HP: {character.maxHP} </Text>
                <Text style={{color: "white", fontSize: 20, backgroundColor: "black", textAlign: "center"}}> Character Level: {currentCharacterLevel}</Text>
                <Text style={{color: "white", fontSize: 20, backgroundColor: "black", textAlign: "center"}}> Proficiency Bonus: +{currentProficiency} </Text>
                <Text style={{color: "white", fontSize: 20, backgroundColor: "black", textAlign: "center"}}>Total Spellcasting Level: {spellCastingLevel}</Text>
                <Text style={{color: "white", fontSize: 20, backgroundColor: "black", textAlign: "center"}}>Full caster: {fullCasterLevel} | Half Caster: {halfCasterLevel}</Text>
                {warlockCastingLevel > 0 && <Text style={{color: "white", fontSize: 20, backgroundColor: "black", textAlign: "center"}}>Warlock Level: {warlockCastingLevel}</Text>}
                {displayCoreStats()}
            </View>



            <View style={styles.toolBoxStyle}>
                <Pressable style={styles.toolBoxStyle} onPress={() =>
                {setLoadCharacterBoxDisplayStatus(!loadCharacterBoxDisplayStatus);}
                }><View>
                    {!loadCharacterBoxDisplayStatus && <Text style={{color: "white", textAlign: "center", height: 40, marginTop: 15}}>Open Load Character Tool</Text>}
                    {loadCharacterBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Close Load Character Tool</Text>}
                    {loadCharacterBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Select Character Below</Text>}
                </View></Pressable>
                {(loadCharacterBoxDisplayStatus && (loadCharacterConfirmationCount > 0)) &&
                    <Pressable style={styles.confirmationButton} onPress={() => {setLoadCharacterConfirmationCount(0);}}>
                        <Text style={styles.confirmationBox}>Confirmed! Character</Text>
                        <Text style={styles.confirmationBox}>"{character.charName}"</Text>
                        <Text style={styles.confirmationBox}>Loaded! {loadCharacterConfirmationCount} time(s)!</Text>
                    </Pressable>}
                <View style={{alignSelf: "center"}}>
                    {allCharacterNames.map((pickedNameFromLoadCharacterTool) => {
                        return(
                            loadCharacterBoxDisplayStatus && <View><Pressable onPress={() => {
                                setLoadCharacterConfirmationCount(loadCharacterConfirmationCount + 1);
                                AsyncStorage.setItem("currentCharacterName", pickedNameFromLoadCharacterTool);
                                getCurrentCharacterObjectStringPromise(pickedNameFromLoadCharacterTool).then((objectString :string|null) => {
                                    characterUpdater({type: "all", character: JSON.parse("" + objectString)});
                                });
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
                            }}>{pickedNameFromLoadCharacterTool}</Text></Pressable></View>
                        )})}</View>
            </View>



            <View>{newSpellCreationTool()}</View>


                <View style={styles.toolBoxStyle}>
                    <Pressable style={styles.toolBoxStyle} onPress={() =>
                        {SetAddHPAdjustBoxDisplayStatusStatus(!addHPAdjustBoxDisplayStatus)}
                    }>
                    {!addHPAdjustBoxDisplayStatus && <Text style={{color: "white", textAlign: "center", height: 40, marginTop: 15}}>Open HP Adjustment Tool</Text>}
                    {addHPAdjustBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Close HP Adjustment Tool</Text>}
                    {addHPAdjustBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Enter Max HP Below</Text>}
                    </Pressable>
                        {addHPAdjustBoxDisplayStatus && <TextInput
                        onChangeText={setHPChangeVariable}
                        maxLength={3}
                        keyboardType='numeric'
                        placeholder={"123"}
                        placeholderTextColor={"grey"}
                        style={{
                            fontSize: 22,
                            borderStyle: "solid",
                            borderWidth: 3,
                            borderColor: "white",
                            width: 250,
                            height: 60,
                            alignSelf: "center",
                            color: "white",
                            textAlign: "center"
                        }}/>}
                    {(addHPAdjustBoxDisplayStatus && (addHPAdjustConfirmationCount > 0)) &&
                        <Pressable style={styles.confirmationButton} onPress={() => {setAddHPAdjustConfirmationCount(0);}}>
                            <Text style={styles.confirmationBox}>Confirmed! HP Updated</Text>
                            <Text style={styles.confirmationBox}>Max HP = {HPChangeVariable}</Text>
                            <Text style={styles.confirmationBox}>{addHPAdjustConfirmationCount} time(s)!</Text>
                        </Pressable>}
                    {addHPAdjustBoxDisplayStatus && <Pressable
                        style={styles.toolBoxButton}
                        onPress={() => {{
                            if (HPChangeVariable == "" || isNaN(parseInt(HPChangeVariable))){HPChangeVariable = "10";}
                            characterUpdater({type: "updateMaxHP", value: parseInt(HPChangeVariable)});
                        }}}>
                        <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Adjust Max HP: {HPChangeVariable}</Text>
                    </Pressable>}
                </View>




                <View style={styles.toolBoxStyle}>
                    <Pressable style={styles.toolBoxStyle} onPress={() =>
                        {SetAddSpellAndCharacterLevelBoxDisplayStatus(!addSpellAndCharacterLevelBoxDisplayStatus)}
                    }>
                        {!addSpellAndCharacterLevelBoxDisplayStatus && <Text style={{color: "white", textAlign: "center", height: 40, marginTop: 15}}>Open Character and Spellcasting Level Tool</Text>}
                        {addSpellAndCharacterLevelBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Close Character and Spellcasting Level Tool</Text>}
                        {addSpellAndCharacterLevelBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Enter Total Character Level of All Classes Below</Text>}
                    </Pressable>
                    {addSpellAndCharacterLevelBoxDisplayStatus && <TextInput
                        onChangeText={setCharacterLevelChangeVariable}
                        maxLength={2}
                        keyboardType='numeric'
                        placeholder={"12"}
                        placeholderTextColor={"grey"}
                        style={{
                            fontSize: 22,
                            borderStyle: "solid",
                            borderWidth: 3,
                            borderColor: "white",
                            width: 250,
                            height: 60,
                            alignSelf: "center",
                            color: "white",
                            textAlign: "center"
                        }}
                    />}
                    <View style={{flexDirection: "row"}}>
                        <View style={{flex: 0.333}}>{addSpellAndCharacterLevelBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Enter Full Caster Levels Below</Text>}
                            {addSpellAndCharacterLevelBoxDisplayStatus && <TextInput
                                onChangeText={setFullCasterLevelsChangeVariable}
                                maxLength={2}
                                keyboardType='numeric'
                                placeholder={"12"}
                                placeholderTextColor={"grey"}
                                style={{
                                    fontSize: 22,
                                    borderStyle: "solid",
                                    borderWidth: 3,
                                    borderColor: "white",
                                    width: 115,
                                    height: 60,
                                    alignSelf: "center",
                                    color: "white",
                                    textAlign: "center"
                                }}
                            />}</View>
                        <View style={{flex: 0.333}}>{addSpellAndCharacterLevelBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Enter Half Caster Levels Below</Text>}
                            {addSpellAndCharacterLevelBoxDisplayStatus && <TextInput
                                onChangeText={setHalfCasterLevelsChangeVariable}
                                maxLength={2}
                                keyboardType='numeric'
                                placeholder={"12"}
                                placeholderTextColor={"grey"}
                                style={{
                                    fontSize: 22,
                                    borderStyle: "solid",
                                    borderWidth: 3,
                                    borderColor: "white",
                                    width: 115,
                                    height: 60,
                                    alignSelf: "center",
                                    color: "white",
                                    textAlign: "center"
                                }}
                            />}</View>
                        <View style={{flex: 0.333}}>{addSpellAndCharacterLevelBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Enter Warlock Levels Below</Text>}
                        {addSpellAndCharacterLevelBoxDisplayStatus && <TextInput
                            onChangeText={setWarlockCasterLevelsChangeVariable}
                            maxLength={2}
                            keyboardType='numeric'
                            placeholder={"12"}
                            placeholderTextColor={"grey"}
                            style={{
                                fontSize: 22,
                                borderStyle: "solid",
                                borderWidth: 3,
                                borderColor: "white",
                                width: 115,
                                height: 60,
                                alignSelf: "center",
                                color: "white",
                                textAlign: "center"
                            }}
                        />}</View>
                    </View>

                    {(addSpellAndCharacterLevelBoxDisplayStatus && (addSpellandCharacterLevelConfirmationCount > 0)) &&
                        <Pressable style={styles.confirmationButton} onPress={() => {setAddSpellAndCharaterLevelConfirmationCount(0);}}>
                            <Text style={styles.confirmationBox}>Confirmed!</Text>
                            <Text style={styles.confirmationBox}>Character Level: {characterLevelChangeVariable}</Text>
                            <Text style={styles.confirmationBox}>Spellcasting Level: {getSpellCastingLevelAsString()}</Text>
                            <Text style={styles.confirmationBox}>Updated {addSpellandCharacterLevelConfirmationCount} time(s)!</Text>
                        </Pressable>}

                    {addSpellAndCharacterLevelBoxDisplayStatus && <Pressable
                        style={styles.toolBoxButton}
                        onPress={() => {
                            if (isNaN(parseInt(characterLevelChangeVariable)) || (characterLevelChangeVariable == "")){characterLevelChangeVariable = "" + character.characterLevel}
                            if (parseInt(characterLevelChangeVariable) < 0){characterLevelChangeVariable = "0";}
                            if (parseInt(characterLevelChangeVariable) > 20){characterLevelChangeVariable = "20";}
                            if (fullCasterLevelsChangeVariable == "" || isNaN(parseInt(fullCasterLevelsChangeVariable)))
                                {fullCasterLevelsChangeVariable = "" + character.fullCasterLevel;}
                            if (halfCasterLevelsChangeVariable == "" || isNaN(parseInt(halfCasterLevelsChangeVariable)))
                                {halfCasterLevelsChangeVariable = "" + character.halfCasterLevel;}
                            if (warlockCasterLevelsChangeVariable == "" || isNaN(parseInt(warlockCasterLevelsChangeVariable)))
                                {warlockCasterLevelsChangeVariable = "" + character.warlockCasterLevel;}
                            character.characterLevel = parseInt(characterLevelChangeVariable);
                            setCurrentCharacterLevel(parseInt(characterLevelChangeVariable));
                            setCurrentProficiency(updateProficiency(character, parseInt(characterLevelChangeVariable)));
                            setSpellCastingLevel(updateSpellcastingLevel(character, parseInt(fullCasterLevelsChangeVariable), parseInt(halfCasterLevelsChangeVariable)));
                            character.warlockCasterLevel = parseInt(warlockCasterLevelsChangeVariable);
                            setWarlockCastingLevel(parseInt(warlockCasterLevelsChangeVariable));
                            setFullCasterLevel(parseInt(fullCasterLevelsChangeVariable));
                            setHalfCasterLevel(parseInt(halfCasterLevelsChangeVariable));
                            setAddSpellAndCharaterLevelConfirmationCount(addSpellandCharacterLevelConfirmationCount + 1);
                            AsyncStorage.setItem("newCharacter" + character.charName, JSON.stringify(character));
                        }}>
                        <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Adjust Character Level: {characterLevelChangeVariable}</Text>
                        <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Spellcasting Level: {getSpellCastingLevelAsString()} </Text>
                        {(character.warlockCasterLevel > 0 || parseInt(warlockCasterLevelsChangeVariable) > 0) && <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Warlock Level: {warlockCasterLevelsChangeVariable}</Text>}
                    </Pressable>}
                </View>





                <View style={styles.toolBoxStyle}>
                    <Pressable style={styles.toolBoxStyle} onPress={() =>
                        {setAddAbilityScoreBoxDisplayStatus(!addAbilityScoreBoxDisplayStatus)}
                    }>
                        {!addAbilityScoreBoxDisplayStatus && <Text style={{color: "white", textAlign: "center", height: 40, marginTop: 15}}>Open Ability Score Tool</Text>}
                        {addAbilityScoreBoxDisplayStatus && <Text style={{color: "white", textAlign: "center", marginTop: 15, marginBottom: 18}}>Close Ability Score Tool</Text>}
                        {addAbilityScoreBoxDisplayStatus && <View>{displayCoreStats()}</View>}
                        {addAbilityScoreBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Enter stat Below</Text>}
                    </Pressable>
                    {addAbilityScoreBoxDisplayStatus && <TextInput
                        onChangeText={setAbilityScoreChangeVariable}
                        maxLength={2}
                        keyboardType='numeric'
                        placeholder={"12"}
                        placeholderTextColor={"grey"}
                        style={{
                            fontSize: 22,
                            borderStyle: "solid",
                            borderWidth: 3,
                            borderColor: "white",
                            width: 250,
                            height: 60,
                            alignSelf: "center",
                            color: "white",
                            textAlign: "center"
                        }}/>}
                    <View style={{flexDirection: "row", alignSelf: "center"}}>
                    {addAbilityScoreBoxDisplayStatus && <Pressable
                        style={styles.coreStatAdjustButton}
                        onPress={() => {
                            if (isNaN(parseInt(abilityScoreChangeVariable)) || abilityScoreChangeVariable == ""){
                                abilityScoreChangeVariable = "" + character.STR;
                            }
                            characterUpdater({type: "updateSTR", value: parseInt(abilityScoreChangeVariable)});
                        }}>
                        <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Adjust  STR: {abilityScoreChangeVariable}</Text>
                    </Pressable>}
                        {addAbilityScoreBoxDisplayStatus && <Pressable
                            style={styles.coreStatAdjustButton}
                            onPress={() => {
                                if (isNaN(parseInt(abilityScoreChangeVariable)) || abilityScoreChangeVariable == ""){
                                    abilityScoreChangeVariable = "" + character.DEX;
                                }
                                characterUpdater({type: "updateDEX", value: parseInt(abilityScoreChangeVariable)});
                            }}>
                            <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Adjust  DEX: {abilityScoreChangeVariable}</Text>
                        </Pressable>}
                        {addAbilityScoreBoxDisplayStatus && <Pressable
                            style={styles.coreStatAdjustButton}
                            onPress={() => {
                                if (isNaN(parseInt(abilityScoreChangeVariable)) || abilityScoreChangeVariable == ""){
                                    abilityScoreChangeVariable = "" + character.CON;
                                }
                                characterUpdater({type: "updateCON", value: parseInt(abilityScoreChangeVariable)});
                            }}>
                            <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Adjust  CON: {abilityScoreChangeVariable}</Text>
                        </Pressable>}
                    </View>
                    <View style={{flexDirection: "row", alignSelf: "center"}}>
                        {addAbilityScoreBoxDisplayStatus && <Pressable
                            style={styles.coreStatAdjustButton}
                            onPress={() => {
                                if (isNaN(parseInt(abilityScoreChangeVariable)) || abilityScoreChangeVariable == ""){
                                    abilityScoreChangeVariable = "" + character.INT;
                                }
                                characterUpdater({type: "updateINT", value: parseInt(abilityScoreChangeVariable)});
                            }}>
                            <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Adjust  INT: {abilityScoreChangeVariable}</Text>
                        </Pressable>}
                        {addAbilityScoreBoxDisplayStatus && <Pressable
                            style={styles.coreStatAdjustButton}
                            onPress={() => {
                                if (isNaN(parseInt(abilityScoreChangeVariable)) || abilityScoreChangeVariable == ""){
                                    abilityScoreChangeVariable = "" + character.WIS;
                                }
                                characterUpdater({type: "updateWIS", value: parseInt(abilityScoreChangeVariable)});
                            }}>
                            <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Adjust  WIS: {abilityScoreChangeVariable}</Text>
                        </Pressable>}
                        {addAbilityScoreBoxDisplayStatus && <Pressable
                            style={styles.coreStatAdjustButton}
                            onPress={() => {
                                if (isNaN(parseInt(abilityScoreChangeVariable)) || abilityScoreChangeVariable == ""){
                                    abilityScoreChangeVariable = "" + character.CHA;
                                }
                                characterUpdater({type: "updateCHA", value: parseInt(abilityScoreChangeVariable)});
                            }}>
                            <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Adjust  CHA: {abilityScoreChangeVariable}</Text>
                        </Pressable>}
                    </View>
                    {(addAbilityScoreBoxDisplayStatus && (addAbilityScoreConfirmationCount > 0)) &&
                        <Pressable style={styles.confirmationButton} onPress={() => {setAddAbilityScoreConfirmationCount(0);}}>
                            <Text style={styles.confirmationBox}>Confirmed! Ability Scores Updated</Text>
                            <Text style={styles.confirmationBox}>{addAbilityScoreConfirmationCount} time(s)!</Text>
                        </Pressable>}
                </View>




            <View style={styles.toolBoxStyle}>
                <View><Pressable style={styles.toolBoxStyle} onPress={() =>
                {setAddSkillsBoxDisplayStatus(!addSkillsBoxDisplayStatus)}
                }>
                    {!addSkillsBoxDisplayStatus && <Text style={{color: "white", textAlign: "center", height: 40, marginTop: 15}}>Open Skills Management Tool</Text>}
                    {addSkillsBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Close Skills Management Tool</Text>}
                    {addSkillsBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Adjust Skills Below</Text>}
                </Pressable>
                    {addSkillsBoxDisplayStatus && <View style={{paddingBottom: 12}}>
                        <View style={{flexDirection: "row"}}>
                            <View style={{flex: 0.7, marginLeft: 10}}>
                            <Text style={styles.skillsModText}>STR based Skill</Text>
                            <Text style={styles.skillsText}>Athletics</Text>
                            <Text style={styles.skillsModText}>DEX based Skills</Text>
                            <Text style={styles.skillsText}>Acrobatics</Text>
                            <Text style={styles.skillsText}>Sleight of Hand</Text>
                            <Text style={styles.skillsText}>Stealth</Text>
                            <Text style={styles.skillsModText}>INT based Skills</Text>
                            <Text style={styles.skillsText}>Arcana</Text>
                            <Text style={styles.skillsText}>History</Text>
                            <Text style={styles.skillsText}>Investigation</Text>
                            <Text style={styles.skillsText}>Nature</Text>
                            <Text style={styles.skillsText}>Religion</Text>
                            <Text style={styles.skillsModText}>WIS based Skills</Text>
                            <Text style={styles.skillsText}>Animal Handling</Text>
                            <Text style={styles.skillsText}>Insight</Text>
                            <Text style={styles.skillsText}>Medicine</Text>
                            <Text style={styles.skillsText}>Perception</Text>
                            <Text style={styles.skillsText}>Survival</Text>
                            <Text style={styles.skillsModText}>CHA based Skills</Text>
                            <Text style={styles.skillsText}>Deception</Text>
                            <Text style={styles.skillsText}>Intimidation</Text>
                            <Text style={styles.skillsText}>Performance</Text>
                            <Text style={styles.skillsText}>Persuasion</Text>
                        </View>
                            <View style={{flex: 0.3, marginRight: 10}}>
                                <Text style={styles.skillBannerPlaceHolder}></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setAthletics("X");}}>
                                    {athletics == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                setAthletics("P");}}>
                                {athletics == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                setAthletics("E");}}>
                                {athletics == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable></Text>
                                <Text style={styles.skillBannerPlaceHolder}>not prof---prof----expert</Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                setAcrobatics("X");}}>
                                {acrobatics == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                setAcrobatics("P");}}>
                                {acrobatics == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                setAcrobatics("E");}}>
                                {acrobatics == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                        setSleightOfHand("X");}}>
                                        {sleightOfHand == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                    </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setSleightOfHand("P");}}>
                                    {sleightOfHand == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setSleightOfHand("E");}}>
                                    {sleightOfHand == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                        setStealth("X");}}>
                                        {stealth == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                    </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setStealth("P");}}>
                                    {stealth == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setStealth("E");}}>
                                    {stealth == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable></Text>
                                <Text style={styles.skillBannerPlaceHolder}>not prof---prof----expert</Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setArcana("X");}}>
                                    {arcana == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setArcana("P");}}>
                                    {arcana == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setArcana("E");}}>
                                    {arcana == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setHistory("X");}}>
                                    {history == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setHistory("P");}}>
                                    {history == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setHistory("E");}}>
                                    {history == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setInvestigation("X");}}>
                                    {investigation == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setInvestigation("P");}}>
                                    {investigation == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setInvestigation("E");}}>
                                    {investigation == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setNature("X");}}>
                                    {nature == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setNature("P");}}>
                                    {nature == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setNature("E");}}>
                                    {nature == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setReligion("X");}}>
                                    {religion == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setReligion("P");}}>
                                    {religion == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setReligion("E");}}>
                                    {religion == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable></Text>
                                <Text style={styles.skillBannerPlaceHolder}>not prof---prof----expert</Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setAnimalHandling("X");}}>
                                    {animalHandling == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setAnimalHandling("P");}}>
                                    {animalHandling == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setAnimalHandling("E");}}>
                                    {animalHandling == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setInsight("X");}}>
                                    {insight == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setInsight("P");}}>
                                    {insight == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setInsight("E");}}>
                                    {insight == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setMedicine("X");}}>
                                    {medicine == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setMedicine("P");}}>
                                    {medicine == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setMedicine("E");}}>
                                    {medicine == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setPerception("X");}}>
                                    {perception == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setPerception("P");}}>
                                    {perception == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setPerception("E");}}>
                                    {perception == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setSurvival("X");}}>
                                    {survival == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setSurvival("P");}}>
                                    {survival == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setSurvival("E");}}>
                                    {survival == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable></Text>
                                <Text style={styles.skillBannerPlaceHolder}>not prof---prof----expert</Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setDeception("X");}}>
                                    {deception == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setDeception("P");}}>
                                    {deception == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setDeception("E");}}>
                                    {deception == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setIntimidation("X");}}>
                                    {intimidation == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setIntimidation("P");}}>
                                    {intimidation == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setIntimidation("E");}}>
                                    {intimidation == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setPerformance("X");}}>
                                    {performance == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setPerformance("P");}}>
                                    {performance == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setPerformance("E");}}>
                                    {performance == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setPersuasion("X");}}>
                                    {persuasion == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setPersuasion("P");}}>
                                    {persuasion == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    setPersuasion("E");}}>
                                    {persuasion == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                </Pressable></Text>
                                <Text style={styles.skillBannerPlaceHolder}>not prof---prof----expert</Text>
                            </View>

                        </View>
                    </View>}
                    {(addSkillsBoxDisplayStatus && (skillChangeConfirmationCount > 0)) &&
                        <Pressable style={styles.confirmationButton} onPress={() => {setSkillChangeConfirmationCount(0);}}>
                            <Text style={styles.confirmationBox}>Confirmed! Skills Updated</Text>
                            <Text style={styles.confirmationBox}>{skillChangeConfirmationCount} time(s)!</Text>
                        </Pressable>}
                    {addSkillsBoxDisplayStatus && <Pressable
                        style={styles.toolBoxButton}
                        onPress={() => {{
                            character.athletics = athletics;
                            character.acrobatics= acrobatics;
                            character.sleightOfHand = sleightOfHand;
                            character.stealth = stealth;
                            character.arcana = arcana;
                            character.history = history;
                            character.investigation= investigation;
                            character.nature = nature;
                            character.religion = religion;
                            character.animalHandling = animalHandling;
                            character.insight = insight;
                            character.medicine = medicine;
                            character.perception = perception;
                            character.survival = survival;
                            character.deception = deception;
                            character.intimidation = intimidation;
                            character.performance = performance;
                            character.persuasion = persuasion;
                            AsyncStorage.setItem("newCharacter" + character.charName, JSON.stringify(character))
                            setSkillChangeConfirmationCount(skillChangeConfirmationCount + 1)
                        }}}>
                        <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Finalize Skills</Text>
                    </Pressable>}
                </View>
            </View>





            <View>{AdjustCoreStatSaves(character, detectChange)}</View>




                <View style={styles.toolBoxStyle}>
                    <Pressable style={styles.toolBoxStyle} onPress={() =>
                    {SetAddCharacterBoxDisplayStatus(!addCharacterBoxDisplayStatus);}
                    }>
                    {!addCharacterBoxDisplayStatus && <Text style={{color: "white", textAlign: "center", height: 40, marginTop: 15}}>Open New Character Creator</Text>}
                    {addCharacterBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Close Character Creator</Text>}
                    {addCharacterBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Enter Name Below</Text>}
                    </Pressable>
                    {addCharacterBoxDisplayStatus && <TextInput
                        onChangeText={setNameChangeVariable}
                        placeholder={"Name McBoatface"}
                        placeholderTextColor={"grey"}
                        style={{
                            fontSize: 22,
                            borderStyle: "solid",
                            borderWidth: 3,
                            borderColor: "white",
                            width: 250,
                            height: 60,
                            alignSelf: "center",
                            color: "white"
                        }}
                    />}
                    {addCharacterBoxDisplayStatus && <View style={{
                        flexDirection: "row",
                        alignSelf: "center",
                        margin: 10,}}>
                        <View>
                            {addCharacterBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Enter initial</Text>}
                            {addCharacterBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>HP Below</Text>}
                            {addCharacterBoxDisplayStatus && <TextInput
                                onChangeText={setHPChangeVariable}
                                keyboardType={"numeric"}
                                maxLength={3}
                                placeholder={"123"}
                                placeholderTextColor={"grey"}
                                style={{
                                    fontSize: 22,
                                    borderStyle: "solid",
                                    borderWidth: 3,
                                    borderColor: "white",
                                    width: 120,
                                    height: 60,
                                    alignSelf: "center",
                                    color: "white",
                                    marginLeft: 10,
                                    marginRight: 10,
                                }}
                            />}
                        </View>
                        <View>
                            {addCharacterBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Enter Character</Text>}
                            {addCharacterBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Level</Text>}
                            {addCharacterBoxDisplayStatus && <TextInput
                                onChangeText={setCharacterLevelChangeVariable}
                                keyboardType={"numeric"}
                                maxLength={2}
                                placeholder={"12"}
                                placeholderTextColor={"grey"}
                                style={{
                                    fontSize: 22,
                                    borderStyle: "solid",
                                    borderWidth: 3,
                                    borderColor: "white",
                                    width: 120,
                                    height: 60,
                                    alignSelf: "center",
                                    color: "white",
                                    marginLeft: 10,
                                    marginRight: 10,
                                }}
                        />}
                    </View>
                </View>}
                    {(addCharacterBoxDisplayStatus && (addCharacterConfirmationCount > 0)) &&
                        <Pressable style={styles.confirmationButton} onPress={() => {setAddCharacterConfirmationCount(0);}}>
                            <Text style={styles.confirmationBox}>Confirmed! New Character</Text>
                            <Text style={styles.confirmationBox}>"{character.charName}"</Text>
                            <Text style={styles.confirmationBox}>Created! {addCharacterConfirmationCount} time(s)!</Text>
                        </Pressable>}
                    {addCharacterBoxDisplayStatus && <Pressable
                        style={styles.toolBoxButton}
                        onPress={() => {if (nameChangeVariable != ""){
                            if (isNaN(parseInt(characterLevelChangeVariable)) ||characterLevelChangeVariable == "" || parseInt(characterLevelChangeVariable) < 0)
                                {characterLevelChangeVariable = "1";}
                            if (parseInt(characterLevelChangeVariable) > 20) {characterLevelChangeVariable = "20";}
                            if (isNaN(parseInt(HPChangeVariable)) || HPChangeVariable == "" || parseInt(HPChangeVariable) < 1){HPChangeVariable = "10";}
                            characterUpdater({type: "all", character: new Character(nameChangeVariable, parseInt(HPChangeVariable), parseInt(characterLevelChangeVariable))});
                            setAddCharacterConfirmationCount(addCharacterConfirmationCount + 1);
                            getAllCharacterNames().then(keysString => {
                                allCharacterNamesInitial = [];
                                keysString.forEach((key) => {
                                    if (key.startsWith("newCharacter")) {
                                        allCharacterNamesInitial.push(key.replace("newCharacter", ''))}
                                });
                                setAllCharacterNames(allCharacterNamesInitial);
                            })
                        }}}>
                        <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Add a new Character; {nameChangeVariable}</Text>
                        <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>HP; {HPChangeVariable} Character Level; {characterLevelChangeVariable}</Text>
                    </Pressable>}
                </View>




            <View style={styles.toolBoxStyle}>
                <Pressable style={styles.toolBoxStyle} onPress={() =>
                {setDeleteCharacterBoxDisplayStatus(!deleteCharacterBoxDisplayStatus);}
                }><View>
                    {!deleteCharacterBoxDisplayStatus && <Text style={{color: "white", textAlign: "center", height: 40, marginTop: 15}}>Open Delete Character Tool</Text>}
                    {deleteCharacterBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Close Delete Character Tool</Text>}
                    {deleteCharacterBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Select Character Below</Text>}
                </View>
                </Pressable>
                {(deleteCharacterBoxDisplayStatus && (deleteCharacterConfirmationCount > 0)) &&
                    <Pressable onPress={() => {setDeleteCharacterConfirmationCount(0);}}>
                        <Text style={{
                            textAlign: "center",
                            color: "white",
                            fontSize: 25,
                            backgroundColor: "blue",
                            margin: 15,
                            borderRadius: 10
                        }}>Confirmed! Character {character.charName} Deleted <FontAwesome size={28} name="frown-o" color={"red"} /></Text></Pressable>}
                <View style={{alignSelf: "center"}}>
                    {allCharacterNames.map((pickedNameDeleteCharacterTool) => {
                        return(
                            deleteCharacterBoxDisplayStatus && <View><Pressable onPress={() => {
                                setConfirmDelete(!confirmDelete);
                                setDeletionName(pickedNameDeleteCharacterTool);
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
                            }}>{pickedNameDeleteCharacterTool}</Text></Pressable></View>
                        )})}</View>
                {(deleteCharacterBoxDisplayStatus && confirmDelete) &&
                    <Pressable style={styles.confirmationButton} onPress={() => {
                        setDeleteCharacterConfirmationCount(0);
                        setConfirmDelete(!confirmDelete);}}>
                        <Text style={styles.confirmationBox}>Cancel Character Deletion?</Text>
                        <Text style={styles.confirmationBox}>"{deletionName}"</Text>
                        <Text style={styles.confirmationBox}>\---<FontAwesome size={40} name="smile-o" color={"green"} />---/</Text>
                    </Pressable>}

                {(deleteCharacterBoxDisplayStatus && confirmDelete && (character.charName == deletionName)) && <View>
                    <Text style={{
                        backgroundColor: "yellow",
                        borderColor: "red",
                        borderWidth: 6,
                        textAlign: "center",
                        fontSize: 16,
                        margin: 10
                    }}>Warning! Deleting the Currently Loaded Character, will Create and Load a "default" Character</Text>
                </View>}

                {(deleteCharacterBoxDisplayStatus && confirmDelete) &&
                    <Pressable style={styles.confirmationButton} onPress={() => {
                        setDeleteCharacterConfirmationCount(0);
                        setConfirmDelete(!confirmDelete);
                        AsyncStorage.removeItem("newCharacter" + deletionName);
                        if (character.charName == deletionName){
                            characterUpdater({type: "all", character: new Character("default", 15, 5)});
                        }
                        getAllCharacterNames().then(keysString => {
                            allCharacterNamesInitial = [];
                            keysString.forEach((key) => {
                                if (key.startsWith("newCharacter")) {
                                    allCharacterNamesInitial.push(key.replace("newCharacter", ''))}
                            });
                            setAllCharacterNames(allCharacterNamesInitial);
                        })
                    }}>
                        <Text style={styles.confirmationBox}>Confirm Character Deletion?</Text>
                        <Text style={styles.confirmationBox}>"{deletionName}"</Text>
                        <Text style={styles.confirmationBox}>/---<MaterialCommunityIcons size={40} name="skull-crossbones-outline" color={"red"} />---\</Text>
                    </Pressable>}
            </View>


            <View>{AttributionSection()}</View>

            {detectChange && updateAllStatsToNewCharacter()}
        </ParallaxScrollView>


    );


}

const styles = StyleSheet.create({
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    headImage: {
        height: "100%",
        width: "100%",
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
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
    coreStatBox: {
      backgroundColor: "black",
        padding: 8,
        margin: 4,
        width: 50,
    },
    coreStatAdjustButton: {
        backgroundColor: "maroon",
        alignSelf: "center",
        padding: 13,
        borderRadius: 15,
        width: 90,
        borderColor: "orange",
        borderWidth: 2,
        margin: 3,
    },
    skillsText: {
        color: "white",
        fontSize: 20,
        marginBottom: 4,
        marginLeft: 40,
    },
    skillsModText: {
        color: "white",
        fontSize: 30
    },
    skillsButtons: {
        backgroundColor: "maroon",
        height: 30,
        width: 32,
        borderRadius: 8,
        borderColor: "black",
        borderWidth: 5,
    },
    skillsButtonText: {
        color: "Black",
        fontSize: 35,
        marginTop: -15,
        marginLeft: -1,
        textAlign: "center",
    },
    skillBannerPlaceHolder: {
        height: 45,
        fontSize: 9,
        color: "white",
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
});
