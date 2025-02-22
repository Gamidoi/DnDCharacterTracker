import {Spell} from "@/assets/objects/spell";

export class Character {
    charName: string;
    maxHP: number;
    spellcastingLevel: number;
    characterLevel: number;
    fullCasterLevel: number;
    halfCasterLevel: number;
    warlockCasterLevel: number;
    currentUsedSpells: string;
    warlockCurrentUsedSpells: string;
    abilities: [];
    spells: Spell[];

    STR: number;
    DEX: number;
    CON: number;
    INT: number;
    WIS: number;
    CHA: number;
    proficiency: number;

    athletics: string
    acrobatics: string
    sleightOfHand: string
    stealth: string
    arcana: string
    history: string
    investigation: string
    nature: string
    religion: string
    animalHandling: string
    insight: string
    medicine: string
    perception: string
    survival: string
    deception: string
    intimidation: string
    performance: string
    persuasion: string


    constructor(character: string, HPMax = 10, characterLevel = 0) {
        this.charName = character;
        this.maxHP = HPMax;
        this.spellcastingLevel = 0;
        this.characterLevel = characterLevel;
        this.fullCasterLevel = this.warlockCasterLevel = this.halfCasterLevel = 0;
        this.currentUsedSpells = "0000000000000000000000"
        this.warlockCurrentUsedSpells = "0000"
        this.abilities = [];
        this.spells = [];
        this.STR = this.DEX = this.CON = this.INT = this.WIS = this.CHA = 10;
        this.proficiency = this.updateProficiency(characterLevel);

        this.athletics = this.acrobatics = this.sleightOfHand = this.stealth = this.arcana = this.history = this.investigation = this.nature = this.religion =
            this.animalHandling = this.insight = this.medicine = this.perception = this.survival = this.deception = this.intimidation = this.performance =
                this.persuasion = "X";
    }

    public updateProficiency(characterLevel :number) :number {
        this.proficiency = Math.ceil((4+characterLevel)/4);
        return  this.proficiency;
    }
    public updateSpellcastingLevel(fullCasterLevel :number, halfCasterLevel :number) :number {
        this.fullCasterLevel = fullCasterLevel;
        this.halfCasterLevel = halfCasterLevel;
        this.spellcastingLevel = Math.floor(fullCasterLevel + (halfCasterLevel / 2));
        return  this.spellcastingLevel;
    }
}
export function updateProficiency(thisCharacter :Character, characterLevel :number) :number {
    thisCharacter.proficiency = Math.ceil((4+characterLevel)/4);
    return  thisCharacter.proficiency;
}
export function updateSpellcastingLevel(thisCharacter :Character, fullCasterLevel :number, halfCasterLevel :number) :number {
    thisCharacter.fullCasterLevel = fullCasterLevel;
    thisCharacter.halfCasterLevel = halfCasterLevel;
    thisCharacter.spellcastingLevel = Math.floor(fullCasterLevel + (halfCasterLevel / 2));
    return  thisCharacter.spellcastingLevel;
}