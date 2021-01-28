// Imports
import Vue from 'vue'
import Router from 'vue-router'
import { trailingSlash } from '@/util/helpers'
import {
  layout,
  route,
} from '@/util/routes'
import UserModule from '@/views/UserModule'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition
    return { x: 0, y: 0 }
  },
  routes: [
    layout('Public', [
      route('Login', null, process.env.VUE_APP_LOGIN_URL),
    ]),
    layout('Private', [
      route('Dashboard', null, ''),

      route('Users', { default: 'UserModule' }, 'users'),

      // Pages
      route('UserProfile', null, 'profile'),

      // Components
      route('Notifications', null, 'components/notifications'),
      route('Typography', null, 'components/typography'),
      route('Icons', null, 'components/icons'),

      // Tables
      route('Regular Tables', null, 'tables/regular'),

      // Maps
      route('Google Maps', null, 'maps'),

      // Pages
      route('Log Out', null, 'logout'),
    ], process.env.VUE_APP_URL_START),

    // Maps
    route('Error', null, '*'),
  ],
})

router.beforeEach((to, from, next) => {
  return to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
})

export default router
