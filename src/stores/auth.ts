import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        user: null as any | null,
    }),
    actions: {
        setToken(token: string) {
            this.token = token;
            localStorage.setItem('token', token);
        },
        setUser(user: any) {
            this.user = user;
        },
        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
});