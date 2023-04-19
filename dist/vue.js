(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  /**
   * 判断数据类型是否为函数
   */
  function isFunction(val) {
    return typeof val === "function";
  }

  /**
   * 判断数据是否是不为 null 的 data
   */
  function isObject(val) {
    //   return val instanceof Object;
    return _typeof(val) === "object";
  }

  /**
   * 判断数据是否是数组
   */
  function isArray(val) {
    return Array.isArray(val);
  }

  var oldArrayProto = Array.prototype;
  // 将 oldArrayProto 变成为 arrayMethods 的原型, 而 arrayMethods 是 index 里面数组的原型, 相当于真正的原型往后推了一层, 第一层的原型只有重写的7个方法
  var arrayMethods = Object.create(oldArrayProto);
  console.log(arrayMethods);
  var methods = ["push", "pop", "shift", "unshift", "reverse", "sort", "splice"];
  methods.forEach(function (method) {
    arrayMethods[method] = function () {
      console.log("重写了" + method);
      console.log(oldArrayProto[method]);
      return oldArrayProto[method];
    };
  });

  function observe(value) {
    if (!isObject(value)) {
      return;
    }
    // 观测 value 对象,实现响应式数据
    return new Observer(value);
  }
  var Observer = /*#__PURE__*/function () {
    // 类的构造函数
    function Observer(value) {
      _classCallCheck(this, Observer);
      // 遍历对象, 使用 Object.defineProperty 重新定义
      if (isArray(value)) {
        value.__proto__ = arrayMethods;
      } else {
        this.walk(value);
      }
    }
    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        Object.keys(data).forEach(function (key) {
          defineReactive(data, key, data[key]);
        });
      }
    }]);
    return Observer;
  }();
  function defineReactive(obj, key, value) {
    // 递归劫持深层数据
    observe(value);
    Object.defineProperty(obj, key, {
      get: function get() {
        return value;
      },
      set: function set(newVal) {
        if (newVal === val) return;
        value = newVal;
      }
    });
  }

  function initState(vm) {
    // 获取 options: _init 中已经将 options 挂在到了 vm 上
    var opts = vm.$options;
    // 1. data 的初始化
    if (opts.data) {
      initData(vm);
    }
    // 2. props 数据的初始化
    // 3. watch 数据的初始化
    // 4. computed 数据的初始化
  }

  function initData(vm) {
    var data = vm.$options.data;
    //   if (isFunction(data)) {
    //     // 注意这样执行以后, this 指向的是 window
    //     data = data.call(vm);
    //   }

    data = vm._data = isFunction(data) ? data.call(vm) : data;
    //   观测数据
    observe(data);
    for (var key in data) {
      Proxy(vm, key, "_data");
    }
  }
  function Proxy(vm, key, source) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[source][key];
      },
      set: function set(newVal) {
        vm[source][key] = newVal;
      }
    });
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      // this 指向当前的实例
      var vm = this;
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

  function Vue(options) {
    // 执行原型上的 _init 方法
    this._init(options);
  }
  initMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
