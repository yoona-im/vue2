let oldArrayProto = Array.prototype;
// 将 oldArrayProto 变成为 arrayMethods 的原型, 而 arrayMethods 是 index 里面数组的原型, 相当于真正的原型往后推了一层, 第一层的原型只有重写的7个方法
export let arrayMethods = Object.create(oldArrayProto);
console.log(arrayMethods);
let methods = ["push", "pop", "shift", "unshift", "reverse", "sort", "splice"];
methods.forEach((method) => {
  arrayMethods[method] = function () {
    console.log("重写了" + method);
    console.log(oldArrayProto[method]);
    return oldArrayProto[method];
  };
});
