import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {Character} from "@/assets/classes/character";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState} from "react";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";
import {FontAwesome, MaterialCommunityIcons} from "@expo/vector-icons";

let getCurrentCharacterObjectStringPromise = async (string :string|null) => {
    return await AsyncStorage.getItem("newCharacter" + string);
}
let allCharacterNamesInitial :string[] = [];
let getAllCharacterNames = async () => {
    return await AsyncStorage.getAllKeys();
}
getAllCharacterNames().then(keysString => {
    keysString.forEach((key) => {
        if (key.startsWith("newCharacter")) {
            allCharacterNamesInitial.push(key.replace("newCharacter", ''))}
    });
})


export function CharacterManagementTools(characterManagementToolsDisplay: boolean){
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();

    let [nameChangeVariable, setNameChangeVariable] = useState("");
    let [HPChangeVariable, setHPChangeVariable] = useState("");
    let [characterLevelChangeVariable, setCharacterLevelChangeVariable] = useState("");
    let [addCharacterBoxDisplayStatus, SetAddCharacterBoxDisplayStatus] = useState(false);
    let [addCharacterConfirmationCount, setAddCharacterConfirmationCount] = useState(0);



    let [confirmDelete, setConfirmDelete] = useState(false);
    let [deletionName, setDeletionName] = useState("");
    let [deleteCharacterBoxDisplayStatus, setDeleteCharacterBoxDisplayStatus] = useState(false);
    let [deleteCharacterConfirmationCount, setDeleteCharacterConfirmationCount] = useState(0);

    let [allCharacterNames, setAllCharacterNames] = useState(allCharacterNamesInitial);

    let [loadCharacterBoxDisplayStatus, setLoadCharacterBoxDisplayStatus] = useState(false);
    let [loadCharacterConfirmationCount, setLoadCharacterConfirmationCount] = useState(0);



    return(
        <View>{characterManagementToolsDisplay &&<View>





            <View style={styles.toolBoxStyle}>
                <Pressable style={styles.toolBoxStyle} onPress={() =>
                {setLoadCharacterBoxDisplayStatus(!loadCharacterBoxDisplayStatus);}
                }><View>
                    {!loadCharacterBoxDisplayStatus && <Text style={{color: "white", textAlign: "center", height: 40, marginTop: 15}}>Open Load Character Tool</Text>}
                    {loadCharacterBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Close Load Character Tool</Text>}
                    {loadCharacterBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Select Character Below</Text>}
                </View></Pressable>
                {(loadCharacterBoxDisplayStatus && (loadCharacterConfirmationCount > 0)) &&
                    <Pressable style={styles.confirmationButton} onPress={() => {setLoadCharacterConfirmationCount(0);}}>
                        <Text style={styles.confirmationBox}>Confirmed! Character</Text>
                        <Text style={styles.confirmationBox}>"{character.charName}"</Text>
                        <Text style={styles.confirmationBox}>Loaded! {loadCharacterConfirmationCount} time(s)!</Text>
                    </Pressable>}
                <View style={{alignSelf: "center"}}>
                    {allCharacterNames.map((pickedNameFromLoadCharacterTool) => {
                        return(
                            loadCharacterBoxDisplayStatus && <View><Pressable onPress={() => {
                                setLoadCharacterConfirmationCount(loadCharacterConfirmationCount + 1);
                                AsyncStorage.setItem("currentCharacterName", pickedNameFromLoadCharacterTool);
                                getCurrentCharacterObjectStringPromise(pickedNameFromLoadCharacterTool).then((objectString :string|null) => {
                                    characterUpdater({type: "all", character: JSON.parse("" + objectString)});
                                });
                            }}><Text style={{
                                fontSize: 20,
                                backgroundColor: "maroon",
                                textAlign: "center",
                                margin: 10,
                                height: 50,
                                borderRadius: 30,
                                width: 260,
                                color: "white",
                                paddingTop: 10,
                                borderColor: "orange",
                                borderWidth: 3,
                            }}>{pickedNameFromLoadCharacterTool}</Text></Pressable></View>
                        )})}</View>
            </View>





            <View style={[styles.toolBoxStyle, {marginTop: 16}]}>
                <Pressable style={styles.toolBoxStyle} onPress={() =>
                {SetAddCharacterBoxDisplayStatus(!addCharacterBoxDisplayStatus);}
                }>
                    {!addCharacterBoxDisplayStatus && <Text style={{color: "white", textAlign: "center", height: 40, marginTop: 15}}>Open New Character Creator</Text>}
                    {addCharacterBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Close Character Creator</Text>}
                    {addCharacterBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Enter Name Below</Text>}
                </Pressable>
                {addCharacterBoxDisplayStatus && <View>
                    <TextInput
                        onChangeText={setNameChangeVariable}
                        placeholder={"Name McBoatface"}
                        placeholderTextColor={"grey"}
                        style={{
                            fontSize: 22,
                            borderStyle: "solid",
                            borderWidth: 3,
                            borderColor: "white",
                            width: 250,
                            height: 60,
                            alignSelf: "center",
                            color: "white"
                        }}
                    />
                    <View style={{
                        flexDirection: "row",
                        alignSelf: "center",
                        margin: 10,}}>
                        <View>
                            <Text style={{color: "white", textAlign: "center"}}>Enter initial</Text>
                            <Text style={{color: "white", textAlign: "center"}}>HP Below</Text>
                            <TextInput
                                onChangeText={setHPChangeVariable}
                                keyboardType={"numeric"}
                                maxLength={3}
                                placeholder={"123"}
                                placeholderTextColor={"grey"}
                                style={{
                                    fontSize: 22,
                                    borderStyle: "solid",
                                    borderWidth: 3,
                                    borderColor: "white",
                                    width: 120,
                                    height: 60,
                                    alignSelf: "center",
                                    color: "white",
                                    marginLeft: 10,
                                    marginRight: 10,
                                }}
                            />
                        </View>
                        <View>
                            <Text style={{color: "white", textAlign: "center"}}>Enter Character</Text>
                            <Text style={{color: "white", textAlign: "center"}}>Level</Text>
                            <TextInput
                                onChangeText={setCharacterLevelChangeVariable}
                                keyboardType={"numeric"}
                                maxLength={2}
                                placeholder={"12"}
                                placeholderTextColor={"grey"}
                                style={{
                                    fontSize: 22,
                                    borderStyle: "solid",
                                    borderWidth: 3,
                                    borderColor: "white",
                                    width: 120,
                                    height: 60,
                                    alignSelf: "center",
                                    color: "white",
                                    marginLeft: 10,
                                    marginRight: 10,
                                }}
                            />
                        </View>
                    </View>
                    {addCharacterConfirmationCount > 0 &&
                        <Pressable style={styles.confirmationButton} onPress={() => {setAddCharacterConfirmationCount(0);}}>
                            <Text style={styles.confirmationBox}>Confirmed! New Character</Text>
                            <Text style={styles.confirmationBox}>"{character.charName}"</Text>
                            <Text style={styles.confirmationBox}>Created! {addCharacterConfirmationCount} time(s)!</Text>
                        </Pressable>
                    }
                    <Pressable
                        style={[styles.toolBoxButton, {marginBottom: 10}]}
                        onPress={() => {if (nameChangeVariable != ""){
                            if (isNaN(parseInt(characterLevelChangeVariable)) ||characterLevelChangeVariable == "" || parseInt(characterLevelChangeVariable) < 0)
                            {characterLevelChangeVariable = "1";}
                            if (parseInt(characterLevelChangeVariable) > 20) {characterLevelChangeVariable = "20";}
                            if (isNaN(parseInt(HPChangeVariable)) || HPChangeVariable == "" || parseInt(HPChangeVariable) < 1){HPChangeVariable = "10";}
                            characterUpdater({type: "all", character: new Character(nameChangeVariable, parseInt(HPChangeVariable), parseInt(characterLevelChangeVariable))});
                            setAddCharacterConfirmationCount(addCharacterConfirmationCount + 1);
                            AsyncStorage.setItem("currentCharacterName", nameChangeVariable).then(() => {
                                getAllCharacterNames().then(keysString => {
                                    allCharacterNamesInitial = [];
                                    keysString.forEach((key) => {
                                        if (key.startsWith("newCharacter")) {
                                            allCharacterNamesInitial.push(key.replace("newCharacter", ''))}
                                    });
                                    setAllCharacterNames(allCharacterNamesInitial);
                                })})
                        }}}>
                        <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Add a new Character; {nameChangeVariable}</Text>
                        <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>HP; {HPChangeVariable} Character Level; {characterLevelChangeVariable}</Text>
                    </Pressable>
                </View>}
            </View>



            <View style={[styles.toolBoxStyle, {marginTop: 16}]}>
                <Pressable style={styles.toolBoxStyle} onPress={() =>
                {setDeleteCharacterBoxDisplayStatus(!deleteCharacterBoxDisplayStatus);}
                }><View>
                    {!deleteCharacterBoxDisplayStatus && <Text style={{color: "white", textAlign: "center", height: 40, marginTop: 15}}>Open Delete Character Tool</Text>}
                    {deleteCharacterBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Close Delete Character Tool</Text>}
                    {deleteCharacterBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Select Character Below</Text>}
                </View>
                </Pressable>
                {(deleteCharacterBoxDisplayStatus && (deleteCharacterConfirmationCount > 0)) &&
                    <Pressable onPress={() => {setDeleteCharacterConfirmationCount(0);}}>
                        <Text style={{
                            textAlign: "center",
                            color: "white",
                            fontSize: 25,
                            backgroundColor: "blue",
                            margin: 15,
                            borderRadius: 10
                        }}>Confirmed! Character {character.charName} Deleted <FontAwesome size={28} name="frown-o" color={"red"} /></Text></Pressable>}
                <View style={{alignSelf: "center"}}>
                    {allCharacterNames.map((pickedNameDeleteCharacterTool) => {
                        return(
                            deleteCharacterBoxDisplayStatus && <View><Pressable onPress={() => {
                                setConfirmDelete(!confirmDelete);
                                setDeletionName(pickedNameDeleteCharacterTool);
                            }}><Text style={{
                                fontSize: 20,
                                backgroundColor: "maroon",
                                textAlign: "center",
                                margin: 10,
                                height: 50,
                                borderRadius: 30,
                                width: 260,
                                color: "white",
                                paddingTop: 10,
                                borderColor: "orange",
                                borderWidth: 3,
                            }}>{pickedNameDeleteCharacterTool}</Text></Pressable></View>
                        )})}</View>
                {(deleteCharacterBoxDisplayStatus && confirmDelete) &&
                    <Pressable style={styles.confirmationButton} onPress={() => {
                        setDeleteCharacterConfirmationCount(0);
                        setConfirmDelete(!confirmDelete);}}>
                        <Text style={styles.confirmationBox}>Cancel Character Deletion?</Text>
                        <Text style={styles.confirmationBox}>"{deletionName}"</Text>
                        <Text style={styles.confirmationBox}>\---<FontAwesome size={40} name="smile-o" color={"green"} />---/</Text>
                    </Pressable>}

                {(deleteCharacterBoxDisplayStatus && confirmDelete && (character.charName == deletionName)) && <View>
                    <Text style={{
                        backgroundColor: "yellow",
                        borderColor: "red",
                        borderWidth: 6,
                        textAlign: "center",
                        fontSize: 16,
                        margin: 10
                    }}>Warning! Deleting the Currently Loaded Character, will Create and Load a "default" Character</Text>
                </View>}

                {(deleteCharacterBoxDisplayStatus && confirmDelete) &&
                    <Pressable style={styles.confirmationButton} onPress={() => {
                        setDeleteCharacterConfirmationCount(0);
                        setConfirmDelete(!confirmDelete);
                        AsyncStorage.removeItem("newCharacter" + deletionName);
                        if (character.charName == deletionName){
                            characterUpdater({type: "all", character: new Character("default", 15, 5)});
                        }
                        getAllCharacterNames().then(keysString => {
                            allCharacterNamesInitial = [];
                            keysString.forEach((key) => {
                                if (key.startsWith("newCharacter")) {
                                    allCharacterNamesInitial.push(key.replace("newCharacter", ''))}
                            });
                            setAllCharacterNames(allCharacterNamesInitial);
                        })
                    }}>
                        <Text style={styles.confirmationBox}>Confirm Character Deletion?</Text>
                        <Text style={styles.confirmationBox}>"{deletionName}"</Text>
                        <Text style={styles.confirmationBox}>/---<MaterialCommunityIcons size={40} name="skull-crossbones-outline" color={"red"} />---\</Text>
                    </Pressable>}
            </View>





        </View>}</View>
    )
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
    confirmationBox: {
        textAlign: "center",
        color: "white",
        fontSize: 18,
    },
    confirmationButton: {
        margin: 15,
        backgroundColor: "blue",
        borderRadius: 10,
    },
})