import {StyleSheet, Text, View, Pressable, TextInput, Platform} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import React, {useState} from "react";
import {Ability} from "@/assets/classes/ability";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";
import {FontAwesome, MaterialCommunityIcons} from "@expo/vector-icons";
import {SettingDiceToRollQuantity} from "@/components/settingDiceToRollQuantity";


export type newAbilityCreationToolProps = {
    displayOn: boolean;
}

export default function NewAbilityCreationTool({displayOn}: newAbilityCreationToolProps) {
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();

    let [abilityName, setAbilityName] = useState("");
    let [usesQuantity, setUsesQuantity] = useState("");
    let [abilityDescription, setAbilityDescription] = useState("");
    let [persistence, setPersistence] = useState<[boolean, boolean]>([false, false]);

    let [abilityRollVariable, setAbilityRollVariable] = useState(false);
    let [abilityRollD4, setAbilityRollD4] = useState("0");
    let [abilityRollD6, setAbilityRollD6] = useState("0");
    let [abilityRollD8, setAbilityRollD8] = useState("0");
    let [abilityRollD10, setAbilityRollD10] = useState("0");
    let [abilityRollD12, setAbilityRollD12] = useState("0");
    let [abilityRollD20, setAbilityRollD20] = useState("0");
    let [abilityRollD100, setAbilityRollD100] = useState("0");
    let [abilityRollBonus, setAbilityRollBonus] = useState("0");

    let [usesTrigger, setUsesTrigger] = useState("Passive");
    let [abilityUsesTypeDropDownOpen, setAbilityUsesTypeDropDownOpen] = useState(false);
    let [abilityUsesTypeDropDownOptions, setAbilityUsesTypeDropDownOptions] = useState([
        {label: "Passive", value: "Passive"},
        {label: "as Action", value: "as Action"},
        {label: "as Bonus Action", value: "as Bonus Action"},
        {label: "as Reaction", value: "as Reaction"},
        {label: "on Attack", value: "on Attack"},
        {label: "on being Attacked", value: "on being Attacked"},
        {label: "on Hit", value: "on Hit"},
        {label: "on being Hit", value: "on being Hit"},
        {label: "on Save", value: "on Save"},
        {label: "on Failed Save", value: "on Failed Save"},
        {label: "on Enemy Save", value: "on Enemy Save"},
        {label: "on Spell Being Cast", value: "on Spell Being Cast"},
        {label: "on Roll d20", value: "on Roll d20"},
        {label: "on Rolling Damage", value: "on Rolling Damage"},
        {label: "when Healing", value: "when Healing"},
        {label: "on Short Rest", value: "on Short Rest"},
        {label: "on long Rest", value: "on Long Rest"},
    ]);

    let [usesQuantityStat, setUsesQuantityStat] = useState("Proficiency");
    let [usesQuantityStatDropDownOpen, setUsesQuantityStatDropDownOpen] = useState(false);
    let [usesQuantityStatDropDownOptions, setUsesQuantityStatDropDownOptions] = useState([
        {label: "Not Limited", value: "Not Limited"},
        {label: "One", value: "1"},
        {label: "Two", value: "2"},
        {label: "STR", value: "STR"},
        {label: "DEX", value: "DEX"},
        {label: "CON", value: "CON"},
        {label: "INT", value: "INT"},
        {label: "WIS", value: "WIS"},
        {label: "CHA", value: "CHA"},
        {label: "Proficiency", value: "Proficiency"},
        {label: "Level", value: "Level"},
        {label: "Set Number", value: "Set Number"},
    ]);

    let [refreshOn, setRefreshOn] = useState("Long Rest");
    let [refreshOnDropDownOpen, setRefreshOnDropDownOpen] = useState(false);
    let [refreshOnDropDownOptions, setRefreshOnDropDownOptions] = useState([
        {label: "Long Rest", value: "Long Rest"},
        {label: "Short Rest", value: "Short Rest"},
        {label: "Dawn", value: "Dawn"},
    ]);

    let [grantsResistance, setGrantsResistance] = useState<boolean>(false);
    let [resistance, setResistance] = useState<string[]>([]);
    let [resistanceDropDownOpen, setResistanceDropDownOpen] = useState(false);
    let [resistanceDropDownOptions, setResistanceDropDownOptions] = useState([
        {label: "Bludgeoning", value: "Bludgeoning"},
        {label: "Piercing", value: "Piercing"},
        {label: "Slashing", value: "Slashing"},
        {label: "Fire", value: "Fire"},
        {label: "Cold", value: "Cold"},
        {label: "Lightning", value: "Lightning"},
        {label: "Thunder", value: "Thunder"},
        {label: "Poison", value: "Poison"},
        {label: "Acid", value: "Acid"},
        {label: "Force", value: "Force"},
        {label: "Psychic", value: "Psychic"},
        {label: "Radiant", value: "Radiant"},
        {label: "Necrotic", value: "Necrotic"},
    ]);


    let [grantsImmunity, setGrantsImmunity] = useState<boolean>(false);
    let [immunity, setImmunity] = useState<string[]>([]);
    let [immunityDropDownOpen, setImmunityDropDownOpen] = useState(false);
    let [immunityDropDownOptions, setImmunityDropDownOptions] = useState([
        {label: "Damage", value: "Damage"},
        {label: "Bludgeoning", value: "Bludgeoning", parent: "Damage"},
        {label: "Piercing", value: "Piercing", parent: "Damage"},
        {label: "Slashing", value: "Slashing", parent: "Damage"},
        {label: "Fire", value: "Fire", parent: "Damage"},
        {label: "Cold", value: "Cold", parent: "Damage"},
        {label: "Lightning", value: "Lightning", parent: "Damage"},
        {label: "Thunder", value: "Thunder", parent: "Damage"},
        {label: "Poison", value: "Poison", parent: "Damage"},
        {label: "Acid", value: "Acid", parent: "Damage"},
        {label: "Force", value: "Force", parent: "Damage"},
        {label: "Psychic", value: "Psychic", parent: "Damage"},
        {label: "Radiant", value: "Radiant", parent: "Damage"},
        {label: "Necrotic", value: "Necrotic", parent: "Damage"},
        {label: "Condition", value: "Condition"},
        {label: "Poisoned", value: "Poisoned", parent: "Condition"},
        {label: "Diseased", value: "Diseased", parent: "Condition"},
        {label: "Paralyzed", value: "Paralyzed", parent: "Condition"},
        {label: "Grappled", value: "Grappled", parent: "Condition"},
        {label: "Incapacitated", value: "Incapacitated", parent: "Condition"},
        {label: "Blinded", value: "Blinded", parent: "Condition"},
        {label: "Deafened", value: "Deafened", parent: "Condition"},
        {label: "Exhausted", value: "Exhausted", parent: "Condition"},
        {label: "Frightened", value: "Frightened", parent: "Condition"},
        {label: "Charmed", value: "Poisoned", parent: "Charmed"},
        {label: "Prone", value: "Prone", parent: "Condition"},
        {label: "Invisible", value: "Invisible", parent: "Condition"},
        {label: "Petrified", value: "Petrified", parent: "Condition"},
        {label: "Restrained", value: "Restrained", parent: "Condition"},
        {label: "Stunned", value: "Stunned", parent: "Condition"},
        {label: "Unconscious", value: "Unconscious", parent: "Condition"},
    ]);

    let [newAbilityConfirmationCount, setNewAbilityConfirmationCount] = useState(0);
    let [newAbilityCreationToolDisplay, setNewAbilityCreationToolDisplay] = useState(false);
    let [abilityDeleteToolDisplay, setAbilityDeleteToolDisplay] = useState(false);
    let [deleteAbilityName, setDeleteAbilityName] = useState("");
    let [abilityConfirmDelete, setAbilityConfirmDelete] = useState(false);


    function closeAllDropDowns(type: string = "") {
        if (type != "abilityUsesType") {setAbilityUsesTypeDropDownOpen(false);}
        if (type != "usesQuantityStat"){setUsesQuantityStatDropDownOpen(false);}
        if (type != "resistance"){setResistanceDropDownOpen(false);}
        if (type != "immunity"){setImmunityDropDownOpen(false);}
        if (type != "refreshOn"){setRefreshOnDropDownOpen(false);}
    }

    function determineUseQuantity(usesQuantityStat: string): number {
        let uses = 1;
        if (usesQuantityStat === "STR"){uses = Math.floor((character.STR - 10)/2);}
        if (usesQuantityStat === "DEX"){uses = Math.floor((character.DEX - 10)/2);}
        if (usesQuantityStat === "CON"){uses = Math.floor((character.CON - 10)/2);}
        if (usesQuantityStat === "INT"){uses = Math.floor((character.INT - 10)/2);}
        if (usesQuantityStat === "WIS"){uses = Math.floor((character.WIS - 10)/2);}
        if (usesQuantityStat === "CHA"){uses = Math.floor((character.CHA - 10)/2);}
        if (usesQuantityStat === "Level"){uses = character.characterLevel;}
        if (usesQuantityStat === "Proficiency"){return character.proficiency;}
        if (usesQuantityStat === "Two") {return 2;}
        if (uses < 1){uses = 1;}
        return uses;
    }

    function resetVariablesOnTabClose(){
        setAbilityName("");
        setUsesQuantity("");
        setAbilityDescription("");
        setPersistence([false, false]);
        setAbilityRollVariable(false);
        setAbilityRollD4("0");
        setAbilityRollD6("0");
        setAbilityRollD8("0");
        setAbilityRollD10("0");
        setAbilityRollD12("0");
        setAbilityRollD20("0");
        setAbilityRollD100("0");
        setAbilityRollBonus("0");
        setUsesTrigger("Passive");
        setUsesQuantityStat("Proficiency");
        setRefreshOn("Long Rest");
        setGrantsResistance(false);
        setResistance([]);
        setGrantsImmunity(false);
        setImmunity([]);
    }

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return(
        <View style={{margin: 0, padding: 0}}>{displayOn && <View>
            <View style={styles.toolBoxStyle}>
                <Pressable onPress={() => closeAllDropDowns()} style={styles.toolBoxStyle}>
                    <Pressable onPress={() => {
                        setNewAbilityCreationToolDisplay(!newAbilityCreationToolDisplay);
                        closeAllDropDowns();
                        resetVariablesOnTabClose()
                    }}>
                        <Text style={{color: "white", textAlign: "center", height: 40, marginTop: 15}}>New Ability</Text>
                    </Pressable>
                </Pressable>

                {newAbilityCreationToolDisplay && <Pressable style={styles.toolBoxStyle} onPress={() => {closeAllDropDowns()}}>
                    <View style={{marginVertical: 10}}>
                        <Text style={styles.labels}>Ability Name</Text>
                        <TextInput
                            onChangeText={setAbilityName}
                            onFocus={() => {closeAllDropDowns()}}
                            placeholder={"Ability Name"}
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
                            <Text style={styles.labels}>Ability Trigger</Text>
                            <DropDownPicker
                                open={abilityUsesTypeDropDownOpen}
                                value={usesTrigger}
                                items={abilityUsesTypeDropDownOptions}
                                setOpen={setAbilityUsesTypeDropDownOpen}
                                setValue={setUsesTrigger}
                                setItems={setAbilityUsesTypeDropDownOptions}
                                onOpen={() => {closeAllDropDowns("abilityUsesType")}}
                                autoScroll={true}
                                dropDownDirection={"BOTTOM"}
                                zIndex={100000}
                                flatListProps={{nestedScrollEnabled:true}}
                                style={
                                    [styles.dropDownPicker,
                                        {
                                            width: 350,
                                            alignSelf: "center",
                                            marginBottom: Platform.OS === "web" ? (abilityUsesTypeDropDownOpen ? 200 : 0) : 0,
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
                    {usesTrigger != "Passive" && <View style={{flexDirection: "row", alignSelf: "center"}}>
                        <View style={{
                            flex: usesQuantityStat != "Set Number" ? 1 : 0.65,
                            alignSelf: "center"

                        }}>
                            <Text style={[
                                styles.labels,
                                {
                                    alignSelf: "center",
                                }]}>number of uses</Text>
                            <DropDownPicker
                                open={usesQuantityStatDropDownOpen}
                                value={usesQuantityStat}
                                items={usesQuantityStatDropDownOptions}
                                setOpen={setUsesQuantityStatDropDownOpen}
                                setValue={setUsesQuantityStat}
                                setItems={setUsesQuantityStatDropDownOptions}
                                onOpen={() => {
                                    closeAllDropDowns("usesQuantityStat")
                                }}
                                autoScroll={true}
                                dropDownDirection={"BOTTOM"}
                                zIndex={90090}
                                flatListProps={{nestedScrollEnabled: true}}
                                style={[styles.dropDownPicker,
                                    {
                                        marginBottom: Platform.OS === "web" ? (usesQuantityStatDropDownOpen ? 200 : 0) : 0,
                                        width: 250,
                                        alignSelf: "center",
                                    }]}
                                dropDownContainerStyle={[styles.dropDownContainer, {width: 250}]}
                                textStyle={{color: "white", fontSize: 14}}
                            />
                        </View>
                        {usesQuantityStat === "Set Number" && <View style={{flex: 0.35}}>
                            <Text style={[styles.labels, {marginLeft: 16}]}>set quantity</Text>
                            <TextInput
                                onChangeText={setUsesQuantity}
                                onFocus={() => {
                                    closeAllDropDowns()
                                }}
                                keyboardType={"numeric"}
                                maxLength={2}
                                placeholder={"number of uses"}
                                placeholderTextColor={"grey"}
                                style={{
                                    fontSize: 22,
                                    borderStyle: "solid",
                                    borderWidth: 3,
                                    borderColor: "white",
                                    width: 90,
                                    alignSelf: "center",
                                    color: "white",
                                    textAlign: "center",
                                    marginLeft: 16,
                                    height: 50,
                                    padding: Platform.OS === "web" ? 7 : 0,
                                }}/>
                        </View>}
                    </View>}

                    {(usesQuantityStat != "Not Limited" && usesTrigger != "Passive") && <View style={{alignSelf: "center"}}>
                        <Text style={styles.labels}>Uses Reset On</Text>
                        <DropDownPicker
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
                                    marginBottom: Platform.OS === "web" ? (refreshOnDropDownOpen ? 160 : 0) : 0,
                                    width: 250
                                }]}
                            dropDownContainerStyle={[styles.dropDownContainer, {width: 250}]}
                            textStyle={{color: "white", fontSize: 14}}
                        />
                    </View>}

                    <View style={{
                        flexDirection: "row",
                        alignSelf: "center",
                        marginVertical: 5,
                        width: 400,
                    }}>
                        {usesTrigger != "Passive" && <View style={{flex: 1}}>
                            <Text style={styles.labels}>does ability last</Text>
                            <Text style={styles.labels}>multiple Turns?</Text>
                            <Pressable
                                style={styles.newAbilityToolToggleButtons}
                                onPress={() => {
                                    setPersistence([!persistence[0], persistence[1]]);
                                    closeAllDropDowns()
                                }}>
                                <Text style={styles.toggleButtonLables}>{persistence[0] ? "Yes" : "No"}</Text>
                            </Pressable>
                        </View>}
                        <View style={{
                            flex: 1.1,
                            marginRight: 10,
                            marginLeft: usesTrigger != "Passive" ? 10 : 0
                        }}>
                            <Text style={styles.labels}>does ability grant one</Text>
                            <Text style={styles.labels}>or more Resistance?</Text>
                            <Pressable
                                style={styles.newAbilityToolToggleButtons}
                                onPress={() => {
                                    setGrantsResistance(!grantsResistance);
                                    closeAllDropDowns()}}>
                                <Text style={styles.toggleButtonLables}>{grantsResistance ? "Yes" : "No"}</Text>
                            </Pressable>
                        </View>
                        <View style={{flex: 1.1}}>
                            <Text style={styles.labels}>does ability grant one</Text>
                            <Text style={styles.labels}>or more Immunity?</Text>
                            <Pressable
                                style={styles.newAbilityToolToggleButtons}
                                onPress={() => {
                                    setGrantsImmunity(!grantsImmunity);
                                    closeAllDropDowns()}}>
                                <Text style={styles.toggleButtonLables}>{grantsImmunity ? "Yes" : "No"}</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={{flexDirection: "row", alignSelf: "center"}}>
                        {grantsResistance && <View style={{flex: 0.48}}>
                            <Text style={styles.labels}>Resistances</Text>
                            <DropDownPicker
                                open={resistanceDropDownOpen}
                                value={resistance}
                                items={resistanceDropDownOptions}
                                setOpen={setResistanceDropDownOpen}
                                setValue={setResistance}
                                setItems={setResistanceDropDownOptions}
                                onOpen={() => {
                                    closeAllDropDowns("resistance")
                                }}
                                multiple={true}
                                autoScroll={true}
                                dropDownDirection={"BOTTOM"}
                                zIndex={80091}
                                flatListProps={{nestedScrollEnabled: true}}
                                style={[styles.dropDownPicker,
                                    {
                                        marginBottom: Platform.OS === "web" ? (resistanceDropDownOpen ? 200 : 0) : 0,
                                        width: 180
                                    }]}
                                dropDownContainerStyle={[styles.dropDownContainer, {width: 180}]}
                                textStyle={{color: "white", fontSize: 14}}
                            />
                        </View>}
                        {grantsImmunity && <View style={{flex: 0.48}}>
                            <Text style={styles.labels}>Immunities</Text>
                            <DropDownPicker
                                open={immunityDropDownOpen}
                                value={immunity}
                                items={immunityDropDownOptions}
                                setOpen={setImmunityDropDownOpen}
                                setValue={setImmunity}
                                setItems={setImmunityDropDownOptions}
                                categorySelectable={false}
                                onOpen={() => {
                                    closeAllDropDowns("immunity")
                                }}
                                multiple={true}
                                autoScroll={true}
                                dropDownDirection={"BOTTOM"}
                                zIndex={80090}
                                flatListProps={{nestedScrollEnabled: true}}
                                style={[styles.dropDownPicker,
                                    {
                                        marginBottom: Platform.OS === "web" ? (immunityDropDownOpen ? 200 : 0) : 0,
                                        width: 180
                                    }]}
                                dropDownContainerStyle={[styles.dropDownContainer, {width: 180}]}
                                textStyle={{color: "white", fontSize: 14}}
                            />
                        </View>}
                    </View>


                    <View><Text style={styles.labels}>Does the Ability Roll for Damage/Healing/Other?</Text>
                        <Pressable style={[styles.newAbilityToolToggleButtons, {width: 150, height: 40}]} onPress={() => {
                            setAbilityRollVariable(!abilityRollVariable);
                            closeAllDropDowns();
                        }}>
                            <Text style={styles.toggleButtonLables}>{abilityRollVariable ? "Yes" : "No"}</Text>
                        </Pressable>
                        {abilityRollVariable && <SettingDiceToRollQuantity
                            //@ts-ignore
                            setd4={setAbilityRollD4} setd6={setAbilityRollD6} setd8={setAbilityRollD8} setd10={setAbilityRollD10}
                            //@ts-ignore
                            setd12={setAbilityRollD12} setd20={setAbilityRollD20} setd100={setAbilityRollD100} setBonus={setAbilityRollBonus}
                        />}
                    </View>

                    <Text style={styles.labels}>Full Description</Text>
                    <TextInput
                        onChangeText={setAbilityDescription}
                        onFocus={() => closeAllDropDowns()}
                        placeholder={"sing a song, or recite a poem, to inspire an ally, that player may roll an additional d8 on a skill check, saving throw, or attack roll"}
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


                    {(newAbilityConfirmationCount > 0) &&
                        <Pressable  style={styles.confirmationButton} onPress={() => {
                            setNewAbilityConfirmationCount(0);
                            closeAllDropDowns();}}>
                            <Text style={styles.confirmationBox}>Confirmed! New Ability</Text>
                            <Text style={styles.confirmationBox}>"{abilityName}"</Text>
                            <Text style={styles.confirmationBox}>Created! {newAbilityConfirmationCount} time(s)!</Text>
                        </Pressable>
                    }

                    <Pressable
                        style={[styles.toolBoxButton, {marginBottom: 10}]}
                        onPress={() => {
                            closeAllDropDowns();
                            if (abilityName != ""){
                                if (usesQuantityStat != "Set Number") {usesQuantity = "" + determineUseQuantity(usesQuantityStat)}
                                let newAbility = new Ability(abilityName, usesTrigger, usesQuantityStat, parseInt(usesQuantity), abilityDescription, refreshOn, persistence, resistance,
                                    immunity, [abilityRollVariable, parseInt(abilityRollD4), parseInt(abilityRollD6), parseInt(abilityRollD8), parseInt(abilityRollD10),
                                    parseInt(abilityRollD12), parseInt(abilityRollD20), parseInt(abilityRollD100), parseInt(abilityRollBonus)]);
                                setNewAbilityConfirmationCount(newAbilityConfirmationCount + 1);
                                characterUpdater({type: "updateAbilities", knownAbilities: [...character.abilities, newAbility]})
                                if (usesTrigger === "Passive") {
                                    characterUpdater({type: "addResistanceAndImmunities", abilityName: abilityName})
                                }
                            }}}>
                        <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Create New Ability: {abilityName}</Text>
                        <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>For {character.charName}</Text>
                    </Pressable>
                </Pressable>}
            </View>


            <View style={[styles.toolBoxStyle, {marginTop: 16}]}>
                <Pressable onPress={() => closeAllDropDowns()} style={styles.toolBoxStyle}>
                    <Pressable onPress={() => {
                        setAbilityDeleteToolDisplay(!abilityDeleteToolDisplay);
                        closeAllDropDowns()}}>
                        <Text style={{color: "white", textAlign: "center", height: 40, marginTop: 15}}>Delete Ability</Text>
                        {abilityDeleteToolDisplay && <Text style={{color: "white", textAlign: "center", marginBottom: 20}}>Choose Ability Below</Text>}
                    </Pressable>
                    <View style={{alignSelf: "center"}}>
                        {(character.abilities.length < 1 && abilityDeleteToolDisplay) && <Text style={[styles.labels, {marginBottom: 20}]}>
                            This Character has no Abilities to Delete</Text>}
                        {character.abilities.map((pickedAbilityForDeletion :Ability) => {
                            return(
                                abilityDeleteToolDisplay && <View>
                                    <Pressable onPress={() => {
                                        setAbilityConfirmDelete(!abilityConfirmDelete);
                                        setDeleteAbilityName(pickedAbilityForDeletion.name);
                                    }}><Text style={{
                                        fontSize: 20,
                                        backgroundColor: "maroon",
                                        textAlign: "center",
                                        textAlignVertical: "center",
                                        margin: 10,
                                        minHeight: 50,
                                        borderRadius: 30,
                                        width: 260,
                                        color: "white",
                                        paddingVertical: 10,
                                        borderColor: "orange",
                                        borderWidth: 3,
                                    }}>{pickedAbilityForDeletion.name}</Text></Pressable></View>
                            )})}
                    </View>
                    {(abilityDeleteToolDisplay && abilityConfirmDelete) &&
                        <Pressable onPress={() => {
                            setAbilityConfirmDelete(false);}}>
                            <Text style={{
                                textAlign: "center",
                                color: "white",
                                fontSize: 25,
                                backgroundColor: "blue",
                                margin: 15,
                                borderRadius: 10
                            }}>Cancel Ability {deleteAbilityName} Deletion?<FontAwesome size={28} name="smile-o" color={"green"} /></Text></Pressable>}
                    {(abilityDeleteToolDisplay && abilityConfirmDelete) &&
                        <Pressable onPress={() => {
                            setAbilityConfirmDelete(false);
                            let knownAbilities :Ability[] = [];
                            character.abilities.forEach((ability) => {
                                if (ability.name != deleteAbilityName) {
                                    knownAbilities.push(ability);
                                }
                                if (ability.name === deleteAbilityName && ability.usesTrigger === "Passive") {
                                    characterUpdater({type: "subtractResistanceAndImmunities", abilityName: deleteAbilityName});
                                }
                            });
                            characterUpdater({type: "updateAbilities", knownAbilities: knownAbilities})
                        }}>
                            <Text style={{
                                textAlign: "center",
                                color: "white",
                                fontSize: 25,
                                backgroundColor: "blue",
                                margin: 15,
                                borderRadius: 10
                            }}>Confirm Ability {deleteAbilityName} Deletion?<MaterialCommunityIcons size={28} name="skull-crossbones-outline" color={"red"} /></Text></Pressable>}

                </Pressable>
            </View>


        </View>}</View>
    )
}

const styles = StyleSheet.create({
    toolBoxStyle: {
        backgroundColor: "teal",
        borderRadius: 12,
    },
    toolBoxButton: {
        backgroundColor: "maroon",
        alignSelf: "center",
        padding: 13,
        borderRadius: 30,
        width: 300,
    },
    labels: {
        color: "white",
        textAlign: "center",
        fontSize: 12,
    },
    toggleButtonLables: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
    },
    newAbilityToolToggleButtons: {
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
    damageDiceEntry: {
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
})