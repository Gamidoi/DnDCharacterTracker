import {StyleSheet, Text, View, Pressable, TextInput, Platform} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import React, {useState} from "react";
import {Spell} from "@/assets/classes/spell";
import {FontAwesome, MaterialCommunityIcons} from "@expo/vector-icons";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";



export default function newSpellCreationTool() {
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();


    let [spellLevelDropDownOpen, setSpellLevelDropDownOpen] = useState(false);
    let [spellLevelVariable, setSpellLevelVariable] = useState("0");
    let [spellLevelDropDownOptions, setSpellLevelDropDownOptions] = useState([
        {label: "Cantrip", value: "0"},
        {label: "1st Level", value: "1"},
        {label: "2nd Level", value: "2"},
        {label: "3rd Level", value: "3"},
        {label: "4th Level", value: "4"},
        {label: "5th Level", value: "5"},
        {label: "6th Level", value: "6"},
        {label: "7th Level", value: "7"},
        {label: "8th Level", value: "8"},
        {label: "9th Level", value: "9"}
    ]);

    let [spellTimeDropDownOpen, setSpellTimeDropDownOpen] = useState(false);
    let [spellTimeVariable, setSpellTimeVariable] = useState("Action");
    let [spellTimeDropDownOptions, setSpellTimeDropDownOptions] = useState([
        {label: "Action", value: "Action"},
        {label: "Bonus Action", value: "Bonus Action"},
        {label: "Reaction", value: "Reaction"},
        {label: "1 Minute", value: "1 Minute"},
        {label: "10 Minutes", value: "10 Minutes"},
        {label: "1 Hour", value: "1 Hour"},
        {label: "8 Hours", value: "8 Hours"},
    ]);

    let [spellDurationDropDownOpen, setSpellDurationDropDownOpen] = useState(false);
    let [spellDurationVariable, setSpellDurationVariable] = useState("Instantaneous");
    let [spellDurationDropDownOptions, setSpellDurationDropDownOptions] = useState([
        {label: "Instantaneous", value: "Instantaneous"},
        {label: "1 Round", value: "1 Round"},
        {label: "1 Minute", value: "1 Minute"},
        {label: "10 Minutes", value: "10 Minutes"},
        {label: "1 Hour", value: "1 Hour"},
        {label: "8 Hours", value: "8 Hours"},
        {label: "24 Hours", value: "24 Hours"},
        {label: "10 Days", value: "10 Days"},
        {label: "30 Days", value: "30 Days"},
        {label: "Until Dispelled", value: "Until Dispelled"},
        {label: "Special", value: "Special"},
    ]);

    let [spellRangeDropDownOpen, setSpellRangeDropDownOpen] = useState(false);
    let [spellRangeVariable, setSpellRangeVariable] = useState("Touch");
    let [spellRangeDropDownOptions, setSpellRangeDropDownOptions] = useState([
        {label: "Self", value: "Self"},
        {label: "Touch", value: "Touch"},
        {label: "5 Foot", value: "5 Foot"},
        {label: "10 Foot", value: "10 Foot"},
        {label: "30 Foot", value: "30 Foot"},
        {label: "60 Foot", value: "60 Foot"},
        {label: "90 Foot", value: "90 Foot"},
        {label: "120 Foot", value: "120 Foot"},
        {label: "500 Foot", value: "500 Foot"},
        {label: "Sight", value: "Sight"},
        {label: "1 Mile", value: "1 Mile"},
        {label: "10 Miles", value: "10 Miles"},
        {label: "Same Plane of Existence", value: "Same Plane of Existence"},
        {label: "Any", value: "Any"},
    ]);

    let [spellTargetDropDownOpen, setSpellTargetDropDownOpen] = useState(false);
    let [spellTargetVariable, setSpellTargetVariable] = useState("Self");
    let [spellTargetDropDownOptions, setSpellTargetDropDownOptions] = useState([
        {label: "Self", value: "Self"},
        {label: "Creature", value: "Creature"},
        {label: "Humanoid", value: "Humanoid", parent: "Creature"},
        {label: "Medium Creature", value: "Medium Creature", parent: "Creature"},
        {label: "Large Creature", value: "Large Creature", parent: "Creature"},
        {label: "Object", value: "Object"},
        {label: "Sphere", value: "Sphere"},
        {label: "5 foot Radius Sphere", value: "5 foot Radius Sphere", parent: "Sphere"},
        {label: "10 foot Radius Sphere", value: "10 foot Radius Sphere", parent: "Sphere"},
        {label: "15 foot Radius Sphere", value: "15 foot Radius Sphere", parent: "Sphere"},
        {label: "20 foot Radius Sphere", value: "20 foot Radius Sphere", parent: "Sphere"},
        {label: "30 foot Radius Sphere", value: "30 foot Radius Sphere", parent: "Sphere"},
        {label: "40 foot Radius Sphere", value: "40 foot Radius Sphere", parent: "Sphere"},
        {label: "60 foot Radius Sphere", value: "60 foot Radius Sphere", parent: "Sphere"},
        {label: "Cube", value: "Cube"},
        {label: "10 foot Cube", value: "10 foot Cube", parent: "Cube"},
        {label: "15 foot Cube", value: "15 foot Cube", parent: "Cube"},
        {label: "20 foot Cube", value: "20 foot Cube", parent: "Cube"},
        {label: "30 foot Cube", value: "30 foot Cube", parent: "Cube"},
        {label: "40 foot Cube", value: "40 foot Cube", parent: "Cube"},
        {label: "90 foot Cube", value: "90 foot Cube", parent: "Cube"},
        {label: "100 foot Cube", value: "100 foot Cube", parent: "Cube"},
        {label: "150 foot Cube", value: "150 foot Cube", parent: "Cube"},
        {label: "Cone", value: "Cone"},
        {label: "15 foot Cone", value: "15 foot Cone", parent: "Cone"},
        {label: "30 foot Cone", value: "30 foot Cone", parent: "Cone"},
        {label: "60 foot Cone", value: "60 foot Cone", parent: "Cone"},
        {label: "120 foot Cone", value: "120 foot Cone", parent: "Cone"},
        {label: "Line", value: "Line"},
        {label: "15 foot Line", value: "15 foot Line", parent: "Line"},
        {label: "30 foot Line", value: "30 foot Line", parent: "Line"},
        {label: "60 foot Line", value: "60 foot Line", parent: "Line"},
        {label: "100 foot Line", value: "100 foot Line", parent: "Line"},
    ]);


    let [newSpellCreationToolDisplay, setNewSpellCreationToolDisplay] = useState(false);
    let [newSpellConfirmationCount, setNewSpellConfirmationCount] = useState(0);
    let [deleteSpellToolDisplay, setDeleteSpellToolDisplay] = useState(false);
    let [deleteSpellName, setDeleteSpellName] = useState("");
    let [spellConfirmDelete, setSpellConfirmDelete] = useState(false);

    let [spellNameVariable, setSpellNameVariable] = useState("");
    let [spellVerbalVariable, setSpellVerbalVariable] = useState(false);
    let [spellSomaticVariable, setSpellSomaticVariable] = useState(false);
    let [spellMaterialBooleanVariable, setSpellMaterialBooleanVariable] = useState(false,);
    let [spellMaterialDescriptionVariable, setSpellMaterialDescriptionVariable] = useState("");
    let [spellConcentrationVariable, setSpellConcentrationVariable] = useState(false);
    let [spellRitualVariable, setSpellRitualVariable] = useState(false);
    let isAttack :[boolean, string] = [false, "INT"];
    let [spellIsAttack, setSpellIsAttack] = useState(isAttack);
    let [spellIsSaveDC, setSpellIsSaveDC] = useState(isAttack);
    let [spellSaveType, setSpellSaveType] = useState("DEX");
    let [spellDamageVariable, setSpellDamageVariable] = useState(false);
    let [damageD4, setDamageD4] = useState("0");
    let [damageD6, setDamageD6] = useState("0");
    let [damageD8, setDamageD8] = useState("0");
    let [damageD10, setDamageD10] = useState("0");
    let [damageD12, setDamageD12] = useState("0");
    let [damageBonus, setDamageBonus] = useState("0");
    let [spellDescription, setSpellDescription] = useState("");


    function closeAll(type: string = ""){
        if (type != "Level") {setSpellLevelDropDownOpen(false);}
        if (type != "Time") {setSpellTimeDropDownOpen(false);}
        if (type != "Range") {setSpellRangeDropDownOpen(false);}
        if (type != "Duration") {setSpellDurationDropDownOpen(false);}
        if (type != "Target") {setSpellTargetDropDownOpen(false);}
    }

    return(<View>
        <Pressable onPress={() => closeAll()} style={styles.toolBoxStyle}>
            <Pressable onPress={() => {
                setNewSpellCreationToolDisplay(!newSpellCreationToolDisplay);
                closeAll()}}>
            {!newSpellCreationToolDisplay && <Text style={{color: "white", textAlign: "center", height: 40, marginTop: 15}}>Open New Spell Tool</Text>}
            {newSpellCreationToolDisplay && <Text style={{color: "white", textAlign: "center", marginBottom: 20}}>Close New Spell Tool</Text>}
            </Pressable>
            {newSpellCreationToolDisplay && <View>
                <View style={{flexDirection: "row", alignSelf: "center", marginBottom: 10}}>
                    <View style={{flex: 0.7, marginVertical: 10}}>
                        <Text style={styles.lables}>Spell Name</Text>
                        <TextInput
                            onChangeText={setSpellNameVariable}
                            onFocus={() => {closeAll()}}
                            placeholder={"Spellname"}
                            placeholderTextColor={"grey"}
                            style={{
                                fontSize: 22,
                                borderStyle: "solid",
                                borderWidth: 3,
                                borderColor: "white",
                                width: 250,
                                alignSelf: "center",
                                color: "white",
                                textAlign: "center",
                                padding: 5,
                            }}/>
                    </View>
                    <View style={{flex: 0.35, alignSelf: "center"}}>
                        <Text style={styles.lables}>Spell Level</Text>
                        <DropDownPicker
                            open={spellLevelDropDownOpen}
                            value={spellLevelVariable}
                            items={spellLevelDropDownOptions}
                            setOpen={setSpellLevelDropDownOpen}
                            setValue={setSpellLevelVariable}
                            setItems={setSpellLevelDropDownOptions}
                            onOpen={() => {closeAll("Level")}}
                            autoScroll={true}
                            dropDownDirection={"BOTTOM"}
                            zIndex={100000}
                            flatListProps={{nestedScrollEnabled:true}}
                            style={[
                                styles.dropDownPicker,
                                {
                                    width: 125,
                                    marginBottom: Platform.OS === "web" ? (spellLevelDropDownOpen ? 190 : 0) : 0
                            }]}
                            dropDownContainerStyle={styles.dropDownContainer}
                            textStyle={{color: "white", fontSize: 14}}
                        />


                    </View>
                </View>
                <View style={{flexDirection: "row", alignSelf: "center", marginBottom: 5}}>
                    <View style={{flex: 0.2}}>
                        <Text style={styles.lables}>Verbal</Text>
                        <Pressable
                            style={styles.newSpellToolToggleButtons}
                            onPress={() => {
                                setSpellVerbalVariable(!spellVerbalVariable);
                                closeAll()}}>
                            <Text style={styles.toggleButtonLables}>{spellVerbalVariable ? "Yes" : "No"}</Text>
                        </Pressable>
                    </View>
                    <View style={{flex: 0.2}}>
                        <Text style={styles.lables}>Somatic</Text>
                        <Pressable
                            style={styles.newSpellToolToggleButtons}
                            onPress={() => {
                                setSpellSomaticVariable(!spellSomaticVariable);
                            closeAll()}}>
                            <Text style={styles.toggleButtonLables}>{spellSomaticVariable ? "Yes" : "No"}</Text>
                        </Pressable>
                    </View>
                    <View style={{flex: 0.2}}>
                        <Text style={styles.lables}>Material</Text>
                        <Pressable
                            style={styles.newSpellToolToggleButtons}
                            onPress={() => {
                                setSpellMaterialBooleanVariable(!spellMaterialBooleanVariable);
                            closeAll()}}>
                            <Text style={styles.toggleButtonLables}>{spellMaterialBooleanVariable ? "Yes" : "No"}</Text>
                        </Pressable>
                    </View>
                    <View style={{flex: 0.2}}>
                        <Text style={styles.lables}>Concentrate</Text>
                        <Pressable
                            style={styles.newSpellToolToggleButtons}
                            onPress={() => {
                                setSpellConcentrationVariable(!spellConcentrationVariable);
                            closeAll()}}>
                            <Text style={styles.toggleButtonLables}>{spellConcentrationVariable ? "Yes" : "No"}</Text>
                        </Pressable></View>
                    <View style={{flex: 0.2}}>
                        <Text style={styles.lables}>Ritual</Text>
                        <Pressable
                            style={styles.newSpellToolToggleButtons}
                            onPress={() => {
                                setSpellRitualVariable(!spellRitualVariable);
                                closeAll()}}>
                            <Text style={styles.toggleButtonLables}>{spellRitualVariable ? "Yes" : "No"}</Text>
                        </Pressable></View>
                </View>
                {spellMaterialBooleanVariable && <Text style={styles.lables}>If specified, what are the Material Components?</Text>}
                {spellMaterialBooleanVariable && <TextInput
                    onChangeText={setSpellMaterialDescriptionVariable}
                    onFocus={() => closeAll()}
                    placeholder={"Bat Guano worth 25gp"}
                    placeholderTextColor={"grey"}
                    multiline={true}
                    style={{
                        fontSize: 22,
                        borderStyle: "solid",
                        borderWidth: 3,
                        borderColor: "white",
                        width: 300,
                        padding: 0,
                        alignSelf: "center",
                        color: "white",
                        textAlign: "center",
                        marginBottom: 10
                }}/>}
                <View style={{flexDirection: "row", alignSelf: "center", marginBottom: 5}}>
                    <View style={{flex: 0.5}}>
                        <Text style={styles.lables}>Casting Time</Text>
                        <DropDownPicker
                            open={spellTimeDropDownOpen}
                            value={spellTimeVariable}
                            items={spellTimeDropDownOptions}
                            setOpen={setSpellTimeDropDownOpen}
                            setValue={setSpellTimeVariable}
                            setItems={setSpellTimeDropDownOptions}
                            onOpen={() => {closeAll("Time")}}
                            autoScroll={true}
                            dropDownDirection={"BOTTOM"}
                            zIndex={90091}
                            flatListProps={{nestedScrollEnabled:true}}
                            style={[styles.dropDownPicker,
                                {marginBottom: Platform.OS === "web" ? (spellTimeDropDownOpen ? 200 : 0) : 0}]}
                            dropDownContainerStyle={styles.dropDownContainer}
                            textStyle={{color: "white", fontSize: 14}}
                        />
                    </View>
                    <View style={{flex: 0.5}}>
                        <Text style={styles.lables}>Spell Duration</Text>
                        <DropDownPicker
                            open={spellDurationDropDownOpen}
                            value={spellDurationVariable}
                            items={spellDurationDropDownOptions}
                            setOpen={setSpellDurationDropDownOpen}
                            setValue={setSpellDurationVariable}
                            setItems={setSpellDurationDropDownOptions}
                            onOpen={() => {closeAll("Duration")}}
                            autoScroll={true}
                            dropDownDirection={"BOTTOM"}
                            zIndex={90090}
                            flatListProps={{nestedScrollEnabled:true}}
                            style={[styles.dropDownPicker,
                                {marginBottom: Platform.OS === "web" ? (spellDurationDropDownOpen ? 200 : 0) : 0}]}
                            dropDownContainerStyle={styles.dropDownContainer}
                            textStyle={{color: "white", fontSize: 14}}
                        />
                    </View>
                </View>
                <View style={{flexDirection: "row", alignSelf: "center", marginBottom: 10}}>
                    <View style={{flex: 0.5}}>
                        <Text style={styles.lables}>Spell Range</Text>
                        <DropDownPicker
                            open={spellRangeDropDownOpen}
                            value={spellRangeVariable}
                            items={spellRangeDropDownOptions}
                            setOpen={setSpellRangeDropDownOpen}
                            setValue={setSpellRangeVariable}
                            setItems={setSpellRangeDropDownOptions}
                            onOpen={() => {closeAll("Range")}}
                            autoScroll={true}
                            dropDownDirection={"BOTTOM"}
                            zIndex={90081}
                            flatListProps={{nestedScrollEnabled:true}}
                            style={[styles.dropDownPicker,
                                {marginBottom: Platform.OS === "web" ? (spellRangeDropDownOpen ? 200 : 0) : 0}]}
                            dropDownContainerStyle={styles.dropDownContainer}
                            textStyle={{color: "white", fontSize: 14}}
                        />
                    </View>
                    <View style={{flex: 0.5}}>
                        <Text style={styles.lables}>Spell Target</Text>
                        <DropDownPicker
                            open={spellTargetDropDownOpen}
                            value={spellTargetVariable}
                            items={spellTargetDropDownOptions}
                            setOpen={setSpellTargetDropDownOpen}
                            setValue={setSpellTargetVariable}
                            setItems={setSpellTargetDropDownOptions}
                            onOpen={() => {closeAll("Target")}}
                            autoScroll={true}
                            dropDownDirection={"BOTTOM"}
                            zIndex={90080}
                            flatListProps={{nestedScrollEnabled:true}}
                            style={[styles.dropDownPicker,
                                {marginBottom: Platform.OS === "web" ? (spellTargetDropDownOpen ? 200 : 0) : 0}]}
                            dropDownContainerStyle={styles.dropDownContainer}
                            textStyle={{color: "white", fontSize: 14}}
                        />
                    </View>
                </View>
                <Text style={styles.lables}>What Type of Roll?</Text>
                <View style={{flexDirection: "row", alignSelf: "center", marginBottom: 10}}>
                    {!spellIsAttack[0] && <Pressable style={[styles.attackSaveNeitherButtonsOff, {borderBottomStartRadius: 10, borderTopStartRadius: 10}]} onPress={() => {
                        setSpellIsAttack([true, spellIsAttack[1]]);
                        setSpellIsSaveDC([false, spellIsSaveDC[1]]);
                        closeAll();
                    }}>
                        <Text style={styles.toggleButtonLables}>Spell Attack</Text>
                    </Pressable>}
                    {spellIsAttack[0] && <Pressable style={[styles.attackSaveNeitherButtonsOn, {borderBottomStartRadius: 10, borderTopStartRadius: 10}]} onPress={() => {
                        setSpellIsAttack([false, spellIsAttack[1]]);
                        setSpellIsSaveDC([false, spellIsSaveDC[1]]);
                        closeAll();
                    }}>
                        <Text style={styles.toggleButtonLables}>Spell Attack</Text>
                    </Pressable>}

                    {(!spellIsSaveDC[0] && !spellIsAttack[0]) && <Pressable style={styles.attackSaveNeitherButtonsOn} onPress={() => {
                        setSpellIsAttack([false, spellIsAttack[1]]);
                        setSpellIsSaveDC([false, spellIsSaveDC[1]]);
                        closeAll();
                    }}>
                        <Text style={[styles.toggleButtonLables, {marginTop: 10}]}>Neither</Text>
                    </Pressable>}
                    {(spellIsSaveDC[0] || spellIsAttack[0]) && <Pressable style={styles.attackSaveNeitherButtonsOff} onPress={() => {
                        setSpellIsAttack([false, spellIsAttack[1]]);
                        setSpellIsSaveDC([false, spellIsSaveDC[1]]);
                        closeAll();
                    }}>
                        <Text style={[styles.toggleButtonLables, {marginTop: 10}]}>Neither</Text>
                    </Pressable>}

                    {!spellIsSaveDC[0] && <Pressable style={[styles.attackSaveNeitherButtonsOff, {borderBottomEndRadius: 10, borderTopEndRadius: 10}]} onPress={() => {
                        setSpellIsAttack([false, spellIsAttack[1]]);
                        setSpellIsSaveDC([true, spellIsSaveDC[1]]);
                        closeAll();
                    }}>
                        <Text style={styles.toggleButtonLables}>Saving Throw</Text>
                    </Pressable>}
                    {spellIsSaveDC[0] && <Pressable style={[styles.attackSaveNeitherButtonsOn, {borderBottomEndRadius: 10, borderTopEndRadius: 10}]} onPress={() => {
                        setSpellIsAttack([false, spellIsAttack[1]]);
                        setSpellIsSaveDC([false, spellIsSaveDC[1]]);
                        closeAll();
                    }}>
                        <Text style={styles.toggleButtonLables}>Saving Throw</Text>
                    </Pressable>}
                </View>

                {spellIsSaveDC[0] && <Text style={styles.lables}>What is the Saving Throw?</Text>}
                {spellIsSaveDC[0] && <View style={{flexDirection: "row", alignSelf: "center"}}>
                    {spellSaveType == "STR" && <Pressable style={[styles.saveTypeToggleON, {borderBottomStartRadius: 10, borderTopStartRadius: 10}]} onPress={() =>
                        {setSpellSaveType("STR"); closeAll()}}><Text style={styles.saveStatLable}>STR</Text></Pressable>}
                    {spellSaveType != "STR" && <Pressable style={[styles.saveTypeToggleOff, {borderBottomStartRadius: 10, borderTopStartRadius: 10}]} onPress={() =>
                        {setSpellSaveType("STR"); closeAll()}}><Text style={styles.saveStatLable}>STR</Text></Pressable>}
                    {spellSaveType == "DEX" && <Pressable style={styles.saveTypeToggleON} onPress={() =>
                        {setSpellSaveType("DEX"); closeAll()}}><Text style={styles.saveStatLable}>DEX</Text></Pressable>}
                    {spellSaveType != "DEX" && <Pressable style={styles.saveTypeToggleOff} onPress={() =>
                        {setSpellSaveType("DEX"); closeAll()}}><Text style={styles.saveStatLable}>DEX</Text></Pressable>}
                    {spellSaveType == "CON" && <Pressable style={styles.saveTypeToggleON} onPress={() =>
                        {setSpellSaveType("CON"); closeAll()}}><Text style={styles.saveStatLable}>CON</Text></Pressable>}
                    {spellSaveType != "CON" && <Pressable style={styles.saveTypeToggleOff} onPress={() =>
                        {setSpellSaveType("CON"); closeAll()}}><Text style={styles.saveStatLable}>CON</Text></Pressable>}
                    {spellSaveType == "INT" && <Pressable style={styles.saveTypeToggleON} onPress={() =>
                        {setSpellSaveType("INT"); closeAll()}}><Text style={styles.saveStatLable}>INT</Text></Pressable>}
                    {spellSaveType != "INT" && <Pressable style={styles.saveTypeToggleOff} onPress={() =>
                        {setSpellSaveType("INT"); closeAll()}}><Text style={styles.saveStatLable}>INT</Text></Pressable>}
                    {spellSaveType == "WIS" && <Pressable style={styles.saveTypeToggleON} onPress={() =>
                        {setSpellSaveType("WIS"); closeAll()}}><Text style={styles.saveStatLable}>WIS</Text></Pressable>}
                    {spellSaveType != "WIS" && <Pressable style={styles.saveTypeToggleOff} onPress={() =>
                        {setSpellSaveType("WIS"); closeAll()}}><Text style={styles.saveStatLable}>WIS</Text></Pressable>}
                    {spellSaveType == "CHA" && <Pressable style={[styles.saveTypeToggleON, {borderBottomEndRadius: 10, borderTopEndRadius: 10}]} onPress={() =>
                        {setSpellSaveType("CHA"); closeAll()}}><Text style={styles.saveStatLable}>CHA</Text></Pressable>}
                    {spellSaveType != "CHA" && <Pressable style={[styles.saveTypeToggleOff, {borderBottomEndRadius: 10, borderTopEndRadius: 10}]} onPress={() =>
                        {setSpellSaveType("CHA"); closeAll()}}><Text style={styles.saveStatLable}>CHA</Text></Pressable>}
                </View>}


                <Text style={styles.lables}>Spell Casting Stat</Text>
                <View style={{flexDirection: "row", alignSelf: "center", }}>
                    {spellIsSaveDC[1] == "INT" && <Pressable style={[styles.spellCastingStatButtonsOn, {borderStartStartRadius: 10}]} onPress={() => {
                        setSpellIsAttack([spellIsAttack[0], "INT"]);
                        setSpellIsSaveDC([spellIsSaveDC[0], "INT"]);
                        closeAll();
                    }}>
                        <Text style={[styles.toggleButtonLables]}>INT</Text>
                    </Pressable>}
                    {spellIsSaveDC[1] != "INT" && <Pressable style={[styles.spellCastingStatButtonsOff, {borderStartStartRadius: 10}]} onPress={() => {
                        setSpellIsAttack([spellIsAttack[0], "INT"]);
                        setSpellIsSaveDC([spellIsSaveDC[0], "INT"]);
                        closeAll();
                    }}>
                        <Text style={[styles.toggleButtonLables]}>INT</Text>
                    </Pressable>}
                    {spellIsSaveDC[1] == "WIS" && <Pressable style={styles.spellCastingStatButtonsOn} onPress={() => {
                        setSpellIsAttack([spellIsAttack[0], "WIS"]);
                        setSpellIsSaveDC([spellIsSaveDC[0], "WIS"]);
                        closeAll();
                    }}>
                        <Text style={[styles.toggleButtonLables]}>WIS</Text>
                    </Pressable>}
                    {spellIsSaveDC[1] != "WIS" && <Pressable style={styles.spellCastingStatButtonsOff} onPress={() => {
                        setSpellIsAttack([spellIsAttack[0], "WIS"]);
                        setSpellIsSaveDC([spellIsSaveDC[0], "WIS"]);
                        closeAll();
                    }}>
                        <Text style={[styles.toggleButtonLables]}>WIS</Text>
                    </Pressable>}
                    {spellIsSaveDC[1] == "CHA" && <Pressable style={[styles.spellCastingStatButtonsOn, {borderTopEndRadius: 10}]} onPress={() => {
                        setSpellIsAttack([spellIsAttack[0], "CHA"]);
                        setSpellIsSaveDC([spellIsSaveDC[0], "CHA"]);
                        closeAll();
                    }}>
                        <Text style={[styles.toggleButtonLables]}>CHA</Text>
                    </Pressable>}
                    {spellIsSaveDC[1] != "CHA" && <Pressable style={[styles.spellCastingStatButtonsOff, {borderTopEndRadius: 10}]} onPress={() => {
                        setSpellIsAttack([spellIsAttack[0], "CHA"]);
                        setSpellIsSaveDC([spellIsSaveDC[0], "CHA"]);
                        closeAll();
                    }}>
                        <Text style={[styles.toggleButtonLables]}>CHA</Text>
                    </Pressable>}
                </View>

                <Text style={
                    [styles.lables, {
                        backgroundColor: "grey",
                        borderColor: "orange",
                        borderWidth: 4,
                        width: 330,
                        alignSelf: "center",
                    }]}>Very Unusual Spell Casting Stats for Homebrew.</Text>
                <View style={{flexDirection: "row", alignSelf: "center", marginBottom: 10}}>
                    {spellIsSaveDC[1] == "STR" && <Pressable style={[styles.spellCastingStatButtonsOn, {borderBottomStartRadius: 10}]} onPress={() => {
                        setSpellIsAttack([spellIsAttack[0], "STR"]);
                        setSpellIsSaveDC([spellIsSaveDC[0], "STR"]);
                        closeAll();
                    }}>
                        <Text style={[styles.toggleButtonLables]}>STR</Text>
                    </Pressable>}
                    {spellIsSaveDC[1] != "STR" && <Pressable style={[styles.spellCastingStatButtonsOff, {borderBottomStartRadius: 10}]} onPress={() => {
                        setSpellIsAttack([spellIsAttack[0], "STR"]);
                        setSpellIsSaveDC([spellIsSaveDC[0], "STR"]);
                        closeAll();
                    }}>
                        <Text style={[styles.toggleButtonLables]}>STR</Text>
                    </Pressable>}
                    {spellIsSaveDC[1] == "DEX" && <Pressable style={styles.spellCastingStatButtonsOn} onPress={() => {
                        setSpellIsAttack([spellIsAttack[0], "DEX"]);
                        setSpellIsSaveDC([spellIsSaveDC[0], "DEX"]);
                        closeAll();
                    }}>
                        <Text style={[styles.toggleButtonLables]}>DEX</Text>
                    </Pressable>}
                    {spellIsSaveDC[1] != "DEX" && <Pressable style={styles.spellCastingStatButtonsOff} onPress={() => {
                        setSpellIsAttack([spellIsAttack[0], "DEX"]);
                        setSpellIsSaveDC([spellIsSaveDC[0], "DEX"]);
                        closeAll();
                    }}>
                        <Text style={[styles.toggleButtonLables]}>DEX</Text>
                    </Pressable>}
                    {spellIsSaveDC[1] == "CON" && <Pressable style={[styles.spellCastingStatButtonsOn, {borderBottomEndRadius: 10}]} onPress={() => {
                        setSpellIsAttack([spellIsAttack[0], "CON"]);
                        setSpellIsSaveDC([spellIsSaveDC[0], "CON"]);
                        closeAll();
                    }}>
                        <Text style={[styles.toggleButtonLables]}>CON</Text>
                    </Pressable>}
                    {spellIsSaveDC[1] != "CON" && <Pressable style={[styles.spellCastingStatButtonsOff, {borderBottomEndRadius: 10}]} onPress={() => {
                        setSpellIsAttack([spellIsAttack[0], "CON"]);
                        setSpellIsSaveDC([spellIsSaveDC[0], "CON"]);
                        closeAll();
                    }}>
                        <Text style={[styles.toggleButtonLables]}>CON</Text>
                    </Pressable>}
                </View>


                <View><Text style={styles.lables}>Does the Spell Roll for Damage/Healing/Other?</Text>
                    <Pressable style={[styles.newSpellToolToggleButtons, {width: 150, height: 40}]} onPress={() => {
                        setSpellDamageVariable(!spellDamageVariable);
                        closeAll();
                    }}>
                        {spellDamageVariable && <Text style={styles.toggleButtonLables}>Yes</Text>}
                        {!spellDamageVariable && <Text style={styles.toggleButtonLables}>No</Text>}
                    </Pressable>
                    {spellDamageVariable && <View style={{flexDirection: "row", alignSelf: "center"}}>
                        <View style={{flex: 0.1666}}><Text style={styles.lables}>D4s</Text>
                            <TextInput
                                onChangeText={setDamageD4}
                                onFocus={() => closeAll()}
                                placeholder={"0"}
                                keyboardType={"numeric"}
                                maxLength={2}
                                placeholderTextColor={"grey"}
                                style={styles.damageDiceEntry}/></View>
                        <View style={{flex: 0.1666}}><Text style={styles.lables}>D6s</Text>
                            <TextInput
                                onChangeText={setDamageD6}
                                onFocus={() => closeAll()}
                                placeholder={"0"}
                                keyboardType={"numeric"}
                                maxLength={2}
                                placeholderTextColor={"grey"}
                                style={styles.damageDiceEntry}/></View>
                        <View style={{flex: 0.1666}}><Text style={styles.lables}>D8s</Text>
                            <TextInput
                                onChangeText={setDamageD8}
                                onFocus={() => closeAll()}
                                placeholder={"0"}
                                keyboardType={"numeric"}
                                maxLength={2}
                                placeholderTextColor={"grey"}
                                style={styles.damageDiceEntry}/></View>
                        <View style={{flex: 0.1666}}><Text style={styles.lables}>D10s</Text>
                            <TextInput
                                onChangeText={setDamageD10}
                                onFocus={() => closeAll()}
                                placeholder={"0"}
                                keyboardType={"numeric"}
                                maxLength={2}
                                placeholderTextColor={"grey"}
                                style={styles.damageDiceEntry}/></View>
                        <View style={{flex: 0.1666}}><Text style={styles.lables}>D12s</Text>
                            <TextInput
                                onChangeText={setDamageD12}
                                onFocus={() => closeAll()}
                                placeholder={"0"}
                                keyboardType={"numeric"}
                                maxLength={2}
                                placeholderTextColor={"grey"}
                                style={styles.damageDiceEntry}/></View>
                        <View style={{flex: 0.1666}}><Text style={styles.lables}>bonus</Text>
                            <TextInput
                                onChangeText={setDamageBonus}
                                onFocus={() => closeAll()}
                                placeholder={"0"}
                                keyboardType={"numeric"}
                                maxLength={2}
                                placeholderTextColor={"grey"}
                                style={styles.damageDiceEntry}/></View>
                    </View>}
                </View>


                <Text style={styles.lables}>Verbose Description</Text>
                <TextInput
                    onChangeText={setSpellDescription}
                    onFocus={() => closeAll()}
                    placeholder={"throw a flaming ball of bat guano at your enemies, it is highly effective at hurting them 8d8 fire damage"}
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

                {(newSpellConfirmationCount > 0) &&
                    <Pressable  style={styles.confirmationButton} onPress={() => {
                        setNewSpellConfirmationCount(0);
                        closeAll();}}>
                        <Text style={styles.confirmationBox}>Confirmed! New Spell</Text>
                        <Text style={styles.confirmationBox}>"{spellNameVariable}"</Text>
                        <Text style={styles.confirmationBox}>Created! {newSpellConfirmationCount} time(s)!</Text>
                    </Pressable>}


                <Pressable
                    style={styles.toolBoxButton}
                    onPress={() => {
                        closeAll();
                        if (spellNameVariable != ""){

                            let newSpell = new Spell(spellNameVariable, parseInt(spellLevelVariable), spellVerbalVariable, spellSomaticVariable,
                                [spellMaterialBooleanVariable, spellMaterialDescriptionVariable], spellConcentrationVariable, spellRitualVariable,
                                spellTimeVariable, spellDurationVariable, spellRangeVariable, spellTargetVariable, spellIsAttack,
                                [spellIsSaveDC[0], spellIsSaveDC[1], spellSaveType],
                                [spellDamageVariable, parseInt(damageD4), parseInt(damageD6), parseInt(damageD8), parseInt(damageD10), parseInt(damageD12), parseInt(damageBonus)],
                                [true, spellDescription]);
                            setNewSpellConfirmationCount(newSpellConfirmationCount + 1);
                            characterUpdater({type: "updateKnownSpells", knownSpells: [...character.spells, newSpell]})
                    }}}>
                    <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>Create New Spell: {spellNameVariable}</Text>
                    <Text style={{color: "white", fontSize: 12, textAlign: "center"}}>For {character.charName}</Text>
                </Pressable>
            </View>}
        </Pressable>


        <View style={[styles.toolBoxStyle, {marginTop: 17}]}>
            <Pressable onPress={() => {setDeleteSpellToolDisplay(!deleteSpellToolDisplay)}}>
                {!deleteSpellToolDisplay && <Text style={{color: "white", textAlign: "center", height: 40, marginTop: 15}}>Open Spell Deletion Tool</Text>}
                {deleteSpellToolDisplay && <Text style={{color: "white", textAlign: "center", marginBottom: 20}}>Close Spell Deletion Tool</Text>}
                {deleteSpellToolDisplay && <Text style={{color: "white", textAlign: "center", marginBottom: 20}}>Choose Spell Below</Text>}
            </Pressable>
            <View style={{alignSelf: "center"}}>
            {character.spells?.map((pickedSpellForDeletion :Spell) => {
                return(
                    deleteSpellToolDisplay && <View><Pressable onPress={() => {
                        setSpellConfirmDelete(!spellConfirmDelete);
                        setDeleteSpellName(pickedSpellForDeletion.name);
                    }}><Text style={{
                        fontSize: 20,
                        backgroundColor: "maroon",
                        textAlign: "center",
                        margin: 10,
                        height: 50,
                        borderRadius: 30,
                        width: 260,
                        color: "white",
                        paddingTop: 10,
                        borderColor: "orange",
                        borderWidth: 3,
                    }}>{pickedSpellForDeletion.name}</Text></Pressable></View>
                )})}</View>
            {(deleteSpellToolDisplay && spellConfirmDelete) &&
                <Pressable onPress={() => {
                    setSpellConfirmDelete(false);}}>
                    <Text style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 25,
                        backgroundColor: "blue",
                        margin: 15,
                        borderRadius: 10
                    }}>Cancel Spell {deleteSpellName} Deletion?<FontAwesome size={28} name="smile-o" color={"green"} /></Text></Pressable>}
            {(deleteSpellToolDisplay && spellConfirmDelete) &&
                <Pressable onPress={() => {
                    setSpellConfirmDelete(false);
                    let knownSpells :Spell[] = [];
                    character.spells.forEach((spell) => {
                        if (spell.name != deleteSpellName) {
                            knownSpells.push(spell);
                        }
                    });
                    characterUpdater({type: "updateKnownSpells", knownSpells: knownSpells})
                }}>
                    <Text style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 25,
                        backgroundColor: "blue",
                        margin: 15,
                        borderRadius: 10
                    }}>Confirm Spell {deleteSpellName} Deletion?<MaterialCommunityIcons size={28} name="skull-crossbones-outline" color={"red"} /></Text></Pressable>}

        </View>







        </View>
)}

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
        //height: 42,
    },
    lables: {
        color: "white",
        textAlign: "center",
        fontSize: 12,
    },
    toggleButtonLables: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
    },
    attackSaveNeitherButtonsOff: {
        width: 120,
        backgroundColor: "grey",
        borderColor: "orange",
        borderWidth: 4,
        height: 65,
    },
    attackSaveNeitherButtonsOn: {
        width: 120,
        backgroundColor: "maroon",
        borderColor: "orange",
        borderWidth: 4,
        height: 65,
    },
    spellCastingStatButtonsOff: {
        width: 120,
        backgroundColor: "grey",
        borderColor: "orange",
        borderWidth: 4,
        height: 40,
    },
    spellCastingStatButtonsOn: {
        width: 120,
        backgroundColor: "maroon",
        borderColor: "orange",
        borderWidth: 4,
        height: 40,
    },
    newSpellToolToggleButtons: {
        backgroundColor: "maroon",
        height: 40,
        width: 60,
        padding: 4,
        marginHorizontal: 6,
        borderRadius: 8,
        borderWidth: 3,
        borderColor: "orange",
        alignSelf: "center",
    },
    saveTypeToggleON: {
        width: 55,
        backgroundColor: "maroon",
        height: 40,
        borderColor: "orange",
        borderWidth: 3,
    },
    saveTypeToggleOff: {
        width: 55,
        backgroundColor: "grey",
        height: 40,
        borderColor: "orange",
        borderWidth: 3,
    },
    saveStatLable: {
        textAlign: "center",
        color: "white",
        fontSize: 12,
        marginTop: 8
    },
    damageDiceEntry: {
        fontSize: 22,
        borderStyle: "solid",
        borderWidth: 3,
        borderColor: "white",
        width: 58,
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
        width: 190,
    },
    dropDownContainer: {
        backgroundColor: "teal",
        borderColor: "white",
        borderWidth: 2,
    },
})