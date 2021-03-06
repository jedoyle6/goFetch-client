//The deck is a collection of 52 short strings consisting of three characters.
//The first character refers to suit, and the remaining two characters refer to the value of the card.
export const DECK = [
    's01', 's02', 's03', 's04', 's05', 's06', 's07', 's08', 's09', 's10', 's11', 's12', 's13',
    'h01', 'h02', 'h03', 'h04', 'h05', 'h06', 'h07', 'h08', 'h09', 'h10', 'h11', 'h12', 'h13',
    'd01', 'd02', 'd03', 'd04', 'd05', 'd06', 'd07', 'd08', 'd09', 'd10', 'd11', 'd12', 'd13',
    'c01', 'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'c11', 'c12', 'c13'
];


//shuffle takes an array and returns a randomly rearranged copy
export function shuffle (deck) {
    let array =[...deck]
    let ctr = array.length;
    let temp;
    let index;

    // While there are elements in the array
    while (ctr > 0) {
    // Pick a random index
      index = Math.floor(Math.random() * ctr);
      // Decrease ctr by 1
      ctr--;
      // And swap the last element with it
      temp = array[ctr];
      array[ctr] = array[index];
      array[index] = temp;
    }
    return array;
}


//cardCodeToRequest takes a 3-character card code and returns a string containing a request for the given card
export function cardCodeToRequest (code) {
    const numCode = code.slice(1)
    switch (numCode) {
        case '01': return 'Have you got any aces?';
        case '02': return 'Have you got any twos?';
        case '03': return 'Have you got any threes?';
        case '04': return 'Have you got any fours?';
        case '05': return 'Have you got any fives?';
        case '06': return 'Have you got any sixes?';
        case '07': return 'Have you got any sevens?';
        case '08': return 'Have you got any eights?';
        case '09': return 'Have you got any nines?';
        case '10': return 'Have you got any tens?';
        case '11': return 'Have you got any jacks?';
        case '12': return 'Have you got any queens?';
        case '13': return 'Have you got any kings?';
        default: 
            console.log("Helper function cardCodeToRequest was given an invalid string");
            return "Helper function cardCodeToRequest was given an invalid string";
    }
}


//cardCodeToName takes a 3-character card code and returns a string containing the given plural card name
export function cardCodeToPluralName (code) {
    const numCode = code.slice(1)
    switch (numCode) {
        case '01': return 'aces';
        case '02': return 'twos';
        case '03': return 'threes';
        case '04': return 'fours';
        case '05': return 'fives';
        case '06': return 'sixes';
        case '07': return 'sevens';
        case '08': return 'eights';
        case '09': return 'nines';
        case '10': return 'tens';
        case '11': return 'jacks';
        case '12': return 'queens';
        case '13': return 'kings';
        default: 
            console.log("Helper function cardCodeToPluralName was given an invalid string");
            return "Helper function cardCodeToPluralName was given an invalid string";
    }
}


//cardCodeToName takes a 3-character card code and returns a string containing the given card name
export function cardCodeToName (code) {
    const numCode = code.slice(1)
    switch (numCode) {
        case '01': return 'ace';
        case '02': return 'two';
        case '03': return 'three';
        case '04': return 'four';
        case '05': return 'five';
        case '06': return 'six';
        case '07': return 'seven';
        case '08': return 'eight';
        case '09': return 'nine';
        case '10': return 'ten';
        case '11': return 'jack';
        case '12': return 'queen';
        case '13': return 'king';
        default: 
            console.log("Helper function cardCodeToName was given an invalid string");
            return "Helper function cardCodeToName was given an invalid string";
    }
}


//sortByValue takes an array of card codes and returns a copy arranged by card value
export function sortByValue (array) {
    let hand = [...array]   
    return hand.sort((card1, card2) => card1.slice(1) - card2.slice(1))
}


//handContainsCard returns a boolean if any card in the given hand has a value matching the given card code
export function handContainsCard (code, hand) {
    if (code.length !== 3) throw new Error ('handContainsCard was passed an invalid card code')
    if (hand.length === 0) throw new Error ('handContainsCard was passed an empty hand')
    const found = hand.filter(card => card.includes(code.slice(1)))
    if (found.length > 0) return true;
    return false;
}


//handContainsMatch returns a card code of a 4-card set if four cards in the given hand have the same value
//and returns false otherwise
export function handContainsMatch (hand) {
    let match = false;
    hand.forEach(checkCard => {
        const found = hand.filter(card => card.includes(checkCard.slice(1)))
        if (found.length === 4) match = checkCard
    });
    return match;
}

export function getAvatarByTeamId (teamId) {    
    switch (teamId) {
        case 1: return "./Images/Dogs/TerryTerrier_icon.png"
        case 2: return "./Images/Dogs/BillyBulldog_icon.png"
        case 3: return "./Images/Dogs/PenelopePoodle_icon.png"
        default: return "./Images/Dogs/BillyBulldog_icon.png"
    }
}

export function getPortraitByTeamId (teamId) {
    switch (teamId) {
        case 1: return "./Images/Dogs/TerryTerrier_opponent.png"
        case 2: return "./Images/Dogs/BillyBulldog_opponent.png"
        case 3: return "./Images/Dogs/PenelopePoodle_opponent.png"
        default: return "./Images/Dogs/BillyBulldog_opponent.png"
    }
}

export function getAiName (teamId) {
    switch (teamId) {
        case 1: return 'Terry'
        case 2: return 'Billy'
        case 3: return 'Penelope'
        default: return 'Opponent'
    }
}