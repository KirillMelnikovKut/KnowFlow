<template>
  <component :is="tag" :class="classes" :style="{ color: color }">
    {{ text }}
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type {Size} from "@/utils/types/types.ts";

interface Props {
  text: string;
  size?: Size;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  tag: 'h2',
  color: '#000'
});

const classes = computed(() => [
  'ui-title',
  `ui-title--${props.size}`
]);
</script>

<style lang="scss" scoped>
.ui-title {
  font-weight: bold;
  margin: 0;

  &--small {
    font-size: 16px;
    font-weight: normal;
  }

  &--medium {
    font-size: 24px;
    font-weight: normal;
  }

  &--large {
    font-size: 32px;
  }
}
</style>
