/**
 * Created by lred on 2016/2/3.
 * 依赖于全局的 underscore
 * 依赖于 vue-resource Vue需要提前Install
 */
function install(Vue, options) {
    options = _.extend({
        isFlexible: true,
    }, options || {});

    if (options.isFlexible) {
        require("./lib/flexible.js")();
    }
    require("./lib/wx.config.js")(Vue);

    require("./filters")(Vue);
    require("./directives")(Vue);

    var allpyra = Vue.allpyra = {};
    allpyra.cookie = require('./lib/cookie.js');
    allpyra.wxTool = require('./lib/wx.tool.js');
    allpyra.updateImg = require("./lib/update.img.js")(Vue);


    Vue.prototype.$allpyra = allpyra;

}

if (window.Vue) {
    Vue.use(install);
}

export default install;
