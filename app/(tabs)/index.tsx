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
    let [spell11, setSpell11] = useState(" ");
    let [spell12, setSpell12] = useState(" ");
    let [spell13, setSpell13] = useState(" ");
    let [spell14, setSpell14] = useState(" ");
    let has2ndLevelSpell :boolean = !(currentSpells[2] === "0");
    let [spell21, setSpell21] = useState(" ");
    let [spell22, setSpell22] = useState(" ");
    let [spell23, setSpell23] = useState(" ");
    let has3rdLevelSpell :boolean = !(currentSpells[3] === "0");
    let [spell31, setSpell31] = useState(" ");
    let [spell32, setSpell32] = useState(" ");
    let [spell33, setSpell33] = useState(" ");
    let has4thLevelSpell :boolean = !(currentSpells[4] === "0");
    let [spell41, setSpell41] = useState(" ");
    let [spell42, setSpell42] = useState(" ");
    let [spell43, setSpell43] = useState(" ");
    let has5thLevelSpell :boolean = !(currentSpells[5] === "0");
    let [spell51, setSpell51] = useState(" ");
    let [spell52, setSpell52] = useState(" ");
    let [spell53, setSpell53] = useState(" ");
    let has6thLevelSpell :boolean = !(currentSpells[6] === "0");
    let [spell61, setSpell61] = useState(" ");
    let [spell62, setSpell62] = useState(" ");
    let has7thLevelSpell :boolean = !(currentSpells[7] === "0");
    let [spell71, setSpell71] = useState(" ");
    let [spell72, setSpell72] = useState(" ");
    let has8thLevelSpell :boolean = !(currentSpells[8] === "0");
    let [spell81, setSpell81] = useState(" ");
    let has9thLevelSpell :boolean = !(currentSpells[9] === "0");
    let [spell91, setSpell91] = useState(" ");



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

        <View style={{backgroundColor: 'black'}}>
            <View style={styles.spellRow}>
        {has1stLevelSpell && <Text style={styles.spellText}> 1st Level Spells ({currentSpells[1]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[1] === "2") && (<Text>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    if (spell11 === " "){setSpell11("X")}
                    else {setSpell11(" ")}}}><Text style={styles.spellSlotButtonX}>{spell11}</Text></Pressable>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    if (spell12 === " "){setSpell12("X")}
                    else {setSpell12(" ")}}}><Text style={styles.spellSlotButtonX}>{spell12}</Text></Pressable>
            </Text>)}
            {(currentSpells[1] === "3") && (<Text>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    if (spell11 === " "){setSpell11("X")}
                    else {setSpell11(" ")}}}><Text style={styles.spellSlotButtonX}>{spell11}</Text></Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    if (spell12 === " "){setSpell12("X")}
                    else {setSpell12(" ")}}}><Text style={styles.spellSlotButtonX}>{spell12}</Text></Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    if (spell13 === " "){setSpell13("X")}
                    else {setSpell13(" ")}}}><Text style={styles.spellSlotButtonX}>{spell13}</Text></Pressable>
            </Text>)}
            {(currentSpells[1] === "4") && (<Text>
                <Pressable style={styles.SpellSlotButton4} onPress={()=>{
                    if (spell11 === " "){setSpell11("X")}
                    else {setSpell11(" ")}}}><Text style={styles.spellSlotButtonX}>{spell11}</Text></Pressable>
                <Pressable style={styles.SpellSlotButton4} onPress={()=>{
                    if (spell12 === " "){setSpell12("X")}
                    else {setSpell12(" ")}}}><Text style={styles.spellSlotButtonX}>{spell12}</Text></Pressable>
                <Pressable style={styles.SpellSlotButton4} onPress={()=>{
                    if (spell13 === " "){setSpell13("X")}
                    else {setSpell13(" ")}}}><Text style={styles.spellSlotButtonX}>{spell13}</Text></Pressable>
                <Pressable style={styles.SpellSlotButton4} onPress={()=>{
                    if (spell14 === " "){setSpell14("X")}
                    else {setSpell14(" ")}}}><Text style={styles.spellSlotButtonX}>{spell14}</Text></Pressable>
            </Text>)}
        </View>}
        </View>


        <View style={styles.spellRow}>
            {has2ndLevelSpell && <Text style={styles.spellText}> 2nd Level Spells ({currentSpells[2]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[2] === "2") && (<Text>
            <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                if (spell21 === " "){setSpell21("X")}
                else {setSpell21(" ")}}}><Text style={styles.spellSlotButtonX}>{spell21}</Text></Pressable>
            <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                if (spell22 === " "){setSpell22("X")}
                else {setSpell22(" ")}}}><Text style={styles.spellSlotButtonX}>{spell22}</Text></Pressable>
        </Text>)}
        {(currentSpells[2] === "3") && (<Text>
            <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                if (spell21 === " "){setSpell21("X")}
                else {setSpell21(" ")}}}><Text style={styles.spellSlotButtonX}>{spell21}</Text></Pressable>
            <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                if (spell22 === " "){setSpell22("X")}
                else {setSpell22(" ")}}}><Text style={styles.spellSlotButtonX}>{spell22}</Text></Pressable>
            <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                if (spell23 === " "){setSpell23("X")}
                else {setSpell23(" ")}}}><Text style={styles.spellSlotButtonX}>{spell23}</Text></Pressable>
        </Text>)}
        </View>}
        </View>


        <View style={styles.spellRow}>
            {has3rdLevelSpell && <Text style={styles.spellText}> 3rd Level Spells ({currentSpells[3]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[3] === "2") && (<Text>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    if (spell31 === " "){setSpell31("X")}
                    else {setSpell31(" ")}}}><Text style={styles.spellSlotButtonX}>{spell31}</Text></Pressable>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    if (spell32 === " "){setSpell32("X")}
                    else {setSpell32(" ")}}}><Text style={styles.spellSlotButtonX}>{spell32}</Text></Pressable>
            </Text>)}
            {(currentSpells[3] === "3") && (<Text>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    if (spell31 === " "){setSpell31("X")}
                    else {setSpell31(" ")}}}><Text style={styles.spellSlotButtonX}>{spell31}</Text></Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    if (spell32 === " "){setSpell32("X")}
                    else {setSpell32(" ")}}}><Text style={styles.spellSlotButtonX}>{spell32}</Text></Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    if (spell33 === " "){setSpell33("X")}
                    else {setSpell33(" ")}}}><Text style={styles.spellSlotButtonX}>{spell33}</Text></Pressable>
            </Text>)}
            </View>}
        </View>


        <View style={styles.spellRow}>
            {has4thLevelSpell && <Text style={styles.spellText}> 4th Level Spells ({currentSpells[4]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[4] === "1") && (<Text>
                <Pressable style={styles.SpellSlotButton1} onPress={()=>{
                    if (spell41 === " "){setSpell41("X")}
                    else {setSpell41(" ")}}}><Text style={styles.spellSlotButtonX}>{spell41}</Text></Pressable>
            </Text>)}
            {(currentSpells[4] === "2") && (<Text>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    if (spell41 === " "){setSpell41("X")}
                    else {setSpell41(" ")}}}><Text style={styles.spellSlotButtonX}>{spell41}</Text></Pressable>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    if (spell42 === " "){setSpell42("X")}
                    else {setSpell42(" ")}}}><Text style={styles.spellSlotButtonX}>{spell42}</Text></Pressable>
            </Text>)}
            {(currentSpells[4] === "3") && (<Text>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    if (spell41 === " "){setSpell41("X")}
                    else {setSpell41(" ")}}}><Text style={styles.spellSlotButtonX}>{spell41}</Text></Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    if (spell42 === " "){setSpell42("X")}
                    else {setSpell42(" ")}}}><Text style={styles.spellSlotButtonX}>{spell42}</Text></Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    if (spell43 === " "){setSpell43("X")}
                    else {setSpell43(" ")}}}><Text style={styles.spellSlotButtonX}>{spell43}</Text></Pressable>
            </Text>)}
            </View>}
        </View>


        <View style={styles.spellRow}>
            {has5thLevelSpell && <Text style={styles.spellText}> 5th Level Spells ({currentSpells[5]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[5] === "1") && (<Text>
                <Pressable style={styles.SpellSlotButton1} onPress={()=>{
                    if (spell51 === " "){setSpell51("X")}
                    else {setSpell51(" ")}}}><Text style={styles.spellSlotButtonX}>{spell51}</Text></Pressable>
            </Text>)}
            {(currentSpells[5] === "2") && (<Text>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    if (spell51 === " "){setSpell51("X")}
                    else {setSpell51(" ")}}}><Text style={styles.spellSlotButtonX}>{spell51}</Text></Pressable>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    if (spell52 === " "){setSpell52("X")}
                    else {setSpell52(" ")}}}><Text style={styles.spellSlotButtonX}>{spell52}</Text></Pressable>
            </Text>)}
            {(currentSpells[5] === "3") && (<Text>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    if (spell51 === " "){setSpell51("X")}
                    else {setSpell51(" ")}}}><Text style={styles.spellSlotButtonX}>{spell51}</Text></Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    if (spell52 === " "){setSpell52("X")}
                    else {setSpell52(" ")}}}><Text style={styles.spellSlotButtonX}>{spell52}</Text></Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    if (spell53 === " "){setSpell53("X")}
                    else {setSpell53(" ")}}}><Text style={styles.spellSlotButtonX}>{spell53}</Text></Pressable>
            </Text>)}
            </View>}
        </View>


        <View style={styles.spellRow}>
            {has6thLevelSpell && <Text style={styles.spellText}> 6th Level Spells ({currentSpells[6]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[6] === "1") && (<Text>
                <Pressable style={styles.SpellSlotButton1} onPress={()=>{
                    if (spell61 === " "){setSpell61("X")}
                    else {setSpell61(" ")}}}><Text style={styles.spellSlotButtonX}>{spell61}</Text></Pressable>
            </Text>)}
            {(currentSpells[6] === "2") && (<Text>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    if (spell61 === " "){setSpell61("X")}
                    else {setSpell61(" ")}}}><Text style={styles.spellSlotButtonX}>{spell61}</Text></Pressable>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    if (spell62 === " "){setSpell62("X")}
                    else {setSpell62(" ")}}}><Text style={styles.spellSlotButtonX}>{spell62}</Text></Pressable>
            </Text>)}
            </View>}
        </View>


        <View style={styles.spellRow}>
            {has7thLevelSpell && <Text style={styles.spellText}> 7th Level Spells ({currentSpells[7]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[7] === "1") && (<Text>
            <Pressable style={styles.SpellSlotButton1} onPress={()=>{
                if (spell71 === " "){setSpell71("X")}
                else {setSpell71(" ")}}}><Text style={styles.spellSlotButtonX}>{spell71}</Text></Pressable>
        </Text>)}
            {(currentSpells[7] === "2") && (<Text>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    if (spell71 === " "){setSpell71("X")}
                    else {setSpell71(" ")}}}><Text style={styles.spellSlotButtonX}>{spell71}</Text></Pressable>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    if (spell72 === " "){setSpell72("X")}
                    else {setSpell72(" ")}}}><Text style={styles.spellSlotButtonX}>{spell72}</Text></Pressable>
            </Text>)}
            </View>}
        </View>


        <View style={styles.spellRow}>
            {has8thLevelSpell && <Text style={styles.spellText}> 8th Level Spells ({currentSpells[8]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[8] === "1") && (<Text>
            <Pressable style={styles.SpellSlotButton1} onPress={()=>{
                if (spell81 === " "){setSpell81("X")}
                else {setSpell81(" ")}}}><Text style={styles.spellSlotButtonX}>{spell81}</Text></Pressable>
        </Text>)}
            </View>}
        </View>


        <View style={styles.spellRow}>
            {has9thLevelSpell && <Text style={styles.spellText}> 9th Level Spells ({currentSpells[9]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[9] === "1") && (<Text>
            <Pressable style={styles.SpellSlotButton1} onPress={()=>{
                if (spell91 === " "){setSpell91("X")}
                else {setSpell91(" ")}}}><Text style={styles.spellSlotButtonX}>{spell91}</Text></Pressable>
        </Text>)}
            </View>}
        </View>
        </View>

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
