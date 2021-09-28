import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
// import Login from '../views/admin/Login.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/admin/login',
    name:"AdminLogin",
    component: () =>import('../views/admin/Login')
  },
  {
    path:'/admin/dashboard',
    name:'Dashboard',
    component:()=>import('../views/admin/Dashboard')
  },
  {
    path:'/admin/category/list',
    name:'List Category',
    component:()=>import('../views/admin/categories/list.categories.vue')
  },
  {
    path:'/admin/category/add',
    name:'Add Category',
    component:()=>import('../views/admin/categories/add.categories.vue')
  },
  {
    path:'/admin/category/edit/:id',
    name:'Edit Category',
    component:()=>import('../views/admin/categories/edit.categories.vue')
  },
  {
    path:'/admin/projects/add',
    name:'Add Project',
    component:()=>import('../views/admin/projects/add.project.vue')
  },
  {
    path:'/admin/projects/list',
    name:'List Projects',
    component:()=>import('../views/admin/projects/list.projects.vue')
  },
  {
    path:'/admin/projects/edit/:id',
    name:'Edit Project',
    component:()=>import('../views/admin/projects/edit.project.vue')
  },
  {
    path:'/admin/pages/add',
    name:'Add Page',
    component:()=>import('../views/admin/pages/add.page.vue')
  },
  {
    path:'/admin/pages/list',
    name:'List Page',
    component:()=>import('../views/admin/pages/list.page.vue')
  },
  {
    path:'/admin/pages/edit/:id',
    name:'Edit Page',
    component:()=>import('../views/admin/pages/edit.page.vue')
  },
  {
    path:'/admin/pagecontent/add',
    name:'Add Page Content',
    component:()=>import('../views/admin/pagecontent/add.pagecontent.vue')
  },
  {
    path:'/admin/pagecontent/list',
    name:'List Page Content',
    component:()=>import('../views/admin/pagecontent/list.pagecontent.vue')
  },
  {
    path:'/admin/pagecontent/edit/:id',
    name:'Edit Page Content',
    component:()=>import('../views/admin/pagecontent/edit.pagecontent.vue')
  },
  {
    path:'/admin/members/list',
    name:'List Members',
    component:()=>import('../views/admin/members/list.members.vue')
  },
  {
    path:'/admin/members/view/:id',
    name:'View Member',
    component:()=>import('../views/admin/members/view.member.vue')
  },
  {
    path:'/admin/collection',
    name:'List Collection',
    component:()=>import('../views/admin/collections/list.collection.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
