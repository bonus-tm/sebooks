import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '@/views/Home.vue'
import Books from '@/views/Books.vue'
import BookItem from '@/views/BookItem.vue'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    name: 'books',
    path: '/books',
    component: Books,
    children: [
      {
        name: 'book',
        path: ':bookId',
        component: BookItem,
        props: true,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {top: 0}
  }
})

export default router
