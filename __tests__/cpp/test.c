#include <stdio.h>
#include <string.h>

#include "./MurmurHash2.h"
#include "./MurmurHash3_x86_32.h"
#include "./MurmurHash64.h"
#include "./MurmurHash3_x64_128.h"


int main(int argc, char *argv[])
{
    char str[100];
    str[0]='\0';
    while(str[0]!='\n'){
        fgets(str,100,stdin);

        uint32_t a = MurmurHash2(str,strlen(str)-1,0);
        printf("%u\n",a);

        uint32_t b = MurmurHash3_x86_32(str,strlen(str)-1,0);
        printf("%u\n",b);

        uint64_t c = MurmurHash64A(str,strlen(str)-1,0);
        printf("0x%llx\n",c);
        
        uint64_t d = MurmurHash64B(str,strlen(str)-1,0);

        uint64_t e[2];
        MurmurHash3_x64_128(str,strlen(str)-1,0,e);
        printf("0x%llx%llx\n",e[0],e[1]);
    }
    return 0;
}