import React from "react";
import {StyleSheet, Text, View, Image} from 'react-native';


export type AttributionSectionProps = {
    attributionSectionDisplay: boolean;
}

export default function AttributionSection({attributionSectionDisplay}: AttributionSectionProps) {

    return (
        <View style={styles.toolBoxStyle}>
            {attributionSectionDisplay && <View>
                <View>
                    <Text style={styles.standard}>Thank you, Peter</Text>
                    <Text style={styles.standard}>for being a great Teacher.</Text>
                </View>
                <View>
                    <Text style={styles.standard}>Thank you, Joe</Text>
                    <Text style={styles.standard}>for helping along the way.</Text>
                </View>
                <View style={{marginTop: 15}}>
                    <View style={{flexDirection: "row", alignSelf: "center"}}>
                        <Image
                            source={require('@/assets/images/diceD20.png')}
                            style={styles.favicon}
                        />
                        <Image
                            source={require('@/assets/images/favicon.png')}
                            style={styles.favicon}
                        />
                        <Image
                            source={require('@/assets/images/diceD20.png')}
                            style={styles.favicon}
                        />
                    </View>
                    <Text style={styles.standard}>Favicon from</Text>
                    <Text style={[styles.standard, {marginTop: 10}]}>https://www.flaticon.com/free-icons/dungeon</Text>
                    <Text style={styles.standard}>Dungeon icons created by Smashicons - Flaticon</Text>
                    <Text style={[styles.standard, {marginTop: 10}]}>https://www.flaticon.com/free-icons/halloween-party</Text>
                    <Text style={styles.standard}>Halloween party icons created by Freepik - Flaticon</Text>
                    <Text style={[styles.standard, {marginTop: 20}]}>Header Images from</Text>
                    <Text style={styles.standard}>https://www.freepik.com/search?author=42814616&format=author&last_filter=author&last_value=42814616</Text>
                    <View style={{alignSelf: "center", marginBottom: 10}}>
                        <Image
                            source={require('@/assets/images/glowingWomanOutlineInForest.jpg')}
                            style={styles.headerAttribution}
                        />
                        <Image
                            source={require('@/assets/images/hatchingTechnoEggInGreenForest.jpg')}
                            style={styles.headerAttribution}
                        />
                        <Image
                            source={require('@/assets/images/manStaringDownRiotInChasm.jpg')}
                            style={styles.headerAttribution}
                        />
                        <Image
                            source={require('@/assets/images/spectralDragonAttackingVillage.jpg')}
                            style={styles.headerAttribution}
                        />
                    </View>
                </View>
            </View>}

        </View>
    )
}

const styles = StyleSheet.create({
    toolBoxStyle: {
        borderRadius: 12,
    },
    standard: {
        color: "white",
        textAlign: "center",
        fontSize: 12,
    },
    favicon: {
        height: 20,
        width: 20,
    },
    headerAttribution: {
        height: 90,
        width: 160,
        marginTop: 10,
    }
})