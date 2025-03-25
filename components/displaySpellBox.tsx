import {StyleSheet, Text, View} from "react-native";
import {Spell} from "@/assets/classes/spell";
import {Character} from "@/assets/classes/character";
import {useCharacter, useCharacterUpdater} from "@/components/characterUpdater";




export default function DisplaySpellBox(spellLevel :number){
    const character = useCharacter();
    const characterUpdater = useCharacterUpdater();

    function spellLevelToString(spellLevel :number){
        if (spellLevel == 9){ return "9th Level Spell"}
        if (spellLevel == 8){ return "8th Level Spell"}
        if (spellLevel == 7){ return "7th Level Spell"}
        if (spellLevel == 6){ return "6th Level Spell"}
        if (spellLevel == 5){ return "5th Level Spell"}
        if (spellLevel == 4){ return "4th Level Spell"}
        if (spellLevel == 3){ return "3rd Level Spell"}
        if (spellLevel == 2){ return "2nd Level Spell"}
        if (spellLevel == 1){ return "1st Level Spell"}
        return "Cantrip"
    }

    function spellAttackModifierToString(spellCastingStat :string, character :Character):string{
        if (spellCastingStat == "STR"){
            return ("+" + (Math.floor((character.STR - 10) / 2) + character.proficiency))}
        if (spellCastingStat == "DEX"){
            return ("+" + (Math.floor((character.DEX - 10) / 2) + character.proficiency))}
        if (spellCastingStat == "CON"){
            return ("+" + (Math.floor((character.CON - 10) / 2) + character.proficiency))}
        if (spellCastingStat == "INT"){
            return ("+" + (Math.floor((character.INT - 10) / 2) + character.proficiency))}
        if (spellCastingStat == "WIS"){
            return ("+" + (Math.floor((character.WIS - 10) / 2) + character.proficiency))}
        if (spellCastingStat == "CHA"){
            return ("+" + (Math.floor((character.CHA - 10) / 2) + character.proficiency))}
        return "";
    }

    function spellSaveDCToString(spellCastingStat :string, character :Character):string{
        if (spellCastingStat == "STR"){
            return ("" + (8 + Math.floor((character.STR - 10) / 2) + character.proficiency))}
        if (spellCastingStat == "DEX"){
            return ("" + (8 + Math.floor((character.DEX - 10) / 2) + character.proficiency))}
        if (spellCastingStat == "CON"){
            return ("" + (8 + Math.floor((character.CON - 10) / 2) + character.proficiency))}
        if (spellCastingStat == "INT"){
            return ("" + (8 + Math.floor((character.INT - 10) / 2) + character.proficiency))}
        if (spellCastingStat == "WIS"){
            return ("" + (8 + Math.floor((character.WIS - 10) / 2) + character.proficiency))}
        if (spellCastingStat == "CHA"){
            return ("" + (8 + Math.floor((character.CHA - 10) / 2) + character.proficiency))}
        return "";
    }

    function getDamageDiceAsString(damage :[boolean, number, number, number, number, number, number]){
        let diceString = ""
        if (damage[1] > 0){ diceString += " " + damage[1] + "d4";
        if ( damage[2] > 0 || damage[3] > 0 || damage[4] > 0 || damage[5] > 0){diceString += " +"}}
        if (damage[2] > 0){ diceString += " " + damage[2] + "d6";
            if (damage[3] > 0 || damage[4] > 0 || damage[5] > 0){diceString += " +"}}
        if (damage[3] > 0){ diceString += " " + damage[3] + "d8";
            if (damage[4] > 0 || damage[5] > 0){diceString += " +"}}
        if (damage[4] > 0){ diceString += " " + damage[4] + "d10";
            if (damage[5] > 0){diceString += " +"}}
        if (damage[5] > 0){ diceString += " " + damage[5] + "d12"; }
        if (damage[6] > 0){ diceString += " +" + damage[6]; }
        return diceString;
    }

    return(<View>
        {character.spells.map((spell :Spell) => {
            if (spell.spellLevel == spellLevel){

                return (
                    <View style={{
                        backgroundColor: "teal",
                        borderRadius: 10,
                        borderWidth: 4,
                        borderColor: "orange",
                        marginBottom: 10,
                    }}>
                        <Text style={{color: "white", fontSize: 30, textAlign: "center"}}>{spell.name}</Text>
                        <Text style={{color: "white", fontSize: 10, textAlign: "center"}}>{spellLevelToString(spell.spellLevel)}</Text>
                        <View style={{flexDirection: "row", alignSelf: "center"}}>
                            {(spell.verbal || spell.somatic || spell.material[0]) && <View style={{ alignSelf: "center", flex: 0.35}}>
                                <View style={{flexDirection: "row", alignSelf: "center"}}>
                                    {spell.verbal && <Text style={styles.vsmStyle}>V</Text>}
                                    {spell.somatic && <Text style={styles.vsmStyle}>S</Text>}
                                    {spell.material[0] && <Text style={[styles.vsmStyle, {backgroundColor: "maroon"}]}>M</Text>}
                                </View>
                                {spell.material[0] && <Text style={styles.materialComponentsText}>{spell.material[1]}</Text>}
                            </View>}
                            {(spell.concentration || spell.ritual) && <View style={{flexDirection: "row", alignSelf: "center", flex: 0.65}}>
                                {spell.concentration && <Text style={[styles.concentrateRitualStyle, {width: 150}]}>Concentration</Text>}
                                {spell.ritual && <Text style={[styles.concentrateRitualStyle, {width: 90}]}>Ritual</Text>}
                            </View>}
                        </View>
                        <View style={{flexDirection: "row", alignSelf: "center"}}>
                            <Text style={styles.timeDurationRangeTargetText}>Casting Time: {spell.time}</Text>
                            <Text style={styles.timeDurationRangeTargetText}>Spell Duration: {spell.duration}</Text>
                        </View>
                        <View style={{flexDirection: "row", alignSelf: "center", maxWidth: 400}}>
                            <Text style={styles.timeDurationRangeTargetText}>Range: {spell.spellRange}</Text>
                            <Text style={styles.timeDurationRangeTargetText}>Target: {spell.spellTarget}</Text>
                        </View>

                        {spell.isAttack[0] &&
                            <View style={{
                                backgroundColor: "red",
                                borderRadius: 10,
                                borderWidth: 4,
                                borderColor: "orange",
                                width: 250,
                                alignSelf: "center",
                            }}>
                                <Text style={{color: "white", textAlign: "center"}}>Spell Attack: Casting Ability {spell.isAttack[1]}</Text>
                                <Text style={{color: "white", textAlign: "center", fontSize: 20}}>{spellAttackModifierToString(spell.isAttack[1], character)}</Text>
                            </View>}
                        {spell.isSaveDC[0] &&
                            <View style={{
                                backgroundColor: "blue",
                                borderRadius: 10,
                                borderWidth: 4,
                                borderColor: "orange",
                                width: 270,
                                alignSelf: "center",
                            }}>
                                <Text style={{color: "white", textAlign: "center"}}>Saving Throw: Casting Ability {spell.isSaveDC[1]}</Text>
                                <Text style={{color: "white", textAlign: "center", fontSize: 20}}>
                                    DC {spellSaveDCToString(spell.isSaveDC[1], character)} {spell.isSaveDC[2]} Saving Throw</Text>
                            </View>}

                        <View style={{flexDirection: "row", alignSelf: "center"}}>
                            {spell.damage[0] && <Text style={styles.diceDisplay}>{getDamageDiceAsString(spell.damage)}</Text>}
                        </View>

                        <Text style={styles.descriptionText}>{spell.description}</Text>
                    </View>
                )
            }
        })}
    </View>)
}

const styles = StyleSheet.create({
    vsmStyle: {
        backgroundColor: "blue",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "orange",
        height: 40,
        width: 40,
        textAlign: "center",
        color: "white",
        textAlignVertical: "center",
    },
    concentrateRitualStyle: {
        backgroundColor: "green",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "orange",
        height: 60,
        textAlign: "center",
        color: "white",
        textAlignVertical: "center",
        fontSize: 20,
    },
    materialComponentsText: {
        color: "white",
        textAlign: "center",
        alignSelf: "center",
        backgroundColor: "maroon",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "orange",
        width: 128,
    },
    timeDurationRangeTargetText: {
        color: "white",
        textAlign: "center",
        textAlignVertical: "center",
        backgroundColor: "grey",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "orange",
        margin: 2,
        padding: 3,
        flex: 0.5,
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