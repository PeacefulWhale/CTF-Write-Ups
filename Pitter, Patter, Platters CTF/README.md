# Pitter, Patter, Platters

I choose what appeared to be a medium difficulty forensics challenge from picoCTF.org for my first challenge to attempt to complete and make a write up of. If you're reading this, I succeeded.

Given: A file called `suspicious.dd.sda1`
Hints:

- It may help to analyze this image in multiple ways: as a blob, and as an actual mounted disk.
- Have you heard of slack space? There is a certain set of tools that now come with Ubuntu that I'd recommend for examining that disk space phenomenon...

I have not heard of slack space before, though I assume that it involves hiding something on a drive without telling the system that it's there. Reading this paper: `https://www.giac.org/paper/gsec/3133/introduction-hiding-finding-data-linux/105105` helped me understand what this is, and how it functioned. I find it interesting that one can *have* slack space on a digital disk image. I would have assumed that when creating the image the slack space secret stuff wouldn't be saved, and even if one were to modify it into the disk image, how is that then expanded? I would assume that whatever this image is, it contains code that deletes the reference or wha have you during the set up process. However I don't think this is important to our challenge.

I've loaded this file onto a VM so I can mess around with it a little bit more.

The first thing I always do with these is to see if the flag is in plain text somewhere in the original file. A simple `strings` command saved to an output file will let us check this.

Sadly there is no picoCTF{} flag here... But I do see a file named `suspicious-file.txt` which is, well, *suspicious*. I wonder if we can extract it. Doing regex searches for potential flags like `{...}`, `pico`, or `CTF` did not reveal any more information.

Now lets figure out how to open this. Using `exiftool` on the file reveals that it is indeed a file, but more interesting, the first 1024 bytes of the file are binary zeroes. if I had to guess, that is suspicious. Having read a little bit on what .dd files are (because this was my first time seeing them) they appear to be disk images saved by the DD utility. I don't really want to make a new VM of this, so I will see if I can make a directory of this instead.

I did the following:

1. `mkdir test`: Create a directory to extract to.
2. `mount -o loop <path to suspicious.dd.sda1> <path to test directory>`: Mount the file to the directory
3. `cd test`: Go to the directory
4. `ls -a`: See if we find anything, and what could you imagine, we have.

There is a "suspicious-file.txt" here. Using `cat suspicious-file.txt` shows us that that it says `Nothing to see here! But you may want to look here -->`.
The arrow, I assume, is supposed to be pointing the one of the directories. Of which there are 3: `boot`, `lost+found`, and `tce`. Lets search through these and see if we can find anything.

We have `-bash: cd: lost+found: Permission denied` on trying to cd into `lost+found`, so lets look into `tce`.

`tce` appears to be standard, nothing is sticking out to me accept that possibility that something is hidden in `mydata.tgz`. I will look into this later though, I want to know why we're locked out of `lost+found` even though we're root users...

Anyway, using super user to enter lost+found and looking for files shows that it's empty... Time to look for files in the slack space! I saw two instances of `suspicious-file.txt` in the strings command, which leads me to believe that there may be a second file that I am not finding. Let's use `sleuthkit` to see if we can find where this second sussy (sorry) file is.

We can use sleuth kit to try to search the unallocated space with the following commands:

1. `blkls -s suspicious.dd.sda1 > output.blkls`: Output slack space to a file
2. `strings -t d output.blkls > output.blkls.str`: Output the human readable strings to another file

If we do this we don't see anything in the output string file. However the actual output of blkls had memory in it. Opening it up I immediately saw something *sussy*. The only not `?` text in it was `}?6?f?a?0?9?2?5?f?_?3?<?_?|?L?m?_?1?1?1?t?5?_?3?b?{?F?T?C?o?c?i?p`... Is that a reversed flag with wacky `?` stuffed between characters? Note, I've replaced the wacky characters with `?` because I'm not sure which wacky characters they are, and I have a feeling that Github's markdown render isn't going to appreciate them.

Extracting this in the right order gives us `picoCTF{b3_5t111_mL|_<3_f5290af6}` which is the right flag!

This was a neat little challenge, and I learned some stuff from it! Next time I might output all printable characters, and remove new lines, to search for strings. And maybe check for reversed stuff too...
