import { isFunction } from "./utils";
import { observe } from "./observe/index";
export function initState(vm) {
  // 获取 options: _init 中已经将 options 挂在到了 vm 上
  const opts = vm.$options;
  // 1. data 的初始化
  if (opts.data) {
    initData(vm);
  }
  // 2. props 数据的初始化
  // 3. watch 数据的初始化
  // 4. computed 数据的初始化
}
function initData(vm) {
  let data = vm.$options.data;
  //   if (isFunction(data)) {
  //     // 注意这样执行以后, this 指向的是 window
  //     data = data.call(vm);
  //   }

  data = vm._data = isFunction(data) ? data.call(vm) : data;
  //   观测数据
  observe(data);
  for (let key in data) {
    Proxy(vm, key, "_data");
  }
}

function Proxy(vm, key, source) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key];
    },
    set(newVal) {
      vm[source][key] = newVal;
    },
  });
}
