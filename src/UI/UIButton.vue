<template>
  <component
      :is="component"
      v-bind="linkProps"
      :class="classes"
      :type="type"
      :disabled="disabled"
      :aria-disabled="disabled"
  >
    <span v-if="hasIconLeft" class="ui-button__icon-left">
      <slot name="icon-left" />
    </span>

    <img
        v-if="iconSrc"
        :src="iconSrc"
        alt="icon"
        class="ui-button__icon"
        :style="{ width: iconSize, height: iconSize }"
    />

    <span v-if="isDefaultShape && label" class="ui-button__label">
      <UITItile :text="label" :tag="props.tag" :size="props.size" :color="props.colorText" />
    </span>

    <span v-if="hasIconRight" class="ui-button__icon-right">
      <slot name="icon-right" />
    </span>
  </component>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import { RouterLink } from 'vue-router'
import UITItile from "@/UI/UITItile.vue";
import type {Size, Variant} from "@/utils/types/types.ts";



interface Props {
  variant?: Variant;
  shape?: 'default' | 'icon' | 'circle-icon';
  type?: HTMLButtonElement['type'];
  pending?: boolean;
  label?: string;
  href?: string;
  to?: string;
  disabled?: boolean;
  icon?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: Size;
  iconSize?: string;
  colorText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  shape: 'default',
  type: 'button',
  tag: 'h2',
  size: 'medium',
  disabled: false,
  label: undefined,
  href: undefined,
  to: undefined,
  icon: undefined,
  iconSize: '32px'
})

const slots = useSlots()

const component = computed(() =>
    props.to ? RouterLink : props.href ? 'a' : 'button'
)

const linkProps = computed(() =>
    props.to ? { to: props.to } : { href: props.href }
)

const type = computed(() => (props.href || props.to ? null : props.type))
const disabled = computed(() => props.disabled || props.pending)
const isDefaultShape = computed(() => props.shape === 'default')

const hasIconLeft = computed(() => !!slots['icon-left'])
const hasIconRight = computed(() => !!slots['icon-right'])

const iconSrc = computed(() => {
  return props.icon
      ? new URL(`../assets/icons/${props.icon}`, import.meta.url).href
      : null;
})

const iconSize = computed(() => props.iconSize)

const classes = computed(() => [
  'ui-button',
  `ui-button--${props.variant}`,
  `ui-button--${props.shape}`,
  props.icon ? 'ui-button__has-prop-icon' : ''
]);
</script>

<style lang="scss" scoped>
.ui-button {
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  cursor: pointer;
  font-size: 16px;
  line-height: 20px;
  transition: all 0.2s ease;
  border: none;
  border-radius: 14px;
  gap: 16px;

  &:active:not(:disabled) {
    opacity: 0.7;
  }

  &:disabled {
    cursor: default;
    pointer-events: none;
    opacity: 0.7;
  }

  &--primary {
    background-color: #4B6EB9;
    color: white;
    width: 140px;
  }

  &--secondary {
    background-color: #874BAD;
    color: white;
  }

  &--attention {
    background-color: #E63246;
  }
  &--transparent {
    background: none;
  }
}

.ui-button__icon {
  cursor: pointer;
  background-color: transparent;
  padding: 0;
  opacity: 1;
  border: none;
  box-shadow: none;
}

.ui-button__icon-left,
.ui-button__icon-right {
  display: inline-flex;
  align-items: center;
}

.ui-button__icon-left {
  margin-right: 8px;
}

.ui-button__icon-right {
  margin-left: 8px;
}

.ui-button__label {
  display: inline-flex;
  align-items: center;
}
</style>
