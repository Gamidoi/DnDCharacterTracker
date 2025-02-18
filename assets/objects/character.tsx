
export class Character {
    charName: string;
    maxHP: number;
    spellcastingLevel: number;
    currentUsedSpells: string;
    abilities: {};
    spells: {};

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


    constructor(character: string, HPMax = 10, castingLevel = 0) {
        this.charName = character;
        this.maxHP = HPMax;
        this.spellcastingLevel = castingLevel;
        this.currentUsedSpells = "0000000000000000000000"
        this.abilities = {};
        this.spells = {};
        this.STR = this.DEX = this.CON = this.INT = this.WIS = this.CHA = 10;
        this.proficiency = 2;

        this.athletics = this.acrobatics = this.sleightOfHand = this.stealth = this.arcana = this.history = this.investigation = this.nature = this.religion =
            this.animalHandling = this.insight = this.medicine = this.perception = this.survival = this.deception = this.intimidation = this.performance =
                this.persuasion = "X";
    }

    public getSkills() {




        return  "stringy string";
    }
}