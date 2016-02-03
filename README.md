# vue-allpyra
allpyra的公用库
## install
```bash
npm install vue-allpyra
```
## using
```javascript
Vue.use(require("vue-allpyra"));
```

### directive
* src 图片懒加载

  ```html
  <img v-src="'xx.jpg'" />
  ```
### filter

* proItemUrl  #商品详情链接

* coverPrice  #格式化价格

* formatTime  #格式化时间

### component
* ajaxloading 拦截vue-resource的所有ajax请求，增加loading进度条，报错信息统一处理，传 *noTips:true* 取消全局报错处理
  
  ```html
  <ajaxloading></ajaxloading>
  ```
