# simpleid
Generate simple unique ID strings (simpleid)

## Rules
* A `simpleid` is an alphanumeric code (`-` can be used as a separator)
* A `simpleid` contains 12 key characters (by default)
* Same character won't repeat consecutively
* A character will not be followed by the keys to its left or right on a [QWERTY keyboard](https://en.wikipedia.org/wiki/QWERTY)
* The first character will be an alphabet
* The following characters are not allowed due to potential of typo: `0`, `o`, `1`, `i` and `l`

## Notes
Currently, there are no specific restrictions for:
* String length (default length is 12 characters)
* Case-sensitivity (the implementation should handle different cases as same or different)
* Handling mixed casing (The library generates only lowercase or uppercase strings)
* Versioning for the definition of a valid `simpleid`

# Usage - via Command line

## Install
```sh
$ npm install --global @webextensions/simpleid
```

## Run
```sh
$ simpleid
qn3k-vqtw-rp72
```

```sh
$ simpleid --case upper
P6HK-8NRM-RM6G
```

```sh
$ simpleid --multiple 5
f3hw-cmwb-7m6g
q49j-2tc7-wx8s
kgvj-n4cj-5xs5
wjzb-w6jz-fjv8
qsk4-x59m-pvp4
```

```sh
$ simpleid --help
# Shows the help
```

# Usage - via Code

## General
```js
const { simpleid } = require('@webextensions/simpleid');
const id = simpleid();
console.log(id); // swsk-3c3r-czwt
```

## Advanced
```js
const {
    simpleid,
    simpleidLowerCase,
    simpleidUpperCase,
    hyphenateId,
    unhyphenateId
} = require('@webextensions/simpleid');

const
    id1 = simpleid(),                        // vm6f-85s7-k96p
    id2 = simpleidLowerCase(),               // qxwz-9r7z-rvtp
    id3 = simpleidUpperCase(),               // F4QM-2SMW-2J2C
    withoutHyphen = unhyphenateId(id3),      // F4QM2SMW2J2C
    withHyphen = hyphenateId(withoutHyphen); // F4QM-2SMW-2J2C
```
