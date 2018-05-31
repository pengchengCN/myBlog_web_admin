import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import ArticleList from './views/ArticleList.vue'
import ArticleWrite from './views/ArticleWrite.vue'
import CategoryList from './views/CategoryList.vue'
import LabelList from './views/LabelList.vue'
import UserList from './views/UserList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'articleList',
          name: 'articleList',
          component: ArticleList,
        },
        {
          path: 'articleWrite',
          name: 'articleWrite',
          component: ArticleWrite,
        },
        {
          path: 'categoryList',
          name: 'categoryList',
          component: CategoryList,
        },
        {
          path: 'labelList',
          name: 'labelList',
          component: LabelList,
        },
        {
          path: 'userList',
          name: 'userList',
          component: UserList,
        }
      ]
    }
  ]
})
