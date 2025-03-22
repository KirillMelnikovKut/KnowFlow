<template>
  <div class="sidebar">
    <div class="sidebar-navigation">
      <UIButton
          v-for="(item, index) in menuItems"
          :key="index"
          :label="item.label"
          :variant="item.variant"
          :icon="item.icon"
          :icon-left="item.iconLeft"
          :colorText="item.colorText"
          :size="item.size"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UIButton from "@/UI/UIButton.vue";
import type {Size, Variant} from "@/utils/types/types.ts";

interface MenuItem {
  label: string;
  variant: Variant;
  icon: string;
  iconLeft: boolean;
  colorText: string;
  size: Size;
}

const menuItems: MenuItem[] = [
  {
    label: "Личный кабинeт",
    variant: "transparent",
    icon: "profileIcon.svg",
    iconLeft: true,
    colorText: "#07286F",
    size: "small",
  },
  {
    label: "База знаний",
    variant: "transparent",
    icon: "dataIcon.svg",
    iconLeft: true,
    colorText: "#07286F",
    size: "small",
  },
  {
    label: "Доступные курсы",
    variant: "transparent",
    icon: "mainCourses.svg",
    iconLeft: true,
    colorText: "#07286F",
    size: "small",
  },
  {
    label: "Поддержка",
    variant: "transparent",
    icon: "support.svg",
    iconLeft: true,
    colorText: "#07286F",
    size: "small",
  },
];
</script>

<style scoped>
.sidebar {
  min-height: 100%;
  max-width: 260px;
  width: 100%;
}
</style>