<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { useCategoriesStore, defaultCategories } from '../stores/categories'
import { useGameStateStore } from '../stores/gameState'
import { fetchGeneratedCategories } from '../api/categoryGenerator'

import CategoryItem from '../components/CategoryItem.vue'
import GameButton from '../components/GameButton.vue'
import MashNumber from '../components/MashNumber.vue'
import RandomNumberModal from '../components/RandomNumberModal.vue'

const state = useGameStateStore()
const categories = useCategoriesStore()
const speed = ref(500)
const timeoutId = ref(-1)
const randomNumberModal = useTemplateRef('randomNumberModal')

function play() {
  if (timeoutId.value !== -1) {
    return
  }
  ;(function performNext() {
    const step = state.next()

    if (step === 'finished') {
      timeoutId.value = -1
      return
    }

    if (step === 'step') {
      click.play()
    }

    if (step === 'strike') {
      discard.play()
    }
    timeoutId.value = setTimeout(
      performNext,
      step === 'strike' ? speed.value * 4 : speed.value,
    ) as unknown as number
  })()
}

function stop() {
  clearTimeout(timeoutId.value)
  timeoutId.value = -1
}

function reset() {
  state.reset()
}

function emojiForSpeed(speed: number) {
  return {
    150: '⚡️⚡️⚡️⚡️⚡️⚡️⚡️',
    200: '⚡️⚡️⚡️⚡️⚡️⚡️',
    250: '⚡️⚡️⚡️⚡️⚡️',
    300: '⚡️⚡️⚡️⚡️',
    350: '⚡️⚡️⚡️️',
    400: '⚡️⚡️',
    450: '️⚡️',
    500: '️ ',
    550: '️🐌',
    600: '️🐌🐌',
    650: '🐌🐌🐌️',
    700: '🐌🐌🐌️',
    750: '🐌🐌🐌🐌️',
    800: '🐌🐌🐌🐌🐌',
    850: '🐌🐌️🐌🐌🐌🐌',
  }[speed]
}

const speedOptions = [
  { value: 150, label: '⚡️⚡️⚡️⚡️⚡️⚡️⚡️' },
  { value: 200, label: '⚡️⚡️⚡️⚡️⚡️⚡️' },
  { value: 250, label: '⚡️⚡️⚡️⚡️⚡️' },
  { value: 300, label: '⚡️⚡️⚡️⚡️' },
  { value: 350, label: '⚡️⚡️⚡️️' },
  { value: 400, label: '⚡️⚡️' },
  { value: 450, label: '️⚡️' },
  { value: 500, label: '️ ' },
  { value: 550, label: '️🐌' },
  { value: 600, label: '️🐌🐌' },
  { value: 650, label: '🐌🐌🐌️' },
  { value: 700, label: '🐌🐌🐌️' },
  { value: 750, label: '🐌🐌🐌🐌️' },
  { value: 800, label: '🐌🐌🐌🐌🐌' },
  { value: 850, label: '🐌🐌️🐌🐌🐌🐌' },
]

const click = new Audio('./click.wav')
const discard = new Audio('./discard.wav')

const generatorTheme = ref('')
const generatorNumCategories = ref(4)
const generatorNumOptions = ref(4)
const generatorLoading = ref(false)
const generatorError = ref('')
const showGeneratorForm = ref(false)

function selectDefault(event: Event) {
  const value = (event.target as HTMLInputElement).value
  if (value === '__generator__') {
    showGeneratorForm.value = true
    categories.categories = []
  } else {
    showGeneratorForm.value = false
    categories.useDefault(value)
  }
}

async function generateCategories() {
  generatorLoading.value = true
  generatorError.value = ''
  try {
    const result = await fetchGeneratedCategories({
      theme: generatorTheme.value,
      num_categories: generatorNumCategories.value,
      num_options: generatorNumOptions.value,
    })
    categories.categories = result.categories // Use the correct property from the API response
    showGeneratorForm.value = false
  } catch (e: any) {
    generatorError.value = e.message || 'Failed to generate categories.'
  } finally {
    generatorLoading.value = false
  }
}
</script>

