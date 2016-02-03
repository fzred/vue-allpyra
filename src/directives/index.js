/**
 * Created by lred on 2016/2/3.
 */
export default  function (Vue) {
    var src = (function () {
        var scrollCallFns = [];

        function addEventList(call) {
            scrollCallFns.push(call);
        }

        function removeEventList(call) {
            if (!scrollCallFns.length) return;
            var index = scrollCallFns.indexOf(call);
            if (index > -1) {
                return scrollCallFns.splice(index, 1);
            }
        }

        function trigger(call) {
            var scrollTop = document.querySelector("body").scrollTop,
                windowHeight = window.innerHeight,
                params = {
                    scrollTop,
                    windowHeight
                };

            if (call) {
                call(params);
                return;
            }
            scrollCallFns.forEach(call=> {
                call(params);
            });
        }

        window.addEventListener("resize", function () {
            trigger();
        });
        document.addEventListener("scroll", function () {
            trigger();
        });

        return {
            // 宽高相对于屏幕宽度的比例
            params: ['w', 'h'],
            bind(){
                this.el.width = window.innerWidth * this.params.w;
                this.el.height = window.innerWidth * this.params.h;
                addEventList(this.onScroll.bind(this));
            },
            update(value){
                this.imgSrc = value;
                setTimeout(()=> {
                    trigger(this.onScroll.bind(this))
                })
            },
            unbind() {
                removeEventList(this.onScroll.bind(this));
            },
            imgSrc: "",
            onScroll ({scrollTop,windowHeight}) {
                var elTop = this.el.offsetTop,
                    elHeight = this.el.height;

                //fix 图片没设置height的情况下offsetTop为0
                if (elHeight == 0) {
                    this.el.style.height = "1px";
                    elTop = this.el.offsetTop;
                    this.el.style.height = "";
                }


                var topInWindow = scrollTop <= elTop && scrollTop + windowHeight >= elTop,
                    bottomInWindow = scrollTop <= elTop + elHeight && scrollTop + windowHeight >= elTop + elHeight;
                if (topInWindow || bottomInWindow) {
                    if (this.el.getAttribute("src") !== this.imgSrc && this.imgSrc) {
                        this.el.setAttribute("src", this.imgSrc);
                        this.el.onload = ()=> {
                            this.el.removeAttribute("width");
                            this.el.removeAttribute("height");
                            this.el.onload = undefined;
                        }
                    }
                }
            }
        }
    })();

    Vue.directive("src", src);
}