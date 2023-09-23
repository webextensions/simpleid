let getRandomValues;
if (typeof crypto === 'undefined') {
    getRandomValues = require('node:crypto').getRandomValues;
} else {
    getRandomValues = crypto.getRandomValues;
}

const pullAll = function (array, valuesToDelete) {
    const valuesToDeleteSet = new Set(valuesToDelete);
    const output = [];
    for (const item of array) {
        if (!valuesToDeleteSet.has(item)) {
            output.push(item);
        }
    }
    return output;
};

const keyboardMap = {
    '0': { left: '9',  right: null },
    '1': { left: null, right: '2'  },
    '2': { left: '1',  right: '3'  },
    '3': { left: '2',  right: '4'  },
    '4': { left: '3',  right: '5'  },
    '5': { left: '4',  right: '6'  },
    '6': { left: '5',  right: '7'  },
    '7': { left: '6',  right: '8'  },
    '8': { left: '7',  right: '9'  },
    '9': { left: '8',  right: '0'  },

    'a': { left: null, right: 's'  },
    'b': { left: 'v',  right: 'n'  },
    'c': { left: 'x',  right: 'v'  },
    'd': { left: 's',  right: 'f'  },
    'e': { left: 'w',  right: 'r'  },
    'f': { left: 'd',  right: 'g'  },
    'g': { left: 'f',  right: 'h'  },
    'h': { left: 'g',  right: 'j'  },
    'i': { left: 'u',  right: 'o'  },
    'j': { left: 'h',  right: 'k'  },
    'k': { left: 'j',  right: 'l'  },
    'l': { left: 'k',  right: null },
    'm': { left: 'n',  right: null },
    'n': { left: 'b',  right: 'm'  },
    'o': { left: 'i',  right: 'p'  },
    'p': { left: 'o',  right: null },
    'q': { left: null, right: 'w'  },
    'r': { left: 'e',  right: 't'  },
    's': { left: 'a',  right: 'd'  },
    't': { left: 'r',  right: 'y'  },
    'u': { left: 'y',  right: 'i'  },
    'v': { left: 'c',  right: 'b'  },
    'w': { left: 'q',  right: 'e'  },
    'x': { left: 'z',  right: 'c'  },
    'y': { left: 't',  right: 'u'  },
    'z': { left: null, right: 'x'  }
};

const allCharacters = Object.keys(keyboardMap);

const digits = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9'
];

const vowelsOrVowelLike = [
    'a',
    'e',
    'i',
    'o',
    'u',
    'y'
];

const potentialTypoCharacters = [
    '0', 'o',
    '1', 'l', 'i'
];

let allowedNonFirstCharacters = structuredClone(allCharacters);
allowedNonFirstCharacters = pullAll(allowedNonFirstCharacters, vowelsOrVowelLike);
allowedNonFirstCharacters = pullAll(allowedNonFirstCharacters, potentialTypoCharacters);

let allowedFirstCharacters = structuredClone(allowedNonFirstCharacters);
allowedFirstCharacters = pullAll(allowedFirstCharacters, digits);

// https://stackoverflow.com/questions/18230217/javascript-generate-a-random-number-within-a-range-using-crypto-getrandomvalues/42321673#42321673
function getRandomIntInclusive(min, max) {
    const randomBuffer = new Uint32Array(1);

    getRandomValues(randomBuffer);

    const randomNumber = randomBuffer[0] / (0xffffffff + 1);

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(randomNumber * (max - min + 1)) + min;
}

const hyphenateId = function (id) {
    if (typeof id !== 'string') {
        return id;
    }
    const arr = id.split('');
    let output = '';
    for (let i = 0; i < arr.length; i++) {
        if (i > 0 && i % 4 === 0) {
            output += '-';
        }
        output += arr[i];
    }
    return output;
};

const unhyphenateId = function (id) {
    const output = id.replace(/-/g, '');
    return output;
};

const generateRandomString = function (charCount) {
    let str = '';
    let lastInsertedCharacter = '';
    for (let i = 0; i < charCount; i++) {
        let useFromCharacters;
        if (i === 0) {
            useFromCharacters = structuredClone(allowedFirstCharacters);
        } else {
            useFromCharacters = structuredClone(allowedNonFirstCharacters);
        }

        if (lastInsertedCharacter) { // Effectively, same as `if (i > 0) {`
            const charactersToPull = [];

            charactersToPull.push(lastInsertedCharacter);

            const lastKeyFromMap = keyboardMap[lastInsertedCharacter];
            if (lastKeyFromMap.left) {
                charactersToPull.push(lastKeyFromMap.left);
            }
            if (lastKeyFromMap.right) {
                charactersToPull.push(lastKeyFromMap.right);
            }

            useFromCharacters = pullAll(useFromCharacters, charactersToPull);
        }

        // if (i > 0 && i % 4 === 0) {
        //     str += '-';
        // }

        const index = getRandomIntInclusive(0, useFromCharacters.length - 1);

        str += useFromCharacters[index];
        lastInsertedCharacter = useFromCharacters[index];
    }
    return str;
};

const simpleid = function (charCount = 12) {
    const id = generateRandomString(charCount);
    const hyphenatedId = hyphenateId(id);
    return hyphenatedId;
};

const simpleidLowerCase = simpleid;

const simpleidUpperCase = function (...args) {
    const id = simpleid(...args);
    const upperCaseId = id.toUpperCase();
    return upperCaseId;
};

module.exports = {
    simpleid,
    simpleidLowerCase,
    simpleidUpperCase,
    hyphenateId,
    unhyphenateId
};
