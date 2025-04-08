import { StyleSheet, Text, View, TextInput, Pressable} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState} from "react";
import {Character} from '@/assets/classes/character';
import {FontAwesome, MaterialCommunityIcons} from "@expo/vector-icons";
import newSpellCreationTool from "@/components/newSpellCreationTool";
import AdjustCoreStatSaves from "@/components/adjustCoreStatSaves";
import AttributionSection from "@/components/attributionSection";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";
import headerRandomizer from "@/components/headerRandomizer";
import newAbilityCreationTool from "@/components/newAbilityCreationTool";



let getCurrentCharacterObjectStringPromise = async (string :string|null) => {
    return await AsyncStorage.getItem("newCharacter" + string);
}
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



let headerImage :React.JSX.Element = headerRandomizer();
export default function levelUpTab() {
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();

    let [allCharacterNames, setAllCharacterNames] = useState(allCharacterNamesInitial);

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

    let [addCharacterConfirmationCount, setAddCharacterConfirmationCount] = useState(0);
    let [addHPAdjustConfirmationCount, setAddHPAdjustConfirmationCount] = useState(0);
    let [addSpellandCharacterLevelConfirmationCount, setAddSpellAndCharaterLevelConfirmationCount] = useState(0);
    let [addAbilityScoreConfirmationCount, setAddAbilityScoreConfirmationCount] = useState(0);
    let [loadCharacterConfirmationCount, setLoadCharacterConfirmationCount] = useState(0);
    let [deleteCharacterConfirmationCount, setDeleteCharacterConfirmationCount] = useState(0);







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
                headerImage
            }>
            <View>
                <Text style={{color: "white", fontSize: 30, backgroundColor: "black", textAlign: "center"}}> Max HP: {character.maxHP} </Text>
                <Text style={{color: "white", fontSize: 20, backgroundColor: "black", textAlign: "center"}}> Character Level: {character.characterLevel}</Text>
                <Text style={{color: "white", fontSize: 20, backgroundColor: "black", textAlign: "center"}}> Proficiency Bonus: +{character.proficiency} </Text>
                <Text style={{color: "white", fontSize: 20, backgroundColor: "black", textAlign: "center"}}>Total Spellcasting Level: {character.spellcastingLevel}</Text>
                <Text style={{color: "white", fontSize: 20, backgroundColor: "black", textAlign: "center"}}>Full caster: {character.fullCasterLevel} | Half Caster: {character.halfCasterLevel}</Text>
                {character.warlockCasterLevel > 0 && <Text style={{color: "white", fontSize: 20, backgroundColor: "black", textAlign: "center"}}>Warlock Level: {character.warlockCasterLevel}</Text>}
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
            <View>{newAbilityCreationTool()}</View>


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
                            setAddHPAdjustConfirmationCount(addHPAdjustConfirmationCount + 1);
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
                            if (parseInt(characterLevelChangeVariable) < 1){characterLevelChangeVariable = "0";}
                            if (fullCasterLevelsChangeVariable == "" || isNaN(parseInt(fullCasterLevelsChangeVariable)))
                                {fullCasterLevelsChangeVariable = "" + character.fullCasterLevel;}
                            if (halfCasterLevelsChangeVariable == "" || isNaN(parseInt(halfCasterLevelsChangeVariable)))
                                {halfCasterLevelsChangeVariable = "" + character.halfCasterLevel;}
                            if (warlockCasterLevelsChangeVariable == "" || isNaN(parseInt(warlockCasterLevelsChangeVariable)))
                                {warlockCasterLevelsChangeVariable = "" + character.warlockCasterLevel;}
                            characterUpdater({type: "updateCharLevel", value: parseInt(characterLevelChangeVariable)});
                            characterUpdater({
                                type: "updateAllSpellcasting",
                                fullCaster: parseInt(fullCasterLevelsChangeVariable),
                                halfCaster: parseInt(halfCasterLevelsChangeVariable),
                                warlock: parseInt(warlockCasterLevelsChangeVariable)
                            });
                            setAddSpellAndCharaterLevelConfirmationCount(addSpellandCharacterLevelConfirmationCount + 1);
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
                                setAddAbilityScoreConfirmationCount(addAbilityScoreConfirmationCount + 1);
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
                                setAddAbilityScoreConfirmationCount(addAbilityScoreConfirmationCount + 1);
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
                                setAddAbilityScoreConfirmationCount(addAbilityScoreConfirmationCount + 1);
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
                                setAddAbilityScoreConfirmationCount(addAbilityScoreConfirmationCount + 1);
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
                                setAddAbilityScoreConfirmationCount(addAbilityScoreConfirmationCount + 1);
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
                                setAddAbilityScoreConfirmationCount(addAbilityScoreConfirmationCount + 1);
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
                                    characterUpdater({type: "setAthletics", value: "X"});}}>
                                    {character.athletics == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setAthletics", value: "P"});}}>
                                {character.athletics == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setAthletics", value: "E"});}}>
                                {character.athletics == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable></Text>
                                <Text style={styles.skillBannerPlaceHolder}>not prof---prof----expert</Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setAcrobatics", value: "X"});}}>
                                {character.acrobatics == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setAcrobatics", value: "P"});}}>
                                {character.acrobatics == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setAcrobatics", value: "E"});}}>
                                {character.acrobatics == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setSleightOfHand", value: "X"});}}>
                                        {character.sleightOfHand == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                    </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setSleightOfHand", value: "P"});}}>
                                    {character.sleightOfHand == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setSleightOfHand", value: "E"});}}>
                                    {character.sleightOfHand == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setStealth", value: "X"});}}>
                                        {character.stealth == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                    </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setStealth", value: "P"});}}>
                                    {character.stealth == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setStealth", value: "E"});}}>
                                    {character.stealth == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable></Text>
                                <Text style={styles.skillBannerPlaceHolder}>not prof---prof----expert</Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setArcana", value: "X"});}}>
                                    {character.arcana == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setArcana", value: "P"});}}>
                                    {character.arcana == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setArcana", value: "E"});}}>
                                    {character.arcana == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setHistory", value: "X"});}}>
                                    {character.history == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setHistory", value: "P"});}}>
                                    {character.history == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setHistory", value: "E"});}}>
                                    {character.history == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setInvestigation", value: "X"});}}>
                                    {character.investigation == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setInvestigation", value: "P"});}}>
                                    {character.investigation == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setInvestigation", value: "E"});}}>
                                    {character.investigation == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setNature", value: "X"});}}>
                                    {character.nature == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setNature", value: "P"});}}>
                                    {character.nature == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setNature", value: "E"});}}>
                                    {character.nature == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setReligion", value: "X"});}}>
                                    {character.religion == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setReligion", value: "P"});}}>
                                    {character.religion == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setReligion", value: "E"});}}>
                                    {character.religion == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable></Text>
                                <Text style={styles.skillBannerPlaceHolder}>not prof---prof----expert</Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setAnimalHandling", value: "X"});}}>
                                    {character.animalHandling == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setAnimalHandling", value: "P"});}}>
                                    {character.animalHandling == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setAnimalHandling", value: "E"});}}>
                                    {character.animalHandling == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setInsight", value: "X"});}}>
                                    {character.insight == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setInsight", value: "P"});}}>
                                    {character.insight == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setInsight", value: "E"});}}>
                                    {character.insight == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setMedicine", value: "X"});}}>
                                    {character.medicine == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setMedicine", value: "P"});}}>
                                    {character.medicine == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setMedicine", value: "E"});}}>
                                    {character.medicine == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setPerception", value: "X"});}}>
                                    {character.perception == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setPerception", value: "P"});}}>
                                    {character.perception == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setPerception", value: "E"});}}>
                                    {character.perception == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setSurvival", value: "X"});}}>
                                    {character.survival == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setSurvival", value: "P"});}}>
                                    {character.survival == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setSurvival", value: "E"});}}>
                                    {character.survival == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable></Text>
                                <Text style={styles.skillBannerPlaceHolder}>not prof---prof----expert</Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setDeception", value: "X"});}}>
                                    {character.deception == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setDeception", value: "P"});}}>
                                    {character.deception == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setDeception", value: "E"});}}>
                                    {character.deception == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setIntimidation", value: "X"});}}>
                                    {character.intimidation == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setIntimidation", value: "P"});}}>
                                    {character.intimidation == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setIntimidation", value: "E"});}}>
                                    {character.intimidation == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setPerformance", value: "X"});}}>
                                    {character.performance == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setPerformance", value: "P"});}}>
                                    {character.performance == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setPerformance", value: "E"});}}>
                                    {character.performance == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable></Text>
                                <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setPersuasion", value: "X"});}}>
                                    {character.persuasion == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setPersuasion", value: "P"});}}>
                                    {character.persuasion == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                    characterUpdater({type: "setPersuasion", value: "E"});}}>
                                    {character.persuasion == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                    <Text style={styles.skillsButtonText}> </Text>
                                </Pressable></Text>
                                <Text style={styles.skillBannerPlaceHolder}>not prof---prof----expert</Text>
                            </View>

                        </View>
                    </View>}
                </View>
            </View>





            <View>{AdjustCoreStatSaves()}</View>




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
                            AsyncStorage.setItem("currentCharacterName", nameChangeVariable).then(() => {
                                getAllCharacterNames().then(keysString => {
                                    allCharacterNamesInitial = [];
                                    keysString.forEach((key) => {
                                        if (key.startsWith("newCharacter")) {
                                            allCharacterNamesInitial.push(key.replace("newCharacter", ''))}
                                    });
                                    setAllCharacterNames(allCharacterNamesInitial);
                            })})
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
        </ParallaxScrollView>


    );


}

const styles = StyleSheet.create({
    stepContainer: {
        gap: 8,
        marginBottom: 8,
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
        marginVertical: -2
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
