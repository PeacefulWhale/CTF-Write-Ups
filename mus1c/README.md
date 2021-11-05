# mus1c + 1_wanna_b3_a_r0ck5tar

This one is worth 300 points, 100 more than the Pitter, Patter, Platters one. It also has a 36% solve rate, so I'm interested in what it is.

We're give a .txt file with some lyrics, and 1 hint: `Do you think you can master rockstar?`

I've included the lyrics themselves in this folder because they're small.

My first though is that this is some sort of evil lyrical programming language. Words like `put X into Y` seems like putting something on a stack, and `shout it` seems like popping something from a stack... Though trying to interpret this might be a headache (I know assembly, but I will probably interpret key words wrong). Let's see if this is an official language. 

Googling `rockstar programming language` takes us to https://codewithrockstar.com/online

Inputting our lyrics into this online interpreter gives us a string of numbers, specifically `114 114 114 111 99 107 110 114 110 48 49 49 51 114`

If I had to guess, this is some sort of flag, because what are the odds that unrelated song lyrics would compile in this online interpreter? Let's use https://cryptii.com to convert these numbers to text. (I could use C or python, but tbh this is much quicker). 

And low and behold, we get `rrrocknrn0113r`. Entering it as `picoCTF{rrrocknrn0113r}` is correct!

I was wondering why the link for the rockstar online was purple, it's because theres a second challenge for this that I've already done! Let's see if I can do a super quick right up for this one.

The second lyrics has some lines that leads me to believe that I need to input something specific here. The first lines that make me believe this are:
```
Music is a billboard-burning razzmatazz!
Listen to the music             
If the music is a guitar
```

If I had to guess we have to enter in some values that will make music equal to guitar. Earlier it said `A guitar is a six-string`. Reading the documentation on this we find a section on `Poetic Number Literals`. Following the logic laid out in this, `six-string` is equal to `136`. However I can't get input working on the webpage... These lyrics can be easily read though, the general function is this (if we get past the if checks)

I was really tempted to make a python program for this, but I realized I could just delete the checks from the lyrics and get it to just print the output of different variables... He he he... I've matched them up with the variables below though, if you want to try to figure it out yourself.

```
Tommy = 66
Music = 79
Jamming = 78
Tommy = 74
They = 79
Rock = 86
Tommy = 73
```
Again, integer to character gives us: `BONJOVI`, and entering `picoCTF{BONJOVI}` is the correct flag! Though I've already done this one, so I don't get any more points...

Neither of these were worth as many points as they gave me, however I think it's because these are a part of the "General Skills" section, which gives you a lot of points by the looks of it. 