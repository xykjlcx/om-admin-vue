import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
    path: '/login',
    component: () =>
      import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () =>
      import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'dashboard',
    hidden: true,
    children: [{
      path: 'home',
      component: () =>
        import('@/views/home/index')
    }]
  },
  {
    path: '/home',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Home',
      component: () =>
        import('@/views/home/index'),
      meta: {
        title: '首页',
        icon: 'dashboard'
      }
    }]
  },
  {
    path: '/users',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Users',
      component: () =>
        import('@/views/users/index'),
      meta: {
        title: '用户管理',
        icon: 'people'
      }
    }]
  },
  {
    path: '/courses',
    component: Layout,
    redirect: '/courses/all',
    meta: {
      title: '课程管理',
      icon: 'component'
    },
    children: [{
        path: 'all',
        name: 'All',
        component: () =>
          import('@/views/courses/all'),
        meta: {
          title: '所有课程',
          icon: 'list'
        }
      },
      {
        path: 'add',
        name: 'Add',
        component: () =>
          import('@/views/courses/add'),
        meta: {
          title: '新增课程',
          icon: 'form'
        }
      },
      {
        path: 'edit/:id',
        component: () =>
          import('@/views/courses/edit'),
        name: 'edit',
        meta: {
          title: '编辑课程',
          noCache: true
        },
        hidden: true
      },
    ]
  },
  {
    path: '/sections',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Sections',
      component: () =>
        import('@/views/sections/index'),
      meta: {
        title: '章节管理',
        icon: 'excel'
      }
    }]
  },
  {
    path: '/classifys',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Classify',
      component: () =>
        import('@/views/classifys/index'),
      meta: {
        title: '分类管理',
        icon: 'tree'
      }
    }]
  },
  {
    path: '/comments',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Comments',
      component: () =>
        import('@/views/comments/index'),
      meta: {
        title: '评论管理',
        icon: 'message'
      }
    }]
  },
  {
    path: '/notices',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Notices',
      component: () =>
        import('@/views/notices/index'),
      meta: {
        title: '公告管理',
        icon: 'guide'
      }
    }]
  },
  {
    path: '/about',
    component: Layout,
    children: [{
      path: 'index',
      name: 'About',
      component: () =>
        import('@/views/about/index'),
      meta: {
        title: '关于我们',
        icon: 'user'
      }
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }


]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
