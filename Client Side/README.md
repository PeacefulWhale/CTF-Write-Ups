# Client Side

This one was super easy, I thought that because it was worth 200 points it would be a little bit difficult (I've ran into 100 point problems that have surprised me). But this was just a script that someone had removed all the whitespace from.

Sticking this in `script.js` and hitting `Format Document` in VSCode led to a much more readable script.

The only critical part of this script is the following:

```JS
var _0x5a46 = [
  "37115}",
  "_again_3",
  "this",
  "Password\x20Verified",
  "Incorrect\x20password",
  "getElementById",
  "value",
  "substring",
  "picoCTF{",
  "not_this",
];
```

I didn't even need to reverse engineer the code for this, it's pretty easy to read the values and guess what the password is...

`picoCTF{not_this_again_337115}`

And we're done! On to the next one!
