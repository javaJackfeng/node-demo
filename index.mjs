import {ziyue} from './ziyue.mjs'; // 引入ziyue模块

const argv = process.argv;
console.log(ziyue(argv[2] || '有朋自远方来，不亦乐乎！'));