import { Image, StyleSheet, TextInput, View, Text, Pressable} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {useState, useContext} from "react";
import {spellSlotsByLevel} from '@/assets/objects/spellSlotsByLevel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Character} from "@/assets/objects/character";
import {ThingBadName} from "@/app/_layout";

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


export default function MainCharatcerSyndrome() {
    if (currentCharacter == null){currentCharacter = new Character("default", 10, 5)}
    const poop = useContext(ThingBadName);

    let [currentCharacterName, setCurrentCharacterName] = useState(currentCharacter.charName);
    let [maxHP, setMaxHP] = useState(currentCharacter.maxHP);
    let [incrementHP, setIncrementHP] = useState("0");
    let [currentHP, setCurrentHP] = useState(maxHP);
    let [spellCastingLevel, setSpellCastingLevel] = useState(currentCharacter.spellcastingLevel);
    let currentSpells :string = spellSlotsByLevel(spellCastingLevel);


    let has1stLevelSpell :boolean = !(currentSpells[1] === "0");
    let [spell11, setSpell11] = useState(currentCharacter.currentUsedSpells[0]);
    let [spell12, setSpell12] = useState(currentCharacter.currentUsedSpells[1]);
    let [spell13, setSpell13] = useState(currentCharacter.currentUsedSpells[2]);
    let [spell14, setSpell14] = useState(currentCharacter.currentUsedSpells[3]);
    let has2ndLevelSpell :boolean = !(currentSpells[2] === "0");
    let [spell21, setSpell21] = useState(currentCharacter.currentUsedSpells[4]);
    let [spell22, setSpell22] = useState(currentCharacter.currentUsedSpells[5]);
    let [spell23, setSpell23] = useState(currentCharacter.currentUsedSpells[6]);
    let has3rdLevelSpell :boolean = !(currentSpells[3] === "0");
    let [spell31, setSpell31] = useState(currentCharacter.currentUsedSpells[7]);
    let [spell32, setSpell32] = useState(currentCharacter.currentUsedSpells[8]);
    let [spell33, setSpell33] = useState(currentCharacter.currentUsedSpells[9]);
    let has4thLevelSpell :boolean = !(currentSpells[4] === "0");
    let [spell41, setSpell41] = useState(currentCharacter.currentUsedSpells[10]);
    let [spell42, setSpell42] = useState(currentCharacter.currentUsedSpells[11]);
    let [spell43, setSpell43] = useState(currentCharacter.currentUsedSpells[12]);
    let has5thLevelSpell :boolean = !(currentSpells[5] === "0");
    let [spell51, setSpell51] = useState(currentCharacter.currentUsedSpells[13]);
    let [spell52, setSpell52] = useState(currentCharacter.currentUsedSpells[14]);
    let [spell53, setSpell53] = useState(currentCharacter.currentUsedSpells[15]);
    let has6thLevelSpell :boolean = !(currentSpells[6] === "0");
    let [spell61, setSpell61] = useState(currentCharacter.currentUsedSpells[16]);
    let [spell62, setSpell62] = useState(currentCharacter.currentUsedSpells[17]);
    let has7thLevelSpell :boolean = !(currentSpells[7] === "0");
    let [spell71, setSpell71] = useState(currentCharacter.currentUsedSpells[18]);
    let [spell72, setSpell72] = useState(currentCharacter.currentUsedSpells[19]);
    let has8thLevelSpell :boolean = !(currentSpells[8] === "0");
    let [spell81, setSpell81] = useState(currentCharacter.currentUsedSpells[20]);
    let has9thLevelSpell :boolean = !(currentSpells[9] === "0");
    let [spell91, setSpell91] = useState(currentCharacter.currentUsedSpells[21]);

    let [warlockSpells, setWarlockSpells] = useState(currentCharacter.warlockCurrentUsedSpells);
    let [warlockCasterLevel, setWarlockCasterLevel] = useState(currentCharacter.warlockCasterLevel)

    function lableWarlockSpellLevel(warlockCasterLevel: number) :string {
        if (warlockCasterLevel > 0 && warlockCasterLevel < 3) {return "1st Level"}
        if (warlockCasterLevel >= 3 && warlockCasterLevel < 5) {return "2nd Level"}
        if (warlockCasterLevel >= 5 && warlockCasterLevel < 7) {return "3rd Level"}
        if (warlockCasterLevel >= 7 && warlockCasterLevel < 9) {return "4th Level"}
        if (warlockCasterLevel >= 9) {return "5th Level"}
    }

    function saveSpellsUsed() {
        currentCharacter.currentUsedSpells = (spell11 + spell12 + spell13 + spell14 + spell21 + spell22 + spell23 + spell31 + spell32 + spell33 + spell41 + spell42 + spell43 +
        spell51 + spell52 + spell53 + spell61 + spell62 + spell71 + spell72 + spell81 + spell91);
        currentCharacter.warlockCurrentUsedSpells = warlockSpells;
        if (detectChangeToSpellSlot > 0)
            {AsyncStorage.setItem("newCharacter" + currentCharacterName, JSON.stringify(currentCharacter));
            setDetectChangeToSpellSlot(0);}
        return true;
    }
    let [detectChangeToSpellSlot, setDetectChangeToSpellSlot] = useState(0);
    function setSpellsUsed(usedSpellString :string) {
        setSpell11(usedSpellString[0]);
        setSpell12(usedSpellString[1]);
        setSpell13(usedSpellString[2]);
        setSpell14(usedSpellString[3]);
        setSpell21(usedSpellString[4]);
        setSpell22(usedSpellString[5]);
        setSpell23(usedSpellString[6]);
        setSpell31(usedSpellString[7]);
        setSpell32(usedSpellString[8]);
        setSpell33(usedSpellString[9]);
        setSpell41(usedSpellString[10]);
        setSpell42(usedSpellString[11]);
        setSpell43(usedSpellString[12]);
        setSpell51(usedSpellString[13]);
        setSpell52(usedSpellString[14]);
        setSpell53(usedSpellString[15]);
        setSpell61(usedSpellString[16]);
        setSpell62(usedSpellString[17]);
        setSpell71(usedSpellString[18]);
        setSpell72(usedSpellString[19]);
        setSpell81(usedSpellString[20]);
        setSpell91(usedSpellString[21]);
    }



  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#1D3D47', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/headerImageDragons.jpg')}
          style={styles.headImage}
        />
      }>

        <View style={{marginBottom: 20, backgroundColor: 'black'}}>
            <Pressable onPress={()=> {getNameAsString().then(nameString => {
                initializingName = nameString;
                getCurrentCharacterObjectStringPromise(initializingName).then(objectString => {
                    if (objectString != null) {
                        currentCharacter = JSON.parse(objectString);
                    }

                    setCurrentCharacterName(currentCharacter.charName);
                    setMaxHP(currentCharacter.maxHP);
                    setSpellCastingLevel(currentCharacter.spellcastingLevel);
                    setSpellsUsed(currentCharacter.currentUsedSpells);
                    setWarlockCasterLevel(currentCharacter.warlockCasterLevel);
                    setWarlockSpells(currentCharacter.warlockCurrentUsedSpells);
                    if (currentHP > currentCharacter.maxHP){setCurrentHP(currentCharacter.maxHP);}
                })});
            }}>
                <Text style={{color: "white", fontSize: 50, backgroundColor: "tan", textAlign: "center"}}>{currentCharacterName}
                </Text></Pressable>
        <Text style={{color: "white", fontSize: 28}}>current HP is {currentHP} / {maxHP}</Text>
        <Text>
            <Pressable
                style={{
                    backgroundColor: "maroon",
                    padding: 13,
                    borderRadius: 12,
                    width: 122,
                    height: 42}}
                onPress={() => {
                if (!isNaN(parseInt(incrementHP))){
            if (currentHP - parseInt(incrementHP) < 0) {
                setCurrentHP(0)
            } else {
                setCurrentHP(currentHP - parseInt(incrementHP))
            }
        } else {setCurrentHP(currentHP)}}}>
                <Text style={{color: "white", fontSize: 12}}>take {incrementHP} damage</Text>
            </Pressable>

            <Pressable
                style={{
                    backgroundColor: "green",
                    padding: 13,
                    borderRadius: 12,
                    width: 93,
                    height: 42}}
                onPress={() => {
                if (!isNaN(parseInt(incrementHP))){
                if (currentHP + parseInt(incrementHP) > maxHP) {
                    setCurrentHP(maxHP)
                } else {
                    setCurrentHP(currentHP + parseInt(incrementHP))
                }
            } else {setCurrentHP(currentHP)}}}>
                    <Text style={{color: "white", fontSize: 12}}>Heal {incrementHP} HP</Text>
                </Pressable>
            <TextInput
                keyboardType='numeric'
                onChangeText={setIncrementHP}
                maxLength={3}
                style={{
                    borderStyle: "solid",
                    borderWidth: 3,
                    borderColor: "white",
                    width: 80,
                    color: "grey",
                }}
            />
            </Text>
        </View>

        {has1stLevelSpell && <View style={{backgroundColor: 'black'}}>
            <View style={styles.spellRow}>
        {has1stLevelSpell && <Text style={styles.spellText}> 1st Level Spells ({currentSpells[1]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[1] === "2") && (<Text>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    if (spell11 === "0"){setSpell11("X")}
                    else {setSpell11("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell11 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    if (spell12 === "0"){setSpell12("X")}
                    else {setSpell12("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell12 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>)}
            {(currentSpells[1] === "3") && (<Text>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    if (spell11 === "0"){setSpell11("X")}
                    else {setSpell11("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell11 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    if (spell12 === "0"){setSpell12("X")}
                    else {setSpell12("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell12 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    if (spell13 === "0"){setSpell13("X")}
                    else {setSpell13("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell13 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>)}
            {(currentSpells[1] === "4") && (<Text>
                <Pressable style={styles.SpellSlotButton4} onPress={()=>{
                    if (spell11 === "0"){setSpell11("X")}
                    else {setSpell11("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell11 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton4} onPress={()=>{
                    if (spell12 === "0"){setSpell12("X")}
                    else {setSpell12("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell12 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton4} onPress={()=>{
                    if (spell13 === "0"){setSpell13("X")}
                    else {setSpell13("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell13 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton4} onPress={()=>{
                    if (spell14 === "0"){setSpell14("X")}
                    else {setSpell14("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell14 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>)}
        </View>}
        </View>


        <View style={styles.spellRow}>
            {has2ndLevelSpell && <Text style={styles.spellText}> 2nd Level Spells ({currentSpells[2]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[2] === "2") && (<Text>
            <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                if (spell21 === "0"){setSpell21("X")}
                else {setSpell21("0")}
                setDetectChangeToSpellSlot(1);
            }}>{spell21 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                if (spell22 === "0"){setSpell22("X")}
                else {setSpell22("0")}
                setDetectChangeToSpellSlot(1);
            }}>{spell22 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
        </Text>)}
        {(currentSpells[2] === "3") && (<Text>
            <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                if (spell21 === "0"){setSpell21("X")}
                else {setSpell21("0")}
                setDetectChangeToSpellSlot(1);
            }}>{spell21 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                if (spell22 === "0"){setSpell22("X")}
                else {setSpell22("0")}
                setDetectChangeToSpellSlot(1);
            }}>{spell22 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                if (spell23 === "0"){setSpell23("X")}
                else {setSpell23("0")}
                setDetectChangeToSpellSlot(1);
            }}>{spell23 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
        </Text>)}
        </View>}
        </View>


        <View style={styles.spellRow}>
            {has3rdLevelSpell && <Text style={styles.spellText}> 3rd Level Spells ({currentSpells[3]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[3] === "2") && (<Text>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    if (spell31 === "0"){setSpell31("X")}
                    else {setSpell31("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell31 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    if (spell32 === "0"){setSpell32("X")}
                    else {setSpell32("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell32 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>)}
            {(currentSpells[3] === "3") && (<Text>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    if (spell31 === "0"){setSpell31("X")}
                    else {setSpell31("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell31 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    if (spell32 === "0"){setSpell32("X")}
                    else {setSpell32("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell32 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    if (spell33 === "0"){setSpell33("X")}
                    else {setSpell33("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell33 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>)}
            </View>}
        </View>


        <View style={styles.spellRow}>
            {has4thLevelSpell && <Text style={styles.spellText}> 4th Level Spells ({currentSpells[4]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[4] === "1") && (<Text>
                <Pressable style={styles.SpellSlotButton1} onPress={()=>{
                    if (spell41 === "0"){setSpell41("X")}
                    else {setSpell41("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell41 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>)}
            {(currentSpells[4] === "2") && (<Text>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    if (spell41 === "0"){setSpell41("X")}
                    else {setSpell41("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell41 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    if (spell42 === "0"){setSpell42("X")}
                    else {setSpell42("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell42 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>)}
            {(currentSpells[4] === "3") && (<Text>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    if (spell41 === "0"){setSpell41("X")}
                    else {setSpell41("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell41 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    if (spell42 === "0"){setSpell42("X")}
                    else {setSpell42("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell42 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    if (spell43 === "0"){setSpell43("X")}
                    else {setSpell43("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell43 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>)}
            </View>}
        </View>


        <View style={styles.spellRow}>
            {has5thLevelSpell && <Text style={styles.spellText}> 5th Level Spells ({currentSpells[5]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[5] === "1") && (<Text>
                <Pressable style={styles.SpellSlotButton1} onPress={()=>{
                    if (spell51 === "0"){setSpell51("X")}
                    else {setSpell51("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell51 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>)}
            {(currentSpells[5] === "2") && (<Text>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    if (spell51 === "0"){setSpell51("X")}
                    else {setSpell51("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell51 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    if (spell52 === "0"){setSpell52("X")}
                    else {setSpell52("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell52 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>)}
            {(currentSpells[5] === "3") && (<Text>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    if (spell51 === "0"){setSpell51("X")}
                    else {setSpell51("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell51 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    if (spell52 === "0"){setSpell52("X")}
                    else {setSpell52("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell52 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    if (spell53 === "0"){setSpell53("X")}
                    else {setSpell53("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell53 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>)}
            </View>}
        </View>


        <View style={styles.spellRow}>
            {has6thLevelSpell && <Text style={styles.spellText}> 6th Level Spells ({currentSpells[6]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[6] === "1") && (<Text>
                <Pressable style={styles.SpellSlotButton1} onPress={()=>{
                    if (spell61 === "0"){setSpell61("X")}
                    else {setSpell61("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell61 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>)}
            {(currentSpells[6] === "2") && (<Text>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    if (spell61 === "0"){setSpell61("X")}
                    else {setSpell61("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell61 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    if (spell62 === "0"){setSpell62("X")}
                    else {setSpell62("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell62 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>)}
            </View>}
        </View>


        <View style={styles.spellRow}>
            {has7thLevelSpell && <Text style={styles.spellText}> 7th Level Spells ({currentSpells[7]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[7] === "1") && (<Text>
            <Pressable style={styles.SpellSlotButton1} onPress={()=>{
                if (spell71 === "0"){setSpell71("X")}
                else {setSpell71("0")}
                setDetectChangeToSpellSlot(1);
            }}>{spell71 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
        </Text>)}
            {(currentSpells[7] === "2") && (<Text>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    if (spell71 === "0"){setSpell71("X")}
                    else {setSpell71("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell71 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    if (spell72 === "0"){setSpell72("X")}
                    else {setSpell72("0")}
                    setDetectChangeToSpellSlot(1);
                }}>{spell72 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>)}
            </View>}
        </View>


        <View style={styles.spellRow}>
            {has8thLevelSpell && <Text style={styles.spellText}> 8th Level Spells ({currentSpells[8]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[8] === "1") && (<Text>
            <Pressable style={styles.SpellSlotButton1} onPress={()=>{
                if (spell81 === "0"){setSpell81("X")}
                else {setSpell81("0")}
            setDetectChangeToSpellSlot(1);
            }}>{spell81 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
        </Text>)}
            </View>}
        </View>


        <View style={styles.spellRow}>
            {has9thLevelSpell && <Text style={styles.spellText}> 9th Level Spells ({currentSpells[9]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[9] === "1") && (<Text>
            <Pressable style={styles.SpellSlotButton1} onPress={()=>{
                if (spell91 === "0"){setSpell91("X");}
                else {setSpell91("0");}
                setDetectChangeToSpellSlot(1);
            }}>{spell91 == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
        </Text>)}
            </View>}
        </View>
            {saveSpellsUsed()}
        </View>}



        {currentCharacter.warlockCasterLevel > 0 && <View style={{backgroundColor: 'black'}}>
            <View style={styles.spellRow}>
                <View style={styles.spellText}><Text style={styles.spellText}>Warlock Spells</Text>
                    <Text style={styles.spellText}>{lableWarlockSpellLevel(warlockCasterLevel)}</Text></View>
                <View style={[styles.spellSlotButtonRow, {marginTop: 12}]}> {warlockCasterLevel == 1 && (<Text>
                        <Pressable style={[styles.SpellSlotButton1, {backgroundColor: "purple"}]} onPress={()=>{
                            if (warlockSpells[0] === "0"){setWarlockSpells("X" + warlockSpells[1] + warlockSpells[2] + warlockSpells[3])}
                            else {setWarlockSpells("0" + warlockSpells[1] + warlockSpells[2] + warlockSpells[3])}
                            setDetectChangeToSpellSlot(1);
                        }}>{warlockSpells[0] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                    </Text>)})
                    {(warlockCasterLevel > 1 && warlockCasterLevel < 12) && (<Text>
                        <Pressable style={[styles.SpellSlotButton2, {backgroundColor: "purple"}]} onPress={()=>{
                            if (warlockSpells[0] === "0"){setWarlockSpells("X" + warlockSpells[1] + warlockSpells[2] + warlockSpells[3])}
                            else {setWarlockSpells("0" + warlockSpells[1] + warlockSpells[2] + warlockSpells[3])}
                            setDetectChangeToSpellSlot(1);
                        }}>{warlockSpells[0] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                        <Pressable style={[styles.SpellSlotButton2, {backgroundColor: "purple"}]} onPress={()=>{
                            if (warlockSpells[1] === "0"){setWarlockSpells(warlockSpells[0] + "X" + warlockSpells[2] + warlockSpells[3])}
                            else {setWarlockSpells(warlockSpells[0] + "0" + warlockSpells[2] + warlockSpells[3])}
                            setDetectChangeToSpellSlot(1);
                        }}>{warlockSpells[1] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                    </Text>)}
                    {(warlockCasterLevel > 11 && warlockCasterLevel < 17) && (<Text>
                        <Pressable style={[styles.SpellSlotButton3, {backgroundColor: "purple"}]} onPress={()=>{
                            if (warlockSpells[0] === "0"){setWarlockSpells("X" + warlockSpells[1] + warlockSpells[2] + warlockSpells[3])}
                            else {setWarlockSpells("0" + warlockSpells[1] + warlockSpells[2] + warlockSpells[3])}
                            setDetectChangeToSpellSlot(1);
                        }}>{warlockSpells[0] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                        <Pressable style={[styles.SpellSlotButton3, {backgroundColor: "purple"}]} onPress={()=>{
                            if (warlockSpells[1] === "0"){setWarlockSpells(warlockSpells[0] + "X" + warlockSpells[2] + warlockSpells[3])}
                            else {setWarlockSpells(warlockSpells[0] + "0" + warlockSpells[2] + warlockSpells[3])}
                            setDetectChangeToSpellSlot(1);
                        }}>{warlockSpells[1] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                        <Pressable style={[styles.SpellSlotButton3, {backgroundColor: "purple"}]} onPress={()=>{
                            if (warlockSpells[2] === "0"){setWarlockSpells(warlockSpells[0] + warlockSpells[1] + "X" + warlockSpells[3])}
                            else {setWarlockSpells(warlockSpells[0] + warlockSpells[1] + "0" + warlockSpells[3])}
                            setDetectChangeToSpellSlot(1);
                        }}>{warlockSpells[2] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                    </Text>)}
                    {warlockCasterLevel > 16 && (<Text>
                        <Pressable style={[styles.SpellSlotButton4, {backgroundColor: "purple"}]} onPress={()=>{
                            if (warlockSpells[0] === "0"){setWarlockSpells("X" + warlockSpells[1] + warlockSpells[2] + warlockSpells[3])}
                            else {setWarlockSpells("0" + warlockSpells[1] + warlockSpells[2] + warlockSpells[3])}
                            setDetectChangeToSpellSlot(1);
                        }}>{warlockSpells[0] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                        <Pressable style={[styles.SpellSlotButton4, {backgroundColor: "purple"}]} onPress={()=>{
                            if (warlockSpells[1] === "0"){setWarlockSpells(warlockSpells[0] + "X" + warlockSpells[2] + warlockSpells[3])}
                            else {setWarlockSpells(warlockSpells[0] + "0" + warlockSpells[2] + warlockSpells[3])}
                            setDetectChangeToSpellSlot(1);
                        }}>{warlockSpells[1] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                        <Pressable style={[styles.SpellSlotButton4, {backgroundColor: "purple"}]} onPress={()=>{
                            if (warlockSpells[2] === "0"){setWarlockSpells(warlockSpells[0] + warlockSpells[1] + "X" + warlockSpells[3])}
                            else {setWarlockSpells(warlockSpells[0] + warlockSpells[1] + "0" + warlockSpells[3])}
                            setDetectChangeToSpellSlot(1);
                        }}>{warlockSpells[2] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                        <Pressable style={[styles.SpellSlotButton4, {backgroundColor: "purple"}]} onPress={()=>{
                            if (warlockSpells[3] === "0"){setWarlockSpells(warlockSpells[0] + warlockSpells[1] + warlockSpells[2] + "X")}
                            else {setWarlockSpells(warlockSpells[0] + warlockSpells[1] + warlockSpells[2] + "0")}
                            setDetectChangeToSpellSlot(1);
                        }}>{warlockSpells[3] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                    </Text>)}
                </View>
            </View>
        </View>}


    </ParallaxScrollView>
  );


}




const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
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
    spellSlotButtonRow: {
      flex: 0.4,
    },
    spellRow: {
        flexDirection: 'row',
        margin: 2,
    },
    spellText: {
      color: 'white',
        flex: 0.57,
        fontSize: 20,
        textAlign: 'center',
    },
    SpellSlotButton1: {
        color: 'white',
        backgroundColor: 'teal',
        height: 35,
        width: "95%",
        borderRadius: 15,
    },
    SpellSlotButton2: {
        color: 'white',
        backgroundColor: 'teal',
        height: 35,
        width: "45%",
        borderRadius: 12,
    },
    SpellSlotButton3: {
        color: 'white',
        backgroundColor: 'teal',
        height: 35,
        width: "29.5%",
        borderRadius: 8,
    },
    SpellSlotButton4: {
        color: 'white',
        backgroundColor: 'teal',
        height: 35,
        width: "21.9%",
        borderRadius: 5,
    },
    spellSlotButtonX: {
      padding: 0,
        color: 'black',
        marginTop: -13,
        fontSize: 40,
        textAlign: 'center',
    }
});
