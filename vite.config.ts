import { fileURLToPath, URL } from 'node:url'
import { viteMockServe } from 'vite-plugin-mock'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer';
import { autoComplete, Plugin as importToCDN } from 'vite-plugin-cdn-import';

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  base:'./',//为了打包完图片链接地址不会找不到出错
  plugins: [
    vue(),

    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // 模拟接口调用
    viteMockServe({
      // default
      mockPath: 'mock',
      enable: true,
    }),
    // importToCDN({
    //   modules: [
    //     {
    //       name: 'vue',
    //       var: 'Vue',
    //       path: `https://unpkg.com/vue@3.2.45/dist/vue.global.js`,
           
    //     },
    //     {
    //       name: 'vue-demi',
    //       var: 'VueDemi',
    //       path: `https://unpkg.com/vue-demi@0.13.11`,
    //     },
    //     {
    //       name: 'vue-router',
    //       var: 'VueRouter',
    //       path: `https://unpkg.com/vue-router@4.1.6`,
    //     },
    //     {
    //       name: 'element-plus',
    //       var: 'ElementPlus',
    //       path: 'https://unpkg.com/element-plus@2.3.3/dist/index.full.js',
    //       // css: 'https://unpkg.com/element-plus@2.3.3/dist/index.css'
    //     },
    //   ],
    // }),
    // 可以展示构建时长、chunk 数量及大小
    visualizer() 
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build:{
    minify:'terser',
    terserOptions:{
      compress:{
        // 去除项目的打印语句
        drop_console:true,
        drop_debugger:true
      }
    },
      //rollup打包后的静态资源名称格式
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        },
      },
  }
})
