import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/LoginPage.vue'; // 登录页
import HealthManagement from '../components/HealthManagement.vue'; // 健康管理主页
import UpdateInformation from '../components/UpdateInformation.vue' // Users update/upload their health information
import ReportGeneration from '@/components/ReportGeneration.vue'; // Users generate reports
import ReportReview from '@/components/ReportReview.vue'; // User review their reports

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
  },
  {
    path: '/UpdateInformation',
    name: 'UpdateInformation',
    component: UpdateInformation,
  },
  {
    path: '/ReportGeneration',
    name: 'ReportGeneration',
    component: ReportGeneration,
  },
  {
    path: '/ReportReview',
    name: 'ReportReview',
    component: ReportReview,
  },
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