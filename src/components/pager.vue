<template>

    <slot></slot>

    <div class="pager-btn" v-show="pages>1">
        <div class="inner">
            <button @click="prev" class="prev j-prev">&lt; 上一页</button>
            <span><i class="j-current-page">{{pageNo}}</i> / <i class="j-total-page">{{pages}}</i> 页</span>
            <button @click="next" class="next j-next">下一页 &gt;</button>
        </div>
    </div>
</template>
<script type="es6">
    export default{
        props: {
            pageSize: {
                type: Number,
                default: ()=> 10,
            },
            pageNo: {
                type: Number,
                default: ()=> 1,
            },
            onData: null,
            dataInit: {
                type: Boolean,
                default: ()=> true,
            },
            model: Object,
        },
        data(){
            return {
                pages: 1
            }
        },
        methods: {
            getData(){
                this.onData({
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                }).then(({ data :{ obj } })=> {
                    if (obj.pages) {
                        this.pages = obj.pages;
                    } else {
                        this.pages = parseInt(obj.totalNum % obj.pageSize > 0 ? obj.totalNum / this.pageSize + 1 : obj.totalNum / this.pageSize);
                    }
                    this.model = obj.list || obj.productList || [];
                });
            },
            prev(){
                if (this.pageNo === 1) return;
                this.pageNo--;
                this.getData();
            },
            next(){
                if (this.pageNo >= this.pages) return;
                this.pageNo++;
                this.getData();
            },
        },
        ready(){
            if (this.dataInit) {
                this.getData();
            }
        }

    }
</script>

<style>

    .pager-btn {
        padding: 40px 0;
        text-align: center;
    }

    .pager-btn .inner {
        display: inline-block;
        font-size: 24px;
        text-align: center;
        overflow: hidden;
        *zoom: 1;
    }

    .pager-btn .inner button,
    .pager-btn .inner span {
        float: left;
        padding: 10px 20px;
        margin: 0 8px;
        border: 2px solid #ccc;
        background-color: #fff;
    }

    .pager-btn .inner button {
        color: #333;
        text-decoration: none;
        background-color: #efefef;
        padding: 10px 20px;
        font-size: 24px;
    }

    .pager-btn .inner span i {
        font-style: normal;
    }
</style>
