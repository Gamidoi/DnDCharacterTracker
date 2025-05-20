import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";
import {
    getActualDamageRollPerStat,
    getDiceRollAsString, toAttackModifierNotProficient,
    toAttackModifierProficient
} from "@/assets/functionLibrary/getDiceRollAsString";
import {DisplayItemWeaponBox} from "@/components/displayItemWeaponBox";


export function DisplayEquippedOnIndex(){
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();


    let attackTypeTags = ["STR", "DEX", "CON", "INT", "WIS", "CHA"]

    return (<>
        {character.weapon1 != null && <View style={styles.weaponBox}>
            <Text style={styles.itemName}>{character.weapon1?.name}</Text>
            {attackTypeTags.map(tag => {
                return character.weapon1?.weaponTags.includes(tag) && <>
                    {!character.weapon1?.weaponTags.includes("Not Proficient") ?
                        <Text style={styles.statAdjustedRollDisplay}>
                            {tag}
                            {" weapon "}
                            {toAttackModifierProficient(tag, character.weapon1) > 0 ? "+" : "-"}
                            {toAttackModifierProficient(tag, character.weapon1)}
                            {" to hit for"}
                            {getDiceRollAsString(getActualDamageRollPerStat(tag, character.weapon1))}</Text> :
                        <Text style={styles.statAdjustedRollDisplay}>
                            {tag}
                            {" weapon "}
                            {toAttackModifierNotProficient(tag, character.weapon1) > 0 ? "+": "-"}
                            {toAttackModifierNotProficient(tag, character.weapon1)}
                            {" to hit for"}
                            {getDiceRollAsString(getActualDamageRollPerStat(tag, character.weapon1))}</Text>}
                </>
            })}
        </View>}
        <DisplayItemWeaponBox item={character.weapon1} displayQuantityButtons={false} />



        <Text style={styles.labels}>{character.weapon2?.name}</Text>
        <Text style={styles.labels}>{character.armor?.name}</Text>
        <Text style={styles.labels}>{character.attunement1?.name}</Text>
        <Text style={styles.labels}>{character.attunement2?.name}</Text>
        <Text style={styles.labels}>{character.attunement3?.name}</Text>

    </>)
}

const styles = StyleSheet.create({
    itemName: {
        color: "white",
        textAlign: "center",
        fontSize: 18,
    },
    labels: {
        color: "white",
        textAlign: "center",
        fontSize: 12,
    },
    weaponBox: {
        backgroundColor: "saddlebrown",
        borderWidth: 2,
        borderColor: "orange",
        borderRadius: 5,
        width: "70%",
        alignSelf: "center",
    },
    statAdjustedRollDisplay: {
        color: "white",
        textAlign: "center",
        backgroundColor: "maroon",
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "orange",
        padding: 5,
        fontSize: 20,
    },
});