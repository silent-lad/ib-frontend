import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateInterview from '../views/CreateInterview.vue'
import InterviewList from '../views/InterviewList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'CreateInterview',
    component: CreateInterview
  },
  {
    path: '/interviews',
    name: 'InterviewList',
    component: InterviewList
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
