import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const a={beforeEnter:(to,from,next)=>{
    
  let a= JSON.parse( sessionStorage.getItem('userInfo')).menus_url;
  a.forEach(item=>{
 
  if(to.path==item||to.path=='/home'){

    next()
    return
  }
  }) 
    
  },}
export let indexRoutes=[
  {
    path: '/menu',
    name:'菜单管理',
    component: () => import('@/views/menu/menu'),
    ...a
  },
  {
    path: '/role',
    name:'角色管理',
    
    component: () => import('@/views/role/role'),
    ...a
  },
  {
    path: '/user',
    name:'用户管理',
    component: () => import('@/views/user/user'),
    ...a
  },
  {
    path: '/cate',
    name:'商品分类',
    component: () => import('@/views/cate/cate'),
    ...a
  },
  {
    path: '/specs',
    name:'商品规格',
    component: () => import('@/views/specs/specs'),
    ...a
  },
  {
    path: '/member',
    name:'会员管理',
    component: () => import('@/views/member/member'),
    ...a
  },
  {
    path: '/banner',
    name:'轮播图管理',
    component: () => import('@/views/banner/banner'),
    ...a
    
  },
  {
    path: '/seck',
    name:'秒杀活动',
    component: () => import('@/views/seck/seck'),
    ...a
  },
  {
    path: '/goods',
    name:'商品管理',
    component: () => import('@/views/goods/goods'),
    ...a
  },
]
let router= new Router({
  routes: [
    {
      path: '/login',
      component: () => import('@/pages/login')
    },
    {
      path: '/index',
      component: () => import('@/pages/index'),
         ...a,
      children: [
        
        ...indexRoutes,
        {
          path: '/home',
          component: () => import('@/views/home')
        },
        {
          path: '',
          redirect:'/home'
        },
      ]
    },
    
  
  ]
})

router.beforeEach((to,form,next)=>{
    if(to.path=='/login'){
      next()
      return
    }
    if(sessionStorage.getItem("userInfo")){
      next()
      return
    }
    next('/login')
})


export default router
