import {Text, View, type ViewProps} from 'react-native'
import {useCharacter} from "@/components/characterUpdater";


export type CharacterNameHeader = ViewProps;

export default function CharacterNameHeader() {
    const character = useCharacter();

    return <View style={{backgroundColor: 'black'}}>
        <Text style={{
            color: "white",
            fontSize: 50,
            backgroundColor: "tan",
            textAlign: "center",
            margin: 15}}>{character.charName}</Text>
        {character.concentration != null && <Text style={{
            color: "white",
            fontSize: 20,
            backgroundColor: "brown",
            textAlign: "center",
            marginBottom: 15,
            marginTop: -10
        }}>{character.concentration?.name}</Text>}
    </View>
}