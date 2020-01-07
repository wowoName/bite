import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode:'history',
	base:'/bigScreen/',
    routes: [{
            path: '/',
            name: 'home',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Home.vue')
        }

    ]
})