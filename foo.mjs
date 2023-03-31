const a = 10;
const b = 'hello';
const c = () => {
  return 'greeting';
};

// export {a, b, c}; // 导出 a、b、c
// export { a: aa}  不能这么导出， 导出的不是对象
// export { a as aa } 导出重命名