export class Spell {
    name : string;
    spellLevel : number;
    verbal : boolean;
    somatic : boolean;
    material : [boolean, string];
    concentration : boolean;
    ritual : boolean;
    time : string;
    duration : string;
    spellRange : string;
    spellTarget : string;
    isAttack : [boolean, string];
    isSaveDC : [boolean, string, string];
    // d4, d6, d8, d10, d12, bonus
    damage : [boolean, number, number, number, number, number, number];
    description : [boolean, string];
    constructor(name : string, spellLevel : number = 0, verbal : boolean = false, somatic : boolean = false, material : [boolean, string] = [false, ''],
                concentration : boolean = false, ritual : boolean = false, time : string = "action", duration : string = "instant",
                spellRange : string = "touch", spellTarget : string= "self", isAttack : [boolean, string] = [false, "INT"],
                isSaveDC : [boolean, string, string] = [false, "INT", "DEX"], damage: [boolean, number, number, number, number, number, number] = [false, 0, 0, 0, 0, 0, 0],
                description : [boolean, string] = [false, ""],){
        this.name = name;
        if (isNaN(spellLevel) || spellLevel == undefined){spellLevel = 0;}
        this.spellLevel = spellLevel;
        this.verbal = verbal;
        this.somatic = somatic;
        this.material = material;
        this.concentration = concentration;
        this.ritual = ritual;
        this.time = time;
        this.duration = duration;
        this.spellRange = spellRange;
        this.spellTarget  = spellTarget;
        this.isAttack = isAttack;
        this.isSaveDC  = isSaveDC;
        this.damage = damage;
        this.description = description;

        if (damage[1] + damage[2] + damage[3] + damage[4] + damage[5] + damage[6] === 0) {this.damage = [false, 0, 0, 0, 0, 0, 0]}
    }
}