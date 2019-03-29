#ifndef MURMURHASH_64A
#define MURMURHASH_64A
#define BIG_CONSTANT(x) (x##LLU)

#include <stdint.h>
uint64_t MurmurHash64A( const void * key, int len, uint64_t seed );
uint64_t MurmurHash64B ( const void * key, int len, uint64_t seed );

#endif /* MURMURHASH_64A */