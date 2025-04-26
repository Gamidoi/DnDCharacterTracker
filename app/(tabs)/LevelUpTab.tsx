import { StyleSheet, Text, View, Pressable} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import React, { useState} from "react";
import {useCharacter} from "@/components/characterUpdater";
import newSpellCreationTool from "@/components/newSpellCreationTool";
import AdjustCoreStatSaves from "@/components/adjustCoreStatSaves";
import AttributionSection from "@/components/attributionSection";
import headerRandomizer from "@/components/headerRandomizer";
import newAbilityCreationTool from "@/components/newAbilityCreationTool";
import LevelUpToolsStatsCastingHP from "@/components/levelUpToolsStatsCastingHP";
import {displayCoreStats} from "@/components/displayCoreStats";
import {AdjustSkillsTool} from "@/components/adjustSkillsTool";
import {CharacterManagementTools} from "@/components/characterManagementTools";


let headerImage :React.JSX.Element = headerRandomizer();

export default function levelUpTab() {
    const character = useCharacter();


    let [spellAndAbilityToolsDisplay, setSpellAndAbilityToolsDisplay] = useState(false);
    let [levelUpToolsSkillsStatsCastingHPDisplay, setLevelUpToolsSkillsStatsCastingHPDisplay] = useState(false);
    let [characterManagementToolsDisplay, setCharacterManagementToolsDisplay] = useState(false);
    let [attributionSectionDisplay, setAttributionSectionDisplay] = useState<boolean>(false);


    return (

        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                headerImage
            }>


            <View>
                <Text style={{color: "white", fontSize: 30, backgroundColor: "black", textAlign: "center"}}> Max HP: {character.maxHP} </Text>
                <Text style={{color: "white", fontSize: 20, backgroundColor: "black", textAlign: "center"}}> Character Level: {character.characterLevel}</Text>
                <Text style={{color: "white", fontSize: 20, backgroundColor: "black", textAlign: "center"}}> Proficiency Bonus: +{character.proficiency} </Text>
                <Text style={{color: "white", fontSize: 20, backgroundColor: "black", textAlign: "center"}}>Total Spellcasting Level: {character.spellcastingLevel}</Text>
                <Text style={{color: "white", fontSize: 20, backgroundColor: "black", textAlign: "center"}}>Full caster: {character.fullCasterLevel} | Half Caster: {character.halfCasterLevel}</Text>
                {character.warlockCasterLevel > 0 && <Text style={{color: "white", fontSize: 20, backgroundColor: "black", textAlign: "center"}}>Warlock Level: {character.warlockCasterLevel}</Text>}
                {displayCoreStats()}
            </View>


            <View style={[styles.toolBoxButton, {backgroundColor: "darkgreen",}]}>
                <Pressable
                    onPress={() => {setSpellAndAbilityToolsDisplay(!spellAndAbilityToolsDisplay)}}>
                    {!spellAndAbilityToolsDisplay && <Text style={styles.toolBoxLabels}>Open Spell and Ability Tools List</Text>}
                    {spellAndAbilityToolsDisplay && <Text style={styles.toolBoxLabels}>Close Spell and Ability Tools List</Text>}
                </Pressable>
                {<View>{newSpellCreationTool(spellAndAbilityToolsDisplay)}</View>}
                {<View style={{marginTop: spellAndAbilityToolsDisplay ? 15 : 0}}>{newAbilityCreationTool(spellAndAbilityToolsDisplay)}</View>}
            </View>



            <View style={[styles.toolBoxButton, {backgroundColor: "darkred",}]}>
                <Pressable
                    onPress={() => {setLevelUpToolsSkillsStatsCastingHPDisplay(!levelUpToolsSkillsStatsCastingHPDisplay)}}>
                    {!levelUpToolsSkillsStatsCastingHPDisplay && <Text style={styles.toolBoxLabels}>Open Level Up Tools List</Text>}
                    {levelUpToolsSkillsStatsCastingHPDisplay && <Text style={styles.toolBoxLabels}>Close Level Up Tools List</Text>}
                </Pressable>
                {<View>{LevelUpToolsStatsCastingHP(levelUpToolsSkillsStatsCastingHPDisplay)}</View>}
                {<View style={{
                    marginTop: levelUpToolsSkillsStatsCastingHPDisplay ? 15 : 0,
                }}>{AdjustCoreStatSaves(levelUpToolsSkillsStatsCastingHPDisplay)}</View>}
                {<View style={{
                    marginTop: levelUpToolsSkillsStatsCastingHPDisplay ? 15 : 0,
                }}>{AdjustSkillsTool(levelUpToolsSkillsStatsCastingHPDisplay)}</View>}
            </View>


            <View style={[styles.toolBoxButton, {backgroundColor: "mediumblue",}]}>
                <Pressable
                    onPress={() => {setCharacterManagementToolsDisplay(!characterManagementToolsDisplay)}}>
                    {!characterManagementToolsDisplay && <Text style={styles.toolBoxLabels}>Open Character Management Tools List</Text>}
                    {characterManagementToolsDisplay && <Text style={styles.toolBoxLabels}>Close Character Management Tools List</Text>}
                </Pressable>
                {<View style={{margin: 0, padding: 0}}>{CharacterManagementTools(characterManagementToolsDisplay)}</View>}
            </View>


            <View style={[styles.toolBoxButton, {backgroundColor: "slateblue"}]}>
                <Pressable onPress={() => {
                    setAttributionSectionDisplay(!attributionSectionDisplay);
                }}>
                    {!attributionSectionDisplay && <Text style={[styles.toolBoxLabels, {height: 40, marginTop: 15, fontSize: 14}]}>Open Acknowledgments and Attributions Section</Text>}
                    {attributionSectionDisplay && <Text style={[styles.toolBoxLabels, {fontSize: 14}]}>Close Acknowledgments and Attributions Section</Text>}
                </Pressable>
                {attributionSectionDisplay && <View>{AttributionSection(attributionSectionDisplay)}</View>}
            </View>


        </ParallaxScrollView>


    );


}

const styles = StyleSheet.create({
    toolBoxStyle: {
        backgroundColor: "teal",
        borderRadius: 12,
    },
    toolBoxButton: {
        alignSelf: "center",
        padding: 13,
        borderRadius: 30,
        width: (window.innerWidth * 0.9),
    },
    toolBoxLabels: {
        color: "white",
        textAlign: "center",
        height: 40,
        marginTop: 15,
    }
});