<template>
  <RandomNumberModal ref="randomNumberModal" @close="play" />
  <div class="w-full flex items-center justify-center">
    <button
      v-if="state.pointer[0] === -1"
      style="font-family: Modak"
      class="text-4xl text-pink-500 hover:text-pink-400"
      @click="reset"
    >
      Restart?
    </button>
    <button
      v-else-if="state.mashNumber < 0"
      style="font-family: Modak"
      class="text-6xl text-violet-500 hover:text-violet-400"
      @click="randomNumberModal?.open"
      :class="{ invisible: categories.categories.length === 0 }"
    >
      Go!
    </button>
    <div
      v-else-if="state.mashNumber"
      class="grid grid-cols-1 w-full place-items-center gap-4 fixed top-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900"
    >
      <MashNumber :currentCount="state.currentCount" :mashNumber="state.mashNumber" />
    </div>
  </div>

  <div v-if="state.mashNumber < 0" class="grid grid-cols-1 w-full place-items-center gap-4 p-4">
    <select
      name="defaults"
      id="default-select"
      class="bg-zinc-800 p-4 rounded text-white"
      @change="selectDefault"
    >
      <option value="">Select a default</option>
      <option v-for="(category, key) in defaultCategories" :value="key" :key="key">
        {{ key }}
      </option>
      <option value="__generator__">Use category generator</option>
    </select>
    <div v-if="showGeneratorForm" class="mt-4 bg-zinc-800 p-4 rounded w-full max-w-md flex flex-col gap-2">
      <label class="text-sm">Theme
        <input v-model="generatorTheme" class="w-full p-2 rounded bg-zinc-700 text-white mt-1" placeholder="e.g. Fantasy" />
      </label>
      <label class="text-sm">Number of categories
        <input v-model.number="generatorNumCategories" type="number" min="2" max="10" class="w-full p-2 rounded bg-zinc-700 text-white mt-1" />
      </label>
      <label class="text-sm">Options per category
        <input v-model.number="generatorNumOptions" type="number" min="2" max="10" class="w-full p-2 rounded bg-zinc-700 text-white mt-1" />
      </label>
      <button @click="generateCategories" :disabled="generatorLoading" class="mt-2 bg-pink-500 hover:bg-pink-400 text-white rounded p-2">
        {{ generatorLoading ? 'Generating...' : 'Generate Categories' }}
      </button>
      <div v-if="generatorError" class="text-red-400 text-xs mt-2">{{ generatorError }}</div>
    </div>
  </div>

  <div class="grid sm:grid-cols-2 xl:grid-cols-4 gap-2 justify-center">
    <CategoryItem
      v-for="(category, index) in categories.categories"
      :key="category.title"
      :title="category.title"
      :options="category.options"
      :group="index"
      :pointer="state.pointer[0] === index ? state.pointer[1] : -1"
      :editable="state.mashNumber < 0"
      @new="() => categories.addOptionToCategory(category, { title: '', state: 'waiting' })"
      @deleteCategory="() => categories.removeCategory(category)"
      @deleteOption="(index) => categories.removeOptionFromCategory(category, index)"
    />
    <button
      @click="
        categories.addOptionToCategory(
          categories.addCategory({ title: 'New category', options: [] }),
          { title: '', state: 'waiting' },
        )
      "
      v-if="state.mashNumber < 0"
      class="border border-zinc-600 rounded w-80 h-32 mx-auto my-4"
    >
      +
    </button>
  </div>
  <div class="h-32"></div>

  <div
    v-if="state.pointer[0] !== -1 && state.mashNumber > 0"
    class="grid grid-cols-1 w-full place-items-center gap-4 p-4 z-10 fixed bottom-0 bg-zinc-900"
  >
    <div class="flex gap-4">
      <GameButton :color="'teal'" :pressed="timeoutId > 0" @click="play()">▶</GameButton>
      <GameButton :color="'pink'" :pressed="timeoutId === -1" @click="stop()">■</GameButton>
    </div>
    <div class="flex flex-col gap-2 text-center">
      <label for="speed-control">{{ emojiForSpeed(speed) }}</label>
      <input
        if="speed-control"
        v-model="speed"
        type="range"
        min="150"
        max="850"
        step="50"
        style="direction: rtl"
        class="w-96"
      />
    </div>
  </div>
</template>
