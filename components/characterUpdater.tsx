import {createContext, Dispatch, PropsWithChildren, useContext, useEffect, useReducer} from "react";
import {Character} from "@/assets/classes/character";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Spell} from "@/assets/classes/spell";


interface UpdateAll {
    type: "all";
    character: Character;
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


    return currentCharacter;
}

let CharacterContext = createContext<Character>(new Character('default loc characterUpdater', 10, 1));
const CharacterUpdaterContext = createContext<Dispatch<CharacterEvent>>(() => ({} as Character));

export const CharacterInfoProvider = ({children}: PropsWithChildren) => {
    const [character, updateCharacter] = useReducer(characterDispatch, {} as Character);

    useEffect(() => {
        AsyncStorage.getItem("currentCharacterName").then((characterName) => {
            AsyncStorage.getItem("newCharacter" + characterName).then((characterObjectString) => {
                updateCharacter({type: 'all', character: JSON.parse("" + characterObjectString)})
            })
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