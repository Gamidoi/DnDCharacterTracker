import {Pressable, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";


export function AdjustSkillsTool(levelUpToolsSkillsStatsCastingHPDisplay: boolean) {
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();
    let [addSkillsBoxDisplayStatus, setAddSkillsBoxDisplayStatus] = useState(false);

    return(
        <View>{levelUpToolsSkillsStatsCastingHPDisplay && <View style={styles.toolBoxStyle}>
            <View><Pressable style={styles.toolBoxStyle} onPress={() =>
            {setAddSkillsBoxDisplayStatus(!addSkillsBoxDisplayStatus)}
            }>
                {!addSkillsBoxDisplayStatus && <Text style={{color: "white", textAlign: "center", height: 40, marginTop: 15}}>Open Skills Management Tool</Text>}
                {addSkillsBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Close Skills Management Tool</Text>}
                {addSkillsBoxDisplayStatus && <Text style={{color: "white", textAlign: "center"}}>Adjust Skills Below</Text>}
            </Pressable>
                {addSkillsBoxDisplayStatus && <View style={{paddingBottom: 12}}>
                    <View style={{flexDirection: "row"}}>
                        <View style={{flex: 0.7, marginLeft: 10}}>
                            <Text style={styles.skillsModText}>STR based Skill</Text>
                            <Text style={styles.skillsText}>Athletics</Text>
                            <Text style={styles.skillsModText}>DEX based Skills</Text>
                            <Text style={styles.skillsText}>Acrobatics</Text>
                            <Text style={styles.skillsText}>Sleight of Hand</Text>
                            <Text style={styles.skillsText}>Stealth</Text>
                            <Text style={styles.skillsModText}>INT based Skills</Text>
                            <Text style={styles.skillsText}>Arcana</Text>
                            <Text style={styles.skillsText}>History</Text>
                            <Text style={styles.skillsText}>Investigation</Text>
                            <Text style={styles.skillsText}>Nature</Text>
                            <Text style={styles.skillsText}>Religion</Text>
                            <Text style={styles.skillsModText}>WIS based Skills</Text>
                            <Text style={styles.skillsText}>Animal Handling</Text>
                            <Text style={styles.skillsText}>Insight</Text>
                            <Text style={styles.skillsText}>Medicine</Text>
                            <Text style={styles.skillsText}>Perception</Text>
                            <Text style={styles.skillsText}>Survival</Text>
                            <Text style={styles.skillsModText}>CHA based Skills</Text>
                            <Text style={styles.skillsText}>Deception</Text>
                            <Text style={styles.skillsText}>Intimidation</Text>
                            <Text style={styles.skillsText}>Performance</Text>
                            <Text style={styles.skillsText}>Persuasion</Text>
                        </View>
                        <View style={{flex: 0.3, marginRight: 10}}>
                            <Text style={styles.skillBannerPlaceHolder}></Text>
                            <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setAthletics", value: "X"});}}>
                                {character.athletics == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setAthletics", value: "P"});}}>
                                {character.athletics == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setAthletics", value: "E"});}}>
                                {character.athletics == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable></Text>
                            <Text style={styles.skillBannerPlaceHolder}>not prof---prof----expert</Text>
                            <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setAcrobatics", value: "X"});}}>
                                {character.acrobatics == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setAcrobatics", value: "P"});}}>
                                {character.acrobatics == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setAcrobatics", value: "E"});}}>
                                {character.acrobatics == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable></Text>
                            <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setSleightOfHand", value: "X"});}}>
                                {character.sleightOfHand == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setSleightOfHand", value: "P"});}}>
                                {character.sleightOfHand == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setSleightOfHand", value: "E"});}}>
                                {character.sleightOfHand == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable></Text>
                            <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setStealth", value: "X"});}}>
                                {character.stealth == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setStealth", value: "P"});}}>
                                {character.stealth == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setStealth", value: "E"});}}>
                                {character.stealth == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable></Text>
                            <Text style={styles.skillBannerPlaceHolder}>not prof---prof----expert</Text>
                            <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setArcana", value: "X"});}}>
                                {character.arcana == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setArcana", value: "P"});}}>
                                {character.arcana == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setArcana", value: "E"});}}>
                                {character.arcana == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable></Text>
                            <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setHistory", value: "X"});}}>
                                {character.history == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setHistory", value: "P"});}}>
                                {character.history == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setHistory", value: "E"});}}>
                                {character.history == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable></Text>
                            <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setInvestigation", value: "X"});}}>
                                {character.investigation == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setInvestigation", value: "P"});}}>
                                {character.investigation == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setInvestigation", value: "E"});}}>
                                {character.investigation == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable></Text>
                            <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setNature", value: "X"});}}>
                                {character.nature == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setNature", value: "P"});}}>
                                {character.nature == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setNature", value: "E"});}}>
                                {character.nature == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable></Text>
                            <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setReligion", value: "X"});}}>
                                {character.religion == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setReligion", value: "P"});}}>
                                {character.religion == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setReligion", value: "E"});}}>
                                {character.religion == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable></Text>
                            <Text style={styles.skillBannerPlaceHolder}>not prof---prof----expert</Text>
                            <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setAnimalHandling", value: "X"});}}>
                                {character.animalHandling == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setAnimalHandling", value: "P"});}}>
                                {character.animalHandling == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setAnimalHandling", value: "E"});}}>
                                {character.animalHandling == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable></Text>
                            <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setInsight", value: "X"});}}>
                                {character.insight == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setInsight", value: "P"});}}>
                                {character.insight == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setInsight", value: "E"});}}>
                                {character.insight == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable></Text>
                            <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setMedicine", value: "X"});}}>
                                {character.medicine == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setMedicine", value: "P"});}}>
                                {character.medicine == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setMedicine", value: "E"});}}>
                                {character.medicine == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable></Text>
                            <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setPerception", value: "X"});}}>
                                {character.perception == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setPerception", value: "P"});}}>
                                {character.perception == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setPerception", value: "E"});}}>
                                {character.perception == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable></Text>
                            <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setSurvival", value: "X"});}}>
                                {character.survival == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setSurvival", value: "P"});}}>
                                {character.survival == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setSurvival", value: "E"});}}>
                                {character.survival == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable></Text>
                            <Text style={styles.skillBannerPlaceHolder}>not prof---prof----expert</Text>
                            <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setDeception", value: "X"});}}>
                                {character.deception == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setDeception", value: "P"});}}>
                                {character.deception == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setDeception", value: "E"});}}>
                                {character.deception == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable></Text>
                            <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setIntimidation", value: "X"});}}>
                                {character.intimidation == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setIntimidation", value: "P"});}}>
                                {character.intimidation == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setIntimidation", value: "E"});}}>
                                {character.intimidation == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable></Text>
                            <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setPerformance", value: "X"});}}>
                                {character.performance == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setPerformance", value: "P"});}}>
                                {character.performance == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setPerformance", value: "E"});}}>
                                {character.performance == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable></Text>
                            <Text><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setPersuasion", value: "X"});}}>
                                {character.persuasion == "X" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setPersuasion", value: "P"});}}>
                                {character.persuasion == "P" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable><Pressable style={styles.skillsButtons} onPress={()=>{
                                characterUpdater({type: "setPersuasion", value: "E"});}}>
                                {character.persuasion == "E" && <Text style={styles.skillsButtonText}>X</Text>}
                                <Text style={styles.skillsButtonText}> </Text>
                            </Pressable></Text>
                            <Text style={styles.skillBannerPlaceHolder}>not prof---prof----expert</Text>
                        </View>

                    </View>
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
        fontSize: 30
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
        height: 45,
        fontSize: 9,
        color: "white",
    },
})