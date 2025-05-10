import {createContext, Dispatch, PropsWithChildren, useContext, useEffect, useReducer} from "react";
import {Character} from "@/assets/classes/character";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Spell} from "@/assets/classes/spell";
import {Ability} from "@/assets/classes/ability";
import {Item} from "@/assets/classes/item";
import {getStatMod} from "@/assets/functionLibrary/getCoreStatMod";


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
interface updateArmorClass {
    type: "updateArmorClass";
    value: number;
}
interface updateAbilities{
    type: "updateAbilities",
    knownAbilities: Ability[]
}
interface updateAbilityUsageSlot{
    type: "updateAbilityUsageSlot";
    useSlot: number;
    abilityName: string;
}
interface useConsumable {
    type: "useConsumable";
    itemName: string;
    value: string;
}
interface abilityUnusedQuantityAdjust{
    type: "abilityUnusedQuantityAdjust";
    abilityName: string;
    value: string;
}
interface changeActiveAbilityState{
    type: "changeActiveAbilityState";
    abilityName: string;
    value: boolean;
}
interface addResistanceAndImmunities{
    type: "addResistanceAndImmunities";
    abilityName: string;
}
interface subtractResistanceAndImmunities{
    type: "subtractResistanceAndImmunities";
    abilityName: string;
}
interface updateMoney{
    type: "updateMoney";
    gainOrPay: boolean;
    gold: number;
    electrum: number;
    silver: number;
    copper: number;
}
interface magicalMoneyExchange{
    type: "magicalMoneyExchange";
}
interface addItem{
    type: "addItem";
    ownedItems: Item[];
}
interface equipWeapon1{
    type: "equipWeapon1";
    value: string;
}
interface equipWeapon2{
    type: "equipWeapon2";
    value: string;
}
interface equipArmor{
    type: "equipArmor";
    value: string;
}
interface attune1{
    type: "attune1";
    value: string;
}
interface attune2{
    type: "attune2";
    value: string;
}
interface attune3{
    type: "attune3";
    value: string;
}
interface usingItemChargesButtons{
    type: "usingItemChargesButtons";
    index: number;
    itemName: string;
}
interface usingItemChargesCounter{
    type: "usingItemChargesCounter",
    itemName: string,
    value: string
}


export type CharacterEvent =
    | UpdateMaxHpEvent
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
    | updateArmorClass
    | updateAbilities
    | updateAbilityUsageSlot
    | abilityUnusedQuantityAdjust
    | changeActiveAbilityState
    | addResistanceAndImmunities
    | subtractResistanceAndImmunities
    | updateMoney
    | addItem
    | magicalMoneyExchange
    | useConsumable
    | usingItemChargesButtons
    | usingItemChargesCounter
    | equipWeapon1
    | equipWeapon2
    | equipArmor
    | attune1
    | attune2
    | attune3

