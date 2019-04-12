import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter) // 在vue中使用路由

import Music from '../components/common/music';
import Musicer from '../components/common/musicer';
import mv from '../components/common/mv';
import myye from '../components/common/myye';
import Detail from '../components/twolist/detail';

const router = new VueRouter({
    routes:[
        {
            path:'/music',
            name:'music',
            component:Music,
            children:[
                {
                    path:'detail/:id', //嵌套路由下不➕/
                    component:Detail
                }
            ]
        },
        {
            path:'/musicer',
            name:'musicer',
            component:Musicer,
            children:[
                {
                    path:'detail/:mid', //嵌套路由下不➕/
                    component:Detail
                }
            ]
        },
        {
            path:'/mv',
            name:'mv',
            component:mv,
            children:[
                {
                    path:'detail/:topid', //嵌套路由下不➕/
                    component:Detail
                }
            ]
        },
        {
            path:'/myye',
            name:'myye',
            component:myye
        },
        {
            path:'/',
            redirect:'/music' //重定向
        }
    ]
})
export default router