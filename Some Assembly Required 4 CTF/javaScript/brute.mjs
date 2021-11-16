// This file is used to test our modified binary
// You will have to set up your own node package and stuff if you want to run this!

// run file with: node --experimental-modules --experimental-wasm-modules brute.mjs

import * as binary from './output.wasm';

// ascii() turns the array of integers into an array of characters
// printable ASCII characters = 32 to 126
function ascii(a)
{
    let returnArray = []
    for(const b of a)
    {
        returnArray.push(String.fromCharCode(b));
    }
    return returnArray;
}

console.log("Starting!");
let flag = []; // use an array of integers instead of a string to avoid unwanted behavior!
let index = 0;
mainLoop: // This is just a fancy goto... why do people hate goto functions ;__;
while (true)
{
    for(let i = 32; i <= 126; i++)
    {
        for(let j = 32; j <= 126; j++)
        {
            // we have to copy to our buffer again because check_flag() erases it...
            for(index = 0; index < flag.length; index++)
            {
                binary.copy_char(flag[index], index);
            }
            // index is now equal to flag.length
            // javaScript is weird ;__;

            binary.copy_char(i, index);
            binary.copy_char(j, index + 1);
            binary.reset_count();
            binary.check_flag();
            let count = binary.get_count();
            if(count >= index + 2) // its a match!
            {
                // add our characters to our flag!
                flag.push(i);
                flag.push(j);
                index = index + 2;
                continue mainLoop;
            }
        }
    }
    console.log("No match found ;__;")
    break mainLoop; // give up
}
let flagText = ascii(flag);
// I couldn't get template strings working (I was too lazy to install that package)
// So I just used concat... I'm sorry but if JavaScript had a decent printf I wouldn't have done this!
console.log("Final Flag: ".concat(flagText.join('')));
