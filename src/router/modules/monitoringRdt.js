import Layout from '@/layout'

const monitoringRdt = {
  path: '/monitoring-rdt',
  component: Layout,
  redirect: '/monitoring-rdt/index',
  meta: {
    icon: 'mdi-monitor',
    roles: ['superadmin', 'dinkesprov', 'dinkeskota']
  },
  active: false,
  children: [{
    path: 'index',
    component: () => import('@/views/monitoringRdt/list'),
    meta: {
      title: 'monitoring_rdt_title',
      icon: 'mdi-monitor',
      noCache: true,
      roles: ['superadmin', 'dinkesprov', 'dinkeskota']
    }
  }]
}

export default monitoringRdt