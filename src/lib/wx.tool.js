var wxTool = Object.create(null);
var is_weixin = function () {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}
var chooseSingleImg = ()=> {
    if (!wxTool.is_weixin()) {
        return new Promise((resolve, reject)=> {

            var inputFile = document.createElement("input")
            inputFile.setAttribute("type", "file");

            inputFile.addEventListener("change", function () {

                console.log("change", arguments)

                var file = this.files[0];
                //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件 
                if (!/image\/\w+/.test(file.type)) {
                    alert("请确保文件为图像类型");
                    return false;
                }
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    var baee64 = e.target.result;
                    resolve({
                        localId: baee64
                    });
                }

            });

            inputFile.click();
            console.log("noWX")

        });
    }


    var promise = new Promise((resolve, reject)=> {
        console.log("wx.chooseImage");
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: [/*'original',*/ 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                upload(localIds[0]);
            }
        });

        function upload(localId) {
            console.log("wx.uploadImage");
            wx.uploadImage({
                localId, // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                    var serverId = res.serverId; // 返回图片的服务器端ID
                    console.log(serverId)
                    resolve({
                        localId,
                        serverId
                    });
                }
            });
        }

    });


    return promise;
};

var _fns = [],
    isReady = false;
wx.ready(()=> {
    _fns.forEach((item)=> {
        item();
    });
    isReady = true;
});

var setShare = (data)=> {

    var WXShareConfig = {
        imgUrl: window.location.origin + '/img/share/logo.jpg',
        link: window.location.href,
        desc: '\u81f4\u529b\u4e8e\u4e3a\u4e2d\u56fd\u8ffd\u6c42\u9ad8\u54c1\u8d28\u751f\u6d3b\u7684\u6d88\u8d39\u8005\u63d0\u4f9b\u5168\u7403\u8303\u56f4\u5185\u7684\u9ad8\u7aef\u4f18\u8d28\u5546\u54c1\u91c7\u8d2d\u670d\u52a1', // 致力于为中国追求高品质生活的消费者提供全球范围内的高端优质商品采购服务
        title: '\u0041\u006c\u006c\u0070\u0079\u0072\u0061\u91d1\u5b57\u5854\u002d\u9ad8\u7aef\u6d77\u5916\u751f\u6d3b\u7528\u54c1\u5546\u57ce', // Allpyra金字塔-高端海外生活用品商城
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    };
    _.extend(WXShareConfig, data);

    var fn = function () {
        wx.onMenuShareAppMessage(WXShareConfig);

        wx.onMenuShareTimeline(WXShareConfig);

        wx.onMenuShareQQ(WXShareConfig);

        wx.onMenuShareWeibo(WXShareConfig);
    }
    if (isReady) {
        fn();
    } else {
        _fns.push(fn);
    }

};

wxTool.is_weixin = is_weixin;
wxTool.chooseSingleImg = chooseSingleImg;
wxTool.setShare = setShare;

export default wxTool;