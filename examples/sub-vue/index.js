import Vue from 'vue';
import VueRouter from 'vue-router';
import Mefa from '../mefa.es';

const PageOne = {
  render(h) {
    return <h1>System3 Page1</h1>;
  },
};

const PageTwo = {
  render(h) {
    return <h1>System3 Page2</h1>;
  },
};

const router = new VueRouter({
  routes: [
    { path: '/', component: PageOne },
    { path: '/1', component: PageTwo },
  ],
});

Vue.use(VueRouter);


new Vue({
  el: '#app',
  router,
  render(h) {
    return (
      <div>
        <span>Powered by Vue</span>
        <router-view></router-view>
      </div>
    );
  },
});


Mefa.onRouteUpdate((route) => {
  router.push({ path: route });
});
