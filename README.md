# murmurhash-node

Murmur哈希是一种非加密散列函数，适用于一般的基于散列的查找。

本库使用node.js实现murmurhash算法

## 下载

使用npm进行下载

```
npm install murmurhash-node --save
```

## 使用

```javascript
const murmurhash32 = require('murmurhash-node').bit32;

// 实现了murmurhash的v1版本和v2版本，返回值为32位的整数类型
murmurhash32.v2('string'); // 1640947696
murmurhash32.v3('string'); // 2904652459
```

使用种子(seed)来改变返回结果，seed默认为0

```javascript
murmurhash32.v2('string', 0); // 1640947696
murmurhash32.v3('string', 0); // 2904652459

murmurhash32.v2('string', 49); // 405242662
murmurhash32.v3('string', 49); // 842324242
```

支持数字、中文或其他特殊字符

```javascript
murmurhash32.v2(123); // 2461496879
murmurhash32.v2('中国'); // 2187784768
murmurhash32.v2('!@#$%^&*()_+-='); // 1977745461
```

支持使用Buffer类型

```javascript
murmurhash32.v2(Buffer.from('7468697320697320612074c3a97374', 'hex')); // 346350001
murmurhash32.v2(Buffer.from('this is a tést')); // 346350001
murmurhash32.v2('this is a tést'); // 346350001
```

