import {StyleSheet, Text, View, Pressable, TextInput, Platform} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import React, {useState} from "react";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";
import {Item} from "@/assets/classes/item";
import { settingDiceToRollQuantity } from './settingDiceToRollQuantity';
import {FontAwesome, MaterialCommunityIcons} from "@expo/vector-icons";


export function NewItemCreator(itemManagementToolsDisplay: boolean) {
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();

    let [newItemDisplay, setNewItemDisplay] = useState(false);
    let [deleteItemDisplay, setDeleteItemDisplay] = useState(false);
    let [newItemConfirmationCount, setNewItemConfirmationCount] = useState(0);
    let [allItemNames, setAllItemNames] = useState<string[]>(getAllItemNames());

    let [itemName, setItemName] = useState("");

    let [itemRollAll, setItemRollAll] = useState(false);
    let [itemRolld4, setItemRolld4] = useState("0");
    let [itemRolld6, setItemRolld6] = useState("0");
    let [itemRolld8, setItemRolld8] = useState("0");
    let [itemRolld10, setItemRolld10] = useState("0");
    let [itemRolld12, setItemRolld12] = useState("0");
    let [itemRolld20, setItemRolld20] = useState("0");
    let [itemRolld100, setItemRolld100] = useState("0");
    let [itemRollBonus, setItemRollBonus] = useState("0");

    let [attunement, setAttunement] = useState(false);
    let [quantity, setQuantity] = useState("1");
    let [AC, setAC] = useState("10");
    let [ACMaxDEXBonus, setACMaxDEXBonus] = useState("10");
    let [uses, setUses] = useState("0");
    let [itemValue, setItemValue] = useState("");
    let [description, setDescription] = useState("");

    let [refreshQuantity, setRefreshQuantity] = useState("All");
    let [setAmountRefreshQuantity, setSetAmountRefreshQuantity] = useState("1");
    let [refreshQuantityDropDownOpen, setRefreshQuantityDropDownOpen] = useState(false);
    let [refreshQuantityDropDownOptions, setRefreshQuantityDropDownOptions] = useState([
        {label: "All", value: "All"},
        {label: "Set Quantity", value: "Set Quantity"},
        {label: "Rolled", value: "Rolled"},
    ]);

    let [itemRefreshRolld4, setItemRefreshRolld4] = useState("0");
    let [itemRefreshRolld6, setItemRefreshRolld6] = useState("0");
    let [itemRefreshRolld8, setItemRefreshRolld8] = useState("0");
    let [itemRefreshRolld10, setItemRefreshRolld10] = useState("0");
    let [itemRefreshRolld12, setItemRefreshRolld12] = useState("0");
    let [itemRefreshRolld20, setItemRefreshRolld20] = useState("0");
    let [itemRefreshRolld100, setItemRefreshRolld100] = useState("0");
    let [itemRefreshRollBonus, setItemRefreshRollBonus] = useState("0");

    let [refreshOn, setRefreshOn] = useState("Long Rest");
    let [refreshOnDropDownOpen, setRefreshOnDropDownOpen] = useState(false);
    let [refreshOnDropDownOptions, setRefreshOnDropDownOptions] = useState([
        {label: "Long Rest", value: "Long Rest"},
        {label: "Short Rest", value: "Short Rest"},
        {label: "Dawn", value: "Dawn"},
        ]);

    let [itemTags, setItemTags] = useState<string[]>(["Melee"]);
    let [itemTagsDropdownOpen, setItemTagsDropdownOpen] = useState(false);
    let [itemTagsDropdownOptions, setItemTagsDropdownOptions] = useState([
        {label: "Melee", value: "Melee"},
        {label: "Ranged", value: "Ranged"},
        {label: "Two Handed", value: "Two Handed"},
        {label: "Finesse", value: "Finesse"},
        {label: "Reach", value: "Reach"},
        {label: "Not Proficient", value: "Not Proficient"},
        {label: "Custom Attack Mod CON", value: "CON"},
        {label: "Custom Attack Mod INT", value: "INT"},
        {label: "Custom Attack Mod WIS", value: "WIS"},
        {label: "Custom Attack Mod CHA", value: "CHA"}
    ])


    let [itemType, setItemType] = useState<string>("Consumable");
    let [itemTypeDropDownOpen, setItemTypeDropDownOpen] = useState(false);
    let [itemTypeDropDownOptions, setItemTypeDropDownOptions] = useState([
        {label: "Consumable", value: "Consumable"},
        {label: "Armor", value: "Armor"},
        {label: "Weapon", value: "Weapon"},
        {label: "Artifact", value: "Artifact"},
        {label: "Shield", value: "Shield"},
    ])
    let [sortedCurrentlyOwnedItems, setSortedCurrentlyOwnedItems] = useState(sortCurrentItems());
    let [itemConfirmDelete, setItemConfirmDelete] = useState(false);
    let [deleteItemName, setDeleteItemName] = useState("");

    function resetAllItemVariables() {
        setItemType("Consumable");
        setItemName("");
        setItemRollAll(false);
        setItemRolld4("0");
        setItemRolld6("0");
        setItemRolld8("0");
        setItemRolld10("0");
        setItemRolld12("0");
        setItemRolld20("0");
        setItemRolld100("0");
        setItemRollBonus("0");
        setAttunement(false);
        setQuantity("1");
        setAC("10");
        setACMaxDEXBonus("10");
        setUses("0");
        setRefreshOn("Long Rest");
        setRefreshOnDropDownOpen(false);
        setRefreshQuantity("All");
        setItemTypeDropDownOpen(false);
        setSetAmountRefreshQuantity("1");
        setRefreshQuantityDropDownOpen(false)
        setDescription("");
        setItemTags(["Melee"]);
        setAllItemNames(getAllItemNames());
    }

    function closeAllDropDowns(activeDropDownMenu: string = ""){
        if (activeDropDownMenu != "refreshOn") {setRefreshOnDropDownOpen(false);}
        if (activeDropDownMenu != "itemType") {setItemTypeDropDownOpen(false);}
        if (activeDropDownMenu != "refreshQuantity"){setRefreshQuantityDropDownOpen(false);}
        if (activeDropDownMenu != "itemTags") {setItemTagsDropdownOpen(false);}
    }

    function createItem(){
        if (itemName != ""){
            let ownedItems: Item[] = [];
            character.items.map(item => {
                if (item.name != itemName){
                    ownedItems.push(item);
                }
            })
            if (parseInt(quantity) < 1) {quantity = "1";}
            if (itemType === "Weapon"){itemRollAll = true;}
            if (refreshQuantity === "Set Quantity"){refreshQuantity = setAmountRefreshQuantity;}
            let rollToRefresh = (refreshQuantity === "Rolled");
            let newItem: Item = new Item(itemType, itemName, [itemRollAll, parseInt(itemRolld4), parseInt(itemRolld6), parseInt(itemRolld8),
                parseInt(itemRolld10), parseInt(itemRolld12), parseInt(itemRolld20), parseInt(itemRolld100), parseInt(itemRollBonus)],
                attunement, itemTags, parseInt(quantity), [parseInt(AC), parseInt(ACMaxDEXBonus)], description, parseInt(uses), refreshOn, refreshQuantity,  parseInt(itemValue),
                [rollToRefresh, parseInt(itemRefreshRolld4), parseInt(itemRefreshRolld6), parseInt(itemRefreshRolld8), parseInt(itemRefreshRolld10),
                parseInt(itemRefreshRolld12), parseInt(itemRefreshRolld20), parseInt(itemRefreshRolld100), parseInt(itemRefreshRollBonus)]);
            setNewItemConfirmationCount(newItemConfirmationCount + 1);
            setAllItemNames([...allItemNames, itemName])
            characterUpdater({type: "addItem", ownedItems: [...ownedItems, newItem]})
        }
    }

    function getAllItemNames(){
        let allItems: string[] = [];
        character.items.map(item => {
            allItems.push(item.name);
        })
        return allItems;
    }

    function deleteItem(itemToDelete: string){
        let ownedItems :Item[] = [];
        character.items.forEach((item) => {
            if (item.name != itemToDelete) {
                ownedItems.push(item);
            }
        });
        if (character.weapon1?.name === itemToDelete) {
            characterUpdater({type: "equipWeapon1", value: ""});
        }
        if (character.weapon2?.name === itemToDelete) {
            characterUpdater({type: "equipWeapon2", value: ""});
        }
        if (character.armor?.name === itemToDelete) {
            characterUpdater({type: "equipArmor", value: ""});
        }
        if (character.attunement1?.name === itemToDelete) {
            characterUpdater({type: "attune1", value: ""});
        }
        if (character.attunement2?.name === itemToDelete) {
            characterUpdater({type: "attune2", value: ""});
        }
        if (character.attunement3?.name === itemToDelete) {
            characterUpdater({type: "attune3", value: ""});
        }
        characterUpdater({type: "addItem", ownedItems: ownedItems});
    }

    function sortCurrentItems() {
        let allConsumables: Item[] = [];
        let allShields: Item[] = [];
        let allWeapons: Item[] = [];
        let allArmors: Item[] = [];
        let allArtifacts: Item[] = [];
        //many arrays spread to add together when done.
        character.items.map((item) => {
            if (item.type === "Consumable") {allConsumables.push(item)}
            if (item.type === "Shield") {allShields.push(item)}
            if (item.type === "Weapon") {allWeapons.push(item)}
            if (item.type === "Armor") {allArmors.push(item)}
            if (item.type === "Artifact") {allArtifacts.push(item)}
        })
        return [...allConsumables, ...allShields, ...allWeapons, ...allArmors, ...allArtifacts];
    }

    return (<>{itemManagementToolsDisplay && <View>
        <Pressable style={styles.toolBoxStyle} onPress={() => closeAllDropDowns()}>
            <Pressable style={styles.toolBoxStyle} onPress={() => {
                setNewItemDisplay(!newItemDisplay);
                resetAllItemVariables();
                closeAllDropDowns();
                setDeleteItemDisplay(false);
                setNewItemConfirmationCount(0);
                setAllItemNames(getAllItemNames());
            }}>
                <Text style={{color: "white", textAlign: "center", height: 40, marginTop: 15}}>Acquire New Items</Text>
            </Pressable>

            {newItemDisplay && <>
                <View style={{marginVertical: 10}}>
                    <Text style={styles.label}>Item Name</Text>
                    <TextInput
                        onChangeText={setItemName}
                        onFocus={() => {
                            closeAllDropDowns()
                        }}
                        placeholder={"Item Name"}
                        placeholderTextColor={"grey"}
                        style={{
                            fontSize: 22,
                            borderStyle: "solid",
                            borderWidth: 3,
                            borderColor: "white",
                            width: 350,
                            alignSelf: "center",
                            color: "white",
                            textAlign: "center",
                            padding: 5,
                        }}/>
                </View>
                <View style={{marginHorizontal: 15}}>
                    <View style={{flex: 0.65}}>
                        <Text style={styles.label}>Item Type</Text>
                        <DropDownPicker
                            open={itemTypeDropDownOpen}
                            value={itemType}
                            items={itemTypeDropDownOptions}
                            setOpen={setItemTypeDropDownOpen}
                            setValue={setItemType}
                            setItems={setItemTypeDropDownOptions}
                            onOpen={() => {closeAllDropDowns("itemType")}}
                            autoScroll={true}
                            dropDownDirection={"BOTTOM"}
                            zIndex={100000}
                            flatListProps={{nestedScrollEnabled:true}}
                            style={
                                [styles.dropDownPicker,
                                    {
                                        width: 350,
                                        alignSelf: "center",
                                        marginBottom: Platform.OS === "web" ? (itemTypeDropDownOpen ? 220 : 0) : 0,
                                    }
                                ]}
                            dropDownContainerStyle={
                                [styles.dropDownContainer,
                                    {
                                        width: 350,
                                        alignSelf: "center",
                                    }
                                ]}
                            textStyle={{color: "white", fontSize: 14}}
                        />
                    </View>
                </View>

                <View>
                    {itemType === "Weapon" && <Text style={styles.label}>Weapon Damage</Text>}
                    {itemType === "Consumable" && <Text style={styles.label}>Does the Consumable Roll for Damage/Healing/Other?</Text>}
                    {itemType === "Artifact" && <Text style={styles.label}>Does the Artifact Roll for Damage/Healing/Other?</Text>}
                    {(itemType === "Consumable" || itemType === "Artifact") && <Pressable style={[styles.newItemToolToggleButtons, {width: 150, height: 40}]} onPress={() => {
                        setItemRollAll(!itemRollAll);
                        closeAllDropDowns();
                    }}>
                        <Text style={styles.toggleButtonLables}>{itemRollAll ? "Yes" : "No"}</Text>
                    </Pressable>}
                    {(itemRollAll || itemType === "Weapon") &&
                        <View>{settingDiceToRollQuantity(
                            // @ts-ignore
                            setItemRolld4, setItemRolld6, setItemRolld8, setItemRolld10,
                            setItemRolld12, setItemRolld20, setItemRolld100, setItemRollBonus
                        )}</View>}
                    {(itemType === "Armor" || itemType === "Shield") && <View style={{flexDirection: "row", alignSelf: "center"}}>
                        <View style={{flex: 1}}>
                            <Text style={styles.label}>Armor Class{itemType === "Shield" ? " Bonus" : ""}</Text>
                            <TextInput
                                onChangeText={setAC}
                                onFocus={() => closeAllDropDowns()}
                                placeholder={itemType === "Shield" ? "2" : "10"}
                                keyboardType={"numeric"}
                                maxLength={2}
                                placeholderTextColor={"grey"}
                                style={styles.ACTextBoxes}/></View>
                        {itemType === "Armor" && <View style={{flex: 1}}><Text style={styles.label}>Max DEX Bonus</Text>
                            <TextInput
                                onChangeText={setACMaxDEXBonus}
                                onFocus={() => closeAllDropDowns()}
                                placeholder={"2"}
                                keyboardType={"numeric"}
                                maxLength={2}
                                placeholderTextColor={"grey"}
                                style={styles.ACTextBoxes}/></View>}
                            </View>}
                </View>


                <View style={{flexDirection: "row", maxWidth: 450, alignSelf: "center"}}>
                    {itemType != "Consumable" && <View style={{flex: 1}}>
                        <Text style={styles.label}>Attunement?</Text>
                        <Pressable style={[styles.newItemToolToggleButtons, {width: 100, height: 40}]} onPress={() => {
                            setAttunement(!attunement);
                            closeAllDropDowns();
                        }}>
                            <Text style={styles.toggleButtonLables}>{attunement ? "Yes" : "No"}</Text>
                        </Pressable>
                    </View>}
                    {itemType === "Weapon" && <View style={{flex: 1.5}}>
                        <Text style={styles.label}>Weapon Tags</Text>
                        <DropDownPicker
                            open={itemTagsDropdownOpen}
                            value={itemTags}
                            items={itemTagsDropdownOptions}
                            setOpen={setItemTagsDropdownOpen}
                            setValue={setItemTags}
                            setItems={setItemTagsDropdownOptions}
                            onOpen={() => {
                                closeAllDropDowns("itemTags")
                            }}
                            multiple={true}
                            autoScroll={true}
                            dropDownDirection={"BOTTOM"}
                            zIndex={80091}
                            flatListProps={{nestedScrollEnabled: true}}
                            style={[styles.dropDownPicker,
                                {
                                    marginBottom: Platform.OS === "web" ? (itemTagsDropdownOpen ? 210 : 0) : 0,
                                    width: 170,
                                    alignSelf: "center"
                                }]}
                            dropDownContainerStyle={[styles.dropDownContainer, {width: 170}]}
                            textStyle={{color: "white", fontSize: 14}}
                        />
                    </View>}
                    {itemType != "Consumable" && <View style={{flex: 1}}>
                        <Text style={styles.label}>Charges/Uses?</Text>
                        <Pressable style={[styles.newItemToolToggleButtons, {width: 100, height: 40}]} onPress={() => {
                            if (uses === "0"){setUses("1")}
                            else {setUses("0")}
                            closeAllDropDowns();
                        }}>
                            <Text style={styles.toggleButtonLables}>{uses != "0" ? "Yes" : "No"}</Text>
                        </Pressable>
                    </View>}
                </View>

                {uses != "0" && <View><Text style={styles.label}>Charges or Uses Quantity</Text>
                    <TextInput
                        onChangeText={setUses}
                        onFocus={() => closeAllDropDowns()}
                        placeholder={"1"}
                        keyboardType={"numeric"}
                        maxLength={2}
                        placeholderTextColor={"grey"}
                        style={{
                            fontSize: 22,
                            borderStyle: "solid",
                            borderWidth: 3,
                            borderColor: "white",
                            width: 350,
                            alignSelf: "center",
                            color: "white",
                            textAlign: "center",
                            padding: 5,
                        }}/>
                </View>}


                {uses != "0" && <View>
                    <Text style={styles.label}>On  _______    Recharge  _______    Uses/Charges</Text>
                    <View style={{flexDirection: "row", alignSelf: "center"}}>
                        <View style={{flex: 1, marginRight: 10}}><DropDownPicker
                            open={refreshOnDropDownOpen}
                            value={refreshOn}
                            items={refreshOnDropDownOptions}
                            setOpen={setRefreshOnDropDownOpen}
                            setValue={setRefreshOn}
                            setItems={setRefreshOnDropDownOptions}
                            onOpen={() => {
                                closeAllDropDowns("refreshOn")
                            }}
                            autoScroll={true}
                            dropDownDirection={"BOTTOM"}
                            zIndex={90050}
                            flatListProps={{nestedScrollEnabled: true}}
                            style={[styles.dropDownPicker,
                                {
                                    marginBottom: Platform.OS === "web" ? (refreshOnDropDownOpen ? 140 : 0) : 0,
                                    width: 120,
                                }]}
                            dropDownContainerStyle={[styles.dropDownContainer,
                                {width: 120}]}
                            textStyle={{color: "white", fontSize: 14}}
                        /></View>
                        <View style={{flex: 1, marginLeft: 10}}><DropDownPicker
                            open={refreshQuantityDropDownOpen}
                            value={refreshQuantity}
                            items={refreshQuantityDropDownOptions}
                            setOpen={setRefreshQuantityDropDownOpen}
                            setValue={setRefreshQuantity}
                            setItems={setRefreshQuantityDropDownOptions}
                            onOpen={() => {
                                closeAllDropDowns("refreshQuantity")
                            }}
                            autoScroll={true}
                            dropDownDirection={"BOTTOM"}
                            zIndex={90050}
                            flatListProps={{nestedScrollEnabled: true}}
                            style={[styles.dropDownPicker,
                                {
                                    marginBottom: Platform.OS === "web" ? (refreshQuantityDropDownOpen ? 140 : 0) : 0,
                                    width: 120,
                                }]}
                            dropDownContainerStyle={[styles.dropDownContainer,
                                {width: 120}]}
                            textStyle={{color: "white", fontSize: 14}}
                        /></View>
                    </View>
                    {refreshQuantity === "Set Quantity" && <View>
                        <Text style={styles.label}>Set Recharge Quantity</Text>
                        <TextInput
                            onChangeText={setSetAmountRefreshQuantity}
                            onFocus={() => closeAllDropDowns()}
                            placeholder={"1"}
                            keyboardType={"numeric"}
                            maxLength={2}
                            placeholderTextColor={"grey"}
                            style={{
                                fontSize: 22,
                                borderStyle: "solid",
                                borderWidth: 3,
                                borderColor: "white",
                                width: 350,
                                alignSelf: "center",
                                color: "white",
                                textAlign: "center",
                                padding: 5,
                        }}/>
                    </View>}
                    {refreshQuantity === "Rolled" && <View>
                        {settingDiceToRollQuantity(
                            // @ts-ignore
                            setItemRefreshRolld4, setItemRefreshRolld6, setItemRefreshRolld8, setItemRefreshRolld10,
                            setItemRefreshRolld12, setItemRefreshRolld20, setItemRefreshRolld100, setItemRefreshRollBonus
                        )}
                    </View>}
                </View>}

                <View style={{flexDirection: "row"}}>
                    <View style={{flex: 1}}>
                        <Text style={styles.label}>Quantity of Item</Text>
                        <TextInput
                            onChangeText={setQuantity}
                            onFocus={() => closeAllDropDowns()}
                            placeholder={quantity}
                            keyboardType={"numeric"}
                            maxLength={4}
                            placeholderTextColor={"grey"}
                            style={{
                                fontSize: 22,
                                borderStyle: "solid",
                                borderWidth: 3,
                                borderColor: "white",
                                width: 150,
                                alignSelf: "center",
                                color: "white",
                                textAlign: "center",
                                padding: 5,
                            }}/>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={styles.label}>Gold Value</Text>
                        <TextInput
                            onChangeText={setItemValue}
                            onFocus={() => closeAllDropDowns()}
                            placeholder={quantity}
                            keyboardType={"numeric"}
                            maxLength={4}
                            placeholderTextColor={"grey"}
                            style={{
                                fontSize: 22,
                                borderStyle: "solid",
                                borderWidth: 3,
                                borderColor: "white",
                                width: 150,
                                alignSelf: "center",
                                color: "white",
                                textAlign: "center",
                                padding: 5,
                            }}/>
                    </View>
                </View>

                <Text style={styles.label}>Full Description</Text>
                <TextInput
                    onChangeText={setDescription}
                    onFocus={() => closeAllDropDowns()}
                    placeholder={"a red liquid, not dissimilar to blood swirls around in this bottle, inviting you to take a satisfying swig, minor healing potion, heal 2d4 + 2 HP"}
                    placeholderTextColor={"grey"}
                    textAlignVertical={"top"}
                    multiline={true}
                    style={{
                        fontSize: 18,
                        borderStyle: "solid",
                        borderWidth: 3,
                        borderColor: "white",
                        alignSelf: "center",
                        color: "white",
                        textAlign: "center",
                        width: 350,
                        minHeight: 200,
                    }}/>


                {(newItemConfirmationCount > 0) &&
                    <Pressable  style={styles.confirmationButton} onPress={() => {
                        setNewItemConfirmationCount(0);
                        setAllItemNames(getAllItemNames());
                        closeAllDropDowns();}}>
                        <Text style={styles.confirmationBox}>Confirmed! New Item</Text>
                        <Text style={styles.confirmationBox}>"{itemName}"</Text>
                        <Text style={styles.confirmationBox}>Created! {newItemConfirmationCount} time(s)!</Text>
                    </Pressable>
                }

                {allItemNames.includes(itemName) && <View style={styles.warning}>
                    <Text>Warning! Item name is already used, making another Item with the same name WILL delete the Original Item</Text>
                </View>}

                <Pressable
                    style={[styles.toolBoxButton, {marginBottom: 10}]}
                    onPress={() => {
                        closeAllDropDowns();
                        deleteItem(itemName);
                        setAllItemNames(getAllItemNames());
                        createItem();
                        setAllItemNames(getAllItemNames());
                    }}>
                    <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Acquire New Item: {itemName}</Text>
                    <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>For {character.charName}</Text>
                </Pressable>


            </>}

        </Pressable>




        <View style={[styles.toolBoxStyle, {marginTop: 15}]}>
            <Pressable style={styles.toolBoxStyle} onPress={() => {
                setDeleteItemDisplay(!deleteItemDisplay);
                setNewItemDisplay(false);
                setSortedCurrentlyOwnedItems(sortCurrentItems());
            }}><View>
                <Text style={{color: "white", textAlign: "center", height: 40, marginTop: 15}}>Delete Old Items</Text>
            </View></Pressable>
            {deleteItemDisplay && <View style={{alignSelf: "center"}}>
                {sortedCurrentlyOwnedItems.length < 1 && <Text style={[styles.label, {marginBottom: 20}]}>
                    This Character has no Items to Delete</Text>}
                {sortedCurrentlyOwnedItems.map((pickedItemForDeletion: Item) => {
                    return (
                        <View>
                            <Pressable style={{
                                backgroundColor:
                                    pickedItemForDeletion.type === "Consumable" ? "blue" :
                                        pickedItemForDeletion.type === "Armor" ? "black" :
                                            pickedItemForDeletion.type === "Weapon" ? "maroon" :
                                                pickedItemForDeletion.type === "Shield" ? "navy" : "brown",
                                margin: 5,
                                minHeight: 30,
                                borderRadius: 30,
                                width: 260,
                                paddingVertical: 5,
                                borderColor: "orange",
                                borderWidth: 3,
                                alignSelf: "center"
                            }} onPress={() => {
                                setItemConfirmDelete(!itemConfirmDelete);
                                setDeleteItemName(pickedItemForDeletion.name);
                            }}>
                                <Text style={{
                                fontSize: 12,
                                textAlign: "center",
                                color: "white",
                                }}>{pickedItemForDeletion.name}</Text>
                                <Text style={{
                                    fontSize: 8,
                                    textAlign: "center",
                                    color: "white",
                                }}>{pickedItemForDeletion.type}</Text>
                            </Pressable></View>
                    )
                })}
                {itemConfirmDelete && <View style={{
                    borderWidth: 2,
                    borderColor: "orange",
                    borderRadius: 8,
                    padding: 4,
                }}>
                    <Text style={styles.deleteConfirmText}>{deleteItemName}</Text>
                    {itemConfirmDelete && <Pressable style={styles.deleteConfirmButtons}
                        onPress={() => {
                            setItemConfirmDelete(false);}}>
                            <Text style={styles.deleteConfirmText}>Cancel Item Deletion?</Text>
                            <Text style={styles.deleteConfirmText}><FontAwesome size={28} name="smile-o" color={"green"} /></Text>
                    </Pressable>}
                    {itemConfirmDelete && <Pressable
                        style={styles.deleteConfirmButtons}
                        onPress={() => {
                            setItemConfirmDelete(false);
                            deleteItem(deleteItemName)
                            setDeleteItemDisplay(false);
                        }}>
                            <Text style={styles.deleteConfirmText}>Confirm Item Deletion?</Text>
                            <Text style={styles.deleteConfirmText}><MaterialCommunityIcons size={28} name="skull-crossbones-outline" color={"red"} /></Text>
                    </Pressable>}
                </View>}
            </View>}
        </View>
    </View>}</>)
}


