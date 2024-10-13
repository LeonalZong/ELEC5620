import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/LoginPage.vue'; // 登录页
import HealthManagement from '../components/HealthManagement.vue'; // 健康管理主页

const routes = [
  {
    path: '/',
    name: 'Login',  // 路由名称为 'Login'
    component: LoginPage,
  },
  {
    path: '/health-management',
    name: 'HealthManagement',
    component: HealthManagement,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 导航守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.name === 'HealthManagement' && !token) {
    next({ name: 'Login' });  // 使用路由名称 'Login'
  } else if (to.name === 'Login' && token) {
    next({ name: 'HealthManagement' });
  } else {
    next();
  }
});

export default router;