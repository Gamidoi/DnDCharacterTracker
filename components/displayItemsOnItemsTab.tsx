import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";
import {useState} from "react";
import {Item} from "@/assets/classes/item";
import {Pressable, StyleSheet, View, Text} from "react-native";
import {displayItemConsumableBox} from "@/components/displayItemConsumableBox";
import {displayItemWeaponBox} from "@/components/displayItemWeaponBox";
import {displayItemArmorBox} from "@/components/displayItemArmorBox";


export function displayItemsOnItemsTab() {
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();

    let [consumables, setConsumables] = useState(getItemsOfCatagory("Consumable"));
    let [weapons, setWeapons] = useState(getItemsOfCatagory("Weapon"));
    let [armors, setArmors] = useState(getItemsOfCatagory("Armor"));
    let [artifacts, setArtifacts] = useState(getItemsOfCatagory("Artifacts"));

    let [displayConsumable, setDisplayConsumable] = useState(false);
    let [displayWeapons, setDisplayWeapons] = useState(false);
    let [displayArmors, setDisplayArmors] = useState(false);
    let [displayArtifacts, setDisplayArtifacts] = useState(false);

    function getItemsOfCatagory(itemType: string): Item[] {
        let itemsOfCatagory: Item[] = [];
        character.items.map((item) => {
            if (itemType === item.type) {
                itemsOfCatagory.push(item);
            }
        })
        return itemsOfCatagory;
    }
    function refreshItemGroups(){
        setConsumables(getItemsOfCatagory("Consumable"));
        setWeapons(getItemsOfCatagory("Weapon"));
        setArmors(getItemsOfCatagory("Armor"));
        setArtifacts(getItemsOfCatagory("Artifacts"));
        return <></>
    }



    return (<>
        <View>
            <Pressable
                style={styles.itemCatagoryButton}
                onPress={() => {
                    setDisplayConsumable(!displayConsumable);
                    refreshItemGroups();
            }}><Text style={styles.itemCatagoryHeader}>Consumables</Text></Pressable>
            {displayConsumable && <View>
                {consumables.length === 0 && <Text style={[styles.noItemsInCatagory, {backgroundColor: "teal"}]}>Character has no Consumables</Text>}
                {character.items.map((item: Item) => {
                    if (item.type === "Consumable") {
                        return displayItemConsumableBox(item)}})}
            </View>}
        </View>

        <View>
            <Pressable
                style={styles.itemCatagoryButton}
                onPress={() => {
                    setDisplayWeapons(!displayWeapons);
                    refreshItemGroups();
                }}>
                <Text style={styles.itemCatagoryHeader}>Weapons</Text>
                <View style={{borderWidth: 2, borderColor: "orange", borderRadius: 4}}>
                    <Text style={styles.label}>Left Hand: {character.weapon1 != "" ? character.weapon1 : "Empty"}</Text>
                    <Text style={styles.label}>Right Hand: {character.weapon2 != "" ? character.weapon2 : "Empty"}</Text>
                    <View style={{flexDirection: "row", alignSelf: "center", padding: 4}}>
                        <Pressable onPress={() => {
                            characterUpdater({type: "equipWeapon1", value: ""});
                        }}>
                            <Text style={[
                                styles.equipButton,
                                {backgroundColor: character.weapon1 === "" ? "darkgray" : "darkgoldenrod"
                                }]}>Empty Left Hand</Text>
                        </Pressable>
                        <Pressable onPress={() => {
                            characterUpdater({type: "equipWeapon2", value: ""});
                        }}>
                            <Text style={[
                                styles.equipButton,
                                {backgroundColor: character.weapon2 === "" ? "darkgray" : "darkgoldenrod"
                                }]}>Empty Right Hand</Text>
                        </Pressable>
                    </View>
                </View>
            </Pressable>
            {displayWeapons && <View>
                {weapons.length === 0 && <Text style={[styles.noItemsInCatagory, {backgroundColor: "saddlebrown"}]}>Character has no Weapons</Text>}
                {character.items.map((item: Item) => {
                    if (item.type === "Weapon") {return displayItemWeaponBox(item)}})}
            </View>}
        </View>


        <View>
            <Pressable
                style={styles.itemCatagoryButton}
                onPress={() => {
                    setDisplayArmors(!displayArmors);
                    refreshItemGroups();
                }}>
                <Text style={styles.itemCatagoryHeader}>Armors</Text>
                <View style={{borderWidth: 2, borderColor: "orange", borderRadius: 4}}>
                    <Text style={styles.label}>Armor: {character.armor != "" ? character.armor : "Empty"}</Text>
                    <View style={{flexDirection: "row", alignSelf: "center", padding: 4}}>
                        <Pressable onPress={() => {
                            characterUpdater({type: "equipArmor", value: ""});
                        }}>
                            <Text style={[
                                styles.equipButton,
                                {backgroundColor: character.armor === "" ? "darkgray" : "darkgoldenrod"
                                }]}>Unequip Armor</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.label}>AC: {character.armorClass}</Text>
                </View>
            </Pressable>
            {displayArmors && <View>
                {armors.length === 0 && <Text  style={[styles.noItemsInCatagory, {backgroundColor: "darkgreen"}]}>Character has no Armors</Text>}
                {character.items.map((item: Item) => {
                    if (item.type === "Armor") {return displayItemArmorBox(item)}})}
            </View>}
        </View>
    </>)
}


const styles = StyleSheet.create({
    label: {
        color: "white",
        textAlign: "center",
        fontSize: 12,
    },
    itemCatagoryHeader: {
        color: "white",
        fontSize: 30,
        textAlign: "center"
    },
    itemCatagoryButton: {
        color: "white",
        fontSize: 16,
        backgroundColor: "purple",
        borderRadius: 12,
        width: 300,
        padding: 5,
        borderColor: "orange",
        borderWidth: 3,
        marginLeft: 35,
        marginBottom: 5,
    },
    noItemsInCatagory: {
        color: "white",
        fontSize: 16,
        borderRadius: 12,
        width: 300,
        padding: 5,
        borderColor: "orange",
        borderWidth: 3,
        marginLeft: 35,
        marginBottom: 5,
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
})