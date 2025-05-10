import {Character} from "@/assets/classes/character";


export function getStatMod(stat: number): number {
    return (Math.floor((stat / 2) - 5))
}