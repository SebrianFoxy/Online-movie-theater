import { createRouter, createWebHistory } from "vue-router";
import Index from "../views/Index.vue";
import Create from "../views/Create.vue";
import Edit from "../views/Edit.vue";
import About from "../views/About.vue";
import Registration from "../views/Registration.vue";
import Login from "../views/Login.vue"
import Profile from "../views/Profile.vue"
import BuyProduct from "../views/BuyProduct.vue"
import AddBalance from "../views/Balance.vue"
import Home from "../views/Home.vue"
import MyFilms from "../views/MyFilms.vue"
import Info from "../views/Info.vue"

const routes = [
  {
    name: "Index",
    path: "/films",
    component: Index,
  },
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "Edit",
    path: "/edit/:id",
    component: Edit,
  },
  {
    name:'NavigationMenu',
    path: "/film/:id",
    component: About,
  },
  {
    name: "Create",
    path: "/AddFilm",
    component: Create,
  },
  {
    name:'Registration',
    path:'/user/registration',
    component: Registration,
  },
  {
    name:'Login',
    path:'/user/login',
    component: Login,
  },
  {
    name:'Profile',
    path:'/user/profile',
    component: Profile,
  },
  {
    name:'BuyProduct',
    path:'/buyproduct/:id',
    component: BuyProduct,
  },
  {
    name:'AddBalance',
    path:'/deposit',
    component: AddBalance,
  },
  {
    name:'MyFilms',
    path:'/myfilms',
    component: MyFilms,
  },
  {
    name:'Info',
    path:'/info',
    component: Info,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
