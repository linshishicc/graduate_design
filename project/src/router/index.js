import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from "@/components/Index";
import Welcome from "@/components/Welcome";
import Manager from "@/components/Manager";
import UserManager from "@/components/UserManager";
import ProductList from "@/components/ProductList";
import Ranking from "@/components/Ranking";
import Rule from "@/components/Rule";
import CommissionList from "@/components/CommissionList";
import Order from "@/components/Order";
import Profit from "@/components/Profit";
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/',
            name: 'Index',
            component: Index,
            children: [
                { path: '/', component: Welcome },
                { path: '/manager', component: Manager },
                { path: '/user-manager', component: UserManager },
                { path: '/product-list', component: ProductList },
                { path: '/ranking', component: Ranking },
                { path: '/rule', component: Rule },
                { path: '/commission-list', component: CommissionList },
                { path: '/order', component: Order },
                { path: '/profit', component: Profit }
            ]
        }
    ]
})