<template>
  <div class="auth-page">
    <div class="auth-page-block">
      <UITItile :text="isLoginMode ? 'Вход' : 'Регистрация'" size="large" color="#07286F"/>
      <form class="auth-form" @submit.prevent="handleSubmit">
        <UIInput v-if="!isLoginMode" v-model=" first_name" type="text" placeholder="Имя" required />
        <UIInput v-if="!isLoginMode" v-model="last_name" type="text" placeholder="Фамилия" required />
        <UIInput v-model="email" type="email" placeholder="Email" required />
        <UIInput v-model="password" type="password" placeholder="Пароль" required />
        <UIButton class="auth-button" type="submit" :label="isLoginMode ? 'Войти' : 'Зарегистрироваться'" size="small" colorText="#fff" />
      </form>
      <UIButton @click="toggleMode" :label="isLoginMode ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'"  class="auth-button" size="small" colorText="#fff" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/api';
import { useAuthStore } from '@/stores/auth';
import UITItile from "@/UI/UITItile.vue";
import UIInput from "@/UI/UIInput.vue";
import UIButton from "@/UI/UIButton.vue";

const email = ref('');
const password = ref('');
const first_name = ref('');
const last_name = ref('');
const errorMessage = ref('');
const isLoginMode = ref(true);
const router = useRouter();
const authStore = useAuthStore();

const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value;
  errorMessage.value = '';
};

const handleSubmit = async () => {
  try {
    if (isLoginMode.value) {
      const response = await apiClient.post('/auth/login', { email: email.value, password: password.value });
      authStore.setToken(response.data.access_token);
      authStore.setUser(response.data.user);
    } else {
      const response = await apiClient.post('/auth/register', {
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        password: password.value,
      });
      authStore.setToken(response.data.access_token);
      authStore.setUser(response.data.user);
    }
    router.push('/');
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'Ошибка';
  }
};
</script>

<style scoped>
.auth-page {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.auth-page-block{
  max-width: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.auth-form{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
  gap: 1rem;
}
.auth-button{
  width: 100%;
}
</style>