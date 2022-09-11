import binascii
# I am a terribly lazy person...
from sympy.ntheory import discrete_log
from primefac import pollard_pm1

g = 3
n = 0x76543d739de25275eb43320e91f7af2cf1ddeaaf99ebc3e9647bff356d241e0bbab18af2c48e6c81cf403a0ad3cb76bd106328fd5541e8be194a024997e97b026b85b02b907463bfe0fec5f44043a37eb4614a5da35666fedb088d7bdf32dfa3183c21819dde365c0088a3abd5125fb12542590196ca6edd6f758e7dad66eb2ec3cf42aa36f2b6135c99537ce52e7d59ff33959dc1620197d14d5c75b5b0bc9757391f4e5c40e7d9767fdae6ee7d47cf308c9852c1e0890de0dd8f3c19b7fe72b0908933a6d545083e3e7fdf37d58d423e869a1cc8efd8e3b3744eb191cf5b2c8bc727d9b0811c7a2c7263c4088521794bc10db025814591d24e3c8dbbc090f5
c = 0x451d79b17b4d1c699f35c64f5b2c34251a4d9eb8e199740114a01fcb55ca109a4df5b889567d62d90b21d05919a773307b22ffe55eacb39e4e96530280c8b9c2a3c8ce548425b0d55e10889e3596f7098a39c4223565cb7490ace8d8c7aa87394d4d12c993ed84d5e023204d695fc51a088be158cd7189d239770a7247154b1d3c723c060a6a53042353bb54e4b1cc76b5caea63dc2929e43d0f0f866962523ce2a61415676d819a652da67d069145c489922de338025fb7d014855eb5c170e78200e207ccf7930ae28a226ca82049cf52845e67f5fca83392f5c295c58130c562e5203b5afe1851cf6e799748f60a39308c3f328c41f87ac7db4825b94f52ee

# # Let's grab our p and q
p = pollard_pm1(n)
q = n // p
assert p * q == n, "Primes p and q are not factors of n"

# Hmmm... Sympy's discrete_log already uses the Pohlig-Hellman algorithm... can we just use that?

b = g % n
order = (p - 1) * (q - 1)
solution = discrete_log(n, c, b, order=order//4)
print(hex(solution))
print(binascii.unhexlify(hex(solution)[2:]).decode())
