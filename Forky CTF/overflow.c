// Yes I am too lazy to do math so I am writing a C code to do it for me, deal with it.
#include <stdio.h>
int main()
{
    int a = 1000000000;
    int b = 0x499602d2;
    for(int i = 0; i < 16; i++)
    {
        a = a + b;
        printf("%d\n", a);
    }
    return 0;
}