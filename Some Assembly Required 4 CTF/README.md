# Some Assembly Required 4

## TL;DR

This was a fun challenge, and I got to practice my assembly skills (though I did essentially have to 'learn' a new language because I've never worked with WebAssembly before). It was also a good refresher on my javaScript skills. 

I solved this by modifying the binary to include a global variable that I could access from a javaScript module that kept track of how many times the input successfully compared to the flag. This allowed me to learn that it checked the flag in groups of 2, and for me to create a brute force program. 

I probably could have reverse engineered (reversed engineer?) this, but if I'm honest that's not as fun (and much more tedious). Even knowing the flag I still don't see how the data in the binary is equivalent (mostly because it has a lot of bitwise operations and those are hard to do in your head). 

8/10 would do again.

I'll probably do the `Some Assembly Required` 1, 2, and 3 later, and it probably would have been better to start out with those XD

## The Long Story / My Transcribed Thoughts of Chaos

I feel like I should probably do 1 - 3 first, but oh well, we'll start with this one.

We're given a webpage at http://mercury.picoctf.net:54609/index.html

Inspecting the webpage source reveals a `.js` file, of which, appears to have been obfuscated very slightly with wacky names. Let's download this and fix all those names and see if we can reverse engineer this!

In the top of a file there's this array of strings: `const _0x2f65 = ['instance', '93703gBAUAn', '442816lLbold', 'instantiate', '1ZFMVDM', '381193zsgNYQ', 'check_flag', 'result', 'length', '48829pZIrMh', '648920pjyJsd', 'copy_char', '21760lQoqpJ', 'arrayBuffer', '1zBwHgR', 'innerHTML', '615706OhnLTV', 'Correct!', 'getElementById', './ZoRd23o0wd', 'charCodeAt'];`. 

Trying to use any of these weird strings as flags doesn't work, so I guess they're used to create a flag? Let's work on reversing this all by firstly renaming all of these functions and variables. 

I also used a `test.js` file to run code snippets in, but it wouldn't make sense to include it here. 

About halfway through reading this I got a decent understanding of what it was doing. Also javaScript is wack. Anyway, it's checking the input against the flag. I believe the flag is somewhere else on the server and we can't access it. Inputting `picoCTF{` and watching the debugger, I saw `copy_char` called for a while until we ran out of our string. There might be a way to utilize this to our advantage. Perhaps by checking how many times `copy_char` was called for our input? This way we could brute force the flag character by character? I don't think that I'm going to be able to find the flag with the weird stuff in the string array. 

Also the Safari javaScript debugging system is pretty cool! Hopefully this will make it much easier. By creating a local override of the file I might be able to get some more information! Like what it's calling the functions with!

Messing with `console.log` statements and the Safari debugger I've determined that this loops through the input and copies the characters somewhere, and then calls `check_flag`. I believe that this `check_flag` call should be my target for now. I'm going to see if I can figure out how this function is being used.

Anyway while trying to do this I found the function that is responsible for checking the flag and have downloaded the binary. It was `./ZoRd23o0wd`. I originally attempted to access this file, but I deleted the `./` so I was unable. Now that I have the binary file lets try to disassemble it and see if we can reverse engineer how the flag is checked!

Attempting to read the binary with Ghidra isn't working due to it being a WASM binary file, and my smooth brain being unsure of what language it was compiled in. Using `wabt` and the command `wasm-objdump -h -d --details <binary file> > output.txt` I was able to get the assembly of this binary. In addition this provided me with some more information, namely that this file format is `wasm 0x1`. In this I found the check_flag section, and a data section that I would assume contains the flag. Either way I am not familiar with WASM in the slightest, so I used `wasm2c <binary file> -o <output directory>` to get C-like syntax. 

Long story short, both the C and ASM formats are very much "computer generated", and I do not really want to try to understand it. It's almost all binary stuff, and poorly named... Attempting to call the `check_flag` function shows that we can get it to respond to our input, however this isn't really that functional as it would just allow us to attempt to brute force the password (which would probably take a while). 

I think at this point what we need to do is modify the original binary to get the segment of it that checks the character in the `check_flag` function. I know that this function does loop, so I assume if I can manipulate this loop segment I might be able to brute force just segments of the flag. I don't believe that I'm going to be able to reverse engineer this, so instead I'm going to see if I can insert a counter into the loop present in the binary file and return the loop counter and whether the flag passed or failed. If I recompile this into a binary file, I should be able to brute force this one character at a time (or more than one, if this is checking multiple characters at the same time before looping again). The only issue with this, is I do not believe that I can easily return multiple variables in a WAT file... So instead I'll return the number of times we looped. We'll know that we've reached the end of the flag when the last round of all possibilities no longer increases the counter.

This was one of the harder parts of this challenge, adding in this counting variable...

Let's head back to our temp directory and work on this.

1. `wasm2wat <binary file> -f --generate-names -o output.wat`: To get the wat file
2. Add the counter to the loop in the check_flag function
3. `wat2wasm output.wat`: Compile the wat file

Here I had to make a `main.mjs` to run the binary file. I choose to install and update `node` and `npm` on a VM to avoid cluttering up my main machine. Which is a good thing because I didn't realize that running npm would clutter the current directory with a bunch of stuff. I'll probably purge this VM after I'm done with it because as I've fumbled around with getting node to run the script, I'm sure I've broken something or created a lot of clutter that I won't want... Thank goodness for Multipass!

The issue currently is I'm unsure if the flag that it is checking for even starts with `picoCTF`, and if it does not, trying to determine if my custom binary file will work is difficult. I've created a test binary file to ensure that my method for creating variables, adding to them, and returning them is correct, so now my question is: have I put it in the correct loop section? Something interesting is that if I put the loop section in the first loop, the count is not increased at all.

It is possible that the function utilizes both variables (maybe checking the half of the flag, and then the other?). Issue is, neither of the values is being incremented... So I am concerned that this flag isn't checking for the standard format, and is instead checking for the content of the flag itself (the messy insides). This would explain why the data segment lacks any `picoCTF{}`... 

I'll add both addition segments back to the output.wat and test to see if any of the printable characters when input into a string cause any changes. If not then I'll slowly increase the size of the string that we input until something changes. If nothing does then I may need to take another approach to this. Having spent more time working with WASM I feel more comfortable with it, but still not enough to attempt to reverse engineer this...

To be honest, I'm going to try to reverse a few characters of this first to get a stepping point on to see if my methods are even working in the binary file. Aaaaannnndd a few lines in and I'm lost. I was trying to use the wasm-decompile to figure out what this looks like and I have to give up because it's doing things that I can't follow... 

Moving the count increment to the start has accomplished something, as it now outputs 2 instead of 0. However it never outputs anything other than 2... So I'm going to think if it is possible that I have not tried every combination. After updating the printable string, nothing has changed... I'm going to take a loot again at the original binary and javascript to try to determine if I'm doing something wrong. Does my string array need to be cast to bytes before I call the function or something like that?

Hmmmmm... What if I were to put this into the strcmp function instead?

HOLD ON

My brain is smooooth. `check_flag` doesn't take a string input... The original Javascript copies the input into it with copy_char I believe... Let's see what happens when we call `copy_char(input)` instead of using `check_flag(input)`. Yes that was it, loading the wasm with `pi` using `copy_char()` worked, and we can see it looped 2x... Which suggests that it is checking the flag in each loop, but because we increment in both loops right now we may still be able to brute force this 1 input at a time? Having checked this the answer is no, it only increments in groups of 2 because checking `pic` still returned 2. Trying `picoCTF{` still returns 2 as well, so it's possible that this isn't in the standard form after all and is in some weird string that just happens to start with `p`. `p` still returns 2. In fact, any character returns 2... so this means that while it is looping through, this is not where the conditional statement is. Does calling `copy_char` overwrite the other characters copied? Do I need to call it with a string or array of integers? Do I need to end it with a null terminator? Does it accept multiple values? Does it work like `copy_char(index, character)`? I'm going to go back to the javaScript function to answer this. `copy_char` does have 2 integers as inputs...  

Having messed around I've found that `copy_char(character, index)` is the correct method for saving characters. Bad news is our increment locations were wrong because the increment count increases with respect to the length of our input and not the content...

Ok so I think I have an idea that might work... The two loops are ran for as much as we input, and having worked with assembly before I'd guess that they're copying the input, and the flag to two strings that it then calls `strcmp` on. If I make my count value a global integer, and increment the count after the check statement in the loop of the `strcmp` I may be able to determine how many characters matched. We will also change our return function of our wasm so that it will return 1 if it really is our flag, and we will get our global count variable with an exported `get_count` function. 

\o/ It worked! Inputting any string that isn't `picoCTF{` will return 1 (because it appears it always loops through at least once), but `picoCTF{` returns 9! To make this just a tiny bit nicer looking I'm putting the increment in the `if true` part of this assembly code so it doesn't increase that first time. Now `picoCTF{` returns 8, and anything that doesn't start like that returns 0. However what is interesting is the count only increments in 2, so `p` returns 0, but `pi` returns 2. It looks like that this checks the flag in groups of 2 characters, which will make brute forcing it a little bit harder, but not by much. 

Time to brute force this bad boy with our `main.mjs`. 

I found that `qh` would return 1 for some reason... With this in mind I made it so the brute force only checked for increments of 2. Maybe `qh` = `p` somehow? It is weird, and it happens every so often with other character combinations too. Another weird thing is that calling `check_flag` erases our current buffer... so we have to copy everything to the buffer again. In addition I gave up my original attempt to save the flag as a string because javaScript is weird with its types, so I just used an array of integers instead. 

Anyway after making this function I had successfully brute forced the flag! Annoyingly it is an odd length flag, which means that the final `}` wasn't brute forced... But at least I got it!

The flag was: `picoCTF{382f73c815f2c599d3af057a4b7ca3e2}`
