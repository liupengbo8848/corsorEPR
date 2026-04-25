# ERP与RPA企业官网实施说明

## 已完成内容
- 8个一级页面全部重建完成。
- 页面切换按钮（顶部导航）统一放在 `assets/layout.js`，所有页面复用。
- 悬浮CTA也统一放在 `assets/layout.js`，避免多页重复维护。
- 线索表单与事件埋点位于 `assets/main.js`。

## 关键复用文件
- `assets/layout.js`：公共导航、公共页脚、公共悬浮CTA。
- `assets/styles.css`：全站样式。
- `assets/main.js`：CTA点击和表单提交埋点、线索提交逻辑。

## 后续接入建议
- 将 `assets/main.js` 中 `defaultApi` 替换为真实CRM接口。
- 把联系方式、地址、案例替换为你们真实信息。
