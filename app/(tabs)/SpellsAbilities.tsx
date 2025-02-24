import {StyleSheet, Image, Text, View, Pressable} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import React, {useState} from "react";
import {Character} from "@/assets/classes/character";
import {useNavigation} from "@react-navigation/native";
import DisplaySpellBox from "@/components/displaySpellBox";


let initializingName :string|null;
let getNameAsString = async () => {
    return await AsyncStorage.getItem("currentCharacterName");
    }

let currentCharacter = new Character("defaultSSR", 10, 5);
let getCurrentCharacterObjectStringPromise = async (nameString :string|null) => {
    return await AsyncStorage.getItem("newCharacter" + nameString);
}
getNameAsString().then(nameString => {
    initializingName = nameString;
    getCurrentCharacterObjectStringPromise(initializingName).then(objectString => {
        let currentCharacterObjectString = objectString;
        if (currentCharacterObjectString != null) {
            currentCharacter = JSON.parse(currentCharacterObjectString);
        }
    })
});



export default function SpellsAbilitiesScreen() {
    if (currentCharacter == null){currentCharacter = new Character("default", 10, 5)}

    let [currentCharacterName, setCurrentCharacterName] = useState(currentCharacter.charName);
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
    let [displayAllSpells, setDisplayAllSpells] = useState(false);
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
        currentCharacter.spells.map(spell => {
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


    const navigation = useNavigation();
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getNameAsString().then(nameString => {
                getCurrentCharacterObjectStringPromise(nameString).then(objectString => {
                    if (objectString != null) {
                        currentCharacter = JSON.parse(objectString);
                    }
                    setCurrentCharacterName(currentCharacter.charName);
                    updateQuantityOfSpellsByLevel();
                });
            });
        });
        return unsubscribe;
    }, [navigation]);



  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#60D0D0', dark: '#353636' }}
      headerImage={
          <Image
              source={require('@/assets/images/headerImageDragons.jpg')}
              style={styles.headImage}
          />
      }>


        <View style={{marginBottom: 20, backgroundColor: 'black'}}>
            <Pressable onPress={()=> {
                getNameAsString().then(nameString => {
                    initializingName = nameString;
                    getCurrentCharacterObjectStringPromise(initializingName).then(objectString => {
                        let currentCharacterObjectString = objectString;
                        if (currentCharacterObjectString != null) {
                            currentCharacter = JSON.parse(currentCharacterObjectString);
                        }
                        setCurrentCharacterName(currentCharacter.charName);
                        updateQuantityOfSpellsByLevel();
                    });
                });
            }}>
                <Text style={{color: "white", fontSize: 50, backgroundColor: "tan", textAlign: "center"}}>{currentCharacterName}
                </Text>
            </Pressable>
        </View>
        <Pressable onPress={()=> {
            setDisplayAllSpells(!displayAllSpells);
            updateQuantityOfSpellsByLevel();
        }}>
            {!displayAllSpells && <Text style={styles.displayAllSpells}>Open All Spells</Text>}
            {displayAllSpells && <Text style={styles.displayAllSpells}>Close All Spells</Text>}
        </Pressable>
        {displayAllSpells && <View>
            <Pressable onPress={()=> {setDisplay0thSpells(!display0thSpells)}}>
                {!display0thSpells && <Text style={styles.displaySpells}>Open Cantrips: {haveQuantity0thSpells}</Text>}
                {display0thSpells && <Text style={styles.displaySpells}>Close Cantrips: {haveQuantity0thSpells}</Text>}
            </Pressable>
        {display0thSpells && <View>{DisplaySpellBox(currentCharacter, 0)}</View>}
            <Pressable onPress={()=> {setDisplay1stSpells(!display1stSpells)}}>
                {!display1stSpells && <Text style={styles.displaySpells}>Open 1st Level Spells: {haveQuantity1stSpells}</Text>}
                {display1stSpells && <Text style={styles.displaySpells}>Close 1st Level Spells: {haveQuantity1stSpells}</Text>}
            </Pressable>
        {display1stSpells && <View>{DisplaySpellBox(currentCharacter, 1)}</View>}
            <Pressable onPress={()=> {setDisplay2ndSpells(!display2ndSpells)}}>
                {!display2ndSpells && <Text style={styles.displaySpells}>Open 2nd Level Spells: {haveQuantity2ndSpells}</Text>}
                {display2ndSpells && <Text style={styles.displaySpells}>Close 2nd Level Spells: {haveQuantity2ndSpells}</Text>}
            </Pressable>
        {display2ndSpells && <View>{DisplaySpellBox(currentCharacter, 2)}</View>}
            <Pressable onPress={()=> {setDisplay3rdSpells(!display3rdSpells)}}>
                {!display3rdSpells && <Text style={styles.displaySpells}>Open 3rd Level Spells: {haveQuantity3rdSpells}</Text>}
                {display3rdSpells && <Text style={styles.displaySpells}>Close 3rd Level Spells: {haveQuantity3rdSpells}</Text>}
            </Pressable>
        {display3rdSpells && <View>{DisplaySpellBox(currentCharacter, 3)}</View>}
            <Pressable onPress={()=> {setDisplay4thSpells(!display4thSpells)}}>
                {!display4thSpells && <Text style={styles.displaySpells}>Open 4th Level Spells: {haveQuantity4thSpells}</Text>}
                {display4thSpells && <Text style={styles.displaySpells}>Close 4th Level Spells: {haveQuantity4thSpells}</Text>}
            </Pressable>
        {display4thSpells && <View>{DisplaySpellBox(currentCharacter, 4)}</View>}
            <Pressable onPress={()=> {setDisplay5thSpells(!display5thSpells)}}>
                {!display5thSpells && <Text style={styles.displaySpells}>Open 5th Level Spells: {haveQuantity5thSpells}</Text>}
                {display5thSpells && <Text style={styles.displaySpells}>Close 5th Level Spells: {haveQuantity5thSpells}</Text>}
            </Pressable>
        {display5thSpells && <View>{DisplaySpellBox(currentCharacter, 5)}</View>}
            <Pressable onPress={()=> {setDisplay6thSpells(!display6thSpells)}}>
                {!display6thSpells && <Text style={styles.displaySpells}>Open 6th Level Spells: {haveQuantity6thSpells}</Text>}
                {display6thSpells && <Text style={styles.displaySpells}>Close 6th Level Spells: {haveQuantity6thSpells}</Text>}
            </Pressable>
        {display6thSpells && <View>{DisplaySpellBox(currentCharacter, 6)}</View>}
            <Pressable onPress={()=> {setDisplay7thSpells(!display7thSpells)}}>
                {!display7thSpells && <Text style={styles.displaySpells}>Open 7th Level Spells: {haveQuantity7thSpells}</Text>}
                {display7thSpells && <Text style={styles.displaySpells}>Close 7th Level Spells: {haveQuantity7thSpells}</Text>}
            </Pressable>
        {display7thSpells && <View>{DisplaySpellBox(currentCharacter, 7)}</View>}
            <Pressable onPress={()=> {setDisplay8thSpells(!display8thSpells)}}>
                {!display8thSpells && <Text style={styles.displaySpells}>Open 8th Level Spells: {haveQuantity8thSpells}</Text>}
                {display8thSpells && <Text style={styles.displaySpells}>Close 8th Level Spells: {haveQuantity8thSpells}</Text>}
            </Pressable>
        {display8thSpells && <View>{DisplaySpellBox(currentCharacter, 8)}</View>}
            <Pressable onPress={()=> {setDisplay9thSpells(!display9thSpells)}}>
                {!display9thSpells && <Text style={styles.displaySpells}>Open 9th Level Spells: {haveQuantity9thSpells}</Text>}
                {display9thSpells && <Text style={styles.displaySpells}>Close 9th Level Spells: {haveQuantity9thSpells}</Text>}
            </Pressable>
        {display9thSpells && <View>{DisplaySpellBox(currentCharacter, 9)}</View>}
        </View>}


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
