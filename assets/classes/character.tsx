import {Spell} from "@/assets/classes/spell";
import {Ability} from "@/assets/classes/ability";

export class Character {
    charName: string;
    maxHP: number;
    currentHP: number;
    armorClass: number;
    spellcastingLevel: number;
    characterLevel: number;
    fullCasterLevel: number;
    halfCasterLevel: number;
    warlockCasterLevel: number;
    currentUsedSpells: string;
    warlockCurrentUsedSpells: string;
    concentration: string;
    abilities: Ability[];
    spells: Spell[];
    languages: string[];
    resistances: string[];
    immunities: string[];
    items: [];

    STR: number;
    DEX: number;
    CON: number;
    INT: number;
    WIS: number;
    CHA: number;
    STRSaveProf: boolean;
    DEXSaveProf: boolean;
    CONSaveProf: boolean;
    INTSaveProf: boolean;
    WISSaveProf: boolean;
    CHASaveProf: boolean;
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
        this.currentHP = HPMax;
        this.armorClass = 10;
        this.spellcastingLevel = 0;
        this.characterLevel = characterLevel;
        this.fullCasterLevel = this.warlockCasterLevel = this.halfCasterLevel = 0;
        this.currentUsedSpells = "0000000000000000000000";
        this.warlockCurrentUsedSpells = "0000";
        this.concentration = "";
        this.abilities = [];
        this.spells = [];
        this.languages = ["common"];
        this.items = [];
        this.resistances = [];
        this.immunities = [];
        this.STR = this.DEX = this.CON = this.INT = this.WIS = this.CHA = 10;
        this.STRSaveProf = this.DEXSaveProf = this.CONSaveProf = this.INTSaveProf = this.WISSaveProf = this.CHASaveProf= false;
        this.proficiency = Math.ceil((4+characterLevel)/4);

        this.athletics = this.acrobatics = this.sleightOfHand = this.stealth = this.arcana = this.history = this.investigation = this.nature = this.religion =
            this.animalHandling = this.insight = this.medicine = this.perception = this.survival = this.deception = this.intimidation = this.performance =
                this.persuasion = "X";
    }
}
