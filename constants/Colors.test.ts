import {Colors} from "@/constants/Colors";
import {Character} from "@/assets/classes/character";

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