const styles = StyleSheet.create({
    toolBoxStyle: {
        backgroundColor: "teal",
        borderRadius: 12,
    },
    label: {
        color: "white",
        textAlign: "center",
        fontSize: 12,
    },
    deleteConfirmButtons: {
        textAlign: "center",
        color: "white",
        fontSize: 25,
        backgroundColor: "blue",
        margin: 5,
        borderRadius: 10
    },
    deleteConfirmText: {
        textAlign: "center",
        color: "white",
        fontSize: 15,
    },
    toolBoxButton: {
        backgroundColor: "maroon",
        alignSelf: "center",
        padding: 13,
        borderRadius: 30,
        width: 350,
        marginVertical: 15,
        marginHorizontal: 5,
    },
    confirmationBox: {
        textAlign: "center",
        color: "white",
        fontSize: 18,
    },
    confirmationButton: {
        margin: 15,
        backgroundColor: "blue",
        borderRadius: 10,
    },
    dropDownPicker: {
        backgroundColor: "teal",
        borderColor: "white",
        borderWidth: 3,
        padding: 0,
    },
    dropDownContainer: {
        backgroundColor: "teal",
        borderColor: "white",
        borderWidth: 2,
    },
    ACTextBoxes: {
        fontSize: 22,
        borderStyle: "solid",
        borderWidth: 3,
        borderColor: "white",
        width: 135,
        padding: 0,
        margin: 1,
        alignSelf: "center",
        color: "white",
        textAlign: "center"
    },
    itemDiceEntry: {
        fontSize: 22,
        borderStyle: "solid",
        borderWidth: 3,
        borderColor: "white",
        width: 75,
        padding: 0,
        margin: 1,
        alignSelf: "center",
        color: "white",
        textAlign: "center"
    },
    toggleButtonLables: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
    },
    newItemToolToggleButtons: {
        backgroundColor: "maroon",
        height: 40,
        width: 100,
        padding: 4,
        marginHorizontal: 6,
        borderRadius: 8,
        borderWidth: 3,
        borderColor: "orange",
        alignSelf: "center",
    },
    warning: {
        color: "black",
        backgroundColor: "yellow",
    }
});