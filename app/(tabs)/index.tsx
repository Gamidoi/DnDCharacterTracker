import { Image, StyleSheet, TextInput, View, Text, Pressable} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import React, {useState} from "react";
import {spellSlotsByLevel} from '@/assets/classes/spellSlotsByLevel';
import {CharacterInfoProvider, useCharacter, useCharacterUpdater} from '@/components/characterUpdater';




export default function MainCharacterSyndrome() {

    let [incrementHP, setIncrementHP] = useState("0");
    let currentSpells :string = spellSlotsByLevel(useCharacter.spellcastingLevel);


    function lableWarlockSpellLevel(warlockCasterLevel: number) :string {
        if (warlockCasterLevel > 0 && warlockCasterLevel < 3) {return "1st Level"}
        if (warlockCasterLevel >= 3 && warlockCasterLevel < 5) {return "2nd Level"}
        if (warlockCasterLevel >= 5 && warlockCasterLevel < 7) {return "3rd Level"}
        if (warlockCasterLevel >= 7 && warlockCasterLevel < 9) {return "4th Level"}
        if (warlockCasterLevel >= 9) {return "5th Level"}
        return "0th ooops!"
    }



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




  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#1D3D47', dark: '#1D3D47' }}
      headerImage={
          headerRandomizer()
      }>

        <View style={{marginBottom: 20, backgroundColor: 'black'}}>
                <Text style={{color: "white", fontSize: 50, backgroundColor: "tan", textAlign: "center"}}>{useCharacter.charName}
                </Text>
        <Text style={{color: "white", fontSize: 28}}>current HP is {useCharacter.currentHP} / {useCharacter.maxHP}</Text>
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
                    if (parseInt(incrementHP) < 0){incrementHP = "" +  Math.abs(parseInt(incrementHP))}
                    if (useCharacter.currentHP - parseInt(incrementHP) < 0) {
                        useCharacterUpdater({type: "updateCurrentHP", value: 0})
                    } else {
                        useCharacterUpdater({type: "updateCurrentHP", value: (useCharacter.currentHP - parseInt(incrementHP))})
                    }
                }}}>
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
                    if (parseInt(incrementHP) < 0){incrementHP = "" +  Math.abs(parseInt(incrementHP))}
                    if (useCharacter.currentHP + parseInt(incrementHP) > useCharacter.maxHP) {
                        useCharacterUpdater({type: "updateCurrentHP", value: useCharacter.maxHP})
                    } else {
                        useCharacterUpdater({type: "updateCurrentHP", value: (useCharacter.currentHP + parseInt(incrementHP))})
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

        {useCharacter.spellcastingLevel > 0 && <View style={{backgroundColor: 'black'}}>
            <View style={styles.spellRow}>
        {useCharacter.spellcastingLevel > 0 && <Text style={styles.spellText}> 1st Level Spells ({currentSpells[1]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[1] === "2") && (<Text>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 0})
                }}>{useCharacter.currentUsedSpells[0] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 1})
                }}>{useCharacter.currentUsedSpells[1] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>)}
            {(currentSpells[1] === "3") && (<Text>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 0})
                }}>{useCharacter.currentUsedSpells[0] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 1})
                }}>{useCharacter.currentUsedSpells[1] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 2})
                }}>{useCharacter.currentUsedSpells[2] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>)}
            {(currentSpells[1] === "4") && (<Text>
                <Pressable style={styles.SpellSlotButton4} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 0})
                }}>{useCharacter.currentUsedSpells[0] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton4} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 1})
                }}>{useCharacter.currentUsedSpells[1] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton4} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 2})
                }}>{useCharacter.currentUsedSpells[2] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton4} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 3})
                }}>{useCharacter.currentUsedSpells[3] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>)}
        </View>}
        </View>


        <View style={styles.spellRow}>
            {useCharacter.spellcastingLevel > 2 && <Text style={styles.spellText}> 2nd Level Spells ({currentSpells[2]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[2] === "2") && (<Text>
            <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                useCharacterUpdater({type: "updateSpellSlots", spellSlot: 4})
            }}>{useCharacter.currentUsedSpells[4] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                useCharacterUpdater({type: "updateSpellSlots", spellSlot: 5})
            }}>{useCharacter.currentUsedSpells[5] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
        </Text>)}
        {(currentSpells[2] === "3") && (<Text>
            <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                useCharacterUpdater({type: "updateSpellSlots", spellSlot: 4})
            }}>{useCharacter.currentUsedSpells[4] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                useCharacterUpdater({type: "updateSpellSlots", spellSlot: 5})
            }}>{useCharacter.currentUsedSpells[5] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                useCharacterUpdater({type: "updateSpellSlots", spellSlot: 6})
            }}>{useCharacter.currentUsedSpells[6] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
        </Text>)}
        </View>}
        </View>


        <View style={styles.spellRow}>
            {useCharacter.spellcastingLevel > 4 && <Text style={styles.spellText}> 3rd Level Spells ({currentSpells[3]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[3] === "2") && (<Text>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 7})
                }}>{useCharacter.currentUsedSpells[7] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 8})
                }}>{useCharacter.currentUsedSpells[8] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>)}
            {(currentSpells[3] === "3") && (<Text>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 7})
                }}>{useCharacter.currentUsedSpells[7] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 8})
                }}>{useCharacter.currentUsedSpells[8] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 9})
                }}>{useCharacter.currentUsedSpells[9] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>)}
            </View>}
        </View>


        <View style={styles.spellRow}>
            {useCharacter.spellcastingLevel > 6 && <Text style={styles.spellText}> 4th Level Spells ({currentSpells[4]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[4] === "1") && (<Text>
                <Pressable style={styles.SpellSlotButton1} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 10})
                }}>{useCharacter.currentUsedSpells[10] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>)}
            {(currentSpells[4] === "2") && (<Text>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 10})
                }}>{useCharacter.currentUsedSpells[10] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 11})
                }}>{useCharacter.currentUsedSpells[11] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>)}
            {(currentSpells[4] === "3") && <Text>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 10})
                }}>{useCharacter.currentUsedSpells[10] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 11})
                }}>{useCharacter.currentUsedSpells[11] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 12})
                }}>{useCharacter.currentUsedSpells[12] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>}
            </View>}
        </View>


        <View style={styles.spellRow}>
            {useCharacter.spellcastingLevel > 8 && <Text style={styles.spellText}> 5th Level Spells ({currentSpells[5]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[5] === "1") && <Text>
                <Pressable style={styles.SpellSlotButton1} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 13})
                }}>{useCharacter.currentUsedSpells[13] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>}
            {(currentSpells[5] === "2") && <Text>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 13})
                }}>{useCharacter.currentUsedSpells[13] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 14})
                }}>{useCharacter.currentUsedSpells[14] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>}
            {(currentSpells[5] === "3") && <Text>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 13})
                }}>{useCharacter.currentUsedSpells[13] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 14})
                }}>{useCharacter.currentUsedSpells[14] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton3} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 15})
                }}>{useCharacter.currentUsedSpells[15] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>}
            </View>}
        </View>


        <View style={styles.spellRow}>
            {useCharacter.spellcastingLevel > 10 && <Text style={styles.spellText}> 6th Level Spells ({currentSpells[6]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[6] === "1") && <Text>
                <Pressable style={styles.SpellSlotButton1} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 16})
                }}>{useCharacter.currentUsedSpells[16] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>}
            {(currentSpells[6] === "2") && <Text>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 16})
                }}>{useCharacter.currentUsedSpells[16] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 17})
                }}>{useCharacter.currentUsedSpells[17] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>}
            </View>}
        </View>


        <View style={styles.spellRow}>
            {useCharacter.spellcastingLevel > 12 && <Text style={styles.spellText}> 7th Level Spells ({currentSpells[7]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[7] === "1") && <Text>
            <Pressable style={styles.SpellSlotButton1} onPress={()=>{
                useCharacterUpdater({type: "updateSpellSlots", spellSlot: 18})
            }}>{useCharacter.currentUsedSpells[18] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
        </Text>}
            {(currentSpells[7] === "2") && <Text>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 18})
                }}>{useCharacter.currentUsedSpells[18] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                <Pressable style={styles.SpellSlotButton2} onPress={()=>{
                    useCharacterUpdater({type: "updateSpellSlots", spellSlot: 19})
                }}>{useCharacter.currentUsedSpells[19] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
            </Text>}
            </View>}
        </View>


        <View style={styles.spellRow}>
            {useCharacter.spellcastingLevel > 14 && <Text style={styles.spellText}> 8th Level Spells ({currentSpells[8]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[8] === "1") && <Text>
            <Pressable style={styles.SpellSlotButton1} onPress={()=>{
                useCharacterUpdater({type: "updateSpellSlots", spellSlot: 20})
            }}>{useCharacter.currentUsedSpells[20] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
        </Text>}
            </View>}
        </View>


        <View style={styles.spellRow}>
            {useCharacter.spellcastingLevel > 16 && <Text style={styles.spellText}> 9th Level Spells ({currentSpells[9]})</Text>}
        {<View style={styles.spellSlotButtonRow}> {(currentSpells[9] === "1") && (<Text>
            <Pressable style={styles.SpellSlotButton1} onPress={()=>{
                useCharacterUpdater({type: "updateSpellSlots", spellSlot: 21})
            }}>{useCharacter.currentUsedSpells[21] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
        </Text>)}
            </View>}
        </View>
        </View>}



        {useCharacter.warlockCasterLevel > 0 && <View style={{backgroundColor: 'black'}}>
            <View style={styles.spellRow}>
                <View style={styles.spellText}><Text style={styles.spellText}>Warlock Spells</Text>
                    <Text style={styles.spellText}>{lableWarlockSpellLevel(useCharacter.warlockCasterLevel)}</Text></View>
                <View style={[styles.spellSlotButtonRow, {marginTop: 12}]}>
                    {useCharacter.warlockCasterLevel == 1 && (<Text>
                        <Pressable style={[styles.SpellSlotButton1, {backgroundColor: "purple"}]} onPress={()=>{
                            useCharacterUpdater({type: "updateWarlockSpellSlots", spellSlot: 0})
                        }}>{useCharacter.warlockCurrentUsedSpells[0] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                    </Text>)})
                    {(useCharacter.warlockCasterLevel > 1 && useCharacter.warlockCasterLevel < 12) && (<Text>
                        <Pressable style={[styles.SpellSlotButton2, {backgroundColor: "purple"}]} onPress={()=>{
                            useCharacterUpdater({type: "updateWarlockSpellSlots", spellSlot: 0})
                        }}>{useCharacter.warlockCurrentUsedSpells[0] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                        <Pressable style={[styles.SpellSlotButton2, {backgroundColor: "purple"}]} onPress={()=>{
                            useCharacterUpdater({type: "updateWarlockSpellSlots", spellSlot: 1})
                        }}>{useCharacter.warlockCurrentUsedSpells[1] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                    </Text>)}
                    {(useCharacter.warlockCasterLevel > 11 && useCharacter.warlockCasterLevel < 17) && (<Text>
                        <Pressable style={[styles.SpellSlotButton3, {backgroundColor: "purple"}]} onPress={()=>{
                            useCharacterUpdater({type: "updateWarlockSpellSlots", spellSlot: 0})
                        }}>{useCharacter.warlockCurrentUsedSpells[0] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                        <Pressable style={[styles.SpellSlotButton3, {backgroundColor: "purple"}]} onPress={()=>{
                            useCharacterUpdater({type: "updateWarlockSpellSlots", spellSlot: 1})
                        }}>{useCharacter.warlockCurrentUsedSpells[1] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                        <Pressable style={[styles.SpellSlotButton3, {backgroundColor: "purple"}]} onPress={()=>{
                            useCharacterUpdater({type: "updateWarlockSpellSlots", spellSlot: 2})
                        }}>{useCharacter.warlockCurrentUsedSpells[2] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                    </Text>)}
                    {useCharacter.warlockCasterLevel > 16 && (<Text>
                        <Pressable style={[styles.SpellSlotButton4, {backgroundColor: "purple"}]} onPress={()=>{
                            useCharacterUpdater({type: "updateWarlockSpellSlots", spellSlot: 0})
                        }}>{useCharacter.warlockCurrentUsedSpells[0] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                        <Pressable style={[styles.SpellSlotButton4, {backgroundColor: "purple"}]} onPress={()=>{
                            useCharacterUpdater({type: "updateWarlockSpellSlots", spellSlot: 1})
                        }}>{useCharacter.warlockCurrentUsedSpells[1] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                        <Pressable style={[styles.SpellSlotButton4, {backgroundColor: "purple"}]} onPress={()=>{
                            useCharacterUpdater({type: "updateWarlockSpellSlots", spellSlot: 2})
                        }}>{useCharacter.warlockCurrentUsedSpells[2] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
                        <Pressable style={[styles.SpellSlotButton4, {backgroundColor: "purple"}]} onPress={()=>{
                            useCharacterUpdater({type: "updateWarlockSpellSlots", spellSlot: 3})
                        }}>{useCharacter.warlockCurrentUsedSpells[3] == "X" && <Text style={styles.spellSlotButtonX}>X</Text>}</Pressable>
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
