import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import api from "./http/index";
import "normalize.css/normalize.css";
import "font-awesome/css/font-awesome.css";
// import Axios from "axios";

// 练习使用
import axios from "axios";
require("./utils/mock.js");
require("./utils/usermock.js");
require("./utils/pagemock.js");
require("./utils/index.js");
require("./mock2");

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(api);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
