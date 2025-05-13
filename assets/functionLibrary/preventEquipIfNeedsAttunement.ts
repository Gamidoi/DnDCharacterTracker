import {Item} from "@/assets/classes/item";
import {Character} from "@/assets/classes/character";


export function preventEquipIfNeedsAttunement(item: Item, character: Character): boolean {
    if (!item.requiresAttunment){return true}
    if (character.attunement1?.name === item.name){return true}
    if (character.attunement2?.name === item.name){return true}
    return character.attunement3?.name === item.name;
}