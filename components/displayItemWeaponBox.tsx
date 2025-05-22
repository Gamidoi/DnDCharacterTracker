import {Item} from "@/assets/classes/item";
import {StyleSheet, View, Text} from "react-native";
import React from "react";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";
import {ItemChargesInteraction} from "@/components/itemChargesInteractionTool";
import {ItemQuantityAdjustTool} from "@/components/itemQuantityAdjustTool";
import {
    getActualDamageRollPerStat,
    getDiceRollAsString, toAttackModifierNotProficient,
    toAttackModifierProficient
} from "@/assets/functionLibrary/getDiceRollAsString";
import {DisplayItemAttunementButtons} from "@/components/displayItemAttunementButtons";
import {DisplayItemHandEquipButtons} from "@/components/displayItemHandEquipButtons";


export type DisplayItemWeaponBoxProps = {
    item: Item|null;
    displayQuantityButtons: boolean;
}
export function DisplayItemWeaponBox({item, displayQuantityButtons = true}: DisplayItemWeaponBoxProps) {
    if (item === null){return <></>}

    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();




    let attackTypeTags = ["STR", "DEX", "CON", "INT", "WIS", "CHA"]

    return (<View style={styles.itemWeaponBox}>
        <Text style={styles.itemName}>{item.name}</Text>
        {item.roll[0] && <Text style={styles.diceDisplay}>{getDiceRollAsString(item.roll)}</Text>}

        {attackTypeTags.map(tag => {
            return item.weaponTags.includes(tag) && <>
                {!item.weaponTags.includes("Not Proficient") ?
                    <Text style={styles.statAdjustedRollDisplay}>
                        {tag}
                        {" weapon "}
                        {toAttackModifierProficient(tag, item) > 0 ? "+" : "-"}
                        {toAttackModifierProficient(tag, item)}
                        {" to hit for"}
                        {getDiceRollAsString(getActualDamageRollPerStat(tag, item))}</Text> :
                    <Text style={styles.statAdjustedRollDisplay}>
                        {tag}
                        {" weapon "}
                        {toAttackModifierNotProficient(tag, item) > 0 ? "+": "-"}
                        {toAttackModifierNotProficient(tag, item)}
                        {" to hit for"}
                        {getDiceRollAsString(getActualDamageRollPerStat(tag, item))}</Text>}
            </>
        })}



        {(item.weaponTags.length > 0 || item.requiresAttunment) && <View style={styles.tagsBox}>
            {item.requiresAttunment && <Text style={styles.specificTag}>Attunement</Text>}
            {item.weaponTags.map(tag => {
                if (tag.length > 3) {return <Text style={styles.specificTag}>{tag}</Text>}
            })}
        </View>}

        <ItemChargesInteraction item={item} getRolledDiceAsString={getDiceRollAsString(item.refreshRoll)} />


        <Text style={styles.label}>Equip Weapon?</Text>
        <DisplayItemHandEquipButtons item={item} />
        {((character.weapon1?.name === item.name) || (character.weapon2?.name === item.name)) && <Text style={styles.label}>Weapon is Already Equipped</Text>}
        <DisplayItemAttunementButtons item={item} />


        <Text style={styles.label}>Value: {item.value}gp</Text>
        <Text style={styles.label}>Quantity Owned</Text>
        {displayQuantityButtons && <ItemQuantityAdjustTool item={item} />}
        {item.description != "" && <Text style={styles.descriptionText}>{item.description}</Text>}
    </View>)
}
const styles = StyleSheet.create({
    itemWeaponBox: {
        backgroundColor: "saddlebrown",
        borderRadius: 10,
        borderWidth: 4,
        borderColor: "orange",
        marginBottom: 10,
    },
    itemName: {
        color: "white",
        fontSize: 30,
        textAlign: "center"
    },
    descriptionText: {
        color: "white",
        textAlign: "center",
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "maroon",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "orange",
    },
    label: {
        color: "white",
        textAlign: "center",
        fontSize: 12,
    },
    diceDisplay: {
        color: "white",
        textAlign: "center",
        backgroundColor: "black",
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "orange",
        padding: 2,
        fontSize: 11,
        width: 160,
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
    tagsBox: {
        borderWidth: 2,
        borderColor: "orange",
        borderRadius: 10,
        backgroundColor: "teal",
        flexDirection: "row",
        alignSelf: "center",
        paddingHorizontal: 8
    },
    equipButton: {
        color: "white",
        borderWidth: 2,
        borderColor: "orange",
        borderRadius: 10,
        backgroundColor: "darkgoldenrod",
        flexDirection: "row",
        alignSelf: "center",
        padding: 13
    },
    specificTag: {
        color: "white",
        fontSize: 12,
        borderWidth: 2,
        borderColor: "orange",
        borderRadius: 10,
        backgroundColor: "saddlebrown",
        margin: 3,
        padding: 4,
    },
})