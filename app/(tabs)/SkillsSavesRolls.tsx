import {StyleSheet, Image, Text, View, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from "react";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {Character} from '@/assets/objects/character';

let initializingName :string|null;
let getNameAsString = async () => {
    return await AsyncStorage.getItem("currentCharacterName");
    }

getNameAsString().then(nameString => {
    initializingName = nameString;
    getCurrentCharacterObjectStringPromise(initializingName).then(objectString => {
        let currentCharacterObjectString = objectString;
        if (currentCharacterObjectString != null) {
            currentCharacter = JSON.parse(currentCharacterObjectString);
        }
    })});

let currentCharacter = new Character("defaultSSR", 10, 5);
let getCurrentCharacterObjectStringPromise = async (nameString :string|null) => {
    return await AsyncStorage.getItem("newCharacter" + nameString);
}





export default function TabSkillsSavesRolls() {
    if (currentCharacter == null){currentCharacter = new Character("default", 10, 5)}

    let [currentCharacterName, setCurrentCharacterName] = useState(currentCharacter.charName);
    let [currentRollName, setCurrentRollName] = useState("");

    let [currentStatSTR, setCurrentStatSTR] = useState(currentCharacter.STR);
    let [currentSTRMod, setCurrentSTRMod] = useState(findCoreStatMod(currentStatSTR))
    let [currentStatDEX, setCurrentStatDEX] = useState(currentCharacter.DEX);
    let [currentDEXMod, setCurrentDEXMod] = useState(findCoreStatMod(currentStatDEX))
    let [currentStatCON, setCurrentStatCON] = useState(currentCharacter.CON);
    let [currentCONMod, setCurrentCONMod] = useState(findCoreStatMod(currentStatCON))
    let [currentStatINT, setCurrentStatINT] = useState(currentCharacter.INT);
    let [currentINTMod, setCurrentINTMod] = useState(findCoreStatMod(currentStatINT))
    let [currentStatWIS, setCurrentStatWIS] = useState(currentCharacter.WIS);
    let [currentWISMod, setCurrentWISMod] = useState(findCoreStatMod(currentStatWIS))
    let [currentStatCHA, setCurrentStatCHA] = useState(currentCharacter.CHA);
    let [currentCHAMod, setCurrentCHAMod] = useState(findCoreStatMod(currentStatCHA))


    let [currentRollDie1, setCurrentRollDie1] = useState(20);
    let [currentRollDie2, setCurrentRollDie2] = useState(NaN);
    let [currentRollMod, setCurrentRollMod] = useState(0);

    let [toggleAdvantage, setToggleAdvantage] = useState(false);
    let [toggleDisadvantage, setToggleDisadvantage] = useState(false);

    let [currentProficiencyMod, setCurrentProficiencyMod] = useState(currentCharacter.proficiency);

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



    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#60D0D0', dark: '#353636' }}
            headerImage={
                <Image
                    source={require('@/assets/images/headerImageDragons.jpg')}
                    style={styles.headImage}
                />
            }>
            <View style={{backgroundColor: 'black'}}>
                <Pressable onPress={()=> {
                    getNameAsString().then(nameString => {
                        initializingName = nameString;
                        getCurrentCharacterObjectStringPromise(initializingName).then(objectString => {
                            let currentCharacterObjectString = objectString;
                            if (currentCharacterObjectString != null) {
                                currentCharacter = JSON.parse(currentCharacterObjectString);
                            }

                            setCurrentCharacterName(currentCharacter.charName);
                            setCurrentStatSTR(currentCharacter.STR);
                            setCurrentStatDEX(currentCharacter.DEX);
                            setCurrentStatCON(currentCharacter.CON);
                            setCurrentStatINT(currentCharacter.INT);
                            setCurrentStatWIS(currentCharacter.WIS);
                            setCurrentStatCHA(currentCharacter.CHA);
                            setCurrentSTRMod(findCoreStatMod(currentCharacter.STR))
                            setCurrentDEXMod(findCoreStatMod(currentCharacter.DEX))
                            setCurrentCONMod(findCoreStatMod(currentCharacter.CON))
                            setCurrentINTMod(findCoreStatMod(currentCharacter.INT))
                            setCurrentWISMod(findCoreStatMod(currentCharacter.WIS))
                            setCurrentCHAMod(findCoreStatMod(currentCharacter.CHA))
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
                            setCurrentProficiencyMod(currentCharacter.proficiency);
                        })});

                }}>
                    <Text style={{color: "white", fontSize: 50, backgroundColor: "tan", textAlign: "center"}}>{currentCharacterName}
                    </Text>
                </Pressable>
            </View>

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
                <Text style={{fontSize: 25, color: "white", marginTop: 36, flex: 0.3}}>
                    {currentRollResult(currentRollMod, currentRollDie1, currentRollDie2, toggleAdvantage)}
                </Text>
            </View>


            <View style={{
                marginTop: 10,
                backgroundColor: 'blue',
                flexDirection: "row",
                paddingTop: 5,
                paddingBottom: 5,
                borderRadius: 16,
            }}><Pressable  style={styles.toggleAdv} onPress={()=> {
                    setToggleAdvantage(!toggleAdvantage);
                    setToggleDisadvantage(false);
                    if (!toggleAdvantage) {setCurrentRollDie2(20);}
                    else {setCurrentRollDie2(NaN);}
                }}> <Text style={{color: "white", fontSize: 17, textAlign: "center"}}>Toggle Advantage: {toggleAdvantage && "On"}{!toggleAdvantage && "Off"}</Text>
                </Pressable>
                <Pressable style={styles.toggleAdv} onPress={()=> {
                    setToggleDisadvantage(!toggleDisadvantage);
                    setToggleAdvantage(false);
                    if (!toggleDisadvantage) {setCurrentRollDie2(1);}
                    else {setCurrentRollDie2(NaN);}
                }}> <Text style={{color: "white", fontSize: 17, textAlign: "center"}}>Toggle Disadvantage: {toggleDisadvantage && "On"}{!toggleDisadvantage && "Off"}</Text>
                </Pressable>
            </View>



            <View style={{marginBottom: 20, backgroundColor: 'orange', flexDirection: "row"}}>
                <Pressable style={styles.coreSkillBoxes} onPress={()=> {
                    setCurrentRollMod(currentSTRMod);
                    setCurrentRollDie1(rollD20());
                    setCurrentRollName("flat STR");
                    if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                }}>
                    <Text style={styles.coreStatText}>STR</Text>
                    <Text style={styles.coreStatText}>{currentStatSTR}</Text>
                    <Text style={styles.coreStatText}>{currentSTRMod > 0 && "+"}{currentSTRMod}</Text>
                </Pressable>
                <Pressable style={styles.coreSkillBoxes} onPress={()=> {
                    setCurrentRollMod(currentDEXMod);
                    setCurrentRollDie1(rollD20());
                    setCurrentRollName("flat DEX");
                    if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                }}>
                    <Text style={styles.coreStatText}>DEX</Text>
                    <Text style={styles.coreStatText}>{currentStatDEX}</Text>
                    <Text style={styles.coreStatText}>{currentDEXMod > 0 && "+"}{currentDEXMod}</Text>
                </Pressable>
                <Pressable style={styles.coreSkillBoxes} onPress={()=> {
                    setCurrentRollMod(currentCONMod);
                    setCurrentRollDie1(rollD20());
                    setCurrentRollName("flat CON");
                    if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                }}>
                    <Text style={styles.coreStatText}>CON</Text>
                    <Text style={styles.coreStatText}>{currentStatCON}</Text>
                    <Text style={styles.coreStatText}>{currentCONMod > 0 && "+"}{currentCONMod}</Text>
                </Pressable>
                <Pressable style={styles.coreSkillBoxes} onPress={()=> {
                    setCurrentRollMod(currentINTMod);
                    setCurrentRollDie1(rollD20());
                    setCurrentRollName("flat INT");
                    if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                }}>
                    <Text style={styles.coreStatText}>INT</Text>
                    <Text style={styles.coreStatText}>{currentStatINT}</Text>
                    <Text style={styles.coreStatText}>{currentINTMod > 0 && "+"}{currentINTMod}</Text>
                </Pressable>
                <Pressable style={styles.coreSkillBoxes} onPress={()=> {
                    setCurrentRollMod(currentWISMod);
                    setCurrentRollDie1(rollD20());
                    setCurrentRollName("flat WIS");
                    if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                }}>
                    <Text style={styles.coreStatText}>WIS</Text>
                    <Text style={styles.coreStatText}>{currentStatWIS}</Text>
                    <Text style={styles.coreStatText}>{currentWISMod > 0 && "+"}{currentWISMod}</Text>
                </Pressable>
                <Pressable style={styles.coreSkillBoxes} onPress={()=> {
                    setCurrentRollMod(currentCHAMod);
                    setCurrentRollDie1(rollD20());
                    setCurrentRollName("flat CHA");
                    if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                }}>
                    <Text style={styles.coreStatText}>CHA</Text>
                    <Text style={styles.coreStatText}>{currentStatCHA}</Text>
                    <Text style={styles.coreStatText}>{currentCHAMod > 0 && "+"}{currentCHAMod}</Text>
                </Pressable>
            </View>




            <View style={{flexDirection: "row"}}>
                <View style={styles.skillRollColumn}>
                    <Pressable style={styles.skillBoxes} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (stealth == "P") {proficiencyBonus = currentProficiencyMod;}
                        if (stealth == "E") {proficiencyBonus = (2 * currentProficiencyMod);}
                        setCurrentRollMod(currentDEXMod + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Stealth");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                    <Text style={styles.coreStatText}>Stealth</Text>
                        {stealth == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{currentDEXMod > 0 && "+"}{currentDEXMod}</Text></View>}
                        {stealth == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{currentDEXMod + currentProficiencyMod > 0 && "+"}{currentDEXMod + currentProficiencyMod}</Text></View>}
                        {stealth == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{currentDEXMod + (2 * currentProficiencyMod) > 0 && "+"}{currentDEXMod + (2 * currentProficiencyMod)}</Text></View>}
                    </Pressable>
                    <Pressable style={styles.skillBoxes} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (athletics == "P") {proficiencyBonus = currentProficiencyMod;}
                        if (athletics == "E") {proficiencyBonus = (2 * currentProficiencyMod);}
                        setCurrentRollMod(currentSTRMod + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Athletics");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                    <Text style={styles.coreStatText}>Athletics</Text>
                        {athletics == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{currentSTRMod > 0 && "+"}{currentSTRMod}</Text></View>}
                        {athletics == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{currentSTRMod + currentProficiencyMod > 0 && "+"}{currentSTRMod + currentProficiencyMod}</Text></View>}
                        {athletics == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{currentSTRMod + (2 * currentProficiencyMod) > 0 && "+"}{currentSTRMod + (2 * currentProficiencyMod)}</Text></View>}
                    </Pressable>
                    <Pressable style={styles.skillBoxes} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (deception == "P") {proficiencyBonus = currentProficiencyMod;}
                        if (deception == "E") {proficiencyBonus = (2 * currentProficiencyMod);}
                        setCurrentRollMod(currentCHAMod + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Deception");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Deception</Text>
                        {deception == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{currentCHAMod > 0 && "+"}{currentCHAMod}</Text></View>}
                        {deception == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{currentCHAMod + currentProficiencyMod > 0 && "+"}{currentCHAMod + currentProficiencyMod}</Text></View>}
                        {deception == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{currentCHAMod + (2 * currentProficiencyMod) > 0 && "+"}{currentCHAMod + (2 * currentProficiencyMod)}</Text></View>}
                    </Pressable>
                    <Pressable style={styles.skillBoxes} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (intimidation == "P") {proficiencyBonus = currentProficiencyMod;}
                        if (intimidation == "E") {proficiencyBonus = (2 * currentProficiencyMod);}
                        setCurrentRollMod(currentCHAMod + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Intimidation");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Intimidation</Text>
                        {intimidation == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{currentCHAMod > 0 && "+"}{currentCHAMod}</Text></View>}
                        {intimidation == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{currentCHAMod + currentProficiencyMod > 0 && "+"}{currentCHAMod + currentProficiencyMod}</Text></View>}
                        {intimidation == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{currentCHAMod + (2 * currentProficiencyMod) > 0 && "+"}{currentCHAMod + (2 * currentProficiencyMod)}</Text></View>}
                    </Pressable>
                    <Pressable style={styles.skillBoxes} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (performance == "P") {proficiencyBonus = currentProficiencyMod;}
                        if (performance == "E") {proficiencyBonus = (2 * currentProficiencyMod);}
                        setCurrentRollMod(currentCHAMod + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Performance");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Performance</Text>
                        {performance == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{currentCHAMod > 0 && "+"}{currentCHAMod}</Text></View>}
                        {performance == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{currentCHAMod + currentProficiencyMod > 0 && "+"}{currentCHAMod + currentProficiencyMod}</Text></View>}
                        {performance == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{currentCHAMod + (2 * currentProficiencyMod) > 0 && "+"}{currentCHAMod + (2 * currentProficiencyMod)}</Text></View>}
                    </Pressable>
                    <Pressable style={styles.skillBoxes} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (persuasion == "P") {proficiencyBonus = currentProficiencyMod;}
                        if (persuasion == "E") {proficiencyBonus = (2 * currentProficiencyMod);}
                        setCurrentRollMod(currentCHAMod + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Persuasion");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Persuasion</Text>
                        {persuasion == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{currentCHAMod > 0 && "+"}{currentCHAMod}</Text></View>}
                        {persuasion == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{currentCHAMod + currentProficiencyMod > 0 && "+"}{currentCHAMod + currentProficiencyMod}</Text></View>}
                        {persuasion == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{currentCHAMod + (2 * currentProficiencyMod) > 0 && "+"}{currentCHAMod + (2 * currentProficiencyMod)}</Text></View>}
                    </Pressable>
                </View>
                <View style={styles.skillRollColumn}>
                    <Pressable style={styles.skillBoxes} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (acrobatics == "P") {proficiencyBonus = currentProficiencyMod;}
                        if (acrobatics == "E") {proficiencyBonus = (2 * currentProficiencyMod);}
                        setCurrentRollMod(currentDEXMod + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Acrobatics");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Acrobatics</Text>
                        {acrobatics == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{currentDEXMod > 0 && "+"}{currentDEXMod}</Text></View>}
                        {acrobatics == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{currentDEXMod + currentProficiencyMod > 0 && "+"}{currentDEXMod + currentProficiencyMod}</Text></View>}
                        {acrobatics == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{currentDEXMod + (2 * currentProficiencyMod) > 0 && "+"}{currentDEXMod + (2 * currentProficiencyMod)}</Text></View>}
                    </Pressable>
                    <Pressable style={styles.skillBoxes} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (arcana == "P") {proficiencyBonus = currentProficiencyMod;}
                        if (arcana == "E") {proficiencyBonus = (2 * currentProficiencyMod);}
                        setCurrentRollMod(currentINTMod + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Arcana");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Arcana</Text>
                        {arcana == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{currentINTMod > 0 && "+"}{currentINTMod}</Text></View>}
                        {arcana == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{currentINTMod + currentProficiencyMod > 0 && "+"}{currentINTMod + currentProficiencyMod}</Text></View>}
                        {arcana == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{currentINTMod + (2 * currentProficiencyMod) > 0 && "+"}{currentINTMod + (2 * currentProficiencyMod)}</Text></View>}
                    </Pressable>
                    <Pressable style={styles.skillBoxes} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (history == "P") {proficiencyBonus = currentProficiencyMod;}
                        if (history == "E") {proficiencyBonus = (2 * currentProficiencyMod);}
                        setCurrentRollMod(currentINTMod + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("History");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>History</Text>
                        {history == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{currentINTMod > 0 && "+"}{currentINTMod}</Text></View>}
                        {history == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{currentINTMod + currentProficiencyMod > 0 && "+"}{currentINTMod + currentProficiencyMod}</Text></View>}
                        {history == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{currentINTMod + (2 * currentProficiencyMod) > 0 && "+"}{currentINTMod + (2 * currentProficiencyMod)}</Text></View>}
                    </Pressable>
                    <Pressable style={styles.skillBoxes} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (investigation == "P") {proficiencyBonus = currentProficiencyMod;}
                        if (investigation == "E") {proficiencyBonus = (2 * currentProficiencyMod);}
                        setCurrentRollMod(currentINTMod + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Investigation");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Investigation</Text>
                        {investigation == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{currentINTMod > 0 && "+"}{currentINTMod}</Text></View>}
                        {investigation == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{currentINTMod + currentProficiencyMod > 0 && "+"}{currentINTMod + currentProficiencyMod}</Text></View>}
                        {investigation == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{currentINTMod + (2 * currentProficiencyMod) > 0 && "+"}{currentINTMod + (2 * currentProficiencyMod)}</Text></View>}
                    </Pressable>
                    <Pressable style={styles.skillBoxes} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (nature == "P") {proficiencyBonus = currentProficiencyMod;}
                        if (nature == "E") {proficiencyBonus = (2 * currentProficiencyMod);}
                        setCurrentRollMod(currentINTMod + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Nature");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Nature</Text>
                        {nature == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{currentINTMod > 0 && "+"}{currentINTMod}</Text></View>}
                        {nature == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{currentINTMod + currentProficiencyMod > 0 && "+"}{currentINTMod + currentProficiencyMod}</Text></View>}
                        {nature == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{currentINTMod + (2 * currentProficiencyMod) > 0 && "+"}{currentINTMod + (2 * currentProficiencyMod)}</Text></View>}
                    </Pressable>
                    <Pressable style={styles.skillBoxes} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (religion == "P") {proficiencyBonus = currentProficiencyMod;}
                        if (religion == "E") {proficiencyBonus = (2 * currentProficiencyMod);}
                        setCurrentRollMod(currentINTMod + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Religion");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Religion</Text>
                        {religion == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{currentINTMod > 0 && "+"}{currentINTMod}</Text></View>}
                        {religion == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{currentINTMod + currentProficiencyMod > 0 && "+"}{currentINTMod + currentProficiencyMod}</Text></View>}
                        {religion == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{currentINTMod + (2 * currentProficiencyMod) > 0 && "+"}{currentINTMod + (2 * currentProficiencyMod)}</Text></View>}
                    </Pressable>
                </View>
                <View style={styles.skillRollColumn}>
                    <Pressable style={styles.skillBoxes} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (sleightOfHand == "P") {proficiencyBonus = currentProficiencyMod;}
                        if (sleightOfHand == "E") {proficiencyBonus = (2 * currentProficiencyMod);}
                        setCurrentRollMod(currentDEXMod + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Sleight of Hand");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Sleight of Hand</Text>
                        {sleightOfHand == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{currentDEXMod > 0 && "+"}{currentDEXMod}</Text></View>}
                        {sleightOfHand == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{currentDEXMod + currentProficiencyMod > 0 && "+"}{currentDEXMod + currentProficiencyMod}</Text></View>}
                        {sleightOfHand == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{currentDEXMod + (2 * currentProficiencyMod) > 0 && "+"}{currentDEXMod + (2 * currentProficiencyMod)}</Text></View>}
                    </Pressable>
                    <Pressable style={styles.skillBoxes} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (animalHandling == "P") {proficiencyBonus = currentProficiencyMod;}
                        if (animalHandling == "E") {proficiencyBonus = (2 * currentProficiencyMod);}
                        setCurrentRollMod(currentWISMod + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Animal Handling");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Animal Handling</Text>
                        {animalHandling == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{currentWISMod > 0 && "+"}{currentWISMod}</Text></View>}
                        {animalHandling == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{currentWISMod + currentProficiencyMod > 0 && "+"}{currentWISMod + currentProficiencyMod}</Text></View>}
                        {animalHandling == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{currentWISMod + (2 * currentProficiencyMod) > 0 && "+"}{currentWISMod + (2 * currentProficiencyMod)}</Text></View>}
                    </Pressable>
                    <Pressable style={styles.skillBoxes} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (insight == "P") {proficiencyBonus = currentProficiencyMod;}
                        if (insight == "E") {proficiencyBonus = (2 * currentProficiencyMod);}
                        setCurrentRollMod(currentWISMod + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Insight");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Insight</Text>
                        {insight == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{currentWISMod > 0 && "+"}{currentWISMod}</Text></View>}
                        {insight == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{currentWISMod + currentProficiencyMod > 0 && "+"}{currentWISMod + currentProficiencyMod}</Text></View>}
                        {insight == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{currentWISMod + (2 * currentProficiencyMod) > 0 && "+"}{currentWISMod + (2 * currentProficiencyMod)}</Text></View>}
                    </Pressable>
                    <Pressable style={styles.skillBoxes} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (medicine == "P") {proficiencyBonus = currentProficiencyMod;}
                        if (medicine == "E") {proficiencyBonus = (2 * currentProficiencyMod);}
                        setCurrentRollMod(currentWISMod + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Medicine");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Medicine</Text>
                        {medicine == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{currentWISMod > 0 && "+"}{currentWISMod}</Text></View>}
                        {medicine == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{currentWISMod + currentProficiencyMod > 0 && "+"}{currentWISMod + currentProficiencyMod}</Text></View>}
                        {medicine == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{currentWISMod + (2 * currentProficiencyMod) > 0 && "+"}{currentWISMod + (2 * currentProficiencyMod)}</Text></View>}
                    </Pressable>
                    <Pressable style={styles.skillBoxes} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (perception == "P") {proficiencyBonus = currentProficiencyMod;}
                        if (perception == "E") {proficiencyBonus = (2 * currentProficiencyMod);}
                        setCurrentRollMod(currentWISMod + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Perception");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Perception</Text>
                        {perception == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{currentWISMod > 0 && "+"}{currentWISMod}</Text></View>}
                        {perception == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{currentWISMod + currentProficiencyMod > 0 && "+"}{currentWISMod + currentProficiencyMod}</Text></View>}
                        {perception == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{currentWISMod + (2 * currentProficiencyMod) > 0 && "+"}{currentWISMod + (2 * currentProficiencyMod)}</Text></View>}
                    </Pressable>
                    <Pressable style={styles.skillBoxes} onPress={()=> {
                        let proficiencyBonus = 0;
                        if (survival == "P") {proficiencyBonus = currentProficiencyMod;}
                        if (survival == "E") {proficiencyBonus = (2 * currentProficiencyMod);}
                        setCurrentRollMod(currentWISMod + proficiencyBonus);
                        setCurrentRollDie1(rollD20());
                        setCurrentRollName("Survival");
                        if (toggleAdvantage || toggleDisadvantage) {setCurrentRollDie2(rollD20())}
                    }}>
                        <Text style={styles.coreStatText}>Survival</Text>
                        {survival == "X" && <View><Text style={styles.coreStatText}>Not Prof</Text>
                            <Text style={styles.coreStatText}>{currentWISMod > 0 && "+"}{currentWISMod}</Text></View>}
                        {survival == "P" && <View><Text style={styles.coreStatText}>Proficient</Text>
                            <Text style={styles.coreStatText}>{currentWISMod + currentProficiencyMod > 0 && "+"}{currentWISMod + currentProficiencyMod}</Text></View>}
                        {survival == "E" && <View><Text style={styles.coreStatText}>Expert</Text>
                            <Text style={styles.coreStatText}>{currentWISMod + (2 * currentProficiencyMod) > 0 && "+"}{currentWISMod + (2 * currentProficiencyMod)}</Text></View>}
                    </Pressable>
                </View>
            </View>







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
        backgroundColor: "maroon",
        margin: 3,
        borderRadius: 4,
    },
    coreSkillBoxes: {
        flex: 10,
        color: "white",
        backgroundColor: "teal",
        margin: 3,
        borderRadius: 6,
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
    }
});

function findCoreStatMod(int : number) {
    let ans = (int-10) / 2;
    return Math.floor(ans);
}
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