# droids0

Details:

```text
Where do droid logs go. Check out this file.
- Try using an emulator or device
- https://developer.android.com/studio
```

I'm guessing that this saves the flag to some logs, specifically how android devices save stuff to their logs. The file is a `.apk` file, which to my knowledge is just a zip file so we should be able to unzip it. Extracting the `.zip` file reveals a bit more files. Let's see if we can find anything interesting.

Using `grep -rnw 'zero.apk' -e 'pico'` we can look for `pico`, however this doesn't reveal anything. If we check `flag` we do see some things. The binary files `zero.apk/res/layout/activity_main.xml` and `zero.apk/classes.dex` have matches. Manually looking through the files we can actually find a lot of `pico` strings, I'm guessing that my grep command was bad. Regardless it appears that there is an app that the APK installs that contains some functions.

The file `activity_main.xml` is interesting. It defines a button that says "I'm a flag" on click, as well as "Need a hint?". The hint is `http://schemas.android.com/apk/res/android` And then a bunch of binary.

The file `classes.dex` has the function `flagToString`, which may be of use to us.

I tried to use an emulator with Virtual Box, but that was really slow. I guess I'll download Android Studio ;_; I'm going to delete it right after because I don't like clutter on my computer. Actually it looks pretty small, I guess I can leave it.

Opening up the project and installing the APK on an emulated device allows us to explore this a little bit further. We find an app called `PicoCTF`. Upon opening it we see a button, with an string input that we can enter stuff into. It asks `Where else can output go? [PICO]`. Entering stuff into the string and hitting the button returns `not today`. Entering `Logs` doesn't work, maybe we need to enter the full path of the logs? Either way, lets see if actually going to the logs of this device reveals anything.

Using `adb logcat > logs.txt` dumps a whole bunch of text into that file... And by searching for `picoCTF{` we find `picoCTF{a.moose.once.bit.my.sister}`... If I'm honest my first assumption is that this is a red herring. Oh well, let's see if it's accepted.

And it was! So that was easier than I feared this was going to be. Ironically the most difficulty I had was figuring out how to get to apps from the device. I actually got to the app from storage settings... I'm still not sure where all the apps are XD

Oh well, 300 points and it wasn't as hard as I feared it was going to be. I also have android studio and adb now for future stuff that may require emulating android software. It was interesting too, though not as difficult as the point value would suggest.
