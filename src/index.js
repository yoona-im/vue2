import { initMixin } from "./init";
function Vue(options) {
  // 执行原型上的 _init 方法
  this._init(options);
}
initMixin(Vue);

export default Vue;
