import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Detail from '@/components/Detail'
import FILES from '@/data/files';

Vue.use(Router)

const routesList = [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detail/:url',
      name: 'detail',
      component: Detail 
    }
]

Object.keys(FILES.category).map((item)=>{
  let obj = {
    path: `/${item}`,
    name: `type${item}`,
    component: Home
  };
  routesList.push(obj)
})
export default new Router({
  routes: routesList
})
