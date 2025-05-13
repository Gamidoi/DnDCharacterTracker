import {useCharacter} from "@/components/characterUpdater";


export function getStatMod(stat: number): number {
    return (Math.floor((stat / 2) - 5))
}
export function getStatBonus(stat: string): number {
    const character = useCharacter();
    if (stat === "STR") {return getStatMod(character.STR);}
    else if (stat === "DEX") {return getStatMod(character.DEX);}
    else if (stat === "CON") {return getStatMod(character.CON);}
    else if (stat === "INT") {return getStatMod(character.INT);}
    else if (stat === "WIS") {return getStatMod(character.WIS);}
    return getStatMod(character.CHA);
}