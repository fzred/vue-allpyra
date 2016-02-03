/**
 * Created by lred on 2016/1/21.
 * 依赖vue-resource
 */
export default function (Vue) {

    return function (data, type) {
        var params = {};
        if (type === "base64") {
            params.imgFile = data;
        } else if (type === "wxId") {
            params.mediaId = data;
        }

        return Vue.http.post("/api/essay/imgUpload.jsp", params).then(({ data :{errCode,obj,errMsg } })=> {

            return obj.imgUrl;

        });


    };
}
