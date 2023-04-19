/**
 * 判断数据类型是否为函数
 */
export function isFunction(val) {
  return typeof val === "function";
}

/**
 * 判断数据是否是不为 null 的 data
 */
export function isObject(val) {
  //   return val instanceof Object;
  return typeof val === "object";
}

/**
 * 判断数据是否是数组
 */
export function isArray(val) {
  return Array.isArray(val);
}
