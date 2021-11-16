# Even though I already have found the flag I'm bored and want to make a python program to brute force the number
# I could write my own methods, but it would just be me reading from wikipedia... Sympy has optimized methods anyway, so we'll use it. 

from operator import mod
from sympy import sieve, isprime
import math
modulus = 4966306421059967
# we could probably start checking primes at around (sqrt(modulus) / 1.5) which roughly 50000000
upper = int(math.sqrt(modulus) * 1.5)
lower = int(math.sqrt(modulus) / 1.5)

if(lower % 2 == 0):
    lower = lower + 1 # we want to start at an odd number!

print("Starting...")
print(f"Lower bound: {lower} | Upper bound: {upper}")

for i in range(lower, upper, 2):
    if (i - 1) % 100000 == 0:
        print(f"On loop {i}")
    if isprime(i):
        p = (modulus / i)
        if isprime(int(p)) and int(p) == p: # isprime only takes integers, so we cast to an integer and see if that is equivalent to the float
            print(f"Found primes: {i} and {int(p)}")
            break
print("Finished")

# this takes a little bit to run (less than a minute but still)
# I could probably make a quicker one in C, or by optimizing this, but oh well it worked
# Found primes: 67867967 and 73176001