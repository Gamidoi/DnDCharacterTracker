import {createContext, Dispatch, PropsWithChildren, useContext, useEffect, useReducer} from "react";
import {Character} from "@/assets/classes/character";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Spell} from "@/assets/classes/spell";


interface UpdateAll {
    type: "all";
    character: Character;
}
interface updateCharLevel {
    type: "updateCharLevel";
    value: number;
}
interface updateAllSpellcasting {
    type: "updateAllSpellcasting";
    fullCaster: number;
    halfCaster: number;
    warlock: number;
}
interface UpdateMaxHpEvent {
    type: "updateMaxHP";
    value: number;
}
interface UpdateCurrentHP {
    type: "updateCurrentHP";
    value: number;
}
interface UpdateSpellSlots {
    type: "updateSpellSlots";
    spellSlot: number;
}
interface UpdateWarlockSpellSlots {
    type: "updateWarlockSpellSlots";
    spellSlot: number;
}
interface updateSTR {
    type: "updateSTR";
    value: number;
}
interface updateDEX {
    type: "updateDEX";
    value: number;
}
interface updateCON {
    type: "updateCON";
    value: number;
}
interface updateINT {
    type: "updateINT";
    value: number;
}
interface updateWIS {
    type: "updateWIS";
    value: number;
}
interface updateCHA {
    type: "updateCHA";
    value: number;
}
interface updateSTRSaveProf {
    type: "updateSTRSaveProf";
    value: boolean;
}
interface updateDEXSaveProf {
    type: "updateDEXSaveProf";
    value: boolean;
}
interface updateCONSaveProf{
    type: "updateCONSaveProf";
    value: boolean;
}
interface updateINTSaveProf{
    type: "updateINTSaveProf";
    value: boolean;
}
interface updateWISSaveProf{
    type: "updateWISSaveProf";
    value: boolean;
}
interface updateCHASaveProf{
    type: "updateCHASaveProf";
    value: boolean;
}
interface updateProficiency {
    type: "updateProficiency";
    value: boolean;
}
interface updateKnownSpells{
    type: "updateKnownSpells";
    knownSpells: Spell[];
}
interface setAthletics {
    type: "setAthletics";
    value: string;
}
interface setAcrobatics {
    type: "setAcrobatics";
    value: string;
}
interface setSleightOfHand {
    type: "setSleightOfHand";
    value: string;
}
interface setStealth {
    type: "setStealth";
    value: string;
}
interface setArcana {
    type: "setArcana";
    value: string;
}
interface setHistory {
    type: "setHistory";
    value: string;
}
interface setInvestigation {
    type: "setInvestigation";
    value: string;
}
interface setNature {
    type: "setNature";
    value: string;
}
interface setReligion {
    type: "setReligion";
    value: string;
}
interface setAnimalHandling {
    type: "setAnimalHandling";
    value: string;
}
interface setInsight {
    type: "setInsight";
    value: string;
}
interface setMedicine {
    type: "setMedicine";
    value: string;
}
interface setPerception {
    type: "setPerception";
    value: string;
}
interface setSurvival {
    type: "setSurvival";
    value: string;
}
interface setDeception {
    type: "setDeception";
    value: string;
}
interface setIntimidation {
    type: "setIntimidation";
    value: string;
}
interface setPerformance {
    type: "setPerformance";
    value: string;
}
interface setPersuasion {
    type: "setPersuasion";
    value: string;
}

