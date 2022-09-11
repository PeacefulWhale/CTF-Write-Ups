# NSA Backdoor

Hint: `Look for Mr. Wong's whitepaper... His work has helped so many cats!`

I'm assuming that the paper referred to by the hint is `https://eprint.iacr.org/2016/644.pdf`.

To start this challenge I loaded up the `gen.py` and a fake flag file with the contents `fakeflag` so I could test my understanding of this exploit.

The python file conveniently has a debug option for us that provides some information. I changed the printed output from utilizing hexadecimal to decimal because I am lazy, and cannot convert hexadecimal numbers to decimal in my head.

The first thing we should do is determine what method this program is utilizing in an attempt to allow for a backdoor. I doubt that the python module `gmpy2` is what has been exploited (at least by whoever made this challenge). Instead I assume that the method utilized to generate the numbers (namely `n`) has been designed in such a manner to allow for a backdoor.

Based off the function called `get_smooth_prime()`, and the many small prime factors of `p - 1`, I believe that the "backdoor" method utilized by `gen.py` is as follows: `fixing a prime modulus p such that p − 1 is B-smooth with B small enough for discrete logarithms in bases of order B to be possible`. In the paper, the Pohlig-Hellman algorithm is mentioned as being able to do this. We can also confirm this by checking the factors of our p - 1 and q - 1, and as there are a lot of them (also visible from `gen.py`) we know we're working with this "backdoor".

So it's time to read a whole lot of math...

First thing's first, this is *not* an RSA encryption! My brain, being incredibly smooth, didn't notice the `pow(3, FLAG, n)`. If this was RSA, it would be `c = pow(FLAG, 3, n)`. So we're solving discrete logs instead of roots.

As I am very lazy, if we grab our `p` and `q` with Polard's P - 1 algorithm, we can also use Sympy's `discrete_log` function because it uses the Pohlig-Hellman algorithm.

I was just *slightly* confused about what `order` was in this situation, but I was able to google it and grab the correct value. Group theory stuff is beyond me currently ;_;

Anyway I was able to get the flag by utilizing a lot of code that I didn't write in the `sympy` and `primefac` libraries.

Maybe I'll come back to this problem later, and implement my own algorithms.

Anyway the flag was: `picoCTF{b3w4r3_0f_c0mp0s1t3_m0dul1_e032a664}`
