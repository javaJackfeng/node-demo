import {a, c} from './foo.mjs';
import * as foo from './ziyue.mjs';

console.log(foo.a); // 10
console.log(foo.b); // 君喻学堂
console.log(foo.default); // [Object Function]

console.log(a); // 10
console.log(c()); // greeting