<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import HeaderImage from './components/HeaderImage.vue'
</script>

<style>
@font-face {
  font-family: Modak;
  src: url('./assets/Modak-Regular.ttf');
}
</style>

<template>
  <div class="h-full flex flex-col text-white">
    <header class="w-full text-center text-white p-4 pb-0">
      <RouterLink to="/">
        <HeaderImage class="mx-auto m-4 w-64 sm:w-72 md:w-80 animate-wiggle" />
      </RouterLink>
      <RouterLink
        to="/how-to-play"
        class="text-pink-500 underline text-xs -translate-y-4 translate-x-24 inline-block opacity-50 hover:opacity-100 w-32 animate-heartbeat"
        >How to play?</RouterLink
      >
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>
