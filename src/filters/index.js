/**
 * Created by lred on 2016/2/3.
 */

export default  function (Vue) {
    var coverPrice = function (value) {
        return +value > 99 ?
            String(value).replace(/(\d+)(\d{2})$/, '$1.$2') :
            +value > 9 ?
            '0.' + value :
            '0.0' + value;
    };

    var formatTime = (function () {
        var _format = function (date, fmt) { //author: meizz
            var o = {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "h+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        };
        return function (date, fmt) {
            if (date === undefined)  return "";

            if (Object.prototype.toString.call(date) !== "[object Date]") {
                date = new Date(date)
            }
            return _format(date, fmt);
        };
    })();

    var proItemUrl = function (id) {
        return '/item' + id + '.html';
    };


    Vue.filter("proItemUrl", proItemUrl);
    Vue.filter("coverPrice", coverPrice);
    Vue.filter("formatTime", formatTime);
};