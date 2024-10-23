import { createRouter, createWebHistory } from 'vue-router';
import UsersListView from '@/views/UsersListView.vue';
import ProfileView from '@/views/ProfileView.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { name: "main" },
      redirect: { name: 'users' },
      children: [
        {
          path: "users",
          component: UsersListView,
          name: "users",
        },
        {
          path: "profile/:userId",
          component: ProfileView,
          name: "profile",
        },
      ]
    },
  ]
})
router.beforeEach((to, from, next) => {
  const lastVisitedRoute = localStorage.getItem('lastVisitedRoute');
  
  // Если это первый переход и нет ручного выбора маршрута, восстанавливаем сохранённый маршрут
  if (!from.name && lastVisitedRoute && to.fullPath === '/') {
    next(lastVisitedRoute); // Переход на сохраненный маршрут
  } else {
    next(); // Продолжаем обычную навигацию
  }
});

export default router;
