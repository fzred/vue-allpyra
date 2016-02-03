function init(Vue){
    (function(getKeysBack){
        var params;
        params = {
            url: encodeURIComponent(window.location.href.split('#')[0])
        };

        params = (function(obj){ // 转成post需要的字符串.
            var str = "";
            for(var prop in obj){
                str += prop + "=" +  obj[prop] + "&"
            }
            return str;
        })(params);

        var xmlHttp=new XMLHttpRequest();
        xmlHttp.onreadystatechange = function()
        {
            if( xmlHttp.readyState == 4  && xmlHttp.status == 200 )
            {
                getKeysBack&&getKeysBack(xmlHttp.responseText);
            }
        }
        xmlHttp.open( "POST", "/api/weixin/partake.jsp", true );
        xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlHttp.send( params );
    })(getKeysBack);
    
    function getKeysBack(responseText){
        var result=JSON.parse(responseText);
        var o;
        if (result && result.result_code === 'SUCCESS') {
            o = result.content;
            wx.config({
                // debug: true,
                appId: o.appId,
                timestamp: o.timestamp,
                nonceStr: o.nonceStr,
                signature: o.signature,
                jsApiList:['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo','hideMenuItems','previewImage', 'chooseImage', 'uploadImage', 'downloadImage']
            });
        }
    }
}
export default init;