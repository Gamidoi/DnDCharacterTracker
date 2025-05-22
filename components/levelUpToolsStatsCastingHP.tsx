import { StyleSheet, Text, View, TextInput, Pressable} from 'react-native';
import React, { useState} from "react";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";
import {DisplayCoreStats} from "@/components/displayCoreStats";


export type levelUpToolsStatsChastingHPProps = {
    displayOn: boolean;
}

export default function LevelUpToolsStatsCastingHP({displayOn}: levelUpToolsStatsChastingHPProps) {
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();


    let [addHPAdjustBoxDisplayStatus, SetAddHPAdjustBoxDisplayStatus] = useState(false);
    let [addHPAdjustConfirmationCount, setAddHPAdjustConfirmationCount] = useState(0);
    let [HPChangeVariable, setHPChangeVariable] = useState("");


    let [characterLevelChangeVariable, setCharacterLevelChangeVariable] = useState("");


    let [addSpellAndCharacterLevelBoxDisplayStatus, SetAddSpellAndCharacterLevelBoxDisplayStatus] = useState(false);
    let [warlockCasterLevelsChangeVariable, setWarlockCasterLevelsChangeVariable] = useState("");
    let [fullCasterLevelsChangeVariable, setFullCasterLevelsChangeVariable] = useState("");
    let [halfCasterLevelsChangeVariable, setHalfCasterLevelsChangeVariable] = useState("");
    let [addSpellandCharacterLevelConfirmationCount, setAddSpellAndCharaterLevelConfirmationCount] = useState(0);


    let [abilityScoreChangeVariable, setAbilityScoreChangeVariable] = useState("");
    let [addAbilityScoreBoxDisplayStatus, setAddAbilityScoreBoxDisplayStatus] = useState(false);
    let [addAbilityScoreConfirmationCount, setAddAbilityScoreConfirmationCount] = useState(0);


    function getSpellCastingLevelAsString(){
        let spellLevelString :number = parseInt(fullCasterLevelsChangeVariable) + (parseInt(halfCasterLevelsChangeVariable) / 2);
        if (isNaN(spellLevelString)){
            if (!isNaN(parseInt(fullCasterLevelsChangeVariable))){return (fullCasterLevelsChangeVariable);}
            if (!isNaN(parseInt(halfCasterLevelsChangeVariable))){return ("" + Math.floor(parseInt(halfCasterLevelsChangeVariable) / 2));}
            return "";
        }
        return ("" + spellLevelString);
    }



return(
    <View>{displayOn && <View>

        <View style={styles.toolBoxStyle}>
            <Pressable style={styles.toolBoxStyle} onPress={() =>
            {SetAddHPAdjustBoxDisplayStatus(!addHPAdjustBoxDisplayStatus)}
            }>
                <Text style={{color: "white", textAlign: "center", height: 40, marginTop: 15}}>Max HP</Text>
                {addHPAdjustBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Enter Max HP Below</Text>}
            </Pressable>
            {addHPAdjustBoxDisplayStatus && <View>
                <TextInput
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
                    }}/>
                {addHPAdjustConfirmationCount > 0 &&
                    <Pressable style={styles.confirmationButton} onPress={() => {setAddHPAdjustConfirmationCount(0);}}>
                        <Text style={styles.confirmationBox}>Confirmed! HP Updated</Text>
                        <Text style={styles.confirmationBox}>Max HP = {HPChangeVariable}</Text>
                        <Text style={styles.confirmationBox}>{addHPAdjustConfirmationCount} time(s)!</Text>
                    </Pressable>}
                <Pressable
                    style={[styles.toolBoxButton, {marginBottom: 10}]}
                    onPress={() => {{
                        if (HPChangeVariable == "" || isNaN(parseInt(HPChangeVariable))){HPChangeVariable = "10";}
                        characterUpdater({type: "updateMaxHP", value: parseInt(HPChangeVariable)});
                        setAddHPAdjustConfirmationCount(addHPAdjustConfirmationCount + 1);
                    }}}>
                    <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Adjust Max HP: {HPChangeVariable}</Text>
                </Pressable>
            </View>}
        </View>



        <View style={[styles.toolBoxStyle, {marginTop: 16}]}>
            <Pressable style={styles.toolBoxStyle} onPress={() => {
                SetAddSpellAndCharacterLevelBoxDisplayStatus(!addSpellAndCharacterLevelBoxDisplayStatus);
                setCharacterLevelChangeVariable("");
                setFullCasterLevelsChangeVariable("");
                setHalfCasterLevelsChangeVariable("");
                setWarlockCasterLevelsChangeVariable("");
            }}>
                <Text style={{color: "white", textAlign: "center", height: 40, marginTop: 15}}>Character and Spellcasting Level</Text>
                {addSpellAndCharacterLevelBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Enter Total Character Level of All Classes Below</Text>}
            </Pressable>
            {addSpellAndCharacterLevelBoxDisplayStatus && <View>
                <TextInput
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
                />
                <View style={{flexDirection: "row", maxWidth: 600, alignSelf: "center"}}>
                    <View style={{flex: 0.333}}><Text style={{color: "white", textAlign: "center"}}>Full Caster Levels</Text>
                        <TextInput
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
                        /></View>
                    <View style={{flex: 0.333, marginHorizontal: 15}}><Text style={{color: "white", textAlign: "center"}}>Half Caster Levels</Text>
                        <TextInput
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
                        /></View>
                    <View style={{flex: 0.333}}><Text style={{color: "white", textAlign: "center"}}>Warlock Levels</Text>
                        <TextInput
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
                        /></View>
                </View>
                {addSpellandCharacterLevelConfirmationCount > 0 &&
                    <Pressable style={styles.confirmationButton} onPress={() => {setAddSpellAndCharaterLevelConfirmationCount(0);}}>
                        <Text style={styles.confirmationBox}>Confirmed!</Text>
                        <Text style={styles.confirmationBox}>Character Level: {characterLevelChangeVariable}</Text>
                        <Text style={styles.confirmationBox}>Spellcasting Level: {getSpellCastingLevelAsString()}</Text>
                        <Text style={styles.confirmationBox}>Updated {addSpellandCharacterLevelConfirmationCount} time(s)!</Text>
                    </Pressable>}
                <Pressable
                    style={[styles.toolBoxButton, {marginBottom: 10, marginTop: addSpellandCharacterLevelConfirmationCount < 1 ? 15 : 0}]}
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
                </Pressable>
            </View>}
        </View>


        <View style={[styles.toolBoxStyle, {marginTop: 16}]}>
            <Pressable style={styles.toolBoxStyle} onPress={() => {
                setAddAbilityScoreBoxDisplayStatus(!addAbilityScoreBoxDisplayStatus);
                setAbilityScoreChangeVariable("")
            }}>
                <Text style={{color: "white", textAlign: "center", height: 40, marginTop: 15}}>Ability Scores</Text>
                {addAbilityScoreBoxDisplayStatus && <DisplayCoreStats />}
                {addAbilityScoreBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Enter stat Below</Text>}
            </Pressable>
            {addAbilityScoreBoxDisplayStatus && <View>
                <TextInput
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
                    }}/>
                <View style={{flexDirection: "row", alignSelf: "center"}}>
                    <Pressable
                        style={styles.coreStatAdjustButton}
                        onPress={() => {
                            if (isNaN(parseInt(abilityScoreChangeVariable)) || abilityScoreChangeVariable == ""){
                                abilityScoreChangeVariable = "" + character.STR;
                            }
                            characterUpdater({type: "updateSTR", value: parseInt(abilityScoreChangeVariable)});
                            setAddAbilityScoreConfirmationCount(addAbilityScoreConfirmationCount + 1);
                        }}>
                        <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Adjust  STR: {abilityScoreChangeVariable}</Text>
                    </Pressable>
                    <Pressable
                        style={styles.coreStatAdjustButton}
                        onPress={() => {
                            if (isNaN(parseInt(abilityScoreChangeVariable)) || abilityScoreChangeVariable == ""){
                                abilityScoreChangeVariable = "" + character.DEX;
                            }
                            characterUpdater({type: "updateDEX", value: parseInt(abilityScoreChangeVariable)});
                            setAddAbilityScoreConfirmationCount(addAbilityScoreConfirmationCount + 1);
                        }}>
                        <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Adjust  DEX: {abilityScoreChangeVariable}</Text>
                    </Pressable>
                    <Pressable
                        style={styles.coreStatAdjustButton}
                        onPress={() => {
                            if (isNaN(parseInt(abilityScoreChangeVariable)) || abilityScoreChangeVariable == ""){
                                abilityScoreChangeVariable = "" + character.CON;
                            }
                            characterUpdater({type: "updateCON", value: parseInt(abilityScoreChangeVariable)});
                            setAddAbilityScoreConfirmationCount(addAbilityScoreConfirmationCount + 1);
                        }}>
                        <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Adjust  CON: {abilityScoreChangeVariable}</Text>
                    </Pressable>
                </View>
                <View style={{flexDirection: "row", alignSelf: "center", marginBottom: 8}}>
                    <Pressable
                        style={styles.coreStatAdjustButton}
                        onPress={() => {
                            if (isNaN(parseInt(abilityScoreChangeVariable)) || abilityScoreChangeVariable == ""){
                                abilityScoreChangeVariable = "" + character.INT;
                            }
                            characterUpdater({type: "updateINT", value: parseInt(abilityScoreChangeVariable)});
                            setAddAbilityScoreConfirmationCount(addAbilityScoreConfirmationCount + 1);
                        }}>
                        <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Adjust   INT: {abilityScoreChangeVariable}</Text>
                    </Pressable>
                    <Pressable
                        style={styles.coreStatAdjustButton}
                        onPress={() => {
                            if (isNaN(parseInt(abilityScoreChangeVariable)) || abilityScoreChangeVariable == ""){
                                abilityScoreChangeVariable = "" + character.WIS;
                            }
                            characterUpdater({type: "updateWIS", value: parseInt(abilityScoreChangeVariable)});
                            setAddAbilityScoreConfirmationCount(addAbilityScoreConfirmationCount + 1);
                        }}>
                        <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Adjust  WIS: {abilityScoreChangeVariable}</Text>
                    </Pressable>
                    <Pressable
                        style={styles.coreStatAdjustButton}
                        onPress={() => {
                            if (isNaN(parseInt(abilityScoreChangeVariable)) || abilityScoreChangeVariable == ""){
                                abilityScoreChangeVariable = "" + character.CHA;
                            }
                            characterUpdater({type: "updateCHA", value: parseInt(abilityScoreChangeVariable)});
                            setAddAbilityScoreConfirmationCount(addAbilityScoreConfirmationCount + 1);
                        }}>
                        <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Adjust  CHA: {abilityScoreChangeVariable}</Text>
                    </Pressable>
                </View>
                {addAbilityScoreConfirmationCount > 0 &&
                    <Pressable style={styles.confirmationButton} onPress={() => {setAddAbilityScoreConfirmationCount(0);}}>
                        <Text style={styles.confirmationBox}>Confirmed! Ability Scores Updated</Text>
                        <Text style={styles.confirmationBox}>{addAbilityScoreConfirmationCount} time(s)!</Text>
                    </Pressable>}
            </View>}
        </View>








    </View>}</View>)
    }

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
    },
    confirmationButton: {
        margin: 15,
        backgroundColor: "blue",
        borderRadius: 10,
    },
    confirmationBox: {
        textAlign: "center",
        color: "white",
        fontSize: 18,
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
})