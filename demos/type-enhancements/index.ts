
let a: 'Red' | 'Blue' | 'Green';

a = 'Red';
// a = 'Yellow';

let b: 1 | 2 | 3 | 4;

b = 1;
// b = 5;

// tagged unions example

// interface Jedi {
//   usesDarkSide: false;
//   name: string;
//   callYoda();
// }

// interface Sith {
//   usesDarkSide: true;
//   name: string;
//   useForceLightning();
// }

// type ForceStrongCharacter = Jedi | Sith;

// function attack(character: ForceStrongCharacter) {
//   if (character.usesDarkSide === true) {
//     return character.useForceLightning();
//   } else {
//     return character.callYoda();
//   }
// }
