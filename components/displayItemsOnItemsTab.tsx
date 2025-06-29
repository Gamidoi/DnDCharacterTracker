import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";
import {useState} from "react";
import {Item} from "@/assets/classes/item";
import {Pressable, StyleSheet, View, Text} from "react-native";
import {DisplayItemConsumableBox} from "@/components/displayItemConsumableBox";
import {DisplayItemWeaponBox} from "@/components/displayItemWeaponBox";
import {DisplayItemArmorBox} from "@/components/displayItemArmorBox";
import {DisplayItemShieldBox} from "@/components/displayItemShieldBox";
import {DisplayItemArtifactBox} from "@/components/displayItemArtifactBox";


export function DisplayItemsOnItemsTab() {
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();

    let [consumables, setConsumables] = useState(0);
    let [weapons, setWeapons] = useState(0);
    let [armors, setArmors] = useState(0);
    let [artifacts, setArtifacts] = useState(0);
    let [shields, setShields] = useState(0);

    let [displayConsumable, setDisplayConsumable] = useState(false);
    let [displayWeapons, setDisplayWeapons] = useState(false);
    let [displayArmors, setDisplayArmors] = useState(false);
    let [displayArtifacts, setDisplayArtifacts] = useState(false);
    let [displayShield, setDisplayShield] = useState(false);

    function getItemsOfCatagory() {
        character.items.map((item) => {
            if (item.type === "Consumable") {setConsumables(consumables + 1)}
            if (item.type === "Shield") {setShields(shields + 1)}
            if (item.type === "Weapon") {setWeapons(weapons + 1)}
            if (item.type === "Armor") {setArmors(armors + 1)}
            if (item.type === "Artifact") {setArtifacts(artifacts + 1)}
        })
    }

    return (<>
        <View>
            <Pressable
                style={styles.itemCatagoryButton}
                onPress={() => {
                    setDisplayConsumable(!displayConsumable);
                    getItemsOfCatagory();
            }}><Text style={styles.itemCatagoryHeader}>Consumables</Text></Pressable>
            {displayConsumable && <View>
                {consumables === 0 && <Text style={[styles.noItemsInCatagory, {backgroundColor: "teal"}]}>Character has no Consumables</Text>}
                {character.items.map((item: Item) => {
                    if (item.type === "Consumable") {
                        return <DisplayItemConsumableBox item={item} />}})}
            </View>}
        </View>

        <View>
            <Pressable
                style={styles.itemCatagoryButton}
                onPress={() => {
                    setDisplayShield(!displayShield);
                    getItemsOfCatagory();
                }}><Text style={styles.itemCatagoryHeader}>Shields</Text></Pressable>
            {displayShield && <View>
                {shields === 0 && <Text style={[styles.noItemsInCatagory, {backgroundColor: "darkgreen"}]}>Character has no Shields</Text>}
                {character.items.map((item: Item) => {
                    if (item.type === "Shield") {
                        return <DisplayItemShieldBox item={item} />}})}
            </View>}
        </View>

        <View>
            <Pressable
                style={styles.itemCatagoryButton}
                onPress={() => {
                    setDisplayWeapons(!displayWeapons);
                    getItemsOfCatagory();
                }}>
                <Text style={styles.itemCatagoryHeader}>Weapons</Text>
                <View style={{borderWidth: 2, borderColor: "orange", borderRadius: 4}}>
                    <Text style={styles.label}>Left Hand: {character.weapon1 != null ? character.weapon1?.name : "Empty"}</Text>
                    <Text style={styles.label}>Right Hand: {character.weapon2 != null ? character.weapon2?.name : "Empty"}</Text>
                    <View style={{flexDirection: "row", alignSelf: "center", padding: 4}}>
                        <Pressable onPress={() => {
                            characterUpdater({type: "equipWeapon1", value: ""});
                        }}>
                            <Text style={[
                                styles.equipButton,
                                {backgroundColor: character.weapon1 === null ? "darkgray" : "darkgoldenrod"
                                }]}>Empty Left Hand</Text>
                        </Pressable>
                        <Pressable onPress={() => {
                            characterUpdater({type: "equipWeapon2", value: ""});
                        }}>
                            <Text style={[
                                styles.equipButton,
                                {backgroundColor: character.weapon2 === null ? "darkgray" : "darkgoldenrod"
                                }]}>Empty Right Hand</Text>
                        </Pressable>
                    </View>
                </View>
            </Pressable>
            {displayWeapons && <View>
                {weapons === 0 && <Text style={[styles.noItemsInCatagory, {backgroundColor: "saddlebrown"}]}>Character has no Weapons</Text>}
                {character.items.map((item: Item) => {
                    if (item.type === "Weapon") {return <DisplayItemWeaponBox item={item} displayQuantityButtons={true} />}})}
            </View>}
        </View>


        <View>
            <Pressable
                style={styles.itemCatagoryButton}
                onPress={() => {
                    setDisplayArmors(!displayArmors);
                    getItemsOfCatagory();
                }}>
                <Text style={styles.itemCatagoryHeader}>Armors</Text>
                <View style={{borderWidth: 2, borderColor: "orange", borderRadius: 4}}>
                    <Text style={styles.label}>Armor: {character.armor != null ? character.armor?.name : "Empty"}</Text>
                    <View style={{flexDirection: "row", alignSelf: "center", padding: 4}}>
                        <Pressable onPress={() => {
                            characterUpdater({type: "equipArmor", value: ""});
                        }}>
                            <Text style={[
                                styles.equipButton,
                                {backgroundColor: character.armor === null ? "darkgray" : "darkgoldenrod"
                                }]}>Unequip Armor</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.label}>AC: {character.armorClass}</Text>
                </View>
            </Pressable>
            {displayArmors && <View>
                {armors === 0 && <Text  style={[styles.noItemsInCatagory, {backgroundColor: "darkgreen"}]}>Character has no Armors</Text>}
                {character.items.map((item: Item) => {
                    if (item.type === "Armor") {
                        return <DisplayItemArmorBox item={item}/>
                    }
                })}
            </View>}
        </View>


        <View>
            <Pressable
                style={styles.itemCatagoryButton}
                onPress={() => {
                    setDisplayArtifacts(!displayArtifacts);
                    getItemsOfCatagory();
                }}>
                <Text style={styles.itemCatagoryHeader}>Artifacts</Text>
                <View style={{borderWidth: 2, borderColor: "orange", borderRadius: 4}}>
                    <Text style={styles.label}> Attunement 1: {character.attunement1 != null ? character.attunement1?.name : "Empty"}</Text>
                    <Text style={styles.label}>Attunement 2: {character.attunement2 != null ? character.attunement2?.name : "Empty"}</Text>
                    <Text style={styles.label}>Attunement 3: {character.attunement3 != null ? character.attunement3?.name : "Empty"}</Text>
                    <Text style={[styles.label, {marginTop: 8}]}>Empty Attunement:</Text>
                    <View style={{flexDirection: "row", alignSelf: "center", padding: 4}}>
                        <Pressable onPress={() => {
                            characterUpdater({type: "attune1", value: ""});
                        }}>
                            <Text style={[
                                styles.equipButton,
                                {backgroundColor: character.attunement1 === null ? "darkgray" : "darkgoldenrod",
                                    width: 90,
                                }]}>Slot 1</Text>
                        </Pressable>
                        <Pressable onPress={() => {
                            characterUpdater({type: "attune2", value: ""});
                        }}>
                            <Text style={[
                                styles.equipButton,
                                {backgroundColor: character.attunement2 === null ? "darkgray" : "darkgoldenrod",
                                    width: 90,
                                }]}>Slot 2</Text>
                        </Pressable>
                        <Pressable onPress={() => {
                            characterUpdater({type: "attune3", value: ""});
                        }}>
                            <Text style={[
                                styles.equipButton,
                                {backgroundColor: character.attunement3 === null ? "darkgray" : "darkgoldenrod",
                                    width: 90,
                                }]}>Slot 3</Text>
                        </Pressable>
                    </View>
                </View>
            </Pressable>

            {displayArtifacts && <View>
                {artifacts === 0 && <Text style={[styles.noItemsInCatagory, {backgroundColor: "teal"}]}>Character has no Artifacts</Text>}
                {character.items.map((item: Item) => {
                    if (item.type === "Artifact") {
                        return <DisplayItemArtifactBox item={item} />}})}
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
        textAlign: "center",
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
        alignSelf: "center",
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
        textAlign: "center",
        padding: 13,
    },
})