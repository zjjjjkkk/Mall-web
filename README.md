## 项目介绍

`mall-admin-web`是一个电商后台管理系统的前端项目，基于Vue+Element实现。主要包括商品管理、订单管理、会员管理、促销管理、运营管理、内容管理、统计报表、财务管理、权限管理、设置等功能。

### 技术选型

| 技术              | 说明                  | 官网                                                         |
| ----------------- | --------------------- | ------------------------------------------------------------ |
| Vue               | 前端框架              | [https://vuejs.org/](https://vuejs.org/)                     |
| Vue-router        | 路由框架              | [https://router.vuejs.org/](https://router.vuejs.org/)       |
| Vuex              | 全局状态管理框架      | [https://vuex.vuejs.org/](https://vuex.vuejs.org/)           |
| Element           | 前端UI框架            | [https://element.eleme.io/](https://element.eleme.io/)       |
| Axios             | 前端HTTP框架          | [https://github.com/axios/axios](https://github.com/axios/axios) |
| v-charts          | 基于Echarts的图表框架 | [https://v-charts.js.org/](https://v-charts.js.org/)         |
| Js-cookie         | cookie管理工具        | [https://github.com/js-cookie/js-cookie](https://github.com/js-cookie/js-cookie) |
| nprogress         | 进度条控件            | [https://github.com/rstacruz/nprogress](https://github.com/rstacruz/nprogress) |
| vue-element-admin | 项目脚手架参考        | [https://github.com/PanJiaChen/vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) |

### 项目结构

``` lua
mall-admin-web -- 项目根目录
├── build -- 项目构建配置目录
│   ├── build.js -- 生产环境构建脚本
│   ├── check-versions.js -- 版本检查脚本
│   ├── logo.png -- 构建输出的logo
│   ├── utils.js -- 构建工具函数
│   ├── vue-loader.conf.js -- Vue加载器配置
│   ├── webpack.base.conf.js -- Webpack基础配置
│   ├── webpack.dev.conf.js -- Webpack开发环境配置
│   └── webpack.prod.conf.js -- Webpack生产环境配置
├── config -- 项目配置目录
│   ├── dev.env.js -- 开发环境变量配置
│   ├── index.js -- 项目主配置文件
│   └── prod.env.js -- 生产环境变量配置
├── src -- 项目源码目录
│   ├── api -- 接口定义目录
│   │   ├── brand.js -- 品牌相关接口
│   │   ├── companyAddress.js -- 公司地址相关接口
│   │   ├── coupon.js -- 优惠券相关接口
│   │   ├── flash.js -- 秒杀活动相关接口
│   │   ├── order.js -- 订单相关接口
│   │   ├── product.js -- 商品相关接口
│   │   ├── returnApply.js -- 退货申请相关接口
│   │   ├── returnReason.js -- 退货原因相关接口
│   │   └── ... -- 其他接口文件
│   ├── assets -- 静态资源目录
│   │   └── images -- 图片资源
│   ├── components -- 通用组件目录
│   │   ├── Breadcrumb -- 面包屑组件
│   │   ├── Hamburger -- 汉堡菜单组件
│   │   ├── ScrollBar -- 滚动条组件
│   │   ├── SvgIcon -- SVG图标组件
│   │   ├── Tinymce -- 富文本编辑器组件
│   │   └── Upload -- 文件上传组件
│   ├── icons -- SVG图标目录
│   │   ├── index.js -- 图标注册入口
│   │   └── svg -- SVG图标文件
│   ├── router -- 路由配置目录
│   │   └── index.js -- 路由配置文件
│   ├── store -- Vuex状态管理目录
│   │   ├── getters.js -- Getter定义
│   │   ├── index.js -- Store入口
│   │   └── modules -- 模块定义
│   ├── styles -- 样式文件目录
│   │   ├── element-ui.scss -- Element UI样式覆盖
│   │   ├── index.scss -- 全局样式入口
│   │   ├── mixin.scss -- 样式混合
│   │   ├── sidebar.scss -- 侧边栏样式
│   │   ├── transition.scss -- 过渡动画样式
│   │   └── variables.scss -- 样式变量
│   ├── utils -- 工具函数目录
│   │   ├── auth.js -- 认证相关工具
│   │   ├── date.js -- 日期处理工具
│   │   ├── index.js -- 工具函数入口
│   │   ├── request.js -- 请求封装
│   │   ├── support.js -- 支持函数
│   │   └── validate.js -- 验证函数
│   └── views -- 页面组件目录
│       ├── 404.vue -- 404页面
│       ├── home -- 首页模块
│       ├── layout -- 布局组件
│       ├── login -- 登录页面
│       ├── oms -- 订单管理模块
│       │   ├── apply -- 退货申请管理
│       │   └── ... -- 其他订单相关页面
│       ├── pms -- 商品管理模块
│       ├── sms -- 营销管理模块
│       └── ums -- 用户管理模块
├── static -- 静态文件目录
│   └── tinymce4.7.5 -- TinyMCE富文本编辑器
├── index.html -- HTML入口文件
├── package.json -- 项目依赖配置
├── package-lock.json -- 依赖版本锁定文件
└── README.md -- 项目说明文档
```

### 主要模块说明

| 模块 | 说明 | 主要功能 |
|------|------|----------|
| oms | 订单管理系统 | 订单列表、订单详情、退货申请处理等 |
| pms | 商品管理系统 | 商品分类、商品信息、品牌管理、库存管理等 |
| sms | 营销管理系统 | 优惠券管理、秒杀活动、广告管理等 |
| ums | 用户管理系统 | 会员管理、权限管理、角色管理等 |

### 快速开始

#### 安装依赖

```bash
npm install
```

#### 开发环境运行

```bash
npm run dev
```

#### 构建生产环境

```bash
npm run build

# 构建并查看构建报告
npm run build --report
```

### 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- IE 11

### 许可证

[MIT](https://opensource.org/licenses/MIT)