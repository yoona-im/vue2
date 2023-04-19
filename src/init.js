import { initState } from "./state";
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    // this 指向当前的实例
    const vm = this;
    // 将 Vue 实例化时用户传入的 options 暴露到 vm 实例上
    this.$options = options;
    console.log(this);
    console.log(options);

    // 状态初始化
    initState(vm);

    // 处理渲染数据并挂载到 el 上
    if (vm.$options.el) {
      console.log("有 el, 需要挂载");
    }
  };
}
