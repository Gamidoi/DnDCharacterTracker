export class Item{
    type: string;
    name: string;
    roll: [boolean, number, number, number, number, number, number, number, number];
    requiresAttunment: boolean;
    twoHanded: boolean;
    quantity: number;
    AC: [number, number]; //[base AC, max Dex modifier]
    uses: number;
    usedInstances: string;
    unusedQuantity: number;
    refreshOn: string;
    refreshQuantity: string;
    value: number;
    description: string;
    refreshRoll: [boolean, number, number, number, number, number, number, number, number];

    constructor(type: string, name: string, roll: [boolean, number, number, number, number, number, number, number, number], requiresAttunment: boolean, twoHanded: boolean,
                quantity: number, AC: [number, number], description: string, uses: number, refreshOn: string, refreshQuantity: string,  value: number,
                refreshRoll: [boolean, number, number, number, number, number, number, number, number]) {
        this.type = type;
        this.name = name;
        this.roll = roll;
        this.requiresAttunment = requiresAttunment;
        this.twoHanded = twoHanded;
        this.quantity = quantity;
        this.AC = AC;
        this.description = description;
        this.uses = uses;
        this.usedInstances = "";
        while (this.usedInstances.length < uses) {
            this.usedInstances += "0";
        }
        this.unusedQuantity = uses;
        this.refreshOn = refreshOn;
        this.refreshQuantity = refreshQuantity;
        if (parseInt(refreshQuantity) > uses) {this.refreshQuantity = "All";}
        this.value = value;
        this.refreshRoll = refreshRoll;
    }
}