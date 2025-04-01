import {Colors} from "@/constants/Colors";
import {Character} from "@/assets/classes/character";
import {characterDispatch, useCharacter, useCharacterUpdater} from "@/components/characterUpdater";
jest.mock("@react-native-async-storage/async-storage", () => {return {}})


test('make sure that testDarkTint is white', () => {
    //Arrange

    //Act

    //Assert
    expect(Colors.light.tabIconSelected).toBe('#fff')
})

test('make sure that type of character.charName is string', () => {
    //Arrange
    let character = new Character("default", 5, 5);
    let typeOfCharName = typeof character.charName;

    //Act

    //Assert
    expect(typeOfCharName).toBe('string')
    expect(character.charName).toBe('default');
    expect(typeof character.characterLevel).toBe("number")
})

test("test update spell slots", () => {
    let character = new Character("name namey name", 5, 5)
    character = characterDispatch(character, {type: "updateSpellSlots", spellSlot: 4});
    expect(character.currentUsedSpells).toBe("0000X00000000000000000");
})
/* test("test adding and subtracting resistances.", () => {
    let character = new Character("name namey name", 5, 5)
    character = characterDispatch(character, {type: "updateSpellSlots", spellSlot: 4});
    character = {...character, resistances: ["cold", "fire"]}

}) */