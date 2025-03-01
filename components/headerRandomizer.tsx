import {Image, StyleSheet} from "react-native";
import React from "react";

export default function headerRandomizer(){
    let randomNumber = Math.random() * 4;
    if (randomNumber < 1) {return (
        <Image
            source={require("@/assets/images/glowingWomanOutlineInForest.jpg")}
            style={styles.headImage}/>)}
    if (randomNumber < 2) {return (
        <Image
            source={require("@/assets/images/hatchingTechnoEggInGreenForest.jpg")}
            style={styles.headImage}/>)}
    if (randomNumber < 3) {return (
        <Image
            source={require("@/assets/images/manStaringDownRiotInChasm.jpg")}
            style={styles.headImage}/>)}
    return (
        <Image
            source={require("@/assets/images/spectralDragonAttackingVillage.jpg")}
            style={styles.headImage}/>)}



const styles = StyleSheet.create({
    headImage: {
        height: "100%",
        width: "100%",
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
})