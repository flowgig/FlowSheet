import Vue from 'vue'
import App from './components/App.vue'
import Style from './style/main.scss';
import * as quark from 'quark-gui';


new Vue({
  el: '#app',
  render: h => h(App)
})

quark.Init.default();
