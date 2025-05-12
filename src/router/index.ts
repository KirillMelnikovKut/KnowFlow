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
import AuthPage from "@/views/AuthPage.vue";
import CoursePage from "@/views/CoursePage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import SupportPage from "@/views/SupportPage.vue";
import QuestsPage from "@/views/QuestsPage.vue";
import AdminPage from "@/views/AdminPage.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            { path: '', component: MainPage },
            { path: '/profile', component: ProfilePage },
            { path: "/support", component: SupportPage },
            { path: "/course/:courseId", component: CoursePage, props: true },
        ],
    },
    {
        path: '/',
        component: EmptyLayout,
        children: [
            { path: 'auth', component: AuthPage },
            {path: 'questsgame', component: QuestsPage},
            {path: 'admin', component: AdminPage },
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

    const hasVisitedBefore = useLocalStorage<boolean>(
        LOCAL_STORAGE_KEYS['hasVisited'],
        false
    );

    if (!hasVisitedBefore.value) {
        hasVisitedBefore.value = true;

        if (to.path !== '/questsgame') {
            return next('/questsgame');
        }
    }

    if (to.name === 'Auth') {
        authenticated.value = false;
    }

    if (to.meta.requiresAuth && !authenticated.value) {
        return next('/auth');
    }

    return next();
});

export default router;
