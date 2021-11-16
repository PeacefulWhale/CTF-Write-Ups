# Forky CTF

We are given a file `vuln` and the following hints:

```text
In this program, identify the last integer value that is passed as parameter to the function doNothing()
What happens when you fork? The flag is picoCTF{IntegerYouFound}. For example, if you found that the last integer passed was 1234, the flag would be picoCTF{1234}
```

Looking at the binary we find that this is an ELF file and while it is likely possible to figure out what to do with it by debugging it with `gbd` I feel like it may be possible to do with `ghidra` so we'll try that first.;E

Opening it up and running the auto analysis on it we can find that this isn't that large of a file, and it doesn't appear that they're attempting to obfuscate it. `doNothing` simply returns its input. What is more difficult is what exactly we're feeding it.

Here is the decompiled code:

```C
undefined4 main(void) {
    int *piVar1;

    piVar1 = (int *)mmap((void *)0x0,4,3,0x21,-1,0);
    *piVar1 = 1000000000;
    fork();
    fork();
    fork();
    fork();
    *piVar1 = *piVar1 + 0x499602d2; // piVar + 1234567890
    doNothing(*piVar1);             // just returns *piVar1
    return 0;
}
```

`fork` is a weird function... it is declared as `__pid_t fork(void)` and its entire code is available below:

```C
__pid_t fork(void) {
    /* WARNING: Bad instruction - Truncating control flow here */
    /* fork@@GLIBC_2.0 */
    halt_baddata();
}
```

The only reference to fork is the below:

```C
__pid_t fork(void) {
    __pid_t _Var1;
    
    _Var1 = fork();
    return _Var1;
}
```

Long story short I don't have much clue what this is doing... I tried `picoCTF{2234567890}` and found that it isn't the flag (wouldn't that have been funny if I spent a long time working on this only for that to be the flag).

My guess is that this is forking and creating a new thread.

To see if we can cheese this let's try to debug this with `gdb`. It turns out that this is a 32 bit elf file and it rudely says `Requesting program interpreter: /lib/ld-linux.so.2`. So we shall give it that interpreter I guess.

Using the command `sudo apt install libc6-dev-i386` will let us download the required libraries. This takes a whopping ~500mb ;__;

It's not *that* big but still, that's one of the largest `sudo apt install`s I've done XD

After we do this we can open up our file with `gdb` and set a breakpoint at `main`. After running (so our `sharedlibrary` is loaded) we can set breakpoints at `fork` and `doNothing`.

If we do this, and use `backtrace` we can see what `doNothing` and `main` have in them.

`doNothing` has `0x56555553` which is 41704.

`main` has `0x565555e8` which is 3088106627.

Neither of these is the flag. I think that this is because gdb isn't going to the last child, but rather the parent? It is possible that the parent isn't adding up the children either.

Looking back at the assembly, and what the library call is doing I am 90% sure that these are recursive calls to create forks of the executable. The question is how exactly do these forks function. Assuming that they're normal forks they'll have access to the memory of the piVar, and they'll be "started" at the point where `fork` was called. I'm not sure how exactly to debug these children process. Using `set follow-fork-mode child` to (supposedly) follow the children still gets us the number `41704`... I think my brain is smooth but oh well.

Now that I believe I know what fork is doing, let's see if I can reverse the code. I want to just do 4! = 24, but that's not how forks work (I don't think so at least).

```text
PARENT
   |
FORK 1 - FORK 2 - FORK 3 ----- FORK 4 - ADD
   |        |        |            |
   |        |     FORK 4 - ADD   ADD
   |        |        |
   |        |       ADD
   |     FORK 3 ------- FORK 4 - ADD
   |        |              |
   |     FORK 4 - ADD     ADD
   |        |
   |       ADD
FORK 2 - FORK 3 ----- FORK 4 - ADD
   |        |            |
   |     FORK 4 - ADD   ADD
   |        |
   |       ADD
FORK 3 ------- FORK 4 - ADD
   |              |
FORK 4 - ADD     ADD
   |
  ADD
```

When we work backwards from the `FORK 4`s (or just count all the `ADD`s) we can find the following:

```text
FORK 4: 2x  ADD
FORK 3: 4x  ADD
FORK 2: 8x  ADD
FORK 1: 16x ADD
```

I also just relieved that I can probably figure this out with something like `ltrace -f`, which would have required less mental counting, but oh well.

So if I have followed the graph properly (and assuming that the forks are created at the current step in the code, which I believe they are) the final number of `add 1234567890` is 16.

So if I am correct in this, then the flag would be `1000000000 + 16(0x499602d2)` or `1000000000 + 16(1234567890)`

`picoCTF{20753086240}` is not the flag however... If I had to guess it's because adding such large numbers together might cause an integer overflow? It is an integer...

Time to create an integer overflow! Also I'm going to do this in C just to make sure that it would follow the same behavior.

And I was right, this is flipping between negative and positive numbers... The last number is `-721750240`, so I'll try `picoCTF{-721750240}`

That was it!

Huzzah!

I liked this one, it was a much easier reverse engineering problem than `Some Assembly Required 4` and worth 2x as many points, so it's a win-win I guess. Though I did find `SMA4` more engaging.
