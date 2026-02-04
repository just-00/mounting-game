import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcssPxToRem from 'postcss-pxtorem';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // @ 映射到项目根目录的src文件夹
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  assetsInclude: ['**/*.ttf'],
  css: {
    postcss: {
      plugins: [
        postcssPxToRem({
          rootValue: 37.5, // 设计稿375px为基准 → 1rem = 37.5px（设计稿px ÷ 37.5 = rem）
          propList: ['*'], // 匹配所有CSS属性的px，包括自定义属性
          selectorBlackList: [], // 不需要转rem的选择器（空表示全部转换）
          unitPrecision: 5, // rem 保留的小数位数
          replace: true, // 直接替换px为rem，不保留原px
          mediaQuery: false, // 媒体查询中的px是否转换
          minPixelValue: 1, // 小于1px的px不转换
        }),
      ]
    },
    preprocessorOptions: {
      scss: {
        // 自动导入变量文件，注意：末尾必须加 ; 分号
        additionalData: '@import "@/common/varaiable.scss";'
      }
    }
  },
})
