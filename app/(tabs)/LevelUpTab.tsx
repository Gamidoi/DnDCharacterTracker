import { Image, StyleSheet, Text, View, TextInput, Pressable} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from "react";
import {Character, updateProficiency, updateSpellcastingLevel} from '@/assets/classes/character';
import {FontAwesome, MaterialCommunityIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import newSpellCreationTool from "@/components/newSpellCreationTool";
import AdjustCoreStatSaves from "@/components/adjustCoreStatSaves";






let initializingName :string|null;
let getNameAsString = async () => {
    return await AsyncStorage.getItem("currentCharacterName");
}
let currentCharacter = new Character("defaultSSR", 10, 5);
let getCurrentCharacterObjectStringPromise = async (string :string|null) => {
    return await AsyncStorage.getItem("newCharacter" + string);
}

getNameAsString().then(nameString => {
    initializingName = nameString;
    getCurrentCharacterObjectStringPromise(initializingName).then((objectString :string|null) => {
        if (objectString != null) {
            currentCharacter = JSON.parse(objectString);
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
    if (currentCharacter == null){currentCharacter =new Character("default", 10, 5);}

    let [maxHP, setMaxHP] = useState(currentCharacter.maxHP);
    let [spellCastingLevel, setSpellCastingLevel] = useState(currentCharacter.spellcastingLevel);
    let [warlockCastingLevel, setWarlockCastingLevel] = useState(currentCharacter.warlockCasterLevel);
    let [fullCasterLevel, setFullCasterLevel] = useState(currentCharacter.fullCasterLevel);
    let [halfCasterLevel, setHalfCasterLevel] = useState(currentCharacter.halfCasterLevel);
    let [currentCharacterName, setCurrentCharacterName] = useState(currentCharacter.charName);
    let [currentCharacterLevel, setCurrentCharacterLevel] = useState(currentCharacter.characterLevel);
    let [currentProficiency, setCurrentProficiency] = useState(currentCharacter.proficiency);
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

    let [currentStatSTR, setCurrentStatSTR] = useState(currentCharacter.STR);
    let [currentStatDEX, setCurrentStatDEX] = useState(currentCharacter.DEX);
    let [currentStatCON, setCurrentStatCON] = useState(currentCharacter.CON);
    let [currentStatINT, setCurrentStatINT] = useState(currentCharacter.INT);
    let [currentStatWIS, setCurrentStatWIS] = useState(currentCharacter.WIS);
    let [currentStatCHA, setCurrentStatCHA] = useState(currentCharacter.CHA);

    let [athletics, setAthletics ] = useState(currentCharacter.athletics);
    let [acrobatics, setAcrobatics] = useState(currentCharacter.acrobatics);
    let [sleightOfHand, setSleightOfHand] = useState(currentCharacter.sleightOfHand);
    let [stealth, setStealth ] = useState(currentCharacter.stealth);
    let [arcana, setArcana ] = useState(currentCharacter.arcana);
    let [history, setHistory ] = useState(currentCharacter.history);
    let [investigation, setInvestigation ] = useState(currentCharacter.investigation);
    let [nature, setNature ] = useState(currentCharacter.nature);
    let [religion, setReligion ] = useState(currentCharacter.religion);
    let [animalHandling, setAnimalHandling ] = useState(currentCharacter.animalHandling);
    let [insight, setInsight ] = useState(currentCharacter.insight);
    let [medicine, setMedicine ] = useState(currentCharacter.medicine);
    let [perception, setPerception ] = useState(currentCharacter.perception);
    let [survival, setSurvival ] = useState(currentCharacter.survival);
    let [deception, setDeception ] = useState(currentCharacter.deception);
    let [intimidation, setIntimidation ] = useState(currentCharacter.intimidation);
    let [performance, setPerformance ] = useState(currentCharacter.performance);
    let [persuasion,setPersuasion ] = useState(currentCharacter.persuasion);

    const navigation = useNavigation();
    useEffect(() => {
        return navigation.addListener('focus', () => {
            getNameAsString().then(nameString => {
                initializingName = nameString;
                getCurrentCharacterObjectStringPromise(initializingName).then(objectString => {
                    if (objectString != null) {
                        currentCharacter = JSON.parse(objectString);
                    }

                    setCurrentCharacterName(currentCharacter.charName);
                })});
        });
    }, [navigation]);


    function displayCoreStats(){
        return(
        <View style={{flexDirection: "row", alignSelf: "center", backgroundColor: "grey"}}>
            <View style={styles.coreStatBox}>
                {<Text style={{color: "white", textAlign: "center"}}>STR</Text>}
                {<Text style={{color: "white", textAlign: "center"}}>{currentStatSTR}</Text>}
            </View>
            <View style={styles.coreStatBox}>
                {<Text style={{color: "white", textAlign: "center"}}>DEX</Text>}
                {<Text style={{color: "white", textAlign: "center"}}>{currentStatDEX}</Text>}
            </View>
            <View style={styles.coreStatBox}>
                {<Text style={{color: "white", textAlign: "center"}}>CON</Text>}
                {<Text style={{color: "white", textAlign: "center"}}>{currentStatCON}</Text>}
            </View>
            <View style={styles.coreStatBox}>
                {<Text style={{color: "white", textAlign: "center"}}>INT</Text>}
                {<Text style={{color: "white", textAlign: "center"}}>{currentStatINT}</Text>}
            </View>
            <View style={styles.coreStatBox}>
                {<Text style={{color: "white", textAlign: "center"}}>WIS</Text>}
                {<Text style={{color: "white", textAlign: "center"}}>{currentStatWIS}</Text>}
            </View>
            <View style={styles.coreStatBox}>
                {<Text style={{color: "white", textAlign: "center"}}>CHA</Text>}
                {<Text style={{color: "white", textAlign: "center"}}>{currentStatCHA}</Text>}
            </View>
        </View>)
    }


    function updateAllStatsToNewCharacter(){
        setCurrentCharacterName(currentCharacter.charName);
        setCurrentCharacterLevel(currentCharacter.characterLevel);
        setCurrentProficiency(currentCharacter.proficiency)
        setMaxHP(currentCharacter.maxHP);
        setSpellCastingLevel(currentCharacter.spellcastingLevel);
        setFullCasterLevel(currentCharacter.fullCasterLevel);
        setHalfCasterLevel(currentCharacter.halfCasterLevel)
        setWarlockCastingLevel(currentCharacter.warlockCasterLevel);
        setCurrentStatSTR(currentCharacter.STR);
        setCurrentStatDEX(currentCharacter.DEX);
        setCurrentStatCON(currentCharacter.CON);
        setCurrentStatINT(currentCharacter.INT);
        setCurrentStatWIS(currentCharacter.WIS);
        setCurrentStatCHA(currentCharacter.CHA);
        setAthletics(currentCharacter.athletics);
        setAcrobatics(currentCharacter.acrobatics);
        setSleightOfHand(currentCharacter.sleightOfHand);
        setStealth(currentCharacter.stealth);
        setArcana(currentCharacter.arcana);
        setHistory(currentCharacter.history);
        setInvestigation(currentCharacter.investigation);
        setNature(currentCharacter.nature);
        setReligion(currentCharacter.religion);
        setAnimalHandling(currentCharacter.animalHandling);
        setInsight(currentCharacter.insight);
        setMedicine(currentCharacter.medicine);
        setPerception(currentCharacter.perception);
        setSurvival(currentCharacter.survival);
        setDeception(currentCharacter.deception);
        setIntimidation(currentCharacter.intimidation);
        setPerformance(currentCharacter.performance);
        setPersuasion(currentCharacter.persuasion);
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
                <Image
                    source={require('@/assets/images/headerImageDragons.jpg')}
                    style={styles.headImage}
                />
            }>
            <View>
                <Text style={{color: "white", fontSize: 50, backgroundColor: "tan", textAlign: "center"}}>{currentCharacterName}</Text>
                <Text style={{color: "white", fontSize: 30, backgroundColor: "black", textAlign: "center"}}> Max HP: {maxHP} </Text>
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
                        <Text style={styles.confirmationBox}>"{currentCharacterName}"</Text>
                        <Text style={styles.confirmationBox}>Loaded! {loadCharacterConfirmationCount} time(s)!</Text>
                    </Pressable>}
                <View style={{alignSelf: "center"}}>
                    {allCharacterNames.map((pickedNameFromLoadCharacterTool) => {
                        return(
                            loadCharacterBoxDisplayStatus && <View><Pressable onPress={() => {
                                setLoadCharacterConfirmationCount(loadCharacterConfirmationCount + 1);
                                AsyncStorage.setItem("currentCharacterName", pickedNameFromLoadCharacterTool);
                                getCurrentCharacterObjectStringPromise(pickedNameFromLoadCharacterTool).then((objectString :string|null) => {
                                    currentCharacter = JSON.parse("" + objectString);
                                    setDetectChange(true)
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



            <View>{newSpellCreationTool(currentCharacter)}</View>


                <View>
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
                                AsyncStorage.setItem("CurrentMaxHP", HPChangeVariable);
                                currentCharacter.maxHP = parseInt(HPChangeVariable);
                                AsyncStorage.setItem("newCharacter" + currentCharacterName, JSON.stringify(currentCharacter));
                                setMaxHP(parseInt(HPChangeVariable));
                                setAddHPAdjustConfirmationCount(addHPAdjustConfirmationCount + 1);
                        }}}>
                        <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Adjust Max HP: {HPChangeVariable}</Text>
                    </Pressable>}
                </View>




                <View>
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
                            if (isNaN(parseInt(characterLevelChangeVariable)) || (characterLevelChangeVariable == "")){characterLevelChangeVariable = "" + currentCharacter.characterLevel}
                            if (parseInt(characterLevelChangeVariable) < 0){characterLevelChangeVariable = "0";}
                            if (parseInt(characterLevelChangeVariable) > 20){characterLevelChangeVariable = "20";}
                            if (fullCasterLevelsChangeVariable == "" || isNaN(parseInt(fullCasterLevelsChangeVariable)))
                                {fullCasterLevelsChangeVariable = "" + currentCharacter.fullCasterLevel;}
                            if (halfCasterLevelsChangeVariable == "" || isNaN(parseInt(halfCasterLevelsChangeVariable)))
                                {halfCasterLevelsChangeVariable = "" + currentCharacter.halfCasterLevel;}
                            if (warlockCasterLevelsChangeVariable == "" || isNaN(parseInt(warlockCasterLevelsChangeVariable)))
                                {warlockCasterLevelsChangeVariable = "" + currentCharacter.warlockCasterLevel;}
                            currentCharacter.characterLevel = parseInt(characterLevelChangeVariable);
                            setCurrentCharacterLevel(parseInt(characterLevelChangeVariable));
                            setCurrentProficiency(updateProficiency(currentCharacter, parseInt(characterLevelChangeVariable)));
                            setSpellCastingLevel(updateSpellcastingLevel(currentCharacter, parseInt(fullCasterLevelsChangeVariable), parseInt(halfCasterLevelsChangeVariable)));
                            currentCharacter.warlockCasterLevel = parseInt(warlockCasterLevelsChangeVariable);
                            setWarlockCastingLevel(parseInt(warlockCasterLevelsChangeVariable));
                            setFullCasterLevel(parseInt(fullCasterLevelsChangeVariable));
                            setHalfCasterLevel(parseInt(halfCasterLevelsChangeVariable));
                            setAddSpellAndCharaterLevelConfirmationCount(addSpellandCharacterLevelConfirmationCount + 1);
                            AsyncStorage.setItem("newCharacter" + currentCharacterName, JSON.stringify(currentCharacter));
                        }}>
                        <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Adjust Character Level: {characterLevelChangeVariable}</Text>
                        <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Spellcasting Level: {getSpellCastingLevelAsString()} </Text>
                        {(currentCharacter.warlockCasterLevel > 0 || parseInt(warlockCasterLevelsChangeVariable) > 0) && <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Warlock Level: {warlockCasterLevelsChangeVariable}</Text>}
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
                                abilityScoreChangeVariable = "" + currentCharacter.STR;
                            }
                            currentCharacter.STR = parseInt(abilityScoreChangeVariable);
                            setCurrentStatSTR(currentCharacter.STR);
                            AsyncStorage.setItem("newCharacter" + currentCharacterName, JSON.stringify(currentCharacter))
                            setAddAbilityScoreConfirmationCount(addAbilityScoreConfirmationCount + 1)
                        }}>
                        <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Adjust  STR: {abilityScoreChangeVariable}</Text>
                    </Pressable>}
                        {addAbilityScoreBoxDisplayStatus && <Pressable
                            style={styles.coreStatAdjustButton}
                            onPress={() => {
                                if (isNaN(parseInt(abilityScoreChangeVariable)) || abilityScoreChangeVariable == ""){
                                    abilityScoreChangeVariable = "" + currentCharacter.DEX;
                                }
                                currentCharacter.DEX = parseInt(abilityScoreChangeVariable);
                                setCurrentStatDEX(currentCharacter.DEX);
                                AsyncStorage.setItem("newCharacter" + currentCharacterName, JSON.stringify(currentCharacter))
                                setAddAbilityScoreConfirmationCount(addAbilityScoreConfirmationCount + 1)
                            }}>
                            <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Adjust  DEX: {abilityScoreChangeVariable}</Text>
                        </Pressable>}
                        {addAbilityScoreBoxDisplayStatus && <Pressable
                            style={styles.coreStatAdjustButton}
                            onPress={() => {
                                if (isNaN(parseInt(abilityScoreChangeVariable)) || abilityScoreChangeVariable == ""){
                                    abilityScoreChangeVariable = "" + currentCharacter.CON;
                                }
                                currentCharacter.CON = parseInt(abilityScoreChangeVariable);
                                setCurrentStatCON(currentCharacter.CON);
                                AsyncStorage.setItem("newCharacter" + currentCharacterName, JSON.stringify(currentCharacter))
                                setAddAbilityScoreConfirmationCount(addAbilityScoreConfirmationCount + 1)
                            }}>
                            <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Adjust  CON: {abilityScoreChangeVariable}</Text>
                        </Pressable>}
                    </View>
                    <View style={{flexDirection: "row", alignSelf: "center"}}>
                        {addAbilityScoreBoxDisplayStatus && <Pressable
                            style={styles.coreStatAdjustButton}
                            onPress={() => {
                                if (isNaN(parseInt(abilityScoreChangeVariable)) || abilityScoreChangeVariable == ""){
                                    abilityScoreChangeVariable = "" + currentCharacter.INT;
                                }
                                currentCharacter.INT = parseInt(abilityScoreChangeVariable);
                                setCurrentStatINT(currentCharacter.INT);
                                AsyncStorage.setItem("newCharacter" + currentCharacterName, JSON.stringify(currentCharacter))
                                setAddAbilityScoreConfirmationCount(addAbilityScoreConfirmationCount + 1)
                            }}>
                            <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Adjust  INT: {abilityScoreChangeVariable}</Text>
                        </Pressable>}
                        {addAbilityScoreBoxDisplayStatus && <Pressable
                            style={styles.coreStatAdjustButton}
                            onPress={() => {
                                if (isNaN(parseInt(abilityScoreChangeVariable)) || abilityScoreChangeVariable == ""){
                                    abilityScoreChangeVariable = "" + currentCharacter.WIS;
                                }
                                currentCharacter.WIS = parseInt(abilityScoreChangeVariable);
                                setCurrentStatWIS(currentCharacter.WIS);
                                AsyncStorage.setItem("newCharacter" + currentCharacterName, JSON.stringify(currentCharacter))
                                setAddAbilityScoreConfirmationCount(addAbilityScoreConfirmationCount + 1)
                            }}>
                            <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Adjust  WIS: {abilityScoreChangeVariable}</Text>
                        </Pressable>}
                        {addAbilityScoreBoxDisplayStatus && <Pressable
                            style={styles.coreStatAdjustButton}
                            onPress={() => {
                                if (isNaN(parseInt(abilityScoreChangeVariable)) || abilityScoreChangeVariable == ""){
                                    abilityScoreChangeVariable = "" + currentCharacter.CHA;
                                }
                                currentCharacter.CHA = parseInt(abilityScoreChangeVariable);
                                setCurrentStatCHA(currentCharacter.CHA);
                                AsyncStorage.setItem("newCharacter" + currentCharacterName, JSON.stringify(currentCharacter))
                                setAddAbilityScoreConfirmationCount(addAbilityScoreConfirmationCount + 1)
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
                            currentCharacter.athletics = athletics;
                            currentCharacter.acrobatics= acrobatics;
                            currentCharacter.sleightOfHand = sleightOfHand;
                            currentCharacter.stealth = stealth;
                            currentCharacter.arcana = arcana;
                            currentCharacter.history = history;
                            currentCharacter.investigation= investigation;
                            currentCharacter.nature = nature;
                            currentCharacter.religion = religion;
                            currentCharacter.animalHandling = animalHandling;
                            currentCharacter.insight = insight;
                            currentCharacter.medicine = medicine;
                            currentCharacter.perception = perception;
                            currentCharacter.survival = survival;
                            currentCharacter.deception = deception;
                            currentCharacter.intimidation = intimidation;
                            currentCharacter.performance = performance;
                            currentCharacter.persuasion = persuasion;
                            AsyncStorage.setItem("newCharacter" + currentCharacterName, JSON.stringify(currentCharacter))
                            setSkillChangeConfirmationCount(skillChangeConfirmationCount + 1)
                        }}}>
                        <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Finalize Skills</Text>
                    </Pressable>}
                </View>
            </View>





            <View>{AdjustCoreStatSaves(currentCharacter, detectChange)}</View>




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
                            <Text style={styles.confirmationBox}>"{currentCharacterName}"</Text>
                            <Text style={styles.confirmationBox}>Created! {addCharacterConfirmationCount} time(s)!</Text>
                        </Pressable>}
                    {addCharacterBoxDisplayStatus && <Pressable
                        style={styles.toolBoxButton}
                        onPress={() => {if (nameChangeVariable != ""){
                            if (isNaN(parseInt(characterLevelChangeVariable)) ||characterLevelChangeVariable == "" || parseInt(characterLevelChangeVariable) < 0)
                                {characterLevelChangeVariable = "1";}
                            if (parseInt(characterLevelChangeVariable) > 20) {characterLevelChangeVariable = "20";}
                            if (isNaN(parseInt(HPChangeVariable)) || HPChangeVariable == "" || parseInt(HPChangeVariable) < 1){HPChangeVariable = "10";}
                            currentCharacter = new Character(nameChangeVariable, parseInt(HPChangeVariable), parseInt(characterLevelChangeVariable));
                            AsyncStorage.setItem("newCharacter" + nameChangeVariable, JSON.stringify(currentCharacter)).then(()=>{
                                AsyncStorage.setItem("currentCharacterName", currentCharacter.charName).then(()=>{
                                    setDetectChange(true);})})
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
                        }}>Confirmed! Character {currentCharacterName} Deleted <FontAwesome size={28} name="frown-o" color={"red"} /></Text></Pressable>}
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

                {(deleteCharacterBoxDisplayStatus && confirmDelete && (currentCharacterName == deletionName)) && <View>
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
                        if (currentCharacterName == deletionName){
                            currentCharacter = new Character("default", 15, 5);
                            updateAllStatsToNewCharacter();
                            AsyncStorage.setItem("newCharacter" + currentCharacter.charName, JSON.stringify(currentCharacter));
                            AsyncStorage.setItem("currentCharacterName", currentCharacter.charName);
                            setCurrentCharacterName(currentCharacter.charName);
                            setDetectChange(true);
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
