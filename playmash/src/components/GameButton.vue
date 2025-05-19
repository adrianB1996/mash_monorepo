<script setup lang="ts">
defineProps<{
  color: string
  pressed: boolean
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    @click="emit('click')"
    class="size-8 rounded border-b-4"
    v-bind:class="[
      {
        'border-none shadow-inner shadow-black brightness-75': pressed,
      },
      `bg-${color}-600`,
      `border-${color}-700`,
    ]"
  >
    <slot></slot>
  </button>
</template>
