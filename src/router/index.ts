import {
    createRouter,
    createWebHistory,
    type RouteRecordRaw,
} from 'vue-router';
import { useLocalStorage } from '@vueuse/core';
import MainPage from '@/views/MainPage.vue';
import {LOCAL_STORAGE_KEYS} from "@/utils/constant/localStorage.ts";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            { path: 'about', component: MainPage },
        ],
    },
    {
        path: '/login',
        component: EmptyLayout,
        children: [
        ],
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, _from, next) => {
    const authenticated = useLocalStorage<boolean>(
        LOCAL_STORAGE_KEYS['authenticated'],
        false,
    );

    if (to.name === 'Auth') {
        authenticated.value = false;
    }

    if (to.meta.requiresAuth && !authenticated.value) {
        return next('/auth');
    }

    return next();
});

export default router;
