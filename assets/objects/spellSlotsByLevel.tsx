
const spellSlotsArray = (givenLevel :number) => {
    {
        if (typeof givenLevel != "number") {givenLevel = parseInt(givenLevel);}
        let spellLevel = Math.floor(givenLevel)
        if (spellLevel === 1) {return "x200000000";}
        if (spellLevel === 2) {return "x300000000";}
        if (spellLevel === 3) {return "x420000000";}
        if (spellLevel === 4) {return "x430000000";}
        if (spellLevel === 5) {return "x432000000";}
        if (spellLevel === 6) {return "x433000000";}
        if (spellLevel === 7) {return "x433100000";}
        if (spellLevel === 8) {return "x433200000";}
        if (spellLevel === 9) {return "x433310000";}
        if (spellLevel === 10) {return "x433320000";}
        if (spellLevel === 11) {return "x433321000";}
        if (spellLevel === 12) {return "x433321000";}
        if (spellLevel === 13) {return "x433321100";}
        if (spellLevel === 14) {return "x433321100";}
        if (spellLevel === 15) {return "x433321110";}
        if (spellLevel === 16) {return "x433321110";}
        if (spellLevel === 17) {return "x433321111";}
        if (spellLevel === 18) {return "x433331111";}
        if (spellLevel === 19) {return "x433332111";}
        if (spellLevel >= 20) {return "x433332211";}
        return "x000000000";
}}
export function spellSlotsByLevel(givenLevel :number){
    if (typeof givenLevel != "number") {givenLevel = parseInt(givenLevel);}
    return spellSlotsArray(givenLevel);
    }
