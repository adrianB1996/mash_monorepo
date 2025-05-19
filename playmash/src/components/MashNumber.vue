<script setup lang="ts">
defineProps<{
  currentCount: number
  mashNumber: number
}>()
</script>

<template>
  <div
    style="font-family: Modak"
    class="h-40 flex flex-col justify-center items-center"
    :class="{
      'animate-heartbeat text-violet-500 text-8xl': currentCount === 0,
      'text-6xl': currentCount !== 0,
    }"
  >
    <span>{{ currentCount === 0 ? mashNumber : currentCount }}</span>
  </div>
</template>
