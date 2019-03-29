#ifndef MURMUR_HASH3_X86_32
#define MURMUR_HASH3_X86_32

#include <stdint.h>
uint32_t getblock32 ( const uint32_t * p, int i );
uint32_t rotl32 ( uint32_t x, int8_t r );
uint32_t fmix32 ( uint32_t h );
uint32_t MurmurHash3_x86_32 ( const void * key, int len, uint32_t seed);

#endif /* MURMUR_HASH3_X86_32 */