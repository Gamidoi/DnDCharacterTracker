import {StyleSheet, Text, View, Pressable, Platform} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import React, { useState} from "react";
import {useCharacter} from "@/components/characterUpdater";
import NewSpellCreationTool from "@/components/newSpellCreationTool";
import AdjustCoreStatSaves from "@/components/adjustCoreStatSaves";
import AttributionSection from "@/components/attributionSection";
import headerRandomizer from "@/components/headerRandomizer";
import NewAbilityCreationTool from "@/components/newAbilityCreationTool";
import LevelUpToolsStatsCastingHP from "@/components/levelUpToolsStatsCastingHP";
import {DisplayCoreStats} from "@/components/displayCoreStats";
import {AdjustSkillsTool} from "@/components/adjustSkillsTool";
import {CharacterManagementTools} from "@/components/characterManagementTools";
import {MoneyManager} from "@/components/moneyManager";
import {NewItemCreator} from "@/components/newItemCreator";


let headerImage :React.JSX.Element = headerRandomizer();

export default function levelUpTab() {
    const character = useCharacter();


    let [spellAndAbilityToolsDisplay, setSpellAndAbilityToolsDisplay] = useState(false);
    let [levelUpToolsSkillsStatsCastingHPDisplay, setLevelUpToolsSkillsStatsCastingHPDisplay] = useState(false);
    let [characterManagementToolsDisplay, setCharacterManagementToolsDisplay] = useState(false);
    let [attributionSectionDisplay, setAttributionSectionDisplay] = useState<boolean>(false);
    let [itemManagementToolsDisplay, setItemManagementToolsDisplay] = useState<boolean>(false);


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
                <DisplayCoreStats />
            </View>



            <View style={[styles.toolBoxButton, {backgroundColor: "grey",}]}>
                <Pressable
                    onPress={() => {setItemManagementToolsDisplay(!itemManagementToolsDisplay)}}>
                     <Text style={styles.toolBoxLabels}>Item Management Tools</Text>
                </Pressable>
                <View style={{margin: 0, padding: 0}}><MoneyManager displayOn={itemManagementToolsDisplay} displayMoneyChanger={true} /></View>
                <View style={{marginTop: itemManagementToolsDisplay ? 15 : 0, padding: 0}}><NewItemCreator displayOn={itemManagementToolsDisplay} /></View>
            </View>


            <View style={[styles.toolBoxButton, {backgroundColor: "darkgreen",}]}>
                <Pressable
                    onPress={() => {setSpellAndAbilityToolsDisplay(!spellAndAbilityToolsDisplay)}}>
                    <Text style={styles.toolBoxLabels}>Spell and Ability Tools</Text>
                </Pressable>
                <NewSpellCreationTool displayOn={spellAndAbilityToolsDisplay} />
                {<View style={{marginTop: spellAndAbilityToolsDisplay ? 15 : 0}}><NewAbilityCreationTool displayOn={spellAndAbilityToolsDisplay} /></View>}
            </View>



            <View style={[styles.toolBoxButton, {backgroundColor: "darkred",}]}>
                <Pressable
                    onPress={() => {setLevelUpToolsSkillsStatsCastingHPDisplay(!levelUpToolsSkillsStatsCastingHPDisplay)}}>
                    <Text style={styles.toolBoxLabels}>Level Up Tools</Text>
                </Pressable>
                <LevelUpToolsStatsCastingHP displayOn={levelUpToolsSkillsStatsCastingHPDisplay} />
                <View style={{
                    marginTop: levelUpToolsSkillsStatsCastingHPDisplay ? 15 : 0,
                }}>
                    <AdjustCoreStatSaves displayOn={levelUpToolsSkillsStatsCastingHPDisplay} />
                </View>
                <View style={{
                    marginTop: levelUpToolsSkillsStatsCastingHPDisplay ? 15 : 0,
                }}>
                    <AdjustSkillsTool displayOn={levelUpToolsSkillsStatsCastingHPDisplay} />
                </View>
            </View>


            <View style={[styles.toolBoxButton, {backgroundColor: "mediumblue",}]}>
                <Pressable
                    onPress={() => {setCharacterManagementToolsDisplay(!characterManagementToolsDisplay)}}>
                    <Text style={styles.toolBoxLabels}>Character Management Tools</Text>
                </Pressable>
                <CharacterManagementTools  style={{margin: 0, padding: 0}}  displayOn={characterManagementToolsDisplay} />
            </View>


            <View style={[styles.toolBoxButton, {backgroundColor: "slateblue"}]}>
                <Pressable onPress={() => {
                    setAttributionSectionDisplay(!attributionSectionDisplay);
                }}>
                    <Text style={[styles.toolBoxLabels, {height: 40, marginTop: 15, fontSize: 14}]}>Acknowledgments and Attributions Section</Text>
                </Pressable>
                <AttributionSection attributionSectionDisplay={attributionSectionDisplay} />
            </View>


        </ParallaxScrollView>


    );


}

const styles = StyleSheet.create({
    toolBoxButton: {
        alignSelf: "center",
        padding: 13,
        borderRadius: 30,
        width: Platform.OS === "web" ? (window.innerWidth * 0.9) : 400,
    },
    toolBoxLabels: {
        color: "white",
        textAlign: "center",
        height: 40,
        marginTop: 15,
    }
});
