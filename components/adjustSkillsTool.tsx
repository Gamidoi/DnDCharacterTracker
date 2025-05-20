import {Pressable, StyleSheet, Text, View, type ViewProps} from "react-native";
import React, {useState} from "react";
import {CharacterEvent, useCharacter, useCharacterUpdater} from "@/components/characterUpdater";



export type AdjustSkillsTool = {
    displayOn: boolean;
};

export function AdjustSkillsTool({displayOn}: AdjustSkillsTool) {
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();
    let [addSkillsBoxDisplayStatus, setAddSkillsBoxDisplayStatus] = useState(false);



    function giveMeTheCharacterDotSkill(skillName: string): [string, CharacterEvent]{
        if (skillName === "Athletics") {return [character.athletics, {type: "setAthletics", value: character.athletics}]}
        if (skillName === "Acrobatics") {return [character.acrobatics, {type: "setAcrobatics", value: character.acrobatics}]}
        if (skillName === "Sleight of Hand") {return [character.sleightOfHand, {type: "setSleightOfHand", value: character.sleightOfHand}]}
        if (skillName === "Stealth") {return [character.stealth, {type: "setStealth", value: character.stealth}]}
        if (skillName === "Arcana") {return [character.arcana, {type: "setArcana", value: character.arcana}]}
        if (skillName === "History") {return [character.history, {type: "setHistory", value: character.history}]}
        if (skillName === "Investigation") {return [character.investigation, {type: "setInvestigation", value: character.investigation}]}
        if (skillName === "Nature") {return [character.nature, {type: "setNature", value: character.nature}]}
        if (skillName === "Religion") {return [character.religion, {type: "setReligion", value: character.religion}]}
        if (skillName === "Animal Handling") {return [character.animalHandling, {type: "setAnimalHandling", value: character.animalHandling}]}
        if (skillName === "Insight") {return [character.insight, {type: "setInsight", value: character.insight}]}
        if (skillName === "Medicine") {return [character.medicine, {type: "setMedicine", value: character.medicine}]}
        if (skillName === "Perception") {return [character.perception, {type: "setPerception", value: character.perception}]}
        if (skillName === "Survival") {return [character.survival, {type: "setSurvival", value: character.survival}]}
        if (skillName === "Deception") {return [character.deception, {type: "setDeception", value: character.deception}]}
        if (skillName === "Intimidation") {return [character.intimidation, {type: "setIntimidation", value: character.intimidation}]}
        if (skillName === "Performance") {return [character.performance, {type: "setPerformance", value: character.performance}]}
        if (skillName === "Persuasion") {return [character.persuasion, {type: "setPersuasion", value: character.persuasion}]}
        return [character.athletics, {type: "setAthletics", value: character.athletics}];
    }

    function displayEachSkillRow(skillName: string, proficiencyLabel: boolean = false) {
        let skillEvent = giveMeTheCharacterDotSkill(skillName);
        let characterSkill = skillEvent[0];
        let setSkillEventType = skillEvent[1];
        return (
            <View style={{flexDirection: "row"}}>
                <Text style={{
                    color: "white",
                    fontSize: 20,
                    flex: 0.7,
                }}>{skillName}</Text>
                {proficiencyLabel && <Text style={styles.skillBannerPlaceHolder}> </Text>}
                <View style={{flex: 0.4, marginRight: 10, alignContent: "center"}}>
                    <Text>
                        <Pressable style={styles.skillsButtons} onPress={()=>{
                            // @ts-ignore
                            characterUpdater({...setSkillEventType, value: "X"});}}>
                            <Text style={styles.skillsButtonText}>{characterSkill == "X" ? "X" : " "}</Text>
                        </Pressable>
                        <Pressable style={styles.skillsButtons} onPress={()=>{
                            // @ts-ignore
                            characterUpdater({...setSkillEventType, value: "P"});}}>
                            <Text style={styles.skillsButtonText}>{characterSkill == "P" ? "X" : " "}</Text>
                        </Pressable>
                        <Pressable style={styles.skillsButtons} onPress={()=>{
                            // @ts-ignore
                            characterUpdater({...setSkillEventType, value: "E"});}}>
                            <Text style={styles.skillsButtonText}>{characterSkill == "E" ? "X" : " "}</Text>
                        </Pressable>
                    </Text>
                    {proficiencyLabel && <Text style={styles.skillBannerPlaceHolder}>not prof---prof----expert</Text>}
                </View>
        </View>
            )
    }



    return(
        <View>{displayOn && <View style={styles.toolBoxStyle}>
            <View><Pressable style={styles.toolBoxStyle} onPress={() =>
            {setAddSkillsBoxDisplayStatus(!addSkillsBoxDisplayStatus)}
            }>
                <Text style={{color: "white", textAlign: "center", height: 40, marginTop: 15}}>Skills Management</Text>
                {addSkillsBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Adjust Skills Below</Text>}
            </Pressable>

                {addSkillsBoxDisplayStatus && <View style={{marginLeft: 55}}>
                    <Text style={styles.skillsModText}>STR based Skill</Text>
                    <View>{displayEachSkillRow("Athletics", true)}</View>

                    <Text style={styles.skillsModText}>DEX based Skills</Text>
                    <View>{displayEachSkillRow("Acrobatics")}</View>
                    <View>{displayEachSkillRow("Sleight of Hand")}</View>
                    <View>{displayEachSkillRow("Stealth", true)}</View>

                    <Text style={styles.skillsModText}>INT based Skills</Text>
                    <View>{displayEachSkillRow("Arcana")}</View>
                    <View>{displayEachSkillRow("History")}</View>
                    <View>{displayEachSkillRow("Investigation")}</View>
                    <View>{displayEachSkillRow("Nature")}</View>
                    <View>{displayEachSkillRow("Religion", true)}</View>

                    <Text style={styles.skillsModText}>WIS based Skills</Text>
                    <View>{displayEachSkillRow("Animal Handling")}</View>
                    <View>{displayEachSkillRow("Insight")}</View>
                    <View>{displayEachSkillRow("Medicine")}</View>
                    <View>{displayEachSkillRow("Perception")}</View>
                    <View>{displayEachSkillRow("Survival", true)}</View>

                    <Text style={styles.skillsModText}>CHA based Skills</Text>
                    <View>{displayEachSkillRow("Deception")}</View>
                    <View>{displayEachSkillRow("Intimidation")}</View>
                    <View>{displayEachSkillRow("Performance")}</View>
                    <View>{displayEachSkillRow("Persuasion", true)}</View>
                </View>}


            </View>
        </View>}</View>
    )
}


const styles = StyleSheet.create({
    toolBoxStyle: {
        backgroundColor: "teal",
        borderRadius: 12,
    },
    skillsText: {
        color: "white",
        fontSize: 20,
        marginBottom: 4,
        marginLeft: 40,
    },
    skillsModText: {
        color: "white",
        fontSize: 30,
        marginLeft: 95,
    },
    skillsButtons: {
        backgroundColor: "maroon",
        height: 30,
        width: 32,
        borderRadius: 8,
        borderColor: "black",
        borderWidth: 5,
        marginVertical: -2
    },
    skillsButtonText: {
        color: "Black",
        fontSize: 35,
        marginTop: -15,
        marginLeft: -1,
        textAlign: "center",
    },
    skillBannerPlaceHolder: {
        fontSize: 9,
        color: "white",
    },
})