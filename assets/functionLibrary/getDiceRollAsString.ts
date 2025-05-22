import {Item} from "@/assets/classes/item";
import {getStatBonus} from "@/assets/functionLibrary/getCoreStatMod";
import {useCharacter} from "@/components/characterUpdater";


export function getDiceRollAsString(rolledDice: [boolean, number, number, number, number, number, number, number, number]): string {
    let diceString = ""
    if (rolledDice[1] > 0){ diceString += " " + rolledDice[1] + "d4";
        if ( rolledDice[2] > 0 || rolledDice[3] > 0 || rolledDice[4] > 0 || rolledDice[5] > 0 || rolledDice[6] > 0 || rolledDice[7] > 0){diceString += " +"}
    }
    if (rolledDice[2] > 0){ diceString += " " + rolledDice[2] + "d6";
        if (rolledDice[3] > 0 || rolledDice[4] > 0 || rolledDice[5] > 0 || rolledDice[6] > 0 || rolledDice[7] > 0){diceString += " +"}
    }
    if (rolledDice[3] > 0){ diceString += " " + rolledDice[3] + "d8";
        if (rolledDice[4] > 0 || rolledDice[5] > 0 || rolledDice[6] > 0 || rolledDice[7] > 0){diceString += " +"}
    }
    if (rolledDice[4] > 0){ diceString += " " + rolledDice[4] + "d10";
        if (rolledDice[5] > 0 || rolledDice[6] > 0 || rolledDice[7] > 0){diceString += " +"}
    }
    if (rolledDice[5] > 0){ diceString += " " + rolledDice[5] + "d12";
        if (rolledDice[6] > 0 || rolledDice[7] > 0){diceString += " +"}
    }
    if (rolledDice[6] > 0){ diceString += " " + rolledDice[6] + "d20";
        if (rolledDice[7] > 0){diceString += " +"}
    }
    if (rolledDice[7] > 0){ diceString += " " + rolledDice[7] + "d100";
    }
    if (rolledDice[8] > 0){ diceString += " +" + rolledDice[8]; }
    return diceString;
}


export function getActualDamageRollPerStat(stat: string, item: Item): [boolean, number, number, number, number, number, number, number, number]{
    let statBonus: number = getStatBonus(stat);
    return [item.roll[0], item.roll[1], item.roll[2], item.roll[3], item.roll[4],
        item.roll[5], item.roll[6], item.roll[7], item.roll[8] + statBonus];
}

export function toAttackModifierProficient(stat: string, item: Item): number {
    const character = useCharacter();
    return getStatBonus(stat) + character.proficiency + item.roll[8];
}
export function toAttackModifierNotProficient(stat: string, item: Item): number {
    return getStatBonus(stat) + item.roll[8];
}