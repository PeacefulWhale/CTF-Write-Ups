# John Pollard

We are given a RSA certification file. In the following format:

```text
-----BEGIN CERTIFICATE-----
<Many Characters>
-----END CERTIFICATE-----
```

We are told to give the flag in the format `picoCTF{p,q}`, so it appears that we will have to find the prime factors for this certification.

We can open the `.crt` file with `openssl x509 -in <input> -noout -text` we find the following:

- RSA Format: 53 bit
- Issuer: PicoCTF
- Modulus: 4966306421059967
- Exponent: 65537

We can break this with the online tool `http://factordb.com/` to find that it is the factors of `67867967` and `73176001`, both of which are prime numbers.

Inputting the flag in the format of `picoCTF{7317600167867967}` doesn't work.

Trying `picoCTF{6786796773176001}` doesn't either... Do we need the comma?

Trying again with `picoCTF{67867967,73176001}` doesn't work but `picoCTF{73176001,67867967}` does!

The last format I tried is the one that works... It's like a curse USB almost.

Overall this was pretty simple, and I don't think that it was worth 500 points... Maybe people try to write their own brute forcing algorithms instead of checking a database of primes.

I could probably write my own prime checker, this is just a 53 bit number so it probably wouldn't take that long.

Heck, I'm bored, let's write a python program to do this.

And I am done, I've included the script as `brute.py`. It took me about 5 minutes to write because my brain is smooth and I forgot the sympy syntax.
Overall I enjoyed this but it was definitely easier than `Some Assembly Required 4`, but worth double the points? If I'm honest this makes me feel like I missed a really easy and obvious way of getting the flag from SMA4, or maybe more people know how to read webAssembly than I thought?
