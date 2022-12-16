import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProductsView from '../views/ProductsView.vue'
import MyProductsView from '../views/MyProductsView.vue'
import ProductDetails from '../views/ProductDetails.vue'
import NotFound from '../components/NotFound.vue'
import firebase from '../Firebase'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/products',
    name: 'ProductsView',
    component: ProductsView
  },
  {
    path: '/myproducts',
    name: 'MyProducts',
    component: MyProductsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/:name',
    name: 'ProductDetails',
    component: ProductDetails
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: NotFound
  }

]
const router = createRouter({
  history: createWebHistory(),
  routes, //same --- > routes:routes
})
router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})
export default router
