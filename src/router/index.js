import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue';
import VideoWatch from "../views/VideoWatch.vue"
import DienKe from "../views/DienKe.vue"
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path:"/video/:id",
    name:"video-watch",
    component:VideoWatch,
    params:true
  },
  {
    path:"/dienke/customer/:id",
    name:"dienke-user",
    component:DienKe,
    params:true
  }
]

const router = new VueRouter({
  routes
})

export default router
