test : test.o MurmurHash3_x86_32.o MurmurHash2.o MurmurHash64.o MurmurHash3_x64_128.o
	cc test.o MurmurHash2.o MurmurHash3_x86_32.o MurmurHash64.o MurmurHash3_x64_128.o -o test
	rm *.o

test.o : test.c
	cc -c test.c
MurmurHash3_x86_32.o : MurmurHash3_x86_32.c MurmurHash3_x86_32.h
	cc -c MurmurHash3_x86_32.c
MurmurHash2.o : MurmurHash2.c MurmurHash2.h
	cc -c MurmurHash2.c
MurmurHash64.o : MurmurHash64.c MurmurHash64.h
	cc -c MurmurHash64.c
MurmurHash3_x64_128.o : MurmurHash3_x64_128.c MurmurHash3_x64_128.h
	cc -c MurmurHash3_x64_128.c

clean :
	rm *.o test