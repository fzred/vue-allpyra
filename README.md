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

* pager 分页组件
 - on-data 返回promise，返回结果必须是统一的分页数据格式，目前服务器有些接口并不符合，发现了就通知后台更改
 - model.sync 内容绑定的model，必须是双向绑定。
 
  ```html
  <pager :on-data="getData" :model.sync="list">
    <div v-for="item in list"></div>
  </pager>
  <script>
    export default{
        data(){
            return {
                list: [],
            }
        }
        methods: {
            getData({pageNo,pageSize}){
                return this.$http.post("/api/XXX", {
                    pageNo: pageNo,
                    pageSize: pageSize,
                });
            },
        }
    }
</script>
  ```
