# Operation Orchid

We're given a large disk image and told to find a flag. Pulling the strings and searching through it doesn't reveal anything incredibly interesting (no simple `picoCTF` flag in plain text for us).

Following my same strategy from `Pitter, Patter, Platters` I'll load up the disk image and see what I can find. Using `blkid` we can see that this is a `dos` filesystem? It appears we can't mount that without first finding where the actual partition beings. With the command `fdisk -l` we can find the start and end of the sectors.

We find the following information:

```txt
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes

Start   End     Sectors Size    Id  Type
2048    206847  204800  100M    83  Linu
206848  411647  204800  100M    82  Linu
411648  819199  407552  199M    83  Linu
```

One can also use `sfdisk -d` to get the start and size values without the extra information.

Let's get all of these mounted with the following commands:

0. `mkdir ./test`: Make a directory for all of these.
1. `sudo mount -o loop,offset=1048576,sizelimit=104857600 ./disk.flag.img ./test`: Mount the first section.
2. `sudo mount -o loop,offset=105906176,sizelimit=104857600 ./disk.flag.img ./test`: Try to mount the second section...
3. `sudo mount -o loop,offset=210763776,sizelimit=208666624 ./disk.flag.img ./test`: Mount the last section.

We can't really mount the second one, because it appears to be a swap partition. Something tells me that we'll have to check it, but we can do that later. Let's investigate the partition first.

Going into the root directory we find something called `flag.txt.enc`, which appears to be our salted flag... The hex value of it is: `53616c7465645f5f4fefa48ac6004f657acf32173e409f16bdf9a85353671d6b072872a25d7d977d159d668e12177afac8a437f92014b3cbf1d88e2401c42725`.

In plain text we see: `Salted__O` and then a bunch of gibberish. If I had to guess this `.enc` file has been encrypted with a key. Good news is when I dumped the text of the image I found a fair few private and public keys. Let's see if any of them were used to encrypt this file shall we?

However there were a lot of keys... So if I need to I'll come back to it later.

If I had to guess it's base64 encoded, and encrypted with the key with openSSL, just because this string: `openssl enc'd data with salted password, base64 encoded` kept appearing in the dump.

The base64 of the encrpyted (hopefully flag) is:

```txt
U2FsdGVkX19P76SKxgBPZXrPMhc+QJ8WvfmoU1NnHWsHKHKiXX2XfRWdZo4SF3r6yKQ3+SAUs8vx2I4kAcQnJQ==
```

There is a single RSA key, however I very much doubt that this is encrypted with the private RSA key because it's salted.

However there is something else in this directory (why don't I always just do `ls -la`). A file called `.ash_history`.

```txt
touch flag.txt
nano flag.txt 
apk get nano
apk --help
apk add nano
nano flag.txt 
openssl
openssl aes256 -salt -in flag.txt -out flag.txt.enc -k unbreakablepassword1234567
shred -u flag.txt
ls -al
halt
```

Why would you look at that... Look at what we have found!

Let's decrypt it with `openssl aes256 -d -in ./flag.txt.enc -out ./flag.txt -k unbreakablepassword1234567`

And with that we get the flag: `picoCTF{h4un71ng_p457_5113beab}`

I spent a little bit too much time looking extra files and the keys... If only I had done `ls -la` instead of just `ls`.
