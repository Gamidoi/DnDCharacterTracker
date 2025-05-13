import {StyleSheet, Text, View, Pressable, TextInput} from 'react-native';
import React, {useState} from "react";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";
import headerRandomizer from "@/components/headerRandomizer";
import { getStatMod } from '@/assets/functionLibrary/getCoreStatMod';


let headerImage :React.JSX.Element = headerRandomizer();
export default function TabSkillsSavesRolls() {
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();

    let [currentRollName, setCurrentRollName] = useState("");
    let [currentRollDie1, setCurrentRollDie1] = useState(20);
    let [currentRollDie2, setCurrentRollDie2] = useState(NaN);
    let [currentRollMod, setCurrentRollMod] = useState(0);
    let [customProficiency, setCustomProficiency] = useState("X");
    let [customModifier, setCustomModifier] = useState("");
    let [customModifierPosNeg, setCustomModifierPosNeg] = useState("+");

    let [toggleAdvantage, setToggleAdvantage] = useState(false);
    let [toggleDisadvantage, setToggleDisadvantage] = useState(false);

    function rollDisplay() {
        return(
            <View>
                <Text style={{
                    color: "white",
                    backgroundColor: "black",
                    fontSize: 26,
                    textAlign: "center"
                }}>Current Roll: {currentRollName}</Text>
                <View style={{backgroundColor: 'black', flexDirection: "row", alignSelf: "center", marginLeft: 20}}>
                    {currentRollDie1 === 1 && <Text style={styles.dice20Unnatural}>{currentRollDie1}</Text>}
                    {(currentRollDie1 < 6 && currentRollDie1 > 1) && <Text style={styles.dice20bad}>{currentRollDie1}</Text>}
                    {(currentRollDie1 < 11 && currentRollDie1 > 5) && <Text style={styles.dice20poor}>{currentRollDie1}</Text>}
                    {(currentRollDie1 < 16 && currentRollDie1 > 10) && <Text style={styles.dice20ok}>{currentRollDie1}</Text>}
                    {(currentRollDie1 < 20 && currentRollDie1 > 15) && <Text style={styles.dice20great}>{currentRollDie1}</Text>}
                    {currentRollDie1 === 20 && <Text style={styles.dice20Natural}>{currentRollDie1}</Text>}

                    {currentRollDie2 === 1 && <Text style={styles.dice20Unnatural}>{currentRollDie2}</Text>}
                    {(currentRollDie2 < 6 && currentRollDie2 > 1) && <Text style={styles.dice20bad}>{currentRollDie2}</Text>}
                    {(currentRollDie2 < 11 && currentRollDie2 > 5) && <Text style={styles.dice20poor}>{currentRollDie2}</Text>}
                    {(currentRollDie2 < 16 && currentRollDie2 > 10) && <Text style={styles.dice20ok}>{currentRollDie2}</Text>}
                    {(currentRollDie2 < 20 && currentRollDie2 > 15) && <Text style={styles.dice20great}>{currentRollDie2}</Text>}
                    {currentRollDie2 === 20 && <Text style={styles.dice20Natural}>{currentRollDie2}</Text>}

                    <View style={{flex: 0.4}}>
                        <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Mod for</Text>
                        <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>current Roll</Text>
                        <Text style={{color: "white", fontSize: 30, textAlign: "center"}}>{currentRollMod > 0 && "+"}{currentRollMod}</Text>
                    </View>
                    <Text style={{fontSize: 50, color: "white", marginTop: 16, flex: 0.2}}>=</Text>
                    <Text style={{
                        fontSize: 25,
                        color: "white",
                        marginTop: 14,
                        flex: 0.40,
                        width: 40,
                        borderColor: "orange",
                        borderWidth: 3,
                        borderRadius: 15,
                        textAlign: "center",
                        textAlignVertical: "center",
                    }}>
                        {currentRollResult(currentRollMod, currentRollDie1, currentRollDie2, toggleAdvantage)}
                    </Text>
                </View>
            </View>
    )}

    function toggleAdvantagebutttons() {
        return(
            <View style={{
                marginTop: 10,
                backgroundColor: 'blue',
                flexDirection: "row",
                paddingTop: 5,
                paddingBottom: 5,
                borderRadius: 16,
            }}>
                <Pressable  style={styles.toggleAdv} onPress={()=> {
                    setToggleAdvantage(!toggleAdvantage);
                    setToggleDisadvantage(false);
                    if (!toggleAdvantage) {
                        setCurrentRollDie2(20);
                        setCurrentRollName("Toggled Advantage 'on'");}
                    else {
                        setCurrentRollDie2(NaN);
                        setCurrentRollName("Toggled Advantage 'off'")}
                }}> <Text style={{color: "white", fontSize: 17, textAlign: "center"}}>Toggle Advantage: {toggleAdvantage && "On"}{!toggleAdvantage && "Off"}</Text>
                </Pressable>
                <Pressable style={styles.toggleAdv} onPress={()=> {
                    setToggleDisadvantage(!toggleDisadvantage);
                    setToggleAdvantage(false);
                    if (!toggleDisadvantage) {
                        setCurrentRollDie2(1);
                        setCurrentRollName("Toggled Disadvantage 'on'")}
                    else {
                        setCurrentRollDie2(NaN);
                        setCurrentRollName("Toggled Disadvantage 'off'")}
                }}> <Text style={{color: "white", fontSize: 17, textAlign: "center"}}>Toggle Disadvantage: {toggleDisadvantage && "On"}{!toggleDisadvantage && "Off"}</Text>
                </Pressable>
            </View>
        )}

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#60D0D0', dark: '#353636' }}
            headerImage={
                headerImage
            }>

            {rollDisplay()}

            {toggleAdvantagebutttons()}



            <View style={{backgroundColor: 'orange', flexDirection: "row"}}>
                <Pressable style={[styles.coreSkillBoxes, {backgroundColor: "maroon"}]} onPress={()=> {
                    setCurrentRollMod(getStatMod(character.STR));
                    setCurrentRollDie1(rollD20());
                    setCurrentRollName("flat STR");
                    if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                }}>
                    <Text style={styles.coreStatText}>STR</Text>
                    <Text style={styles.coreStatText}>{character.STR}</Text>
                    <Text style={styles.coreStatText}>{getStatMod(character.STR) > 0 && "+"}{getStatMod(character.STR)}</Text>
                </Pressable>
                <Pressable style={[styles.coreSkillBoxes, {backgroundColor: "green"}]} onPress={()=> {
                    setCurrentRollMod(getStatMod(character.DEX));
                    setCurrentRollDie1(rollD20());
                    setCurrentRollName("flat DEX");
                    if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                }}>
                    <Text style={styles.coreStatText}>DEX</Text>
                    <Text style={styles.coreStatText}>{character.DEX}</Text>
                    <Text style={styles.coreStatText}>{getStatMod(character.DEX) > 0 && "+"}{getStatMod(character.DEX)}</Text>
                </Pressable>
                <Pressable style={styles.coreSkillBoxes} onPress={()=> {
                    setCurrentRollMod(getStatMod(character.CON));
                    setCurrentRollDie1(rollD20());
                    setCurrentRollName("flat CON");
                    if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                }}>
                    <Text style={styles.coreStatText}>CON</Text>
                    <Text style={styles.coreStatText}>{character.CON}</Text>
                    <Text style={styles.coreStatText}>{getStatMod(character.CON) > 0 && "+"}{getStatMod(character.CON)}</Text>
                </Pressable>
                <Pressable style={[styles.coreSkillBoxes, {backgroundColor: "blue"}]} onPress={()=> {
                    setCurrentRollMod(getStatMod(character.INT));
                    setCurrentRollDie1(rollD20());
                    setCurrentRollName("flat INT");
                    if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                }}>
                    <Text style={styles.coreStatText}>INT</Text>
                    <Text style={styles.coreStatText}>{character.INT}</Text>
                    <Text style={styles.coreStatText}>{getStatMod(character.INT) > 0 && "+"}{getStatMod(character.INT)}</Text>
                </Pressable>
                <Pressable style={[styles.coreSkillBoxes, {backgroundColor: "purple"}]} onPress={()=> {
                    setCurrentRollMod(getStatMod(character.WIS));
                    setCurrentRollDie1(rollD20());
                    setCurrentRollName("flat WIS");
                    if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                }}>
                    <Text style={styles.coreStatText}>WIS</Text>
                    <Text style={styles.coreStatText}>{character.WIS}</Text>
                    <Text style={styles.coreStatText}>{getStatMod(character.WIS) > 0 && "+"}{getStatMod(character.WIS)}</Text>
                </Pressable>
                <Pressable style={[styles.coreSkillBoxes, {backgroundColor: "red"}]} onPress={()=> {
                    setCurrentRollMod(getStatMod(character.CHA));
                    setCurrentRollDie1(rollD20());
                    setCurrentRollName("flat CHA");
                    if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                }}>
                    <Text style={styles.coreStatText}>CHA</Text>
                    <Text style={styles.coreStatText}>{character.CHA}</Text>
                    <Text style={styles.coreStatText}>{getStatMod(character.CHA) > 0 && "+"}{getStatMod(character.CHA)}</Text>
                </Pressable>
            </View>

            <View style={{marginTop: -16, backgroundColor: 'orange', flexDirection: "row"}}>
                <Pressable style={[styles.coreSkillBoxes, {backgroundColor: "maroon"}]} onPress={()=> {
                    setCurrentRollMod(getStatMod(character.STR));
                    if (character.STRSaveProf) {setCurrentRollMod((getStatMod(character.STR) + character.proficiency));}
                    setCurrentRollDie1(rollD20());
                    setCurrentRollName("STR Save");
                    if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                }}>
                    {!character.STRSaveProf && <Text style={{fontSize: 7}}> </Text>}
                    <Text style={styles.coreStatText}>Save</Text>
                    {!character.STRSaveProf && <Text style={styles.coreStatText}>{getStatMod(character.STR) > 0 && "+"}{getStatMod(character.STR)}</Text>}
                    {character.STRSaveProf && <Text style={styles.coreStatText}>{getStatMod(character.STR) + character.proficiency > 0 && "+"}{getStatMod(character.STR) + character.proficiency}</Text>}
                    {character.STRSaveProf && <Text style={styles.coreStatText}>Prof</Text>}
                    {!character.STRSaveProf && <Text style={{fontSize: 7}}> </Text>}

                </Pressable>
                <Pressable style={[styles.coreSkillBoxes, {backgroundColor: "green"}]} onPress={()=> {
                    setCurrentRollMod(getStatMod(character.DEX));
                    if (character.DEXSaveProf) {setCurrentRollMod(getStatMod(character.DEX) + character.proficiency);}
                    setCurrentRollDie1(rollD20());
                    setCurrentRollName("DEX Save");
                    if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                }}>
                    {!character.DEXSaveProf && <Text style={{fontSize: 7}}> </Text>}
                    <Text style={styles.coreStatText}>Save</Text>
                    {!character.DEXSaveProf && <Text style={styles.coreStatText}>{getStatMod(character.DEX) > 0 && "+"}{getStatMod(character.DEX)}</Text>}
                    {character.DEXSaveProf && <Text style={styles.coreStatText}>{getStatMod(character.DEX) + character.proficiency > 0 && "+"}{getStatMod(character.DEX) + character.proficiency}</Text>}
                    {character.DEXSaveProf && <Text style={styles.coreStatText}>Prof</Text>}
                    {!character.DEXSaveProf && <Text style={{fontSize: 7}}> </Text>}
                </Pressable>
                <Pressable style={styles.coreSkillBoxes} onPress={()=> {
                    setCurrentRollMod(getStatMod(character.CON));
                    if (character.CONSaveProf) {setCurrentRollMod(getStatMod(character.CON) + character.proficiency);}
                    setCurrentRollDie1(rollD20());
                    setCurrentRollName("CON Save");
                    if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                }}>
                    {!character.CONSaveProf && <Text style={{fontSize: 7}}> </Text>}
                    <Text style={styles.coreStatText}>Save</Text>
                    {!character.CONSaveProf && <Text style={styles.coreStatText}>{getStatMod(character.CON) > 0 && "+"}{getStatMod(character.CON)}</Text>}
                    {character.CONSaveProf && <Text style={styles.coreStatText}>{getStatMod(character.CON) + character.proficiency > 0 && "+"}{getStatMod(character.CON) + character.proficiency}</Text>}
                    {character.CONSaveProf && <Text style={styles.coreStatText}>Prof</Text>}
                    {!character.CONSaveProf && <Text style={{fontSize: 7}}> </Text>}
                </Pressable>
                <Pressable style={[styles.coreSkillBoxes, {backgroundColor: "blue"}]} onPress={()=> {
                    setCurrentRollMod(getStatMod(character.INT));
                    if (character.INTSaveProf) {setCurrentRollMod(getStatMod(character.INT) + character.proficiency);}
                    setCurrentRollDie1(rollD20());
                    setCurrentRollName("INT Save");
                    if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                }}>
                    {!character.INTSaveProf && <Text style={{fontSize: 7}}> </Text>}
                    <Text style={styles.coreStatText}>Save</Text>
                    {!character.INTSaveProf && <Text style={styles.coreStatText}>{getStatMod(character.INT) > 0 && "+"}{getStatMod(character.INT)}</Text>}
                    {character.INTSaveProf && <Text style={styles.coreStatText}>{getStatMod(character.INT) + character.proficiency > 0 && "+"}{getStatMod(character.INT) + character.proficiency}</Text>}
                    {character.INTSaveProf && <Text style={styles.coreStatText}>Prof</Text>}
                    {!character.INTSaveProf && <Text style={{fontSize: 7}}> </Text>}
                </Pressable>
                <Pressable style={[styles.coreSkillBoxes, {backgroundColor: "purple"}]} onPress={()=> {
                    setCurrentRollMod(getStatMod(character.WIS));
                    if (character.WISSaveProf) {setCurrentRollMod(getStatMod(character.WIS) + character.proficiency);}
                    setCurrentRollDie1(rollD20());
                    setCurrentRollName("WIS Save");
                    if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                }}>
                    {!character.WISSaveProf && <Text style={{fontSize: 7}}> </Text>}
                    <Text style={styles.coreStatText}>Save</Text>
                    {!character.WISSaveProf && <Text style={styles.coreStatText}>{getStatMod(character.WIS) > 0 && "+"}{getStatMod(character.WIS)}</Text>}
                    {character.WISSaveProf && <Text style={styles.coreStatText}>{getStatMod(character.WIS) + character.proficiency > 0 && "+"}{getStatMod(character.WIS) + character.proficiency}</Text>}
                    {character.WISSaveProf && <Text style={styles.coreStatText}>Prof</Text>}
                    {!character.WISSaveProf && <Text style={{fontSize: 7}}> </Text>}
                </Pressable>
                <Pressable style={[styles.coreSkillBoxes, {backgroundColor: "red"}]} onPress={()=> {
                    setCurrentRollMod(getStatMod(character.CHA));
                    if (character.CHASaveProf) {setCurrentRollMod(getStatMod(character.CHA) + character.proficiency);}
                    setCurrentRollDie1(rollD20());
                    setCurrentRollName("CHA Save");
                    if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                }}>
                    {!character.CHASaveProf && <Text style={{fontSize: 7}}> </Text>}
                    <Text style={styles.coreStatText}>Save</Text>
                    {!character.CHASaveProf && <Text style={styles.coreStatText}>{getStatMod(character.CHA) > 0 && "+"}{getStatMod(character.CHA)}</Text>}
                    {character.CHASaveProf && <Text style={styles.coreStatText}>{getStatMod(character.CHA) + character.proficiency > 0 && "+"}{getStatMod(character.CHA) + character.proficiency}</Text>}
                    {character.CHASaveProf && <Text style={styles.coreStatText}>Prof</Text>}
                    {!character.CHASaveProf && <Text style={{fontSize: 7}}> </Text>}
                </Pressable>
            </View>

            {rollDisplay()}

            <Text style={styles.subHeaderLabel}>Proficiency {character.proficiency}</Text>
            <View style={{flexDirection: "row"}}>
                <View style={styles.skillRollColumn}>
                    <Pressable style={[styles.skillBoxes, {backgroundColor: "green"}]} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (character.stealth == "P") {proficiencyBonus = character.proficiency;}
                        if (character.stealth == "E") {proficiencyBonus = (2 * character.proficiency);}
                        setCurrentRollMod(getStatMod(character.DEX) + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Stealth");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                    <Text style={styles.coreStatText}>Stealth</Text>
                        {character.stealth == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.DEX) > 0 && "+"}{getStatMod(character.DEX)}</Text></View>}
                        {character.stealth == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.DEX) + character.proficiency > 0 && "+"}{getStatMod(character.DEX) + character.proficiency}</Text></View>}
                        {character.stealth == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.DEX) + (2 * character.proficiency) > 0 && "+"}{getStatMod(character.DEX) + (2 * character.proficiency)}</Text></View>}
                    </Pressable>
                    <Pressable style={[styles.skillBoxes, {backgroundColor: "maroon"}]} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (character.athletics == "P") {proficiencyBonus = character.proficiency;}
                        if (character.athletics == "E") {proficiencyBonus = (2 * character.proficiency);}
                        setCurrentRollMod(getStatMod(character.STR) + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Athletics");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                    <Text style={styles.coreStatText}>Athletics</Text>
                        {character.athletics == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.STR) > 0 && "+"}{getStatMod(character.STR)}</Text></View>}
                        {character.athletics == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.STR) + character.proficiency > 0 && "+"}{getStatMod(character.STR) + character.proficiency}</Text></View>}
                        {character.athletics == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.STR) + (2 * character.proficiency) > 0 && "+"}{getStatMod(character.STR) + (2 * character.proficiency)}</Text></View>}
                    </Pressable>
                    <Pressable style={[styles.skillBoxes, {backgroundColor: "red"}]} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (character.deception == "P") {proficiencyBonus = character.proficiency;}
                        if (character.deception == "E") {proficiencyBonus = (2 * character.proficiency);}
                        setCurrentRollMod(getStatMod(character.CHA) + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Deception");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Deception</Text>
                        {character.deception == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.CHA) > 0 && "+"}{getStatMod(character.CHA)}</Text></View>}
                        {character.deception == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.CHA) + character.proficiency > 0 && "+"}{getStatMod(character.CHA) + character.proficiency}</Text></View>}
                        {character.deception == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.CHA) + (2 * character.proficiency) > 0 && "+"}{getStatMod(character.CHA) + (2 * character.proficiency)}</Text></View>}
                    </Pressable>
                    <Pressable style={[styles.skillBoxes, {backgroundColor: "red"}]} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (character.intimidation == "P") {proficiencyBonus = character.proficiency;}
                        if (character.intimidation == "E") {proficiencyBonus = (2 * character.proficiency);}
                        setCurrentRollMod(getStatMod(character.CHA) + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Intimidation");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Intimidation</Text>
                        {character.intimidation == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.CHA) > 0 && "+"}{getStatMod(character.CHA)}</Text></View>}
                        {character.intimidation == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.CHA) + character.proficiency > 0 && "+"}{getStatMod(character.CHA) + character.proficiency}</Text></View>}
                        {character.intimidation == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.CHA) + (2 * character.proficiency) > 0 && "+"}{getStatMod(character.CHA) + (2 * character.proficiency)}</Text></View>}
                    </Pressable>
                    <Pressable style={[styles.skillBoxes, {backgroundColor: "red"}]} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (character.performance == "P") {proficiencyBonus = character.proficiency;}
                        if (character.performance == "E") {proficiencyBonus = (2 * character.proficiency);}
                        setCurrentRollMod(getStatMod(character.CHA) + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Performance");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Performance</Text>
                        {character.performance == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.CHA) > 0 && "+"}{getStatMod(character.CHA)}</Text></View>}
                        {character.performance == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.CHA) + character.proficiency > 0 && "+"}{getStatMod(character.CHA) + character.proficiency}</Text></View>}
                        {character.performance == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.CHA) + (2 * character.proficiency) > 0 && "+"}{getStatMod(character.CHA) + (2 * character.proficiency)}</Text></View>}
                    </Pressable>
                    <Pressable style={[styles.skillBoxes, {backgroundColor: "red"}]} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (character.persuasion == "P") {proficiencyBonus = character.proficiency;}
                        if (character.persuasion == "E") {proficiencyBonus = (2 * character.proficiency);}
                        setCurrentRollMod(getStatMod(character.CHA) + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Persuasion");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Persuasion</Text>
                        {character.persuasion == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.CHA) > 0 && "+"}{getStatMod(character.CHA)}</Text></View>}
                        {character.persuasion == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.CHA) + character.proficiency > 0 && "+"}{getStatMod(character.CHA) + character.proficiency}</Text></View>}
                        {character.persuasion == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.CHA) + (2 * character.proficiency) > 0 && "+"}{getStatMod(character.CHA) + (2 * character.proficiency)}</Text></View>}
                    </Pressable>
                </View>
                <View style={styles.skillRollColumn}>
                    <Pressable style={[styles.skillBoxes, {backgroundColor: "green"}]} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (character.acrobatics == "P") {proficiencyBonus = character.proficiency;}
                        if (character.acrobatics == "E") {proficiencyBonus = (2 * character.proficiency);}
                        setCurrentRollMod(getStatMod(character.DEX) + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Acrobatics");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Acrobatics</Text>
                        {character.acrobatics == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.DEX) > 0 && "+"}{getStatMod(character.DEX)}</Text></View>}
                        {character.acrobatics == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.DEX) + character.proficiency > 0 && "+"}{getStatMod(character.DEX) + character.proficiency}</Text></View>}
                        {character.acrobatics == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.DEX) + (2 * character.proficiency) > 0 && "+"}{getStatMod(character.DEX) + (2 * character.proficiency)}</Text></View>}
                    </Pressable>
                    <Pressable style={[styles.skillBoxes, {backgroundColor: "blue"}]} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (character.arcana == "P") {proficiencyBonus = character.proficiency;}
                        if (character.arcana == "E") {proficiencyBonus = (2 * character.proficiency);}
                        setCurrentRollMod(getStatMod(character.INT) + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Arcana");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Arcana</Text>
                        {character.arcana == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.INT) > 0 && "+"}{getStatMod(character.INT)}</Text></View>}
                        {character.arcana == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.INT) + character.proficiency > 0 && "+"}{getStatMod(character.INT) + character.proficiency}</Text></View>}
                        {character.arcana == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.INT) + (2 * character.proficiency) > 0 && "+"}{getStatMod(character.INT) + (2 * character.proficiency)}</Text></View>}
                    </Pressable>
                    <Pressable style={[styles.skillBoxes, {backgroundColor: "blue"}]} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (character.history == "P") {proficiencyBonus = character.proficiency;}
                        if (character.history == "E") {proficiencyBonus = (2 * character.proficiency);}
                        setCurrentRollMod(getStatMod(character.INT) + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("History");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>History</Text>
                        {character.history == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.INT) > 0 && "+"}{getStatMod(character.INT)}</Text></View>}
                        {character.history == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.INT) + character.proficiency > 0 && "+"}{getStatMod(character.INT) + character.proficiency}</Text></View>}
                        {character.history == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.INT) + (2 * character.proficiency) > 0 && "+"}{getStatMod(character.INT) + (2 * character.proficiency)}</Text></View>}
                    </Pressable>
                    <Pressable style={[styles.skillBoxes, {backgroundColor: "blue"}]} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (character.investigation == "P") {proficiencyBonus = character.proficiency;}
                        if (character.investigation == "E") {proficiencyBonus = (2 * character.proficiency);}
                        setCurrentRollMod(getStatMod(character.INT) + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Investigation");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Investigation</Text>
                        {character.investigation == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.INT) > 0 && "+"}{getStatMod(character.INT)}</Text></View>}
                        {character.investigation == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.INT) + character.proficiency > 0 && "+"}{getStatMod(character.INT) + character.proficiency}</Text></View>}
                        {character.investigation == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.INT) + (2 * character.proficiency) > 0 && "+"}{getStatMod(character.INT) + (2 * character.proficiency)}</Text></View>}
                    </Pressable>
                    <Pressable style={[styles.skillBoxes, {backgroundColor: "blue"}]} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (character.nature == "P") {proficiencyBonus = character.proficiency;}
                        if (character.nature == "E") {proficiencyBonus = (2 * character.proficiency);}
                        setCurrentRollMod(getStatMod(character.INT) + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Nature");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Nature</Text>
                        {character.nature == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.INT) > 0 && "+"}{getStatMod(character.INT)}</Text></View>}
                        {character.nature == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.INT) + character.proficiency > 0 && "+"}{getStatMod(character.INT) + character.proficiency}</Text></View>}
                        {character.nature == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.INT) + (2 * character.proficiency) > 0 && "+"}{getStatMod(character.INT) + (2 * character.proficiency)}</Text></View>}
                    </Pressable>
                    <Pressable style={[styles.skillBoxes, {backgroundColor: "blue"}]} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (character.religion == "P") {proficiencyBonus = character.proficiency;}
                        if (character.religion == "E") {proficiencyBonus = (2 * character.proficiency);}
                        setCurrentRollMod(getStatMod(character.INT) + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Religion");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Religion</Text>
                        {character.religion == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.INT) > 0 && "+"}{getStatMod(character.INT)}</Text></View>}
                        {character.religion == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.INT) + character.proficiency > 0 && "+"}{getStatMod(character.INT) + character.proficiency}</Text></View>}
                        {character.religion == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.INT) + (2 * character.proficiency) > 0 && "+"}{getStatMod(character.INT) + (2 * character.proficiency)}</Text></View>}
                    </Pressable>
                </View>
                <View style={styles.skillRollColumn}>
                    <Pressable style={[styles.skillBoxes, {backgroundColor: "green"}]} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (character.sleightOfHand == "P") {proficiencyBonus = character.proficiency;}
                        if (character.sleightOfHand == "E") {proficiencyBonus = (2 * character.proficiency);}
                        setCurrentRollMod(getStatMod(character.DEX) + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Sleight of Hand");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Sleight of Hand</Text>
                        {character.sleightOfHand == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.DEX) > 0 && "+"}{getStatMod(character.DEX)}</Text></View>}
                        {character.sleightOfHand == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.DEX) + character.proficiency > 0 && "+"}{getStatMod(character.DEX) + character.proficiency}</Text></View>}
                        {character.sleightOfHand == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.DEX) + (2 * character.proficiency) > 0 && "+"}{getStatMod(character.DEX) + (2 * character.proficiency)}</Text></View>}
                    </Pressable>
                    <Pressable style={[styles.skillBoxes, {backgroundColor: "purple"}]} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (character.animalHandling == "P") {proficiencyBonus = character.proficiency;}
                        if (character.animalHandling == "E") {proficiencyBonus = (2 * character.proficiency);}
                        setCurrentRollMod(getStatMod(character.WIS) + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Animal Handling");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Animal Handling</Text>
                        {character.animalHandling == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.WIS) > 0 && "+"}{getStatMod(character.WIS)}</Text></View>}
                        {character.animalHandling == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.WIS) + character.proficiency > 0 && "+"}{getStatMod(character.WIS) + character.proficiency}</Text></View>}
                        {character.animalHandling == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.WIS) + (2 * character.proficiency) > 0 && "+"}{getStatMod(character.WIS) + (2 * character.proficiency)}</Text></View>}
                    </Pressable>
                    <Pressable style={[styles.skillBoxes, {backgroundColor: "purple"}]} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (character.insight == "P") {proficiencyBonus = character.proficiency;}
                        if (character.insight == "E") {proficiencyBonus = (2 * character.proficiency);}
                        setCurrentRollMod(getStatMod(character.WIS) + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Insight");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Insight</Text>
                        {character.insight == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.WIS) > 0 && "+"}{getStatMod(character.WIS)}</Text></View>}
                        {character.insight == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.WIS) + character.proficiency > 0 && "+"}{getStatMod(character.WIS) + character.proficiency}</Text></View>}
                        {character.insight == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.WIS) + (2 * character.proficiency) > 0 && "+"}{getStatMod(character.WIS) + (2 * character.proficiency)}</Text></View>}
                    </Pressable>
                    <Pressable style={[styles.skillBoxes, {backgroundColor: "purple"}]} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (character.medicine == "P") {proficiencyBonus = character.proficiency;}
                        if (character.medicine == "E") {proficiencyBonus = (2 * character.proficiency);}
                        setCurrentRollMod(getStatMod(character.WIS) + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Medicine");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Medicine</Text>
                        {character.medicine == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.WIS) > 0 && "+"}{getStatMod(character.WIS)}</Text></View>}
                        {character.medicine == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.WIS) + character.proficiency > 0 && "+"}{getStatMod(character.WIS) + character.proficiency}</Text></View>}
                        {character.medicine == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.WIS) + (2 * character.proficiency) > 0 && "+"}{getStatMod(character.WIS) + (2 * character.proficiency)}</Text></View>}
                    </Pressable>
                    <Pressable style={[styles.skillBoxes, {backgroundColor: "purple"}]} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (character.perception == "P") {proficiencyBonus = character.proficiency;}
                        if (character.perception == "E") {proficiencyBonus = (2 * character.proficiency);}
                        setCurrentRollMod(getStatMod(character.WIS) + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Perception");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Perception</Text>
                        {character.perception == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.WIS) > 0 && "+"}{getStatMod(character.WIS)}</Text></View>}
                        {character.perception == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.WIS) + character.proficiency > 0 && "+"}{getStatMod(character.WIS) + character.proficiency}</Text></View>}
                        {character.perception == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.WIS) + (2 * character.proficiency) > 0 && "+"}{getStatMod(character.WIS) + (2 * character.proficiency)}</Text></View>}
                    </Pressable>
                    <Pressable style={[styles.skillBoxes, {backgroundColor: "purple"}]} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (character.survival == "P") {proficiencyBonus = character.proficiency;}
                        if (character.survival == "E") {proficiencyBonus = (2 * character.proficiency);}
                        setCurrentRollMod(getStatMod(character.WIS) + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Survival");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Survival</Text>
                        {character.survival == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.WIS) > 0 && "+"}{getStatMod(character.WIS)}</Text></View>}
                        {character.survival == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.WIS) + character.proficiency > 0 && "+"}{getStatMod(character.WIS) + character.proficiency}</Text></View>}
                        {character.survival == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{getStatMod(character.WIS) + (2 * character.proficiency) > 0 && "+"}{getStatMod(character.WIS) + (2 * character.proficiency)}</Text></View>}
                    </Pressable>
                </View>
            </View>

            {toggleAdvantagebutttons()}

            {rollDisplay()}

            <Text style={styles.subHeaderLabel}>Custom Roll</Text>
            <View style={{flexDirection: "row", alignSelf: "center"}}>
                <Text style={[styles.subHeaderLabel, {textAlignVertical: "center"}]}>d20 +  </Text>
                <Pressable onPress={() => {
                    if (customProficiency == "X"){setCustomProficiency("P")}
                    else if (customProficiency == "P"){setCustomProficiency("E")}
                    else {setCustomProficiency("X")}
                }}>
                    {customProficiency == "P" && <Text style={[styles.customToggleProfOn, {paddingTop: 5, borderTopLeftRadius: 8, borderTopRightRadius: 8}]}>Proficient</Text>}
                    {customProficiency != "P" && <Text style={[styles.customToggleProfOff, {paddingTop: 5, borderTopLeftRadius: 8, borderTopRightRadius: 8}]}>Proficient</Text>}
                    {customProficiency == "E" && <Text style={[styles.customToggleProfOn, {paddingBottom: 5, borderBottomLeftRadius: 8, borderBottomRightRadius: 8}]}>Expert</Text>}
                    {customProficiency != "E" && <Text style={[styles.customToggleProfOff, {paddingBottom: 5, borderBottomLeftRadius: 8, borderBottomRightRadius: 8}]}>Expert</Text>}
                </Pressable>
                <Pressable  style={{marginHorizontal: 15}} onPress={() => {
                    if (customModifierPosNeg == "+"){setCustomModifierPosNeg("-")}
                    else {setCustomModifierPosNeg("+")}
                }}>
                    {customModifierPosNeg == "+" && <Text style={[styles.customToggleProfOn, {paddingTop: 5, borderTopLeftRadius: 8, borderTopRightRadius: 8}]}> + </Text>}
                    {customModifierPosNeg != "+" && <Text style={[styles.customToggleProfOff, {paddingTop: 5, borderTopLeftRadius: 8, borderTopRightRadius: 8}]}> + </Text>}
                    {customModifierPosNeg == "-" && <Text style={[styles.customToggleProfOn, {paddingBottom: 5, borderBottomLeftRadius: 8, borderBottomRightRadius: 8}]}> - </Text>}
                    {customModifierPosNeg != "-" && <Text style={[styles.customToggleProfOff, {paddingBottom: 5, borderBottomLeftRadius: 8, borderBottomRightRadius: 8}]}> - </Text>}
                </Pressable>
                <TextInput
                    onChangeText={setCustomModifier}
                    placeholder={"0"}
                    keyboardType={"numeric"}
                    maxLength={2}
                    placeholderTextColor={"grey"}
                    style={{
                        fontSize: 22,
                        borderStyle: "solid",
                        borderWidth: 3,
                        borderColor: "white",
                        width: 80,
                        padding: 0,
                        margin: 1,
                        alignSelf: "center",
                        color: "white",
                        textAlign: "center"}}
                />
            </View>
            <Pressable style={{
                backgroundColor: "maroon",
                borderColor: "orange",
                borderWidth: 4,
                borderRadius: 20,
                width: 300,
                alignSelf: "center",
                }}
                onPress={() => {
                    let proficiencyBonus = 0;
                    if (customProficiency == "P") {proficiencyBonus = character.proficiency;}
                    if (customProficiency == "E") {proficiencyBonus = (2 * character.proficiency);}
                    if (isNaN(parseInt(customModifier))) {customModifier = "0";}
                    let posOrNeg = 1;
                    if (customModifierPosNeg == "-") {posOrNeg = -1;}
                    setCurrentRollMod((parseInt(customModifier) * posOrNeg) + proficiencyBonus);
                    setCurrentRollDie1(rollD20());
                    setCurrentRollName("Custom Roll");
                    if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                }}>
                <Text style={styles.subHeaderLabel}>Roll Custom</Text>
            </Pressable>




        </ParallaxScrollView>)
}
const styles = StyleSheet.create({
    headImage: {
        height: "100%",
        width: "100%",
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    skillBoxes: {
        flex: 10,
        color: "white",
        margin: 3,
        borderRadius: 4,
    },
    coreSkillBoxes: {
        flex: 10,
        color: "white",
        backgroundColor: "teal",
        margin: 3,
        borderRadius: 6,
        alignSelf: "center",
    },
    coreStatText: {
        color: "white",
        textAlign: "center",
    },
    dice20bad: {
        backgroundColor: "red",
        color: "black",
        margin: 10,
        padding: 20,
        borderRadius: 30,
        alignSelf: "center",
        textAlign: "center",
        width: 65,
    },
    dice20poor: {
        backgroundColor: "yellow",
        color: "black",
        margin: 10,
        padding: 20,
        borderRadius: 30,
        alignSelf: "center",
        textAlign: "center",
        width: 65,
    },
    dice20ok: {
        backgroundColor: "green",
        color: "black",
        margin: 10,
        padding: 20,
        borderRadius: 30,
        alignSelf: "center",
        textAlign: "center",
        width: 65,
    },
    dice20great: {
        backgroundColor: "blue",
        color: "white",
        margin: 10,
        padding: 20,
        borderRadius: 30,
        alignSelf: "center",
        textAlign: "center",
        width: 65,
    },
    dice20Natural: {
        backgroundColor: "white",
        color: "black",
        margin: 10,
        padding: 20,
        borderRadius: 30,
        alignSelf: "center",
        textAlign: "center",
        width: 70,
        borderStyle: "dashed",
        borderColor: "yellow",
        borderWidth: 6,
    },
    dice20Unnatural: {
        backgroundColor: "black",
        color: "red",
        margin: 10,
        padding: 20,
        borderRadius: 30,
        alignSelf: "center",
        textAlign: "center",
        width: 70,
        borderStyle: "dotted",
        borderColor: "red",
        borderWidth: 6,
    },
    toggleAdv: {
        backgroundColor: "teal",
        margin: 3,
        flex: 0.5,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 10,
        alignItems: "center",
    },
    skillRollColumn: {
        flex: 0.3333,
        alignSelf: "center",
        backgroundColor: "orange",
    },
    subHeaderLabel: {
        color: "white",
        textAlign: "center",
        fontSize: 25
    },
    customToggleProfOn: {
        color: "white",
        textAlign: "center",
        backgroundColor: "green",
        paddingHorizontal: 5,
        borderWidth: 2,
        borderColor: "grey",
    },
    customToggleProfOff: {
        color: "white",
        textAlign: "center",
        backgroundColor: "#333333",
        paddingHorizontal: 5,
        borderWidth: 2,
        borderColor: "grey",

    },
});

function rollD20() {
    let max = 20;
    let roll = (max * Math.random());
    return Math.ceil(roll);
}
function currentRollResult(mod :number, die1 :number, die2 :number, advantage :boolean) {
    if (!isNaN(die2)){
        if (advantage){if (die1 > die2) {return die1 + mod;} else {return die2 + mod;}}
        else {if (die1 < die2) {return die1 + mod;} else {return die2 + mod;}}
    }
    return (die1 + mod);
}