import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useState} from "react";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";


export default function AdjustCoreStatSaves(levelUpToolsSkillsStatsCastingHPDisplay: boolean) {
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();

    let [adjustCoreStatSavesToolDisplay, setAdjustCoreStatSavesToolDisplay] = useState(false);


    return(
        <View>{levelUpToolsSkillsStatsCastingHPDisplay && <View style={styles.toolBoxStyle}>
            <Pressable onPress={() => {
                setAdjustCoreStatSavesToolDisplay(!adjustCoreStatSavesToolDisplay);
            }}>
                {!adjustCoreStatSavesToolDisplay && <Text style={{color: "white", textAlign: "center", height: 40, marginTop: 15}}>Open Saving Throw Proficiency Tool</Text>}
                {adjustCoreStatSavesToolDisplay && <Text style={{color: "white", textAlign: "center", marginBottom: 20}}>Close Saving Throw Proficiency Tool</Text>}
            </Pressable>
            {adjustCoreStatSavesToolDisplay && <View style={{flexDirection: "row", alignSelf: "center"}}>
                <Pressable
                    onPress={() => {
                        characterUpdater({type: "updateSTRSaveProf", value: !character.STRSaveProf});
                    }}>
                    {!character.STRSaveProf && <View style={styles.coreStatAdjustButton}>
                        <Text style={[styles.standard]}>STR Save</Text>
                        <Text style={[styles.standard]}>not Prof</Text>
                    </View>}
                    {character.STRSaveProf && <View style={[styles.coreStatAdjustButton, {backgroundColor: "green"}]}>
                        <Text style={[styles.standard]}>STR Save</Text>
                        <Text style={[styles.standard]}>Proficient</Text>
                    </View>}
                </Pressable>
                <Pressable
                    onPress={() => {
                        characterUpdater({type: "updateDEXSaveProf", value: !character.DEXSaveProf});
                    }}>
                    {!character.DEXSaveProf && <View style={styles.coreStatAdjustButton}>
                        <Text style={[styles.standard]}>DEX Save</Text>
                        <Text style={[styles.standard]}>not Prof</Text>
                    </View>}
                    {character.DEXSaveProf && <View style={[styles.coreStatAdjustButton, {backgroundColor: "green"}]}>
                        <Text style={[styles.standard]}>DEX Save</Text>
                        <Text style={[styles.standard]}>Proficient</Text>
                    </View>}
                </Pressable>
                <Pressable
                    onPress={() => {
                        characterUpdater({type: "updateCONSaveProf", value: !character.CONSaveProf});
                    }}>
                    {!character.CONSaveProf && <View style={styles.coreStatAdjustButton}>
                        <Text style={[styles.standard]}>CON Save</Text>
                        <Text style={[styles.standard]}>not Prof</Text>
                    </View>}
                    {character.CONSaveProf && <View style={[styles.coreStatAdjustButton, {backgroundColor: "green"}]}>
                        <Text style={[styles.standard]}>CON Save</Text>
                        <Text style={[styles.standard]}>Proficient</Text>
                    </View>}
                </Pressable>
            </View>}
            {adjustCoreStatSavesToolDisplay && <View style={{flexDirection: "row", alignSelf: "center", marginBottom: 8}}>
                <Pressable
                    onPress={() => {
                        characterUpdater({type: "updateINTSaveProf", value: !character.INTSaveProf});
                    }}>
                    {!character.INTSaveProf && <View style={styles.coreStatAdjustButton}>
                        <Text style={[styles.standard]}>INT Save</Text>
                        <Text style={[styles.standard]}>not Prof</Text>
                    </View>}
                    {character.INTSaveProf && <View style={[styles.coreStatAdjustButton, {backgroundColor: "green"}]}>
                        <Text style={[styles.standard]}>INT Save</Text>
                        <Text style={[styles.standard]}>Proficient</Text>
                    </View>}
                </Pressable>
                <Pressable
                    onPress={() => {
                        characterUpdater({type: "updateWISSaveProf", value: !character.WISSaveProf});
                    }}>
                    {!character.WISSaveProf && <View style={styles.coreStatAdjustButton}>
                        <Text style={[styles.standard]}>WIS Save</Text>
                        <Text style={[styles.standard]}>not Prof</Text>
                    </View>}
                    {character.WISSaveProf && <View style={[styles.coreStatAdjustButton, {backgroundColor: "green"}]}>
                        <Text style={[styles.standard]}>WIS Save</Text>
                        <Text style={[styles.standard]}>Proficient</Text>
                    </View>}
                </Pressable>
                <Pressable
                    onPress={() => {
                        characterUpdater({type: "updateCHASaveProf", value: !character.CHASaveProf});
                    }}>
                    {!character.CHASaveProf && <View style={styles.coreStatAdjustButton}>
                        <Text style={[styles.standard]}>CHA Save</Text>
                        <Text style={[styles.standard]}>not Prof</Text>
                    </View>}
                    {character.CHASaveProf && <View style={[styles.coreStatAdjustButton, {backgroundColor: "green"}]}>
                        <Text style={[styles.standard]}>CHA Save</Text>
                        <Text style={[styles.standard]}>Proficient</Text>
                    </View>}
                </Pressable>
            </View>}
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