import Vue from 'vue'
import VueRouter from 'vue-router'
import BookManage from '../views/BookManage'
import AddBook from '../views/AddBook'
import Index from '../views/Index'
import Update from '../views/Update'
import Author from '../views/AuthorList.vue'
import EditAuthor from '../views/EditAuthor.vue'
import AddAuthor from '../views/AddAuthor.vue'
import AddUser from '../views/AddUser.vue'
import UserList from '../views/UserList.vue'
import Detail from '../views/Detail.vue'
import EditUser from '../views/EditUser.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    show: true,
    name: 'Book Manage',
    component: Index,
    redirect: '/manage',
    children: [
      {
        path: '/manage',
        name: 'Book List',
        component: BookManage
      },
      {
        path: '/add',
        name: 'Add Book',
        component: AddBook
      },
      {
        path: '/author',
        name: 'Author List',
        component: Author
      },
      {
        path: '/AddAuthor',
        name: 'Add Author',
        component: AddAuthor
      },
      {
        path: '/AddUser',
        name: 'Add User',
        component: AddUser
      },
      {
        path: '/UserList',
        name: 'User List',
        component: UserList
      },
    ]
  },
  {
    show: false,
    path: '/update',
    component: Update
  },
  {
    show: false,
    path: '/editauthor',
    component: EditAuthor
  },
  {
    show: false,
    path: '/Detail',
    component: Detail
  },
  {
    show: false,
    path: '/EditUser',
    component: EditUser
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
