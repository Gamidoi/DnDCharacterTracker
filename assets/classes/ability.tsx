export class Ability {
    name: string;
    usesTrigger: string;
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

    constructor(name: string, usesTrigger: string, usesQuantityStat: string, uses: number, description: string, refreshOn: string, persistence: [boolean, boolean], resistance: string[],
                immunity: string[], roll: [boolean, number, number, number, number, number, number, number, number]) {
        this.name = name;
        this.usesTrigger = usesTrigger;
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
        if (roll[1] + roll[2] + roll[3] + roll[4] + roll[5] + roll[6] + roll[7] + roll[7] === 0 ) {this.roll = [false, 0, 0, 0, 0, 0, 0, 0, 0]}
    }
}