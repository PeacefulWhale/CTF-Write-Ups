// I've renamed the variables into a way that I think makes a little bit more sense, it looks way nicer at least XD
// Also I don't really understand javaScript...
// But here's what I've got
// Upon pressing the button, the function loops through the stringArray, and rearranges it until the condition (the really long addition thing) is met. Then it checks the character, using the stringArray to access functions from the server.
// I could probably break it down further, but the fact that it's using functions from the server means that eve if I did, I think I would still hit a wall. Instead I'm going to figure out if there's another avenue that I can take. Perhaps brute forcing the flag if this checks it one character at a time or something like that? Or maybe I can figure out a way to access the server side stuff.

// Did I mention that javaScript is weird?

// also this was the default format that the formatter used, I don't like it, and I apologize for it.

const stringArray = [
  "instance",
  "93703gBAUAn",
  "442816lLbold",
  "instantiate",
  "1ZFMVDM",
  "381193zsgNYQ",
  "check_flag",
  "result",
  "length",
  "48829pZIrMh",
  "648920pjyJsd",
  "copy_char",
  "21760lQoqpJ",
  "arrayBuffer",
  "1zBwHgR",
  "innerHTML",
  "615706OhnLTV",
  "Correct!",
  "getElementById",
  "./ZoRd23o0wd", // this is the binary file that it's using! Easy to download!
  "charCodeAt",
];
const firstFunction = function (firstIndex, unusedVar) {
  firstIndex = firstIndex - 0xac;
  let stringArray3e = stringArray[firstIndex];
  return stringArray3e;
};

(function (funcInputA, funcInputB) {
  const funcFunc = firstFunction;
  while (!![]) {
    // WTF javaScript? What does !![] do? What does it mean? Is this a while(true) loop?
    try {
      const funcInt =
        parseInt(funcFunc(0xb7)) +
        parseInt(funcFunc(0xb0)) +
        -parseInt(funcFunc(0xc0)) * parseInt(funcFunc(0xbd)) +
        -parseInt(funcFunc(0xac)) +
        -parseInt(funcFunc(0xb3)) +
        parseInt(funcFunc(0xb5)) * parseInt(funcFunc(0xb1)) +
        -parseInt(funcFunc(0xbe)); // ok this might take me a little bit to work out...

      // funcInt must be equal to 373983
      // FuncInputB is 373983
      if (funcInt === funcInputB) {
        console.log("FuncInt: ", funcInt, "FuncInputB: ", funcInputB);
        /* This is the array when this is called:
        funcInputA: Array (21)
        0 "381193zsgNYQ"
        1 "check_flag"
        2 "result"
        3 "length"
        4 "48829pZIrMh"
        5 "648920pjyJsd"
        6 "copy_char"
        7 "21760lQoqpJ"
        8 "arrayBuffer"
        9 "1zBwHgR"
        10 "innerHTML"
        11 "615706OhnLTV"
        12 "Correct!"
        13 "getElementById"
        14 "./ZoRd23o0wd"
        15 "charCodeAt"
        16 "instance"
        17 "93703gBAUAn"
        18 "442816lLbold"
        19 "instantiate"
        20 "1ZFMVDM"
        */
        break;
      } else funcInputA["push"](funcInputA["shift"]());
    } catch (errorCode) {
      // It does the pushing thing regardless?
      funcInputA["push"](funcInputA["shift"]());
    }
  }
})(stringArray, 0x5b4df); // I'll have to look into what this end bit is... The return value?
let exports;
(async () => {
  // This whole section here takes the wasm binary and loads it
  const funcFuncTwo = firstFunction;
  let asyncFunc1 = await fetch(funcFuncTwo(0xba)),
    asyncFunc2 = await WebAssembly[funcFuncTwo(0xbf)](
      await asyncFunc1[funcFuncTwo(0xb4)]()
    ),
    asyncFunc3 = asyncFunc2[funcFuncTwo(0xbc)];
  exports = asyncFunc3["exports"];
  // console.log(`firstFunction: ${firstFunction}\n`);
  /*
    function (firstIndex, unusedVar) {
        firstIndex = firstIndex - 0xac;
        let stringArray3e = stringArray[firstIndex];
        return stringArray3e;
    }
  */

  /*
  console.log(`asyncFunc1: ${asyncFunc1}\n`); // object Response
  console.log(`asyncFunc2: ${asyncFunc2}\n`); // object Object
  console.log(`asyncFunc3: ${asyncFunc3}\n`); // WebAssembly.Instance

  console.log(`ff2 0xba: ${funcFuncTwo(0xba)}\n`); // ./ZoRd23o0wd
  console.log(`ff2 0xbf: ${funcFuncTwo(0xbf)}\n`); // instantiate
  console.log(`ff2 0xb4: ${funcFuncTwo(0xb4)}\n`); // arrayBuffer
  console.log(`ff2 0xbc: ${funcFuncTwo(0xbc)}\n`); // instance
  */
  // what we want to do is see if we can call the "check_flag" function from this loaded binary, and possibly use this to get the flag
  // asyncFunc3 should be the assembled binary if I'm reading this correctly
  // let instance = asyncFunc3;
  // let check_flag = instance.exports.check_flag;
  // let copy_char = instance.exports.copy_char;
  // let strcmp = instance.exports.strcmp;

  // let result = check_flag("picoCTF{}");
  // console.log(`result: ${result}`);
  // result: 0
  // ok so we have the flag_checker working, but this would just allow us to pure brute force it, which isn't what we want...
})();

