import {StyleSheet, Image, Text, View, Pressable} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {useState} from "react";
import {Character} from "@/assets/objects/character";


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
    })});




let allKeys :string[]  = [];
let getAllKeys = async () => {
    return await AsyncStorage.getAllKeys();
}
getAllKeys().then(keysString => {
    keysString.forEach((key) => {
        if (key.startsWith("newCharacter")) {
        allKeys.push(key.replace("newCharacter", ""));
    }});
})



export default function SpellsAbilitiesScreen() {
    if (currentCharacter == null){currentCharacter = new Character("default", 10, 5)}

    let [currentCharacterName, setCurrentCharacterName] = useState(currentCharacter.charName);
    AsyncStorage.removeItem("testArray");



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
                })});
            }}>
                <Text style={{color: "white", fontSize: 50, backgroundColor: "tan", textAlign: "center"}}>{currentCharacterName}
                </Text>
            </Pressable>
        </View>


        {allKeys.map((key :string)=> {
            return (<Text style={{color: "white"}}>{key}</Text>)
        })}


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

});
