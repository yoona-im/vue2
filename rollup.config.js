import babel from "rollup-plugin-babel";

// 导出 rollup 的配置对象
export default {
  input: "./src/index.js", // 打包入口
  output: {
    file: "dist/vue.js", // 打包出口， 配置成数组，使用相同的输入项，构建不同的包
    format: "umd", // 打包格式（可选项）：iife（立即执行函数）， esm（es6 模块）， cjs（node 规范）， umd（支持 amd + cjs）
    name: "Vue", // 使用 umd 打包需要指定导出的模块名，Vue 将绑定到 window 上
    sourcemap: true, // 开启 sourcemap 源码映射， 打包时会生成 .map 文件；作用：浏览器调试 es5 代码的时候，可定位到 es6 源码所在行
  },
  plugins: [
    babel({
      // 忽略 node_modules 目录下所有的文件（**： 文件夹下的所有文件）
      exclude: "node_modules/**",
    }),
  ],
};
