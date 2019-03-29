#ifndef MURMUR_HASH3_X86_128
#define MURMUR_HASH3_X86_128

#define BIG_CONSTANT(x) (x##LLU)

#include <stdint.h>
uint64_t rotl64 ( uint64_t x, int8_t r );
uint64_t getblock64 ( const uint64_t * p, int i );
uint64_t fmix64 ( uint64_t k );

void MurmurHash3_x64_128 ( const void * key, const int len,
                           const uint32_t seed, void * out );

#endif /* MURMUR_HASH3_X86_128 */