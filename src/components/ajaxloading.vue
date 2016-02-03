<template>
    <div v-show="loadingAm" class="loadingAm">
        <div class="spinner">
            <div class="spinner-container container1">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
            </div>
            <div class="spinner-container container2">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
            </div>
            <div class="spinner-container container3">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                loadingAm:false
            }
        },
        ready(){
            var requestCount=0;
            var data=this.$data;
            this.$http.interceptors.push({
                request(request){
                    requestCount++;
                    data.loadingAm=true;
                    return request;
                },
                response(response){
                    if(response.data.errCode!==0 &&!response.request.noTips){
                      //  tip.show(response.data.errMsg, {'timeout': 1000});
                    }
                    if(!--requestCount){
                        data.loadingAm=false;
                    }
                    return response;
                }
            });
        }
    }
</script>

<style>
    .loadingAm{
        position: fixed;
        left: 50%;top: 30%;
        margin-left: -40px;
        padding:16px;
        background: rgba(0, 0, 0, 0.38);
        border-radius: 10px;
        z-index: 100;
    }
    .spinner {
        width: 30px;
        height:30px;
        position: relative;;
    }

    .container1 > div, .container2 > div, .container3 > div {
        width: 9px;
        height: 9px;
        background-color: #FFF;

        border-radius: 100%;
        position: absolute;
        animation: bouncedelay 1.2s infinite ease-in-out;
        animation-fill-mode: both;
    }

    .spinner .spinner-container {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .container2 {
        transform: rotateZ(45deg);
    }

    .container3 {
        transform: rotateZ(90deg);
    }

    .circle1 { top: 0; left: 0; }
    .circle2 { top: 0; right: 0; }
    .circle3 { right: 0; bottom: 0; }
    .circle4 { left: 0; bottom: 0; }

    .container2 .circle1 {
        animation-delay: -1.1s;
    }

    .container3 .circle1 {
        animation-delay: -1.0s;
    }

    .container1 .circle2 {
        animation-delay: -0.9s;
    }

    .container2 .circle2 {
        animation-delay: -0.8s;
    }

    .container3 .circle2 {
        animation-delay: -0.7s;
    }

    .container1 .circle3 {
        animation-delay: -0.6s;
    }

    .container2 .circle3 {
        animation-delay: -0.5s;
    }

    .container3 .circle3 {
        animation-delay: -0.4s;
    }

    .container1 .circle4 {
        animation-delay: -0.3s;
    }

    .container2 .circle4 {
        animation-delay: -0.2s;
    }

    .container3 .circle4 {
        animation-delay: -0.1s;
    }
    @keyframes bouncedelay {
        0%, 80%, 100% {
            transform: scale(0.0);
        } 40% {
              transform: scale(1.0);
          }
    }

</style>