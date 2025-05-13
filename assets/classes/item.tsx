export class Item{
    type: string;
    name: string;
    roll: [boolean, number, number, number, number, number, number, number, number];
    requiresAttunment: boolean;
    twoHanded: boolean;
    weaponTags: string[];
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

    constructor(type: string, name: string, roll: [boolean, number, number, number, number, number, number, number, number], requiresAttunment: boolean, weaponTags: string[],
                quantity: number, AC: [number, number], description: string, uses: number, refreshOn: string, refreshQuantity: string,  value: number,
                refreshRoll: [boolean, number, number, number, number, number, number, number, number]) {
        this.type = type;
        this.name = name;
        this.roll = roll;
        this.requiresAttunment = requiresAttunment;
        this.twoHanded = weaponTags.includes("Two Handed");
        this.weaponTags = weaponTags;
        if (weaponTags.includes("Finesse")){
            this.weaponTags.push("STR");
            this.weaponTags.push("DEX");
        }
        if (weaponTags.includes("Melee")){
            this.weaponTags.push("STR");
        }
        if (weaponTags.includes("Ranged")){
            this.weaponTags.push("DEX");
        }
        if (weaponTags.includes("CON")){
            this.weaponTags.push("CON Weapon");
        }
        if (weaponTags.includes("INT")){
            this.weaponTags.push("INT Weapon");
        }
        if (weaponTags.includes("WIS")){
            this.weaponTags.push("WIS Weapon");
        }
        if (weaponTags.includes("CHA")){
            this.weaponTags.push("CHA weapon");
        }
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
        if (isNaN(value)) {this.value = 1} else {
            this.value = value;
        }
        this.refreshRoll = refreshRoll;
    }
}