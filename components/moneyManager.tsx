import {Platform, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useState} from "react";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";


export function MoneyManager(itemManagementToolsDisplay: boolean) {
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();
    let [moneyManagerDisplayStatus, setMoneyManagerDisplayStatus] = React.useState<boolean>(false);
    let [goldChangeVariable, setGoldChangeVariable] = useState("");
    let [electrumChangeVariable, setElectrumChangeVariable] = useState("");
    let [silverChangeVariable, setSilverChangeVariable] = useState("");
    let [copperChangeVariable, setCopperChangeVariable] = useState("");

    function currentMoneyString(gold: number = character.gold, electrum: number = character.electrum, silver: number = character.silver, copper: number = character.copper): string {
        let money = "";
        if (gold > 0) {money += (gold + " Gold")}
        if (money != "" && electrum > 0){money += ", "}
        if (electrum > 0) {money += (electrum + " Electrum")}
        if (money != "" && !money.endsWith(", ") && silver > 0){money += ", "}
        if (silver > 0) {money += (silver + " Silver")}
        if (money != "" && !money.endsWith(", ") && copper > 0){money += ", "}
        if (copper > 0) {money += (copper + " Copper")}
        return money;
    }
    function howMuchMyMoneyWeighs(): string{
        let numberOfCoins: number = character.gold + character.electrum + character.silver + character.copper;
        let weight = (numberOfCoins / 50)
        return ("weight of money: " + weight + " lbs")
    }

    function verifyRealNumber(numberString: string): string {
        if (isNaN(parseInt(numberString))) {return "0"}
        if (parseInt(numberString) < 0){return "" + (Math.abs(parseInt(numberString)))}
        if (parseInt(numberString) > 0){return "" + (parseInt(numberString))}
        return "0"
    }


    return(
        <View>{itemManagementToolsDisplay && <View>
            <View style={styles.toolBoxStyle}>
                <Pressable style={styles.toolBoxStyle} onPress={() => {
                    setMoneyManagerDisplayStatus(!moneyManagerDisplayStatus);
                    setGoldChangeVariable("");
                    setElectrumChangeVariable("");
                    setSilverChangeVariable("");
                    setCopperChangeVariable("");
                }}><View>
                    <Text style={{color: "white", textAlign: "center", height: 40, marginTop: 15}}>Money Management</Text>
                </View></Pressable>

                {moneyManagerDisplayStatus && <View>
                    <Text style={{color: "white", textAlign: "center"}}>{currentMoneyString()}</Text>
                    <Text style={{color: "white", textAlign: "center"}}>{howMuchMyMoneyWeighs()}</Text>
                    <View style={{flexDirection: "row"}}>
                        <View style={{flex: 1}}>
                            <Text style={styles.label}>Gold</Text>
                            <TextInput
                                onChangeText={setGoldChangeVariable}
                                keyboardType='numeric'
                                placeholder={"000"}
                                placeholderTextColor={"grey"}
                                style={styles.moneyInputBox}/>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={styles.label}>Electrum</Text>
                            <TextInput
                                onChangeText={setElectrumChangeVariable}
                                keyboardType='numeric'
                                placeholder={"000"}
                                placeholderTextColor={"grey"}
                                style={styles.moneyInputBox}/>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={styles.label}>Silver</Text>
                            <TextInput
                                onChangeText={setSilverChangeVariable}
                                keyboardType='numeric'
                                placeholder={"000"}
                                placeholderTextColor={"grey"}
                                style={styles.moneyInputBox}/>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={styles.label}>Copper</Text>
                            <TextInput
                                onChangeText={setCopperChangeVariable}
                                keyboardType='numeric'
                                placeholder={"000"}
                                placeholderTextColor={"grey"}
                                style={styles.moneyInputBox}/>
                        </View>
                    </View>

                    <View style={{flexDirection: "row", alignSelf: "center"}}>
                        <Pressable
                            style={[styles.toolBoxButton, {backgroundColor: "green"}]}
                            onPress={() => {
                                goldChangeVariable = verifyRealNumber(goldChangeVariable);
                                electrumChangeVariable = verifyRealNumber(electrumChangeVariable);
                                silverChangeVariable = verifyRealNumber(silverChangeVariable);
                                copperChangeVariable = verifyRealNumber(copperChangeVariable);

                                characterUpdater({
                                    type: "updateMoney",
                                    gainOrPay: true,
                                    gold: parseInt(goldChangeVariable),
                                    electrum: parseInt(electrumChangeVariable),
                                    silver: parseInt(silverChangeVariable),
                                    copper: parseInt(copperChangeVariable)})
                            }}>
                            <Text style={styles.label}>Gain </Text>
                        </Pressable>
                        <Pressable
                            style={styles.toolBoxButton}
                            onPress={() => {
                                goldChangeVariable = verifyRealNumber(goldChangeVariable);
                                electrumChangeVariable = verifyRealNumber(electrumChangeVariable);
                                silverChangeVariable = verifyRealNumber(silverChangeVariable);
                                copperChangeVariable = verifyRealNumber(copperChangeVariable);
                                characterUpdater({
                                    type: "updateMoney",
                                    gainOrPay: false,
                                    gold: parseInt(goldChangeVariable),
                                    electrum: parseInt(electrumChangeVariable),
                                    silver: parseInt(silverChangeVariable),
                                    copper: parseInt(copperChangeVariable)})
                            }}>
                            <Text style={styles.label}>Pay</Text>
                        </Pressable>
                    </View>
                    <Pressable
                        style={[
                            styles.toolBoxButton, {
                                backgroundColor: "blue",
                                width: 310,
                                marginTop: 0,
                            }]}
                        onPress={() => {characterUpdater({type: "magicalMoneyExchange"})}}>
                        <Text style={styles.label}>Too Much Copper?</Text>
                        <Text style={styles.label}>Visit The</Text>
                        <Text style={styles.label}>Magical Money Exchange!</Text>
                    </Pressable>
                </View>}
            </View>
        </View>}</View>
    )
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
    moneyInputBox: {
        fontSize: 22,
        borderStyle: "solid",
        borderWidth: 3,
        borderColor: "white",
        height: 60,
        width: Platform.OS === "web" ? 120 : 80,
        alignSelf: "center",
        color: "white",
        textAlign: "center"
    },
    toolBoxButton: {
        backgroundColor: "maroon",
        alignSelf: "center",
        padding: 13,
        borderRadius: 30,
        width: 150,
        marginVertical: 15,
        marginHorizontal: 5,
    },
});