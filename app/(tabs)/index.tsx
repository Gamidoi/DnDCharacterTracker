import { StyleSheet, TextInput, View, Text, Pressable} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import React, {useState} from "react";
import {spellSlotsByLevel} from '@/assets/classes/spellSlotsByLevel';
import {useCharacter, useCharacterUpdater} from '@/components/characterUpdater';
import headerRandomizer from "@/components/headerRandomizer";
import DisplayPassivesOnIndexTab from "@/components/displayPassivesOnIndexTab";



let headerImage :React.JSX.Element = headerRandomizer();
export default function MainCharacterSyndrome() {
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();

    let [incrementHP, setIncrementHP] = useState("0");
    let currentSpells :string = spellSlotsByLevel(character.spellcastingLevel);
    function lableWarlockSpellLevel(warlockCasterLevel: number) :string {
        if (warlockCasterLevel > 0 && warlockCasterLevel < 3) {return "1st Level"}
        if (warlockCasterLevel >= 3 && warlockCasterLevel < 5) {return "2nd Level"}
        if (warlockCasterLevel >= 5 && warlockCasterLevel < 7) {return "3rd Level"}
        if (warlockCasterLevel >= 7 && warlockCasterLevel < 9) {return "4th Level"}
        if (warlockCasterLevel >= 9) {return "5th Level"}
        return "0th ooops!"
    }
    function resistanceImmunityDisplayString(listOfResistImmune: string[]){
        let displayString = listOfResistImmune[0];
        for (let i = 1; i < listOfResistImmune.length; i++){
            displayString += ", " + listOfResistImmune[i];
        }
        return <Text style={[
            styles.labels,
            {
                fontSize: 15,
                borderRadius: 7,
                borderWidth: 2,
                borderColor: "orange",
                marginHorizontal: 5,
            }
        ]}>{displayString}</Text>;
    }



  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#1D3D47', dark: '#1D3D47' }}
      headerImage={
          headerImage
      }>

        <View style={{marginBottom: 20, backgroundColor: 'black'}}>
            <Text style={{color: "white", fontSize: 28}}>current HP is {character.currentHP} / {character.maxHP}</Text>
            <Text>
                <Pressable
                    style={{
                        backgroundColor: "maroon",
                        padding: 13,
                        borderRadius: 12,
                        width: 122,
                        height: 42}}
                    onPress={() => {
                        if (typeof(character.currentHP) != "number"){characterUpdater({type: "updateCurrentHP", value: character.maxHP})}
                        if (!isNaN(parseInt(incrementHP))){
                            if (parseInt(incrementHP) < 0){incrementHP = "" +  Math.abs(parseInt(incrementHP))}
                            if (character.currentHP - parseInt(incrementHP) < 0) {
                                characterUpdater({type: "updateCurrentHP", value: 0})
                        } else {
                                characterUpdater({type: "updateCurrentHP", value: (character.currentHP - parseInt(incrementHP))})
                        }
                    }
                }}>
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
                        if (typeof(character.currentHP) != "number"){characterUpdater({type: "updateCurrentHP", value: character.maxHP})}
                        if (!isNaN(parseInt(incrementHP))){
                            if (parseInt(incrementHP) < 0){incrementHP = "" +  Math.abs(parseInt(incrementHP))}
                            if (character.currentHP + parseInt(incrementHP) > character.maxHP) {
                                characterUpdater({type: "updateCurrentHP", value: character.maxHP})
                        } else {
                            characterUpdater({type: "updateCurrentHP", value: (character.currentHP + parseInt(incrementHP))})
                        }
                }}}>
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

        {(character.resistances.length + character.immunities.length > 0 && character.resistances[0] + character.immunities[0] != "") && <View style={{
            borderWidth: 2,
            borderColor: "orange",
            borderRadius: 10,
            backgroundColor: "blue",

        }}>
            <Text style={styles.labels}>Grants</Text>
            <View style={{alignSelf: "center", flexDirection: "row", width: 350}}>
                {character.resistances.length > 0 && <View style={{flex: character.immunities.length > 0 ? 0.50 : 1}}>
                    <Text style={styles.labels}>Resistance to:</Text>
                    {resistanceImmunityDisplayString(character.resistances)}
                </View>}
                {character.immunities.length > 0 && <View style={{flex: character.resistances.length > 0 ? 0.50 : 1}}>
                    <Text style={styles.labels}>Immunity to:</Text>
                    {resistanceImmunityDisplayString(character.immunities)}
                </View>}
            </View>
        </View>}

        {character.spellcastingLevel > 0 && <View style={{backgroundColor: 'black'}}>
            <View style={styles.spellRow}>
        {character.spellcastingLevel > 0 && <Text style={styles.spellText}> 1st Level Spells ({currentSpells[1]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[1] === "2") && <Text>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 0})
                }}>{character.currentUsedSpells[0] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 1})
                }}>{character.currentUsedSpells[1] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
            </Text>}
            {(currentSpells[1] === "3") && <Text>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 0})
                }}>{character.currentUsedSpells[0] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 1})
                }}>{character.currentUsedSpells[1] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 2})
                }}>{character.currentUsedSpells[2] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
            </Text>}
            {(currentSpells[1] === "4") && <Text>
                <Pressable style={styles.SpellSlotButton4} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 0})
                }}>{character.currentUsedSpells[0] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
                <Pressable style={styles.SpellSlotButton4} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 1})
                }}>{character.currentUsedSpells[1] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
                <Pressable style={styles.SpellSlotButton4} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 2})
                }}>{character.currentUsedSpells[2] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
                <Pressable style={styles.SpellSlotButton4} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 3})}}>
                    <Text style={styles.spellSlotButtonX}>{character.currentUsedSpells[3] === "X" ? "X" : " "}</Text>
                </Pressable>
            </Text>}
        </View>}
        </View>


        <View style={styles.spellRow}>
            {character.spellcastingLevel > 2 && <Text style={styles.spellText}> 2nd Level Spells ({currentSpells[2]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[2] === "2") && <Text>
            <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                characterUpdater({type: "updateSpellSlots", spellSlot: 4})
            }}>{character.currentUsedSpells[4] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                <Text style={styles.spellSlotButtonX}> </Text>
            </Pressable>
            <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                characterUpdater({type: "updateSpellSlots", spellSlot: 5})
            }}>{character.currentUsedSpells[5] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                <Text style={styles.spellSlotButtonX}> </Text>
            </Pressable>
        </Text>}
        {(currentSpells[2] === "3") && <Text>
            <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                characterUpdater({type: "updateSpellSlots", spellSlot: 4})
            }}>{character.currentUsedSpells[4] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                <Text style={styles.spellSlotButtonX}> </Text>
            </Pressable>
            <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                characterUpdater({type: "updateSpellSlots", spellSlot: 5})
            }}>{character.currentUsedSpells[5] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                <Text style={styles.spellSlotButtonX}> </Text>
            </Pressable>
            <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                characterUpdater({type: "updateSpellSlots", spellSlot: 6})
            }}>{character.currentUsedSpells[6] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                <Text style={styles.spellSlotButtonX}> </Text>
            </Pressable>
        </Text>}
        </View>}
        </View>


        <View style={styles.spellRow}>
            {character.spellcastingLevel > 4 && <Text style={styles.spellText}> 3rd Level Spells ({currentSpells[3]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[3] === "2") && <Text>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 7})
                }}>{character.currentUsedSpells[7] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 8})
                }}>{character.currentUsedSpells[8] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
            </Text>}
            {(currentSpells[3] === "3") && <Text>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 7})
                }}>{character.currentUsedSpells[7] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 8})
                }}>{character.currentUsedSpells[8] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 9})
                }}>{character.currentUsedSpells[9] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
            </Text>}
            </View>}
        </View>


        <View style={styles.spellRow}>
            {character.spellcastingLevel > 6 && <Text style={styles.spellText}> 4th Level Spells ({currentSpells[4]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[4] === "1") && <Text>
                <Pressable style={styles.SpellSlotButton1} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 10})
                }}>{character.currentUsedSpells[10] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
            </Text>}
            {(currentSpells[4] === "2") && <Text>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 10})
                }}>{character.currentUsedSpells[10] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 11})
                }}>{character.currentUsedSpells[11] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
            </Text>}
            {(currentSpells[4] === "3") && <Text>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 10})
                }}>{character.currentUsedSpells[10] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 11})
                }}>{character.currentUsedSpells[11] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 12})
                }}>{character.currentUsedSpells[12] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
            </Text>}
            </View>}
        </View>


        <View style={styles.spellRow}>
            {character.spellcastingLevel > 8 && <Text style={styles.spellText}> 5th Level Spells ({currentSpells[5]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[5] === "1") && <Text>
                <Pressable style={styles.SpellSlotButton1} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 13})
                }}>{character.currentUsedSpells[13] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
            </Text>}
            {(currentSpells[5] === "2") && <Text>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 13})
                }}>{character.currentUsedSpells[13] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 14})
                }}>{character.currentUsedSpells[14] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
            </Text>}
            {(currentSpells[5] === "3") && <Text>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 13})
                }}>{character.currentUsedSpells[13] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 14})
                }}>{character.currentUsedSpells[14] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 15})
                }}>{character.currentUsedSpells[15] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
            </Text>}
            </View>}
        </View>


        <View style={styles.spellRow}>
            {character.spellcastingLevel > 10 && <Text style={styles.spellText}> 6th Level Spells ({currentSpells[6]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[6] === "1") && <Text>
                <Pressable style={styles.SpellSlotButton1} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 16})
                }}>{character.currentUsedSpells[16] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
            </Text>}
            {(currentSpells[6] === "2") && <Text>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 16})
                }}>{character.currentUsedSpells[16] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 17})
                }}>{character.currentUsedSpells[17] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
            </Text>}
            </View>}
        </View>


        <View style={styles.spellRow}>
            {character.spellcastingLevel > 12 && <Text style={styles.spellText}> 7th Level Spells ({currentSpells[7]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[7] === "1") && <Text>
            <Pressable style={styles.SpellSlotButton1} onPress={()=>{
                characterUpdater({type: "updateSpellSlots", spellSlot: 18})
            }}>{character.currentUsedSpells[18] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                <Text style={styles.spellSlotButtonX}> </Text>
            </Pressable>
        </Text>}
            {(currentSpells[7] === "2") && <Text>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 18})
                }}>{character.currentUsedSpells[18] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    characterUpdater({type: "updateSpellSlots", spellSlot: 19})
                }}>{character.currentUsedSpells[19] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                    <Text style={styles.spellSlotButtonX}> </Text>
                </Pressable>
            </Text>}
            </View>}
        </View>


        <View style={styles.spellRow}>
            {character.spellcastingLevel > 14 && <Text style={styles.spellText}> 8th Level Spells ({currentSpells[8]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[8] === "1") && <Text>
            <Pressable style={styles.SpellSlotButton1} onPress={()=>{
                characterUpdater({type: "updateSpellSlots", spellSlot: 20})
            }}>{character.currentUsedSpells[20] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                <Text style={styles.spellSlotButtonX}> </Text>
            </Pressable>
        </Text>}
            </View>}
        </View>


        <View style={styles.spellRow}>
            {character.spellcastingLevel > 16 && <Text style={styles.spellText}> 9th Level Spells ({currentSpells[9]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[9] === "1") && (<Text>
            <Pressable style={styles.SpellSlotButton1} onPress={()=>{
                characterUpdater({type: "updateSpellSlots", spellSlot: 21})
            }}>{character.currentUsedSpells[21] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                <Text style={styles.spellSlotButtonX}> </Text>
            </Pressable>
        </Text>)}
            </View>}
        </View>
        </View>}



        {character.warlockCasterLevel > 0 && <View style={{backgroundColor: 'black'}}>
            <View style={styles.spellRow}>
                <View style={styles.spellText}><Text style={styles.spellText}>Warlock Spells</Text>
                    <Text style={styles.spellText}>{lableWarlockSpellLevel(character.warlockCasterLevel)}</Text></View>
                <View style={[styles.spellSlotButtonRow, {marginTop: 12}]}>
                    {character.warlockCasterLevel == 1 && (<Text>
                        <Pressable style={[styles.SpellSlotButton1, {backgroundColor: "purple"}]} onPress={()=>{
                            characterUpdater({type: "updateWarlockSpellSlots", spellSlot: 0})
                        }}>{character.warlockCurrentUsedSpells[0] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                            <Text style={styles.spellSlotButtonX}> </Text>
                        </Pressable>
                    </Text>)}
                    {(character.warlockCasterLevel > 1 && character.warlockCasterLevel < 12) && (<Text>
                        <Pressable style={[styles.SpellSlotButton2, {backgroundColor: "purple"}]} onPress={()=>{
                            characterUpdater({type: "updateWarlockSpellSlots", spellSlot: 0})
                        }}>{character.warlockCurrentUsedSpells[0] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                            <Text style={styles.spellSlotButtonX}> </Text>
                        </Pressable>
                        <Pressable style={[styles.SpellSlotButton2, {backgroundColor: "purple"}]} onPress={()=>{
                            characterUpdater({type: "updateWarlockSpellSlots", spellSlot: 1})
                        }}>{character.warlockCurrentUsedSpells[1] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                            <Text style={styles.spellSlotButtonX}> </Text>
                        </Pressable>
                    </Text>)}
                    {(character.warlockCasterLevel > 11 && character.warlockCasterLevel < 17) && (<Text>
                        <Pressable style={[styles.SpellSlotButton3, {backgroundColor: "purple"}]} onPress={()=>{
                            characterUpdater({type: "updateWarlockSpellSlots", spellSlot: 0})
                        }}>{character.warlockCurrentUsedSpells[0] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                            <Text style={styles.spellSlotButtonX}> </Text>
                        </Pressable>
                        <Pressable style={[styles.SpellSlotButton3, {backgroundColor: "purple"}]} onPress={()=>{
                            characterUpdater({type: "updateWarlockSpellSlots", spellSlot: 1})
                        }}>{character.warlockCurrentUsedSpells[1] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                            <Text style={styles.spellSlotButtonX}> </Text>
                        </Pressable>
                        <Pressable style={[styles.SpellSlotButton3, {backgroundColor: "purple"}]} onPress={()=>{
                            characterUpdater({type: "updateWarlockSpellSlots", spellSlot: 2})
                        }}>{character.warlockCurrentUsedSpells[2] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                            <Text style={styles.spellSlotButtonX}> </Text>
                        </Pressable>
                    </Text>)}
                    {character.warlockCasterLevel > 16 && (<Text>
                        <Pressable style={[styles.SpellSlotButton4, {backgroundColor: "purple"}]} onPress={()=>{
                            characterUpdater({type: "updateWarlockSpellSlots", spellSlot: 0})
                        }}>{character.warlockCurrentUsedSpells[0] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                            <Text style={styles.spellSlotButtonX}> </Text>
                        </Pressable>
                        <Pressable style={[styles.SpellSlotButton4, {backgroundColor: "purple"}]} onPress={()=>{
                            characterUpdater({type: "updateWarlockSpellSlots", spellSlot: 1})
                        }}>{character.warlockCurrentUsedSpells[1] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                            <Text style={styles.spellSlotButtonX}> </Text>
                        </Pressable>
                        <Pressable style={[styles.SpellSlotButton4, {backgroundColor: "purple"}]} onPress={()=>{
                            characterUpdater({type: "updateWarlockSpellSlots", spellSlot: 2})
                        }}>{character.warlockCurrentUsedSpells[2] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                            <Text style={styles.spellSlotButtonX}> </Text>
                        </Pressable>
                        <Pressable style={[styles.SpellSlotButton4, {backgroundColor: "purple"}]} onPress={()=>{
                            characterUpdater({type: "updateWarlockSpellSlots", spellSlot: 3})
                        }}>{character.warlockCurrentUsedSpells[3] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}
                            <Text style={styles.spellSlotButtonX}> </Text>
                        </Pressable>
                    </Text>)}
                </View>
            </View>
        </View>}

        {DisplayPassivesOnIndexTab()}


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
        fontWeight: 'bold',
        margin: -13,
        fontSize: 40,
        textAlign: 'center',
    },
    labels: {
        color: "white",
        textAlign: "center",
        fontSize: 12,
    },
});
