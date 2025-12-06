# Mall Admin Web

## 项目概述

`mall-admin-web`是一个基于Vue.js和Element UI开发的电商后台管理系统前端项目，提供了完整的电商后台管理功能。该项目与后端服务配合，实现了商品管理、订单管理、会员管理、促销管理、运营管理、内容管理、统计报表等核心功能，为电商平台提供了高效、易用的管理界面。

## 技术栈

| 技术框架/库        | 版本/说明                  | 官方文档                                                     |
|--------------------|---------------------------|------------------------------------------------------------|
| Vue                | 2.x (前端框架)            | [https://vuejs.org/](https://vuejs.org/)                     |
| Vue Router         | 3.x (路由管理)            | [https://router.vuejs.org/](https://router.vuejs.org/)       |
| Vuex               | 3.x (状态管理)            | [https://vuex.vuejs.org/](https://vuex.vuejs.org/)           |
| Element UI         | 2.x (UI组件库)            | [https://element.eleme.io/](https://element.eleme.io/)       |
| Axios              | HTTP请求库                | [https://github.com/axios/axios](https://github.com/axios/axios) |
| v-charts           | 基于Echarts的图表库        | [https://v-charts.js.org/](https://v-charts.js.org/)         |
| Js-cookie          | Cookie管理工具            | [https://github.com/js-cookie/js-cookie](https://github.com/js-cookie/js-cookie) |
| nprogress          | 页面加载进度条            | [https://github.com/rstacruz/nprogress](https://github.com/rstacruz/nprogress) |
| Webpack            | 4.x (模块打包工具)        | [https://webpack.js.org/](https://webpack.js.org/)           |
| Babel              | ES6+转译工具              | [https://babeljs.io/](https://babeljs.io/)                   |

## 项目结构

```
mall-admin-web/          # 项目根目录
├── build/              # Webpack构建配置目录
│   ├── build.js        # 生产环境构建脚本
│   ├── check-versions.js # 版本检查脚本
│   ├── utils.js        # 构建工具函数
│   ├── vue-loader.conf.js # Vue加载器配置
│   ├── webpack.base.conf.js # Webpack基础配置
│   ├── webpack.dev.conf.js # Webpack开发环境配置
│   └── webpack.prod.conf.js # Webpack生产环境配置
├── config/             # 项目配置目录
│   ├── dev.env.js      # 开发环境变量配置
│   ├── index.js        # 项目主配置文件
│   └── prod.env.js     # 生产环境变量配置
├── src/                # 项目源码目录
│   ├── api/            # API接口定义目录
│   │   ├── brand.js          # 品牌管理接口
│   │   ├── companyAddress.js # 公司地址接口
│   │   ├── coupon.js         # 优惠券接口
│   │   ├── flash.js          # 秒杀活动接口
│   │   ├── order.js          # 订单管理接口
│   │   ├── product.js        # 商品管理接口
│   │   ├── returnApply.js    # 退货申请接口
│   │   ├── returnReason.js   # 退货原因接口
│   │   └── ...               # 其他接口文件
│   ├── assets/         # 静态资源目录
│   │   └── images/     # 图片资源
│   ├── components/     # 通用组件目录
│   │   ├── Breadcrumb/ # 面包屑组件
│   │   ├── Hamburger/  # 汉堡菜单组件
│   │   ├── ScrollBar/  # 滚动条组件
│   │   ├── SvgIcon/    # SVG图标组件
│   │   ├── Tinymce/    # 富文本编辑器组件
│   │   └── Upload/     # 文件上传组件
│   ├── icons/          # SVG图标资源目录
│   │   ├── index.js    # 图标注册入口
│   │   └── svg/        # SVG图标文件
│   ├── router/         # 路由配置目录
│   │   └── index.js    # 路由配置文件
│   ├── store/          # Vuex状态管理目录
│   │   ├── getters.js  # Getter定义
│   │   ├── index.js    # Store入口
│   │   └── modules/    # 模块化状态管理
│   ├── styles/         # 样式文件目录
│   │   ├── element-ui.scss # Element UI样式覆盖
│   │   ├── index.scss   # 全局样式入口
│   │   ├── mixin.scss   # 样式混合
│   │   ├── sidebar.scss # 侧边栏样式
│   │   ├── transition.scss # 过渡动画样式
│   │   └── variables.scss # 样式变量
│   ├── utils/          # 工具函数目录
│   │   ├── auth.js     # 认证相关工具
│   │   ├── date.js     # 日期处理工具
│   │   ├── index.js    # 工具函数入口
│   │   ├── request.js  # Axios请求封装
│   │   ├── support.js  # 支持函数
│   │   └── validate.js # 验证函数
│   ├── views/          # 页面组件目录
│   │   ├── 404.vue     # 404页面
│   │   ├── home/       # 首页模块
│   │   ├── layout/     # 布局组件
│   │   ├── login/      # 登录页面
│   │   ├── oms/        # 订单管理模块
│   │   ├── pms/        # 商品管理模块
│   │   ├── sms/        # 营销管理模块
│   │   └── ums/        # 用户管理模块
│   ├── App.vue         # 根组件
│   ├── main.js         # 应用入口文件
│   └── permission.js   # 权限管理文件
├── static/             # 静态文件目录
│   └── tinymce4.7.5/   # TinyMCE富文本编辑器
├── index.html          # HTML入口文件
├── package.json        # 项目依赖配置
├── package-lock.json   # 依赖版本锁定文件
└── README.md           # 项目说明文档
```

## 功能模块

### 订单管理系统 (oms)
- 订单列表：查看所有订单信息，支持搜索、筛选和批量操作
- 订单详情：查看订单详细信息，包括商品、物流、支付等
- 退货申请处理：处理用户发起的退货申请
- 订单设置：配置订单相关参数

### 商品管理系统 (pms)
- 商品分类：管理商品分类
- 商品信息：管理商品基本信息、SKU、库存等
- 品牌管理：管理商品品牌
- 商品属性：管理商品属性和属性分类
- 库存管理：管理商品库存信息

### 营销管理系统 (sms)
- 优惠券管理：创建和管理优惠券
- 秒杀活动：管理秒杀活动和商品
- 广告管理：管理网站广告位和内容
- 首页推荐：管理首页推荐商品、品牌和专题

### 用户管理系统 (ums)
- 会员管理：管理平台会员信息
- 权限管理：配置系统权限和角色
- 角色管理：管理系统角色
- 资源管理：管理系统资源

## 快速开始

### 环境要求
- Node.js >= 8.9.0
- npm >= 5.6.0

### 安装依赖

```bash
# 安装项目依赖
npm install
```

### 开发环境运行

```bash
# 启动开发服务器
npm run dev
```

项目将在 `http://localhost:8092` 启动

### 生产环境构建

```bash
# 构建生产环境
npm run build

# 构建并查看构建报告
npm run build --report
```

构建产物将输出到 `dist` 目录

## 开发指南

### 代码规范
- 遵循Vue.js官方代码风格指南
- 使用ES6+语法
- 组件命名采用大驼峰式命名
- API接口函数命名采用动词+名词形式

### 目录结构规范
- 页面组件放在 `src/views/` 目录下
- 通用组件放在 `src/components/` 目录下
- API接口定义放在 `src/api/` 目录下
- 工具函数放在 `src/utils/` 目录下

### 接口调用

```javascript
// 引入API接口
import { fetchList, createBrand } from '@/api/brand'

// 调用接口
fetchList(params).then(response => {
  // 处理响应数据
})

createBrand(data).then(response => {
  // 处理响应数据
})
```

### 状态管理

```javascript
// 在组件中使用Vuex
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    ...mapActions(['login'])
  }
}
```

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Internet Explorer 11+

## 许可证

[MIT](https://opensource.org/licenses/MIT)

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 联系方式

如有问题或建议，欢迎通过以下方式联系：

- 项目地址：https://github.com/yourusername/mall-admin-web
- 邮箱：your.email@example.com