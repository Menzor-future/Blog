// 使用cdn加速取代本地插件
// import Vue from 'vue'
// import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)
const Home = () => import('../views/home/Home')

const Blog = () => import('../views/blog/Blog')
const BlogList = () => import('../views/blog/mainmod/BlogList')
const BlogDetail = () => import('../views/blog/mainmod/BlogDetail');

const Photo = () => import('../views/photo/Photo')
const PhotoShow = () => import('../views/photo/PhotoShow')

const Recom = () => import('../views/recom/Recom')

const Admin = () => import('../views/admin/Admin')
const BlogPublish = () => import('../views/admin/childComps/BlogPublish');
const BlogManage = () => import('../views/admin/childComps/BlogManage');
const PhotoPublish = () => import('../views/admin/childComps/PhotoPublish');
const PhotoManage = () => import('../views/admin/childComps/PhotoManage');

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/blog',
    component: Blog,
    children: [
      {
        path: '',
        redirect: '/bloglist'
      },
      {
        path: '/bloglist',
        component: BlogList
      },
      {
        path: '/blogdetail',
        name: 'blogdetail',
        component: BlogDetail
      }
    ]
  },
  {
    path: '/photo',
    component: Photo
  },
  {
    path: '/photoshow',
    component: PhotoShow
  },
  {
    path: '/recom',
    component: Recom
  },
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: '',
        redirect: '/blogpublish'
      },
      {
        path: '/blogpublish',
        component: BlogPublish
      },
      {
        path: '/blogmanage',
        component: BlogManage
      },
      {
        path: '/photopublish',
        component: PhotoPublish
      },
      {
        path: '/photomanage',
        component: PhotoManage
      }
    ]
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

// 导航守卫
router.beforeEach((to, from, next) => {
  const nextJudge = ['/photomanage', '/photopublish', '/blogpublish', '/blogmanage']
  if (to.path === '/admin') {
    if (store.state.loginStatus) {
      next('/admin')
      return
    }
    else {
      next('/recom')
    }
  }
  if (nextJudge.indexOf(to.path) >= 0) {
    if (store.state.loginStatus) {
      next()
    }
    else {
      next('/recom')
    }
  } else {
    next()
  }

})
export default router