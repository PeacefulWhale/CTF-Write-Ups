import time
from pwn import *

# Number of runs to get an "average" time.
totalRuns = 5

# Pin is 8 digits long, and 10 possible digits each.
currentPin = "00000000"

for i in range(0, 8):
    longestTime = 10 # If this takes longer than 10 seconds then I'll have to update this.
    times = []
    for num in range(0, 10):
        currentPin = currentPin[:i] + str(num) + currentPin[i + 1:]
        totalTime = 0
        # Run each check X times to get a better time length.
        for run in range(0, totalRuns):
            checker = process("./pin_checker")
            lineOne = checker.recvline()
            # Please enter your 8-digit PIN code:
            startTime = time.time_ns()
            checker.sendline(currentPin)
            output = checker.recvall()
            totalTime += time.time_ns() - startTime
        times.append(totalTime)
    # Assign the greatest value time as the "correct" pin.
    print(times)
    currentPin = currentPin[:i] + str(times.index(max(times))) + currentPin[i + 1:]
    print(f"Current Pin: {currentPin}")
print(f"FINAL PIN: {currentPin}")