type CharacterEvent =
    UpdateMaxHpEvent
    | UpdateCurrentHP
    | UpdateSpellSlots
    | UpdateAll
    | UpdateWarlockSpellSlots
    | updateSTR
    | updateDEX
    | updateCON
    | updateINT
    | updateWIS
    | updateCHA
    | updateSTRSaveProf
    | updateDEXSaveProf
    | updateCONSaveProf
    | updateINTSaveProf
    | updateWISSaveProf
    | updateCHASaveProf
    | updateProficiency
    | updateKnownSpells
    | updateCharLevel
    | updateAllSpellcasting
    | setAthletics
    | setAcrobatics
    | setSleightOfHand
    | setStealth
    | setArcana
    | setHistory
    | setInvestigation
    | setNature
    | setReligion
    | setAnimalHandling
    | setInsight
    | setMedicine
    | setPerception
    | setSurvival
    | setDeception
    | setIntimidation
    | setPerformance
    | setPersuasion


const characterDispatch: (current: Character, event: CharacterEvent) => Character = (currentCharacter, event) => {

    if (event.type === "all"){
        return {...event.character}
    }
    if (event.type === "updateMaxHP") {
        return {
            ...currentCharacter,
            maxHP: event.value
        }
    }
    if (event.type === "updateCurrentHP") {
        return{
            ...currentCharacter,
            currentHP: event.value
        }
    }
    if (event.type === "updateSpellSlots") {
        let spellString = "";
        for (let i = 0; i < 22; i++) {
            if (i === event.spellSlot){
                if (currentCharacter.currentUsedSpells[event.spellSlot] === "X") {spellString += "0"
                } else {spellString += "X"}
            } else {
                spellString += currentCharacter.currentUsedSpells[i]
            }
        }
        return{
            ...currentCharacter,
            currentUsedSpells: spellString
        }
    }
    if (event.type === "updateWarlockSpellSlots") {
        let spellString = "";
        for (let i = 0; i < 4; i++) {
            if (i === event.spellSlot) {
                if (currentCharacter.warlockCurrentUsedSpells[i] === "X") {spellString += "0"
                } else {spellString += "X"}
            } else {
                spellString += currentCharacter.warlockCurrentUsedSpells[i]
            }
        }
        return{
            ...currentCharacter,
            warlockCurrentUsedSpells: spellString
        }
    }
    if (event.type === "updateKnownSpells"){
        return{
            ...currentCharacter,
            spells: event.knownSpells
        }
    }
    if (event.type === "updateSTR"){
        return{
            ...currentCharacter,
            STR: event.value
        }
    }
    if (event.type === "updateDEX"){
        return{
            ...currentCharacter,
            DEX: event.value
        }
    }
    if (event.type === "updateCON"){
        return{
            ...currentCharacter,
            CON: event.value
        }
    }
    if (event.type === "updateINT"){
        return{
            ...currentCharacter,
            INT: event.value
        }
    }
    if (event.type === "updateWIS"){
        return{
            ...currentCharacter,
            WIS: event.value
        }
    }
    if (event.type === "updateCHA"){
        return{
            ...currentCharacter,
            CHA: event.value
        }
    }
    if (event.type === "updateCharLevel"){
        let proficiency = Math.ceil((4+event.value)/4);
        return{
            ...currentCharacter,
            characterLevel: event.value,
            proficiency: proficiency
        }
    }
    if (event.type === "updateAllSpellcasting"){
        let totalSpellCastingLevel = event.fullCaster + (event.halfCaster / 2);
        return {
            ...currentCharacter,
            fullCasterLevel: event.fullCaster,
            halfCasterLevel: event.halfCaster,
            spellcastingLevel: totalSpellCastingLevel,
            warlockCasterLevel: event.warlock
        }
    }
    if (event.type === "setAthletics") {
        return{
            ...currentCharacter,
            athletics: event.value
        }
    }
    if (event.type === "setAcrobatics") {
        return{
            ...currentCharacter,
            acrobatics: event.value
        }
    }
    if (event.type === "setSleightOfHand") {
        return{
            ...currentCharacter,
            sleightOfHand: event.value
        }
    }
    if (event.type === "setStealth") {
        return{
            ...currentCharacter,
            stealth: event.value
        }
    }
    if (event.type === "setArcana") {
        return{
            ...currentCharacter,
            arcana: event.value
        }
    }
    if (event.type === "setHistory") {
        return{
            ...currentCharacter,
            history: event.value
        }
    }
    if (event.type === "setInvestigation") {
        return{
            ...currentCharacter,
            investigation: event.value
        }
    }
    if (event.type === "setNature") {
        return{
            ...currentCharacter,
            nature: event.value
        }
    }
    if (event.type === "setReligion") {
        return{
            ...currentCharacter,
            religion: event.value
        }
    }
    if (event.type === "setAnimalHandling") {
        return{
            ...currentCharacter,
            animalHandling: event.value
        }
    }
    if (event.type === "setInsight") {
        return{
            ...currentCharacter,
            insight: event.value
        }
    }
    if (event.type === "setMedicine") {
        return{
            ...currentCharacter,
            medicine: event.value
        }
    }
    if (event.type === "setPerception") {
        return{
            ...currentCharacter,
            perception: event.value
        }
    }
    if (event.type === "setSurvival") {
        return{
            ...currentCharacter,
            survival: event.value
        }
    }
    if (event.type === "setDeception") {
        return{
            ...currentCharacter,
            deception: event.value
        }
    }
    if (event.type === "setIntimidation") {
        return{
            ...currentCharacter,
            intimidation: event.value
        }
    }
    if (event.type === "setPerformance") {
        return{
            ...currentCharacter,
            performance: event.value
        }
    }
    if (event.type === "setPersuasion") {
        return{
            ...currentCharacter,
            persuasion: event.value
        }
    }
    if (event.type === "updateSTRSaveProf") {
        return{
            ...currentCharacter,
            STRSaveProf: event.value
        }
    }
    if (event.type === "updateDEXSaveProf") {
        return{
            ...currentCharacter,
            DEXSaveProf: event.value
        }
    }
    if (event.type === "updateCONSaveProf") {
        return{
            ...currentCharacter,
            CONSaveProf: event.value
        }
    }
    if (event.type === "updateINTSaveProf") {
        return{
            ...currentCharacter,
            INTSaveProf: event.value
        }
    }
    if (event.type === "updateWISSaveProf") {
        return{
            ...currentCharacter,
            WISSaveProf: event.value
        }
    }
    if (event.type === "updateCHASaveProf") {
        return{
            ...currentCharacter,
            CHASaveProf: event.value
        }
    }


    return currentCharacter;
}

