<template>
  <div class="sidebar">
    <div class="sidebar-navigation">
      <RouterLink
          v-for="(item, index) in menuItems"
          :key="index"
          :to="item.route"
          class="router-link"
      >
        <UIButton
            :label="item.label"
            :variant="item.variant"
            :icon="item.icon"
            :icon-left="item.iconLeft"
            :colorText="item.colorText"
            :size="item.size"
        />
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import UIButton from "@/UI/UIButton.vue";
import type { Size, Variant } from "@/utils/types/types.ts";

interface MenuItem {
  label: string;
  variant: Variant;
  icon: string;
  iconLeft: boolean;
  colorText: string;
  size: Size;
  route: string;
}

const menuItems: MenuItem[] = [
  {
    label: "Личный кабинeт",
    variant: "transparent",
    icon: "profileIcon.svg",
    iconLeft: true,
    colorText: "#07286F",
    size: "small",
    route: "/profile",
  },
  {
    label: "Доступные курсы",
    variant: "transparent",
    icon: "mainCourses.svg",
    iconLeft: true,
    colorText: "#07286F",
    size: "small",
    route: "/",
  },
  {
    label: "Поддержка",
    variant: "transparent",
    icon: "support.svg",
    iconLeft: true,
    colorText: "#07286F",
    size: "small",
    route: "/support",
  },
];
</script>

<style scoped>
.sidebar {
  min-height: 100%;
  max-width: 260px;
  width: 100%;
}

.router-link {
  display: block;
  text-decoration: none;
}
</style>
