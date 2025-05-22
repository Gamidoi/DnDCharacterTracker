import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {Ability} from "@/assets/classes/ability";


export type perAbilityDisplayResistImmuneProps = {
    ability: Ability;
}

export default function PerAbilityDisplayResistImmune({ability}: perAbilityDisplayResistImmuneProps) {


    function resistanceImmunityDisplayString(listOfResistImmune: string[]){
        let displayString = listOfResistImmune[0];
        for (let i = 1; i < listOfResistImmune.length; i++){
            displayString += ", " + listOfResistImmune[i];
        }
        return <Text style={[
            styles.labels,
            {
                fontSize: 15,
                borderRadius: 7,
                borderWidth: 2,
                borderColor: "orange",
                marginHorizontal: 5,
            }
        ]}>{displayString}</Text>;
    }

    return(<View>
        {(ability.resistance.length + ability.immunity.length > 0 && ability.resistance[0] + ability.immunity[0] != "") && <View style={{
            borderWidth: 2,
            borderColor: "orange",
            borderRadius: 10,
            backgroundColor: "blue",

        }}>
            <Text style={styles.labels}>Grants</Text>
            <View style={{alignSelf: "center", flexDirection: "row", width: 350}}>
                {ability.resistance.length > 0 && <View style={{flex: ability.immunity.length > 0 ? 0.50 : 1}}>
                    <Text style={styles.labels}>Resistance to:</Text>
                    {resistanceImmunityDisplayString(ability.resistance)}
                </View>}
                {ability.immunity.length > 0 && <View style={{flex: ability.resistance.length > 0 ? 0.50 : 1}}>
                    <Text style={styles.labels}>Immunity to:</Text>
                    {resistanceImmunityDisplayString(ability.immunity)}
                </View>}
            </View>
        </View>}</View>
    )}


const styles = StyleSheet.create({
    labels: {
        color: "white",
        textAlign: "center",
        fontSize: 12,
    },
})