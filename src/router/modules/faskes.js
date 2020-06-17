import Layout from '@/layout'

const faskes = {
  path: '/faskes',
  component: Layout,
  redirect: '/faskes/terdaftar',
  meta: {
    title: 'medical_facility_title',
    icon: 'mdi-hospital',
    roles: ['superadmin', 'dinkesprov']
  },
  active: false,
  children: [
    {
      path: '/faskes/belum-terdaftar',
      component: () => import('@/views/masterData/faskes/list'),
      name: 'FaskesBelumTerdaftar',
      meta: {
        title: 'not_registered_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov']
      }
    },
    {
      path: '/faskes/terdaftar',
      component: () => import('@/views/masterData/faskes/list'),
      name: 'FaskesTerdaftar',
      meta: {
        title: 'registered_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov']
      }
    },
    {
      path: '/faskes/ditolak',
      component: () => import('@/views/masterData/faskes/list'),
      name: 'FaskesDitolak',
      meta: {
        title: 'rejected_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov']
      }
    }
  ]
}

export default faskes
