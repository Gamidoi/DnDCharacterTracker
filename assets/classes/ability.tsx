export class Ability {
    name: string;
    usesType: string;
    usesQuantityStat: string;
    uses: number;
    usedInstances: string;
    unusedQuantity: number;
    description: string;
    refreshOn: string;
    persistence: [boolean, boolean];
    resistance: string[];
    immunity: string[];
    roll: [boolean, number, number, number, number, number, number, number, number];

    constructor(name: string, usesType: string, usesQuantityStat: string, uses: number, description: string, refreshOn: string, persistence: [boolean, boolean], resistance: string[],
                immunity: string[], roll: [boolean, number, number, number, number, number, number, number, number]) {
        this.name = name;
        this.usesType = usesType;
        this.usesQuantityStat = usesQuantityStat;
        this.uses = uses;
        this.usedInstances = "";
        while (this.usedInstances.length < uses){
            this.usedInstances += "0"
        }
        this.unusedQuantity = uses;
        this.description = description;
        this.refreshOn = refreshOn;
        this.persistence = persistence;
        this.resistance = resistance;
        this.immunity = immunity;
        this.roll = roll;
    }
}