let CharacterContext = createContext<Character>(new Character('defaultAaA', 10, 1));
const CharacterUpdaterContext = createContext<Dispatch<CharacterEvent>>(() => ({} as Character));

export const CharacterInfoProvider = ({children}: PropsWithChildren) => {
    const [character, updateCharacter] = useReducer(characterDispatch, new Character('defaultBbB', 10, 1));

    useEffect(() => {
        AsyncStorage.getItem("currentCharacterName").then((characterName) => {
            AsyncStorage.getItem("newCharacter" + characterName).then((characterObjectString) => {
                updateCharacter({type: 'all', character: JSON.parse("" + characterObjectString)})
                AsyncStorage.removeItem("newCharacterdefaultBbB");
                if (characterName == "" || characterName == undefined) {
                    updateCharacter({type: "all", character: new Character("defaultCcC")});
                    updateCharacter({type: "updateAllSpellcasting", fullCaster: 3, halfCaster: 2, warlock: 2});
                }
            });
        });
    }, []);

    useEffect(() => {
        AsyncStorage.setItem("newCharacter" + character.charName, JSON.stringify(character))
    }, [character]);

    return <CharacterContext.Provider value={character}>
        <CharacterUpdaterContext.Provider value={updateCharacter}>
            {children}
        </CharacterUpdaterContext.Provider>
    </CharacterContext.Provider>
        ;
}
export const useCharacter = () => useContext(CharacterContext);
export const useCharacterUpdater = () => useContext(CharacterUpdaterContext);