import {Text, View} from 'react-native'
import {useCharacter} from "@/components/characterUpdater";



export default function CharacterNameHeader() {
    const character = useCharacter();

    return (
        <View style={{backgroundColor: 'black'}}>
            <Text style={{color: "white", fontSize: 50, backgroundColor: "tan", textAlign: "center", margin: 15}}>{character.charName}</Text>
        </View>
    )
}