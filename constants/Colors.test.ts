import {Colors} from "@/constants/Colors";
import {Character} from "@/assets/classes/character";
import {characterDispatch} from "@/components/characterUpdater";
import {Ability} from "@/assets/classes/ability";
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

test("test adding and subtracting resistances.", () => {
    let character = new Character("name namey name", 5, 5)
    character = characterDispatch(character, {type: "updateSpellSlots", spellSlot: 4});
    character = {...character, resistances: ["cold", "fire"],
    abilities: [new Ability("testAbility1", "usesTrigger", "usesQuantityStat" , 3 , "description", "refreshOn", [true, false],
        ["fire", "radiant", "pierce"], ["prone", "exhausted", "poisoned"], [false, 0,0,0,0,0,0,0,0])]};
    character = characterDispatch(character, {type: "addResistanceAndImmunities", abilityName: "testAbility1"});
    expect(character.resistances).toStrictEqual(["cold", "fire", "fire", "radiant", "pierce"]);
    expect(character.immunities).toStrictEqual(["prone", "exhausted", "poisoned"]);
    character = characterDispatch(character, {type: "subtractResistanceAndImmunities", abilityName: "testAbility1"});
    expect(character.resistances).toStrictEqual(["cold", "fire"]);
    expect(character.immunities).toStrictEqual([]);
})

test("test ability use quantity to change on stat change", () => {
    let character = new Character("name namey name", 5, 5)
    character = {...character, resistances: ["cold", "fire"],
    abilities: [new Ability("testAbility2", "usesTrigger", "STR" , 15 , "description", "refreshOn", [true, false],
        ["fire", "radiant", "pierce"], ["prone", "exhausted", "poisoned"], [false, 0,0,0,0,0,0,0,0])]};
    character = characterDispatch(character, {type: "updateSTR", value: 16});
    let ability = character.abilities[0];
    expect(ability.uses).toBe(3);
    character = characterDispatch(character, {type: "updateSTR", value: 8});
    ability = character.abilities[0];
    expect(ability.uses).toBe(1);
    character = characterDispatch(character, {type: "updateSTR", value: 15});
    ability = character.abilities[0];
    expect(ability.uses).toBe(2);
})