import { arrayMethods } from "./array";
import { isObject, isArray } from "../utils";
export function observe(value) {
  if (!isObject(value)) {
    return;
  }
  // 观测 value 对象,实现响应式数据
  return new Observer(value);
}

class Observer {
  // 类的构造函数
  constructor(value) {
    // 遍历对象, 使用 Object.defineProperty 重新定义
    if (isArray(value)) {
      value.__proto__ = arrayMethods;
    } else {
      this.walk(value);
    }
  }

  walk(data) {
    Object.keys(data).forEach((key) => {
      defineReactive(data, key, data[key]);
    });
  }
}

function defineReactive(obj, key, value) {
  // 递归劫持深层数据
  observe(value);

  Object.defineProperty(obj, key, {
    get() {
      return value;
    },
    set(newVal) {
      if (newVal === val) return;
      value = newVal;
    },
  });
}
