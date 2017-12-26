// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'iview/dist/styles/iview.css'
import 'tether/dist/css/tether.min.css'
import 'tether/dist/js/tether.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import $ from 'jquery/dist/jquery.min.js'
import Vue from 'vue'
import App from './App'
import router from './router'

import iView from 'iview'
import ElementUI from 'element-ui'

import VueResource from 'vue-resource'
// import 'element-ui/lib/theme-default/index.css'    // 默认主题
import '../static/css/theme-green/index.css'       // 浅绿色主题
import '../static/css/main.css'       // 浅绿色主题
import 'font-awesome/css/font-awesome.min.css'

// import VueSocketio from 'vue-socket.io';
import SH from './components/tools/SocketHelp.js'
SH.start()
Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth()+1, //month
		"d+" : this.getDate(), //day
		"h+" : this.getHours(), //hour
		"m+" : this.getMinutes(), //minute
		"s+" : this.getSeconds(), //second
		"q+" : Math.floor((this.getMonth()+3)/3), //quarter
		"S" : this.getMilliseconds() //millisecond
	}
	if(/(y+)/.test(format)) format=format.replace(RegExp.$1, (this.getFullYear()+"").substr(4- RegExp.$1.length));
	for(var k in o)
		if(new RegExp("("+ k +")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length==1? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
	return format;
}
// Vue.use(VueSocketio, 'wss://aaa.bigfacewo.com/dwws');

// console.log($)
Vue.use(ElementUI)
Vue.use(iView)
// Don't forget to call this
Vue.use(VueResource)
// vuex start
import Vuex from 'vuex'
Vue.use(Vuex)
let vuex_store = new Vuex.Store({
	state: {
		tableData:[]
	},
	mutations: {
		pushtableData(state, data) {
			state.tableData.push(data)
		}
	}
})
// vuex end
// 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

import Cookies from './utils/Cookies.js'
Cookies.setUpCookies(Vue)


Vue.http.headers.common['token'] = Cookies.getCookie('token')
Vue.http.headers.common['principal'] = Cookies.getCookie('principal')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#jabeta',
  store:vuex_store,
  router:router,
  template: '<App/>',
  components: { App }
})
