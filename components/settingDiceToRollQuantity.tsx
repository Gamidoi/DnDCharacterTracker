import {StyleSheet, Text, TextInput, View} from "react-native";
import React from "react";


export type settingDiceToRollQuantityProps = {
    setd4: ()=>void;
    setd6: ()=>void;
    setd8: ()=>void;
    setd10: ()=>void;
    setd12: ()=>void;
    setd20: ()=>void;
    setd100: ()=>void;
    setBonus: ()=>void;
}

export function SettingDiceToRollQuantity({setd4, setd6, setd8, setd10, setd12, setd20, setd100, setBonus}: settingDiceToRollQuantityProps) {
    return(<View>
        <View style={{flexDirection: "row", alignSelf: "center"}}>
            <View style={{flex: 0.24}}><Text style={styles.label}>D4s</Text>
                <TextInput
                    onChangeText={setd4}
                    placeholder={"0"}
                    keyboardType={"numeric"}
                    maxLength={2}
                    placeholderTextColor={"grey"}
                    style={styles.itemDiceEntry}/>
            </View>
            <View style={{flex: 0.24}}><Text style={styles.label}>D6s</Text>
                <TextInput
                    onChangeText={setd6}
                    placeholder={"0"}
                    keyboardType={"numeric"}
                    maxLength={2}
                    placeholderTextColor={"grey"}
                    style={styles.itemDiceEntry}/>
            </View>
            <View style={{flex: 0.24}}><Text style={styles.label}>D8s</Text>
                <TextInput
                    onChangeText={setd8}
                    placeholder={"0"}
                    keyboardType={"numeric"}
                    maxLength={2}
                    placeholderTextColor={"grey"}
                    style={styles.itemDiceEntry}/>
            </View>
            <View style={{flex: 0.24}}><Text style={styles.label}>D10s</Text>
                <TextInput
                    onChangeText={setd10}
                    placeholder={"0"}
                    keyboardType={"numeric"}
                    maxLength={2}
                    placeholderTextColor={"grey"}
                    style={styles.itemDiceEntry}/>
            </View>
        </View>
        <View style={{flexDirection: "row", alignSelf: "center"}}>
            <View style={{flex: 0.24}}><Text style={styles.label}>D12s</Text>
                <TextInput
                    onChangeText={setd12}
                    placeholder={"0"}
                    keyboardType={"numeric"}
                    maxLength={2}
                    placeholderTextColor={"grey"}
                    style={styles.itemDiceEntry}/>
            </View>
            <View style={{flex: 0.24}}><Text style={styles.label}>D20s</Text>
                <TextInput
                    onChangeText={setd20}
                    placeholder={"0"}
                    keyboardType={"numeric"}
                    maxLength={2}
                    placeholderTextColor={"grey"}
                    style={styles.itemDiceEntry}/>
            </View>
            <View style={{flex: 0.24}}><Text style={styles.label}>D100s</Text>
                <TextInput
                    onChangeText={setd100}
                    placeholder={"0"}
                    keyboardType={"numeric"}
                    maxLength={2}
                    placeholderTextColor={"grey"}
                    style={styles.itemDiceEntry}/>
            </View>
            <View style={{flex: 0.24}}><Text style={styles.label}>bonus</Text>
                <TextInput
                    onChangeText={setBonus}
                    placeholder={"0"}
                    keyboardType={"numeric"}
                    maxLength={2}
                    placeholderTextColor={"grey"}
                    style={styles.itemDiceEntry}/>
            </View>
        </View>
    </View>)
}

const styles = StyleSheet.create({
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
    label: {
        color: "white",
        textAlign: "center",
        fontSize: 12,
    },
});