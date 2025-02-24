import {StyleSheet, Text, View, Pressable} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from "react";
import {Character} from "@/assets/classes/character";


export default function AdjustCoreStatSaves(currentCharacter :Character, detectChange :boolean) {
    let [adjustCoreStatSavesToolDisplay, setAdjustCoreStatSavesToolDisplay] = useState(false);
    let [STRSaveProf, setSTRSaveProf] = useState(currentCharacter.STRSaveProf);
    let [DEXSaveProf, setDEXSaveProf] = useState(currentCharacter.DEXSaveProf);
    let [CONSaveProf, setCONSaveProf] = useState(currentCharacter.CONSaveProf);
    let [INTSaveProf, setINTSaveProf] = useState(currentCharacter.INTSaveProf);
    let [WISSaveProf, setWISSaveProf] = useState(currentCharacter.WISSaveProf);
    let [CHASaveProf, setCHASaveProf] = useState(currentCharacter.CHASaveProf);

    let [detectChangeToSaves, setDetectChangeToSaves] = useState(false);

    function saveSaveProficiencies(){
        currentCharacter.STRSaveProf = STRSaveProf;
        currentCharacter.DEXSaveProf = DEXSaveProf;
        currentCharacter.CONSaveProf = CONSaveProf;
        currentCharacter.INTSaveProf = INTSaveProf;
        currentCharacter.WISSaveProf = WISSaveProf;
        currentCharacter.CHASaveProf = CHASaveProf;
        AsyncStorage.setItem("newCharacter" + currentCharacter.charName, JSON.stringify(currentCharacter));
        setDetectChangeToSaves(false);
        return <View></View>;
    }

    function updateCharacterSaveProficiency() {
        setSTRSaveProf(currentCharacter.STRSaveProf);
        setDEXSaveProf(currentCharacter.DEXSaveProf);
        setCONSaveProf(currentCharacter.CONSaveProf);
        setINTSaveProf(currentCharacter.INTSaveProf);
        setWISSaveProf(currentCharacter.WISSaveProf);
        setCHASaveProf(currentCharacter.CHASaveProf);
    }

    if (detectChange){
        updateCharacterSaveProficiency();
    }




    return(
        <View style={styles.toolBoxStyle}>
            <Pressable onPress={() => {
                setAdjustCoreStatSavesToolDisplay(!adjustCoreStatSavesToolDisplay);
                updateCharacterSaveProficiency();
            }}>
                {!adjustCoreStatSavesToolDisplay && <Text style={{color: "white", textAlign: "center", height: 40, marginTop: 15}}>Open Saving Throw Proficiency Tool</Text>}
                {adjustCoreStatSavesToolDisplay && <Text style={{color: "white", textAlign: "center", marginBottom: 20}}>Close Saving Throw Proficiency Tool</Text>}
            </Pressable>
            {adjustCoreStatSavesToolDisplay && <View style={{flexDirection: "row", alignSelf: "center"}}>
                <Pressable
                    onPress={() => {
                        setSTRSaveProf(!STRSaveProf);
                        setDetectChangeToSaves(true);
                    }}>
                    {!STRSaveProf && <View style={styles.coreStatAdjustButton}>
                        <Text style={[styles.standard]}>STR Save</Text>
                        <Text style={[styles.standard]}>not Prof</Text>
                    </View>}
                    {STRSaveProf && <View style={[styles.coreStatAdjustButton, {backgroundColor: "green"}]}>
                        <Text style={[styles.standard]}>STR Save</Text>
                        <Text style={[styles.standard]}>Proficient</Text>
                    </View>}
                </Pressable>
                <Pressable
                    onPress={() => {
                        setDEXSaveProf(!DEXSaveProf);
                        setDetectChangeToSaves(true);
                    }}>
                    {!DEXSaveProf && <View style={styles.coreStatAdjustButton}>
                        <Text style={[styles.standard]}>DEX Save</Text>
                        <Text style={[styles.standard]}>not Prof</Text>
                    </View>}
                    {DEXSaveProf && <View style={[styles.coreStatAdjustButton, {backgroundColor: "green"}]}>
                        <Text style={[styles.standard]}>DEX Save</Text>
                        <Text style={[styles.standard]}>Proficient</Text>
                    </View>}
                </Pressable>
                <Pressable
                onPress={() => {
                    setCONSaveProf(!CONSaveProf);
                    setDetectChangeToSaves(true);
                }}>
                {!CONSaveProf && <View style={styles.coreStatAdjustButton}>
                    <Text style={[styles.standard]}>CON Save</Text>
                    <Text style={[styles.standard]}>not Prof</Text>
                </View>}
                {CONSaveProf && <View style={[styles.coreStatAdjustButton, {backgroundColor: "green"}]}>
                    <Text style={[styles.standard]}>CON Save</Text>
                    <Text style={[styles.standard]}>Proficient</Text>
                </View>}
            </Pressable>
            </View>}
            {adjustCoreStatSavesToolDisplay && <View style={{flexDirection: "row", alignSelf: "center"}}>
                <Pressable
                    onPress={() => {
                        setINTSaveProf(!INTSaveProf);
                        setDetectChangeToSaves(true);
                    }}>
                    {!INTSaveProf && <View style={styles.coreStatAdjustButton}>
                        <Text style={[styles.standard]}>INT Save</Text>
                        <Text style={[styles.standard]}>not Prof</Text>
                    </View>}
                    {INTSaveProf && <View style={[styles.coreStatAdjustButton, {backgroundColor: "green"}]}>
                        <Text style={[styles.standard]}>INT Save</Text>
                        <Text style={[styles.standard]}>Proficient</Text>
                    </View>}
                </Pressable>
                <Pressable
                    onPress={() => {
                        setWISSaveProf(!WISSaveProf);
                        setDetectChangeToSaves(true);
                    }}>
                    {!WISSaveProf && <View style={styles.coreStatAdjustButton}>
                        <Text style={[styles.standard]}>WIS Save</Text>
                        <Text style={[styles.standard]}>not Prof</Text>
                    </View>}
                    {WISSaveProf && <View style={[styles.coreStatAdjustButton, {backgroundColor: "green"}]}>
                        <Text style={[styles.standard]}>WIS Save</Text>
                        <Text style={[styles.standard]}>Proficient</Text>
                    </View>}
                </Pressable>
                <Pressable
                    onPress={() => {
                        setCHASaveProf(!CHASaveProf);
                        setDetectChangeToSaves(true);
                    }}>
                    {!CHASaveProf && <View style={styles.coreStatAdjustButton}>
                        <Text style={[styles.standard]}>CHA Save</Text>
                        <Text style={[styles.standard]}>not Prof</Text>
                    </View>}
                    {CHASaveProf && <View style={[styles.coreStatAdjustButton, {backgroundColor: "green"}]}>
                        <Text style={[styles.standard]}>CHA Save</Text>
                        <Text style={[styles.standard]}>Proficient</Text>
                    </View>}
                </Pressable>
            </View>}
            {detectChangeToSaves && saveSaveProficiencies()}
        </View>
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
        //height: 42,
    },
    coreStatAdjustButton: {
        backgroundColor: "maroon",
        alignSelf: "center",
        padding: 13,
        borderRadius: 15,
        width: 90,
        borderColor: "orange",
        borderWidth: 2,
        margin: 3,
    },
    standard: {
        color: "white",
        textAlign: "center",
        fontSize: 12,
    }
})