import { defineStore } from 'pinia';
import api from '@/api';

export interface Profile {
    first_name: string;
    last_name: string;
    email: string;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        user: null as Profile | null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        setToken(token: string) {
            this.token = token;
            localStorage.setItem('token', token);
        },
        setUser(user: Profile) {
            this.user = user;
        },
        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
        },

        async fetchUser() {
            if (!this.token) {
                this.user = null;
                return;
            }
            try {
                const { data } = await api.post<Profile>('/auth/me');
                this.setUser(data);
            } catch (error) {
                this.logout();
            }
        },

        async login(credentials: { email: string; password: string }) {
            const { data } = await api.post<{ token: string }>('/auth/login', credentials);
            this.setToken(data.token);
            await this.fetchUser();
        },
    },
});
