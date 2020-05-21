import Layout from '@/layout'

const pengajuanLogistikAdmin = {
  path: '/pengajuan-logistik-admin',
  component: Layout,
  redirect: '/pengajuan-logistik-admin/form-pemohon',
  meta: {
    title: 'logistic_request_title',
    icon: 'library_books',
    roles: ['superadmin', 'dinkesprov']
  },
  active: false,
  children: [
    {
      path: 'form-pemohon',
      component: () => import('@/views/permohonan/formPemohonAdmin'),
      meta: {
        title: 'applicant_form',
        icon: 'library_books',
        noCache: true,
        roles: ['superadmin', 'dinkesprov']
      }
    }
  ]
}

export default pengajuanLogistikAdmin
