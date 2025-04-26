import {StyleSheet, Text, View, Pressable} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import React, { useState} from "react";
import DisplaySpellBox from "@/components/displaySpellBox";
import {useCharacter} from "@/components/characterUpdater";
import headerRandomizer from "@/components/headerRandomizer";
import DisplayAbilitiesOnSpellsAbilitiesTab from "@/components/displayAbilitiesOnSpellsAbilitiesTab";




let headerImage :React.JSX.Element = headerRandomizer();
export default function SpellsAbilitiesScreen() {
    const character = useCharacter();


    let [displayAllSpells, setDisplayAllSpells] = useState(false);
    let [displayAbilities, setDisplayAbilities] = useState(false);

    let [display0thSpells, setDisplay0thSpells] = useState(false);
    let [display1stSpells, setDisplay1stSpells] = useState(false);
    let [display2ndSpells, setDisplay2ndSpells] = useState(false);
    let [display3rdSpells, setDisplay3rdSpells] = useState(false);
    let [display4thSpells, setDisplay4thSpells] = useState(false);
    let [display5thSpells, setDisplay5thSpells] = useState(false);
    let [display6thSpells, setDisplay6thSpells] = useState(false);
    let [display7thSpells, setDisplay7thSpells] = useState(false);
    let [display8thSpells, setDisplay8thSpells] = useState(false);
    let [display9thSpells, setDisplay9thSpells] = useState(false);
    let [haveQuantity0thSpells, setHaveQuantity0thSpells] = useState(0);
    let [haveQuantity1stSpells, setHaveQuantity1stSpells] = useState(0);
    let [haveQuantity2ndSpells, setHaveQuantity2ndSpells] = useState(0);
    let [haveQuantity3rdSpells, setHaveQuantity3rdSpells] = useState(0);
    let [haveQuantity4thSpells, setHaveQuantity4thSpells] = useState(0);
    let [haveQuantity5thSpells, setHaveQuantity5thSpells] = useState(0);
    let [haveQuantity6thSpells, setHaveQuantity6thSpells] = useState(0);
    let [haveQuantity7thSpells, setHaveQuantity7thSpells] = useState(0);
    let [haveQuantity8thSpells, setHaveQuantity8thSpells] = useState(0);
    let [haveQuantity9thSpells, setHaveQuantity9thSpells] = useState(0);

    function updateQuantityOfSpellsByLevel(){
        let spells0 = 0;
        let spells1 = 0;
        let spells2 = 0;
        let spells3 = 0;
        let spells4 = 0;
        let spells5 = 0;
        let spells6 = 0;
        let spells7 = 0;
        let spells8 = 0;
        let spells9 = 0;
        character.spells.map(spell => {
            if (spell.spellLevel == 0){spells0++;}
            if (spell.spellLevel == 1){spells1++;}
            if (spell.spellLevel == 2){spells2++;}
            if (spell.spellLevel == 3){spells3++;}
            if (spell.spellLevel == 4){spells4++;}
            if (spell.spellLevel == 5){spells5++;}
            if (spell.spellLevel == 6){spells6++;}
            if (spell.spellLevel == 7){spells7++;}
            if (spell.spellLevel == 8){spells8++;}
            if (spell.spellLevel == 9){spells9++;}
        })
        setHaveQuantity0thSpells(spells0);
        setHaveQuantity1stSpells(spells1);
        setHaveQuantity2ndSpells(spells2);
        setHaveQuantity3rdSpells(spells3);
        setHaveQuantity4thSpells(spells4);
        setHaveQuantity5thSpells(spells5);
        setHaveQuantity6thSpells(spells6);
        setHaveQuantity7thSpells(spells7);
        setHaveQuantity8thSpells(spells8);
        setHaveQuantity9thSpells(spells9);
    }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#60D0D0', dark: '#353636' }}
      headerImage={
          headerImage
      }>
        <Pressable onPress={()=> {
            setDisplayAllSpells(!displayAllSpells);
            setDisplayAbilities(false);
            setDisplay0thSpells(false);
            setDisplay1stSpells(false);
            setDisplay2ndSpells(false);
            setDisplay3rdSpells(false);
            setDisplay4thSpells(false);
            setDisplay5thSpells(false);
            setDisplay6thSpells(false);
            setDisplay7thSpells(false);
            setDisplay8thSpells(false);
            setDisplay9thSpells(false);
            updateQuantityOfSpellsByLevel();
        }}>
            <Text style={styles.displayAllSpells}>{displayAllSpells ? "Close" : "Open"} All Spells</Text>
        </Pressable>
        {displayAllSpells && <View>
            {character.spells.length === 0 && <Text style={styles.displaySpells}>Character has no Spells</Text>}
            {haveQuantity0thSpells > 0 && <Pressable onPress={() => {setDisplay0thSpells(!display0thSpells)}}>
                <Text style={styles.displaySpells}>{display0thSpells ? "Close" : "Open"} Cantrips: {haveQuantity0thSpells}</Text>
            </Pressable>}
            {display0thSpells && <View>{DisplaySpellBox(0)}</View>}
            {haveQuantity1stSpells && <Pressable onPress={()=> {setDisplay1stSpells(!display1stSpells)}}>
                <Text style={styles.displaySpells}>{display1stSpells ? "Close" : "Open"} 1st Level Spells: {haveQuantity1stSpells}</Text>
            </Pressable>}
            {display1stSpells && <View>{DisplaySpellBox(1)}</View>}
            {haveQuantity2ndSpells && <Pressable onPress={()=> {setDisplay2ndSpells(!display2ndSpells)}}>
                <Text style={styles.displaySpells}>{display2ndSpells ? "Close" : "Open"} 2nd Level Spells: {haveQuantity2ndSpells}</Text>
            </Pressable>}
            {display2ndSpells && <View>{DisplaySpellBox(2)}</View>}
            {haveQuantity3rdSpells && <Pressable onPress={()=> {setDisplay3rdSpells(!display3rdSpells)}}>
                <Text style={styles.displaySpells}>{display3rdSpells ? "Close" : "Open"} 3rd Level Spells: {haveQuantity3rdSpells}</Text>
            </Pressable>}
            {display3rdSpells && <View>{DisplaySpellBox(3)}</View>}
            {haveQuantity4thSpells && <Pressable onPress={()=> {setDisplay4thSpells(!display4thSpells)}}>
                <Text style={styles.displaySpells}>{display4thSpells ? "Close" : "Open"} 4th Level Spells: {haveQuantity4thSpells}</Text>
            </Pressable>}
            {display4thSpells && <View>{DisplaySpellBox(4)}</View>}
            {haveQuantity5thSpells && <Pressable onPress={()=> {setDisplay5thSpells(!display5thSpells)}}>
                <Text style={styles.displaySpells}>{display5thSpells ? "Close" : "Open"} 5th Level Spells: {haveQuantity5thSpells}</Text>
            </Pressable>}
            {display5thSpells && <View>{DisplaySpellBox(5)}</View>}
            {haveQuantity6thSpells && <Pressable onPress={()=> {setDisplay6thSpells(!display6thSpells)}}>
                <Text style={styles.displaySpells}>{display6thSpells ? "Close" : "Open"} 6th Level Spells: {haveQuantity6thSpells}</Text>
            </Pressable>}
            {display6thSpells && <View>{DisplaySpellBox(6)}</View>}
            {haveQuantity7thSpells && <Pressable onPress={()=> {setDisplay7thSpells(!display7thSpells)}}>
                <Text style={styles.displaySpells}>{display7thSpells ? "Close" : "Open"} 7th Level Spells: {haveQuantity7thSpells}</Text>
            </Pressable>}
            {display7thSpells && <View>{DisplaySpellBox(7)}</View>}
            {haveQuantity8thSpells && <Pressable onPress={()=> {setDisplay8thSpells(!display8thSpells)}}>
                <Text style={styles.displaySpells}>{display8thSpells ? "Close" : "Open"} 8th Level Spells: {haveQuantity8thSpells}</Text>
            </Pressable>}
            {display8thSpells && <View>{DisplaySpellBox(8)}</View>}
            {haveQuantity9thSpells && <Pressable onPress={()=> {setDisplay9thSpells(!display9thSpells)}}>
                <Text style={styles.displaySpells}>{display9thSpells ? "Close" : "Open"} 9th Level Spells: {haveQuantity9thSpells}</Text>
            </Pressable>}
            {display9thSpells && <View>{DisplaySpellBox(9)}</View>}
        </View>}

        <Pressable onPress={()=> {
            setDisplayAbilities(!displayAbilities);
            setDisplayAllSpells(false);
            setDisplay0thSpells(false);
            setDisplay1stSpells(false);
            setDisplay2ndSpells(false);
            setDisplay3rdSpells(false);
            setDisplay4thSpells(false);
            setDisplay5thSpells(false);
            setDisplay6thSpells(false);
            setDisplay7thSpells(false);
            setDisplay8thSpells(false);
            setDisplay9thSpells(false);
            updateQuantityOfSpellsByLevel();
        }}>
            <Text style={styles.displayAllSpells}>{displayAbilities ? "Close" : "Open"} Abilities</Text>
        </Pressable>
        {displayAbilities && character.abilities.length === 0 && <Text style={styles.displaySpells}>Character has no Abilities</Text>}
        {displayAbilities && DisplayAbilitiesOnSpellsAbilitiesTab()}


    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
    headImage: {
        height: "100%",
        width: "100%",
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    displayAllSpells: {
        color: "white",
        fontSize: 24,
        backgroundColor: "purple",
        borderRadius: 12,
        width: 250,
        padding: 10,
        borderColor: "orange",
        borderWidth: 5,
    },
    displaySpells: {
        color: "white",
        fontSize: 16,
        backgroundColor: "purple",
        borderRadius: 12,
        width: 230,
        padding: 5,
        borderColor: "orange",
        borderWidth: 3,
        marginLeft: 35,
        marginBottom: 5,
    },
});
