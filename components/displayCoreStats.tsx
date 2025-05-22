import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {useCharacter} from "@/components/characterUpdater";


export function DisplayCoreStats() {

    const character = useCharacter();

    return(
        <View style={{flexDirection: "row", alignSelf: "center", backgroundColor: "grey"}}>
            <View style={styles.coreStatBox}>
                {<Text style={{color: "white", textAlign: "center"}}>STR</Text>}
                {<Text style={{color: "white", textAlign: "center"}}>{character.STR}</Text>}
            </View>
            <View style={styles.coreStatBox}>
                {<Text style={{color: "white", textAlign: "center"}}>DEX</Text>}
                {<Text style={{color: "white", textAlign: "center"}}>{character.DEX}</Text>}
            </View>
            <View style={styles.coreStatBox}>
                {<Text style={{color: "white", textAlign: "center"}}>CON</Text>}
                {<Text style={{color: "white", textAlign: "center"}}>{character.CON}</Text>}
            </View>
            <View style={styles.coreStatBox}>
                {<Text style={{color: "white", textAlign: "center"}}>INT</Text>}
                {<Text style={{color: "white", textAlign: "center"}}>{character.INT}</Text>}
            </View>
            <View style={styles.coreStatBox}>
                {<Text style={{color: "white", textAlign: "center"}}>WIS</Text>}
                {<Text style={{color: "white", textAlign: "center"}}>{character.WIS}</Text>}
            </View>
            <View style={styles.coreStatBox}>
                {<Text style={{color: "white", textAlign: "center"}}>CHA</Text>}
                {<Text style={{color: "white", textAlign: "center"}}>{character.CHA}</Text>}
            </View>
        </View>)
}

const styles = StyleSheet.create({
    coreStatBox: {
        backgroundColor: "black",
        padding: 8,
        margin: 4,
        width: 50,
    },
})