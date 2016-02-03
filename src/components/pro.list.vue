<template>
    <ul class="prolist">
        <li v-for="item in list">
            <div class="item-wrap"><a href="http://m.allpyra.com/item.html#id-{{item.pid}}">
                <div class="thumbnail"><img
                        :src="item.logourl">
                </div>
                <dl class="details">
                    <dt class="title">{{item.name}}</dt>
                    <dd class="price"><label>￥ <strong>{{item.price | coverPrice}}</strong></label></dd>
                    <dd class="source">{{item.depotName}}</dd>
                </dl>
            </a>
                <div class="discount">{{item.price | discount item.referance_price}}折</div>
                <div v-if="false" class="seldout-cover hide"><span class="seldout"></span></div>
            </div>
        </li>
    </ul>
</template>
<script>
    export default{
        props: ["list"],
        filters: {
            discount(value, referance){
                return Math.round((value / referance) * 100) / 10;
            }
        }
    }
</script>
<style>

    .prolist {
        overflow: auto;
        background: #eee;;
    }

    .prolist a {
        color: #000;
        text-decoration: none;;
    }

    .prolist > li {
        float: left;
        width: 50%;
        list-style: none;
    }

    .prolist .item-wrap {
        padding: 4px;
        position: relative
    }

    .prolist a {
        display: block;
        width: 100%;
        background-color: #fff
    }

    .prolist .thumbnail img {
        display: block;
        width: 100%
    }

    .prolist .details {
        display: block;
        padding: 2px 6px;
        height: 86px;
        position: relative
    }

    .prolist .title {
        height: 40px;
        overflow: hidden
    }

    .prolist .price {
        position: absolute;
        bottom: 8px;
        left: 6px;
        background-color: #fff;
        padding-right: 6px;
        z-index: 98
    }

    .prolist .price label {
        font-size: .24rem
    }

    .prolist .price strong {
        font-size: .32rem
    }

    .prolist .source {
        font-size: .22rem;
        position: absolute;
        bottom: 8px;
        right: 4px;
        z-index: 97;
        color: #a0a0a0
    }

    .prolist .discount {
        background-color: #630;
        color: #fff;
        border-bottom-right-radius: 1pc;
        border-top-right-radius: 1pc;
        padding: 2px 6px;
        position: absolute;
        left: 4px;
        top: 16%;
        font-size: .22rem;
        font-style: normal
    }

    .prolist .seldout-cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .35);
        pointer-events: none;
        z-index: 100
    }

    .prolist .seldout-cover .seldout {
        width: 58px;
        height: 58px;
        background: url(http://m.allpyra.com/img/flowicon.png) -60px 0 no-repeat;
        background-size: 200px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -29px 0 0 -29px
    }

</style>