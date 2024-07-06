import { createMemoryHistory, createRouter } from 'vue-router'

import TransactionsView from './pages/transactions.vue'
import AssetsView from './pages/assets.vue'
import AnalyticsView from './pages/analytics.vue'

const routes = [
  { path: '/', component: TransactionsView },
  { path: '/assets', component: AssetsView },
  { path: '/analytics', component: AnalyticsView },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