function onButtonPress() {
  console.log("Button Pressed!");
  // this is called when we press our button.
  const funcFuncThree = firstFunction;
  // create a pointer to our function
  let docFunc = document[funcFuncThree(0xb9)]("input")["value"];

  for (let forInt = 0x0; forInt < docFunc[funcFuncThree(0xaf)]; forInt++) {
    // 0xaf = 175
    exports[funcFuncThree(0xb2)](docFunc[funcFuncThree(0xbb)](forInt), forInt);
    console.log(
      `ff3 0xb2: ${[funcFuncThree(0xb2)]} \nff3 0xbb: ${funcFuncThree(
        0xbb
      )} \nforInt: ${forInt}`
    ); //ff3 = funcFuncThree
    // ff3 0xb2: copy_char
    // ff3 0xbb: charCodeAt
    // forInt:   0 to len(input - 1)
  }
  console.log("For Loop Done");

  // Ternary statement that checks if the two export functions are equal to 0x1 (== not ===)
  exports[funcFuncThree(0xb2)](0x0, docFunc[funcFuncThree(0xaf)]),
    exports[funcFuncThree(0xad)]() == 0x1
      ? (document[funcFuncThree(0xb9)](funcFuncThree(0xae))[
          funcFuncThree(0xb6)
        ] = funcFuncThree(0xb8))
      : (document[funcFuncThree(0xb9)](funcFuncThree(0xae))["innerHTML"] =
          "Incorrect!");
  console.log(
    `ff3 0xb2: ${funcFuncThree(0xb2)} In: ${
      (0x0, docFunc[funcFuncThree(0xaf)])
    }\n`
  );
  console.log(`ff3 0xad: ${funcFuncThree(0xad)} \n`); // check_flag

  let isEqual = false;
  exports[funcFuncThree(0xb2)](0x0, docFunc[funcFuncThree(0xaf)]),
    exports[funcFuncThree(0xad)]() == 0x1
      ? (isEqual = true)
      : (isEqual = false);

  if (isEqual) {
    console.log(`Weird ternary statement is true.\n`);
    console.log(
      `Set the big fat document statement to: ${funcFuncThree(0xb8)}`
    );
  } else {
    console.log(`Weird ternary statement is false.\n`);
    console.log(`Set the big fat document statement to: Incorrect!`);
    // console.log(`Would have set the fat doc statement to: ${funcFuncThree(0xb8)}`) // this is equal to "Correct!"
  }
}