export const characterDispatch: (current: Character, event: CharacterEvent) => Character = (currentCharacter, event) => {


    if (event.type === "all"){
        if (typeof event.character.armorClass != "number" ||
            typeof event.character.languages != "object" ||
            typeof event.character.resistances != "object" ||
            typeof event.character.immunities != "object" ||
            typeof event.character.concentration != "string") {
                return {...event.character,
                    armorClass: 10,
                    languages: ["common"],
                    resistances: [],
                    items: [],
                    immunities: [],
                    concentration: "",
                    armor: "",
                    weapon1: "",
                    weapon2: "",
                    attunement1: "",
                    attunement2: "",
                    attunement3: "",
                    gold: 0,
                    electrum: 0,
                    silver: 0,
                    copper: 0
                }
        }
        if (typeof event.character.armor != "string" ||
            typeof event.character.weapon1 != "string" ||
            typeof event.character.weapon2 != "string" ||
            typeof event.character.attunement1 != "string" ||
            typeof event.character.attunement2 != "string" ||
            typeof event.character.attunement3 != "string"){
                return {...event.character,
                    armor: "",
                    weapon1: "",
                    weapon2: "",
                    attunement1: "",
                    attunement2: "",
                    attunement3: "",
                    gold: 0,
                    electrum: 0,
                    silver: 0,
                    copper: 0
                }
        }
        if (typeof event.character.gold != "number" ||
            typeof event.character.electrum != "number" ||
            typeof event.character.silver != "number" ||
            typeof event.character.copper != "number" ){
                return {...event.character,
                    gold: 0,
                    electrum: 0,
                    silver: 0,
                    copper: 0
                }
        }
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
    if (event.type === "updateAbilityUsageSlot"){
        let abilities : Ability[] = []
        currentCharacter.abilities.map((ability) => {
            if (ability.name === event.abilityName){
                let newUsedInstances = "";
                for (let i = 0; i < ability.uses; i++) {
                    if (i === event.useSlot){
                        if (ability.usedInstances[i] === "X"){newUsedInstances += "0"}
                        else {newUsedInstances += "X"}
                    } else {newUsedInstances += ability.usedInstances[i]}
                }
                let newAbility = {...ability, usedInstances: newUsedInstances};
                abilities.push(newAbility);
            } else {abilities.push(ability)}
        })
        return {
            ...currentCharacter,
            abilities: abilities
        }
    }
    if (event.type === "abilityUnusedQuantityAdjust"){
        let abilities : Ability[] = []
        currentCharacter.abilities.map((ability) => {
            if (ability.name === event.abilityName){
                let newUnusedInstances = ability.unusedQuantity
                if ( event.value === "subtract") {
                    newUnusedInstances -= 1;
                    if (newUnusedInstances < 0){newUnusedInstances = 0}
                }
                if ( event.value === "add") {
                    newUnusedInstances += 1;
                    if (newUnusedInstances > ability.uses){newUnusedInstances = ability.uses}
                }
                let newAbility : Ability = {...ability, unusedQuantity: newUnusedInstances};
                abilities.push(newAbility);
            } else {abilities.push(ability)}
        })
        return {
            ...currentCharacter,
            abilities: abilities
        }
    }
    if (event.type === "changeActiveAbilityState"){
        let abilities : Ability[] = []
        currentCharacter.abilities.map((ability) => {
            if (event.abilityName === ability.name){
                let newAbility : Ability = {...ability, persistence: [true, event.value]};
                abilities.push(newAbility);
            } else {abilities.push(ability)}
        })
        return {
            ...currentCharacter,
            abilities: abilities
        }
    }
    if (event.type === "addItem"){
        return({
            ...currentCharacter,
            items: event.ownedItems
        })
    }
    if (event.type === "addResistanceAndImmunities"){
        let resistances: string[] = currentCharacter.resistances
        if (currentCharacter.abilities.length > 0) {
            currentCharacter.abilities.map((ability: Ability) => {
                if (ability.name === event.abilityName) {
                    if (ability.resistance.length > 0) {
                        ability.resistance.map((resistance) => {
                            if (resistance != "" && resistance != undefined) {
                                resistances.push(resistance)
                            }
                        })
                    }
                }
            })
        }
        let immunities: string[] = currentCharacter.immunities
        if (currentCharacter.abilities.length > 0) {
            currentCharacter.abilities.map((ability: Ability) => {
                if (ability.name === event.abilityName) {
                    if (ability.immunity.length > 0) {
                        ability.immunity.map((immunity) => {
                            if (immunity != "" && immunity != undefined) {
                                immunities.push(immunity)
                            }
                        })
                    }
                }
            })
        }
        return {
            ...currentCharacter,
            resistances: resistances,
            immunities: immunities
        }
    }
    if (event.type === "subtractResistanceAndImmunities"){
        let currentResistances = currentCharacter.resistances;
        let newResistances: string[] = [];
        currentCharacter.abilities.map((ability: Ability) =>{
            if (ability.name === event.abilityName){
                if (ability.resistance.length > 0) {
                    ability.resistance.map((resistance) => {
                        let deleteOnlyOne = 0;
                        for (let i = currentResistances.length - 1; i >= 0; i--) {
                            if (resistance === currentResistances[i] && deleteOnlyOne === 0) {
                                deleteOnlyOne++;
                            } else {
                                newResistances.unshift(currentResistances[i]);
                            }
                        }
                        currentResistances = newResistances;
                        newResistances = []
                    })
                }
            }
        })
        let currentImmunities = currentCharacter.immunities;
        let newImmunities: string[] = [];
        currentCharacter.abilities.map((ability: Ability) =>{
            if (ability.name === event.abilityName){
                if (ability.immunity.length > 0) {
                    ability.immunity.map((immunity) => {
                        let deleteOnlyOne = 0;
                        for (let i = currentImmunities.length - 1; i >= 0; i--) {
                            if (immunity === currentImmunities[i] && deleteOnlyOne === 0) {
                                deleteOnlyOne++;
                            } else {
                                newImmunities.unshift(currentImmunities[i]);
                            }
                        }
                        currentImmunities = newImmunities;
                        newImmunities = []
                    })
                }
            }
        })
        return {
            ...currentCharacter,
            resistances: currentResistances,
            immunities: currentImmunities
        }
    }
    if (event.type === "updateMoney"){
        let currentGold: number = currentCharacter.gold;
        let currentElectrum: number= currentCharacter.electrum;
        let currentSilver: number = currentCharacter.silver;
        let currentCopper: number = currentCharacter.copper;
        if (event.gainOrPay){
            currentGold += event.gold;
            currentElectrum += event.electrum;
            currentSilver += event.silver;
            currentCopper += event.copper;
        }
        else {
            currentCopper -= event.copper;
            if (currentCopper < 0){
                let makeChange: number = Math.ceil(Math.abs(currentCopper) / 10)
                currentSilver -= makeChange;
                currentCopper += makeChange * 10;
            }
            currentSilver -= event.silver;
            if (currentSilver < 0){
                if ((currentElectrum - event.electrum) * 5 > Math.abs(currentSilver)){
                    let makeChange: number = Math.ceil(Math.abs(currentSilver) / 5)
                    currentElectrum -= makeChange;
                    currentSilver += makeChange * 5;
                } else if (currentElectrum - event.electrum > 0){
                    let makeChange: number = (currentElectrum - event.electrum);
                    currentElectrum -= makeChange;
                    currentSilver += makeChange * 5;
                }
                if (currentSilver < 0){
                    let makeChange: number = Math.ceil(Math.abs(currentSilver) / 10)
                    currentGold -= makeChange;
                    currentSilver += makeChange * 10;
                }
            }
            currentElectrum -= event.electrum;
            if (currentElectrum < 0){
                let makeChange: number = Math.ceil(Math.abs(currentElectrum) / 2)
                currentGold -= makeChange;
                currentElectrum += makeChange * 2;
            }
            currentGold -= event.gold;
            if (currentGold < 0){
                let usingElectrum: number = Math.floor(currentElectrum / 2);
                currentElectrum -= usingElectrum * 2
                currentGold += usingElectrum;
                if (currentGold >= 0){
                    currentElectrum += currentGold * 2;
                    currentGold = 0
                }
                else {if (currentElectrum > 0 && currentSilver*10 + currentCopper > 50){
                    if (currentSilver > 5){
                        currentSilver -=5;
                        currentElectrum--;
                        currentGold++
                    } else {
                        currentCopper -= (50 - (currentSilver * 10));
                        currentSilver = 0;
                        currentElectrum = 0;
                        currentGold++;
                    }
                }}
            }
            if (currentGold < 0){
                let usingSilver: number = Math.floor(currentSilver / 10);
                currentSilver -= usingSilver * 10;
                currentGold += usingSilver;
                if (currentGold >= 0){
                    currentSilver += currentGold * 10;
                    currentGold = 0;
                } else if (currentSilver*10 + currentCopper > 100){
                    currentCopper -= (100 - (currentSilver * 10));
                    currentSilver = 0;
                    currentGold++
                }
            }
            if (currentGold < 0){
                let usingCopper: number = Math.floor(currentCopper / 100);
                currentCopper -= usingCopper * 100;
                currentGold += usingCopper;
                if (currentGold >= 0){
                    currentCopper += currentGold * 100;
                    currentGold = 0;
                } else {currentGold = currentElectrum = currentSilver = currentCopper = 0;}
            }
        }
        return {
            ...currentCharacter,
            gold: currentGold,
            electrum: currentElectrum,
            silver: currentSilver,
            copper: currentCopper
        }

    }
    if (event.type === "magicalMoneyExchange"){
        let currentCopper: number = currentCharacter.copper;
        let currentSilver: number = currentCharacter.silver;
        let currentElectrum: number = currentCharacter.electrum;
        let currentGold: number = currentCharacter.gold;
        let exchangeCopper: number = Math.floor(currentCopper / 10);
        currentCopper = currentCopper%10;
        currentSilver += exchangeCopper;
        let exchangeSilver: number = Math.floor(currentSilver / 5);
        currentSilver = currentSilver%5;
        currentElectrum += exchangeSilver;
        let exchangeElectrum: number = Math.floor(currentElectrum / 2);
        currentElectrum = currentElectrum%2;
        currentGold += exchangeElectrum;

        return {
            ...currentCharacter,
            gold: currentGold,
            electrum: currentElectrum,
            silver: currentSilver,
            copper: currentCopper
        }
    }
    if (event.type === "updateKnownSpells"){
        return{
            ...currentCharacter,
            spells: event.knownSpells
        }
    }
    if (event.type === "updateAbilities"){
        return{
            ...currentCharacter,
            abilities: event.knownAbilities
        }
    }
    if (event.type === "updateSTR"){
        let updatedAbilities: Ability[] = updateAbilitiesUseOnStatChange(currentCharacter, "STR", event.value)
        return{
            ...currentCharacter,
            STR: event.value,
            abilities: updatedAbilities
        }
    }
    if (event.type === "updateDEX"){
        let updatedAbilities: Ability[] = updateAbilitiesUseOnStatChange(currentCharacter, "DEX", event.value)
        return{
            ...currentCharacter,
            DEX: event.value,
            abilities: updatedAbilities
        }
    }
    if (event.type === "updateCON"){
        let updatedAbilities: Ability[] = updateAbilitiesUseOnStatChange(currentCharacter, "CON", event.value)
        return{
            ...currentCharacter,
            CON: event.value,
            abilities: updatedAbilities
        }
    }
    if (event.type === "updateINT"){
        let updatedAbilities: Ability[] = updateAbilitiesUseOnStatChange(currentCharacter, "INT", event.value)
        return{
            ...currentCharacter,
            INT: event.value,
            abilities: updatedAbilities
        }
    }
    if (event.type === "updateWIS"){
        let updatedAbilities: Ability[] = updateAbilitiesUseOnStatChange(currentCharacter, "WIS", event.value)
        return{
            ...currentCharacter,
            WIS: event.value,
            abilities: updatedAbilities
        }
    }
    if (event.type === "updateCHA"){
        let updatedAbilities: Ability[] = updateAbilitiesUseOnStatChange(currentCharacter, "CHA", event.value)
        return{
            ...currentCharacter,
            CHA: event.value,
            abilities: updatedAbilities
        }
    }
    if (event.type === "updateCharLevel"){
        let proficiency = Math.ceil((4+event.value)/4);
        let updatedAbilities: Ability[] = updateAbilitiesUseOnStatChange(currentCharacter, "Level", event.value)
        return{
            ...currentCharacter,
            characterLevel: event.value,
            proficiency: proficiency,
            abilities: updatedAbilities
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
    if (event.type === "updateArmorClass") {
        return{
            ...currentCharacter,
            armorClass: event.value
        }
    }
    if (event.type === "equipWeapon1") {
        let otherWeapon: string = currentCharacter.weapon2;
        currentCharacter.items.map((item) => {
            if (item.twoHanded && (currentCharacter.weapon2 === item.name) && (item.name != event.value)) {
                otherWeapon = "";
            }
            if (!item.twoHanded && (event.value === item.name) && (item.quantity < 2) && (currentCharacter.weapon2 === item.name)) {
                otherWeapon = "";
            }
        })
        return{
            ...currentCharacter,
            weapon1: event.value,
            weapon2: otherWeapon
        }
    }
    if (event.type === "equipWeapon2") {
        let otherWeapon: string = currentCharacter.weapon1;
        currentCharacter.items.map((item) => {
            if (item.twoHanded && (currentCharacter.weapon1 === item.name) && (item.name != event.value)) {
                otherWeapon = ""
            }
            if (!item.twoHanded && (event.value === item.name) && (item.quantity < 2) && (currentCharacter.weapon1 === item.name)) {
                otherWeapon = "";
            }
        })
        return{
            ...currentCharacter,
            weapon2: event.value,
            weapon1: otherWeapon
        }
    }
    if (event.type === "equipArmor") {
        let newAC = 10;
        let isHoldingShield = 0;
        currentCharacter.items.map((item) => {
            if (item.name === event.value){
                let dexBonusToAC = getStatMod(currentCharacter.DEX);
                if (dexBonusToAC > item.AC[1]) {
                    dexBonusToAC = item.AC[1];
                }
                newAC = (item.AC[0] + dexBonusToAC);
            }
            if (item.name === currentCharacter.weapon1 && item.type === "Shield"){
                isHoldingShield += item.AC[0];
            }
        })
        newAC += isHoldingShield;
        return{
            ...currentCharacter,
            armor: event.value,
            armorClass: newAC
        }
    }
    if (event.type === "attune1") {
        return{
            ...currentCharacter,
            attunement1: event.value
        }
    }
    if (event.type === "attune2") {
        return{
            ...currentCharacter,
            attunement2: event.value
        }
    }
    if (event.type === "attune3") {
        return{
            ...currentCharacter,
            attunement3: event.value
        }
    }
    if (event.type === "useConsumable") {
        let updatedItems: Item[] = [];
        currentCharacter.items.forEach((item) => {
            if (item.name === event.itemName){
                let quantity = item.quantity - 1;
                if (event.value === "add"){quantity = item.quantity + 1;}
                if (quantity < 0) {quantity = 0;}
                updatedItems.push({...item, quantity: quantity})
            } else {updatedItems.push(item);}
        })
        return{
            ...currentCharacter,
            items: updatedItems
        }
    }
    if (event.type === "usingItemChargesCounter") {
        let updatedItems: Item[] = [];
        currentCharacter.items.forEach((item) => {
            if (item.name === event.itemName){
                let unusedQuantity = item.unusedQuantity - 1;
                if (event.value === "add"){unusedQuantity = item.unusedQuantity + 1;}
                if (unusedQuantity < 0) {unusedQuantity = 0;}
                if (unusedQuantity > item.uses) {unusedQuantity = item.uses}
                updatedItems.push({...item, unusedQuantity: unusedQuantity})
            } else {updatedItems.push(item);}
        })
        return{
            ...currentCharacter,
            items: updatedItems
        }
    }
    if (event.type === "usingItemChargesButtons") {
        let updatedItems: Item[] = [];
        currentCharacter.items.forEach((item) => {
            if (item.name === event.itemName){
                let newUsedString = "";
                for (let index = 0; index < item.uses; index++){
                    if (index === event.index){
                        if (item.usedInstances[index] === "0") {newUsedString += "X";}
                        else {newUsedString += "0";}
                    } else {newUsedString += item.usedInstances[index];}
                }
                updatedItems.push({...item, usedInstances: newUsedString})
            } else {updatedItems.push(item);}
        })
        return {
            ...currentCharacter,
            items: updatedItems
        }
    }


    return currentCharacter;
}

function updateAbilitiesUseOnStatChange(currentCharacter: Character, statType: string, statValue: number) {
    let updatedAbilities: Ability[] = [];
    if (statType === "Level"){
        currentCharacter.abilities.forEach((ability) => {
            let abilityUsesQuantity: number = ability.uses;
            let abilityUsedInstances: string = ability.usedInstances;
            if (ability.usesQuantityStat === "Level") {
                abilityUsesQuantity = statValue;
                if (abilityUsesQuantity < 1){abilityUsesQuantity = 1}
                if (abilityUsesQuantity < ability.uses){
                    abilityUsedInstances = "";
                    let i = 0;
                    while (abilityUsedInstances.length < abilityUsesQuantity) {
                        abilityUsedInstances += ability.usedInstances[i];
                        i++;
                    }
                }
                if (abilityUsesQuantity > ability.uses){
                    while (abilityUsedInstances.length < abilityUsesQuantity) {
                        abilityUsedInstances += "0";
                    }
                }
            }
            if (ability.usesQuantityStat === "Proficiency") {
                abilityUsesQuantity = Math.ceil((4 + statValue)/4);
                if (abilityUsesQuantity < 1){abilityUsesQuantity = 1}
                if (abilityUsesQuantity < ability.uses){
                    abilityUsedInstances = "";
                    let i = 0;
                    while (abilityUsedInstances.length < abilityUsesQuantity) {
                        abilityUsedInstances += ability.usedInstances[i];
                        i++;
                    }
                }
                if (abilityUsesQuantity > ability.uses){
                    while (abilityUsedInstances.length < abilityUsesQuantity) {
                        abilityUsedInstances += "0";
                    }
                }
            }

            updatedAbilities.push({...ability, uses: abilityUsesQuantity, usedInstances: abilityUsedInstances})
        })
        return updatedAbilities;
    }
    currentCharacter.abilities.forEach((ability) => {
        let abilityUsesQuantity: number = ability.uses;
        let abilityUsedInstances: string = ability.usedInstances;
        if (ability.usesQuantityStat === statType) {
            abilityUsesQuantity = (Math.floor((statValue - 10) / 2));
            if (abilityUsesQuantity < 1){abilityUsesQuantity = 1}
            if (abilityUsesQuantity < ability.uses){
                abilityUsedInstances = "";
                let i = 0;
                while (abilityUsedInstances.length < abilityUsesQuantity) {
                    abilityUsedInstances += ability.usedInstances[i];
                    i++;
                }
            }
            if (abilityUsesQuantity > ability.uses){
                while (abilityUsedInstances.length < abilityUsesQuantity) {
                    abilityUsedInstances += "0";
                }
            }
        }
        updatedAbilities.push({...ability, uses: abilityUsesQuantity, usedInstances: abilityUsedInstances})
    })
    return updatedAbilities;
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