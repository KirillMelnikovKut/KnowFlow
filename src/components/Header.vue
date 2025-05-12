<template>
  <div class="header">
    <UIButton
        label="KnowFlow"
        variant="transparent"
        icon="logo.svg"
        icon-right
        tag="h1"
        size="large"
        colorText="#07286F"
    />

    <div class="search-wrapper">
      <div class="search">
        <UIInput
            icon="search.svg"
            placeholder="Search..."
            v-model="courseStore.searchQuery"
        />
      </div>

      <CoursePreviewList
          :courses="courseStore.filteredCourses"
          :search-query="courseStore.searchQuery"
      />
    </div>

    <div class="profile-info">
      <div class="navbar">
        <UIButton variant="transparent" icon="notification.svg" />
        <UIButton variant="transparent" icon="settings.svg" />
      </div>
      <div class="profile-info__user">
        <div class="profile-name">
          <UITItile
              :text="auth.user?.first_name"
              tag="h2"
              size="medium"
              color="#07286F"
          />
          <UITItile
              :text="auth.user?.last_name"
              tag="h2"
              size="medium"
              color="#07286F"
          />
        </div>
        <UIButton
            variant="transparent"
            icon="profileUnknown.svg"
            icon-size="64px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UIButton from "@/UI/UIButton.vue";
import UIInput from "@/UI/UIInput.vue";
import UITItile from "@/UI/UITItile.vue";
import CoursePreviewList from "@/components/Courses/CoursePreviewList.vue";

import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useCoursesStore } from "@/stores/courses";

const auth = useAuthStore();
const courseStore = useCoursesStore();

onMounted(async () => {
  if (auth.token) {
    await auth.fetchUser();
  }
  await courseStore.fetchCourses();
});
</script>

<style scoped>
.header {
  position: relative; /* для dropdown */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0;
}

.search-wrapper {
  position: relative;
  width: 60%;
}

.search {
  display: flex;
  align-items: center;
  gap: 16px;
}

.navbar {
  display: flex;
  align-items: center;
  gap: 8px;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.profile-name {
  text-align: right;
  display: flex;
  gap: 4px;
  align-items: center;
}

.profile-info__user {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
