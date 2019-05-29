import Vue from 'vue';
import App from './App.vue';

import Vuex from 'vuex';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import VueComputedPromise from 'vue-computed-promise';
import axios from 'axios';

import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Admin from './components/Admin.vue';
import Posts from './components/Posts.vue';
import PostsCreate from './components/PostsCreate.vue';
import PostsEdit from './components/PostsEdit.vue';
import Users from './components/Users.vue';
import UsersCreate from './components/UsersCreate.vue';
import UsersEdit from './components/UsersEdit.vue';
import Comments from './components/Comments.vue';
import CommentsCreate from './components/CommentsCreate.vue';
import Logout from './components/Logout.vue';

Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueComputedPromise);

Vue.config.productionTip = false;
Vue.axios.defaults.baseURL = `http://localhost:80`;

const isAdmin = (to, from, next) => {
    if (store.getters.user) {
        next();
    } else {
        next('login');
    }
};

const router = new VueRouter({
    routes: [
        {path: '/', redirect: '/login'},
        {path: '/login', component: Login},
        {path: '/register', component: Register},
        {path: '/logout', component: Logout, beforeEnter: isAdmin},
        {
            path: '/admin',
            component: Admin,
            beforeEnter: isAdmin
        },
        {
            path: '/posts',
            component: Posts,
            beforeEnter: isAdmin
        },
        {
            path: '/posts/create',
            component: PostsCreate,
            beforeEnter: isAdmin
        },
        {
            path: '/posts/edit/:id',
            component: PostsEdit,
            beforeEnter: isAdmin
        },
        {
            path: '/users',
            component: Users,
            beforeEnter: isAdmin
        },
        {
            path: '/users/create',
            component: UsersCreate,
            beforeEnter: isAdmin
        },
        {
            path: '/users/edit/:id',
            component: UsersEdit,
            beforeEnter: isAdmin
        },

        {
            path: '/comments',
            component: Comments,
            beforeEnter: isAdmin
        },
        {
            path: '/comments/create',
            component: CommentsCreate,
            beforeEnter: isAdmin
        },

    ],
});


export const store = new Vuex.Store({
    state: {
        user: null
    },
    mutations: {
        userChanged(state, user) {
            state.user = user;
        }
    },
    getters: {
        user: state => state.user
    }
});


new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app');
