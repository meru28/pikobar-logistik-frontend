import Layout from '@/layout'

const pengajuanLogistik = {
  path: '/pengajuan-logistik',
  component: Layout,
  redirect: '/pengajuan-logistik/alat-kesehatan',
  meta: {
    title: 'logistic_request_title',
    icon: 'library_books',
    roles: ['superadmin', 'dinkesprov']
  },
  active: false,
  children: [
    {
      path: 'alat-kesehatan',
      component: () => import('@/views/pengajuanLogistik/list'),
      meta: {
        title: 'applicant_medical_tools_title',
        icon: 'library_books',
        noCache: true,
        roles: ['superadmin', 'dinkesprov']
      }
    },
    {
      path: 'alat-kesehatan/detail/:id',
      component: () => import('@/views/pengajuanLogistik/detail'),
      hidden: true,
      meta: {
        title: 'applicant_medical_tools_title',
        icon: 'library_books',
        noCache: true,
        roles: ['superadmin', 'dinkesprov']
      }
    }
  ]
}

export default pengajuanLogistik
