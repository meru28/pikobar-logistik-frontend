import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import dashboardRouter from './modules/dashboard'
// Request Aldy Rialdy. Di production hide dulu menu distribusi & monitoring. Di Staging jangan
// import distribusiRdt from './modules/distribusiRdt'
// import monitoringRdtRouter from './modules/monitoringRdt'
import pengajuanLogistik from './modules/pengajuanLogistik'
import faskesRouter from './modules/faskes'
import formPemohonAdmin from './modules/formPemohonAdmin'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/landing-page',
    component: () => import('@/views/landingPage/index'),
    hidden: true
  },
  {
    path: '/change-password',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/',
        component: () => import('@/views/changePassword/index'),
        meta: {
          title: 'change_password'
        },
        hidden: true
      }
    ]
  },
  {
    path: '/form-pemohon',
    component: () => import('@/views/permohonan/formPemohon'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  dashboardRouter,
  formPemohonAdmin,
  pengajuanLogistik,
  // Request Aldy Rialdy. Di production hide dulu menu distribusi & monitoring. Di Staging jangan
  // distribusiRdt,
  // monitoringRdtRouter,
  faskesRouter,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
