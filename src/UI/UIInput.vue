<template>
  <div v-if="hasIcon" class="ui-input-wrapper" :class="wrapperClasses">
    <span v-if="icon && iconPosition === 'left'" class="ui-input__icon">
      <img :src="iconSrc" alt="Search Icon" />
    </span>

    <input
        :class="classes"
        :type="type"
        :placeholder="props.placeholder"
        :value="modelValue"
        :disabled="disabled"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <span v-if="icon && iconPosition === 'right'" class="ui-input__icon">
      <img :src="iconSrc" alt="Search Icon" />
    </span>
  </div>

  <input
      v-else
      :class="classes"
      :type="type"
      :placeholder="$t('inputPlaceholder')"
      :value="modelValue"
      :disabled="disabled"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type {Variant} from "@/utils/types/types.ts";

interface Props {
  variant?: Variant;
  type?: HTMLInputElement['type'];
  modelValue?: string;
  disabled?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  type: 'text',
  modelValue: '',
  disabled: false,
  icon: undefined,
  iconPosition: 'left'
});

defineEmits(['update:modelValue']);

const classes = computed(() => [
  'ui-input',
  `ui-input--${props.variant}`,
  { 'ui-input--disabled': props.disabled }
]);

const hasIcon = computed(() => !!props.icon);

const wrapperClasses = computed(() => [
  hasIcon.value ? `ui-input-wrapper--icon-${props.iconPosition}` : ''
]);

const iconSrc = computed((): string | undefined => {
  return props.icon ? new URL(`../assets/icons/${props.icon}`, import.meta.url).href : undefined;
});
</script>

<style lang="scss" scoped>
.ui-input-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;

  &--icon-left .ui-input {
    padding-left: 40px;
  }
  &--icon-right .ui-input {
    padding-right: 40px;
  }

  .ui-input__icon {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 100%;
    pointer-events: none;
  }

  &--icon-left .ui-input__icon {
    left: 8px;
  }

  &--icon-right .ui-input__icon {
    right: 8px;
  }
}

.ui-input {
  width: 100%;
  height: 32px;
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 14px;
  border: 1px solid #ccc;
  transition: border-color 0.2s ease;

  &--primary {
    border-color: #4B6EB9;
  }

  &--secondary {
    border-color: #874BAD;
  }

  &--attention {
    border-color: #E63246;
  }

  &:focus {
    outline: none;
    border-color: #4B6EB9;
  }

  &--disabled {
    background-color: #f3f3f3;
    cursor: not-allowed;
  }
}
</style>
