import {StyleSheet, Text, View} from "react-native";
import {Ability} from "@/assets/classes/ability";
import {Character} from "@/assets/classes/character";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";
import PerAbilityDisplayResistImmune from "@/components/perAbilityDisplayResistImmune";



export default function DisplayPassivesOnIndexTab(){
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();


    return (
        <View>
            {character.abilities.map((ability) => {
                if (ability.usesTrigger === "Passive") {
                    return (<View style={styles.abilityBox}>
                        <Text style={styles.abilityName}>{ability.name}</Text>

                        {PerAbilityDisplayResistImmune(ability)}

                        {ability.description != "" && <Text style={styles.descriptionText}>{ability.description}</Text>}
                    </View>)
                }
            })}
        </View>
    )

}


const styles = StyleSheet.create({
    abilityBox: {
        backgroundColor: "teal",
        borderRadius: 10,
        borderWidth: 4,
        borderColor: "orange",
        marginBottom: 10,
    },
    abilityName: {
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
    diceDisplay: {
        color: "white",
        textAlign: "center",
        backgroundColor: "black",
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "orange",
        padding: 5,
        fontSize: 20,
    },
})