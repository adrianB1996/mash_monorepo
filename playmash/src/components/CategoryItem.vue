<script setup lang="ts">
import { type CategoryOption } from '../stores/categories'

defineProps<{
  title: string
  options: CategoryOption[]
  group: number
  pointer: number
  editable: boolean
}>()

const emit = defineEmits<{
  new: []
  deleteCategory: []
  deleteOption: [number]
}>()
</script>

<script lang="ts"></script>

<template>
  <div class="bg-zinc-800 p-4 m-4 rounded w-80 text-white border border-zinc-600 mx-auto group">
    <button
      class="float-right text-pink-700 opacity-70"
      :class="{ 'invisible ': !editable }"
      @click="emit('deleteCategory')"
    >
      ☒
    </button>
    <input
      name="title"
      class="bg-zinc-800 text-purple-300 text-xl p-2"
      :value="title"
      :class="{ 'border-b-2 border-zinc-700': editable }"
    />
    <div
      v-for="(item, index) in options"
      :key="index"
      class="list-none px-6 py-3 flex flex-row overflow-hidden"
    >
      <span name="pointer" :class="{ invisible: index !== pointer }" class="mr-2">
        <span v-if="item.state === 'discarded'">❌</span>
        <span v-else>👉</span>
      </span>
      <input
        name="option"
        :id="`option-${group}-${index}`"
        :class="[
          {
            'text-teal-500 font-bold text-xl': item.state === 'chosen',
            'border-b-2 border-zinc-700': editable,
            'line-through decoration-2 decoration-pink-500 text-sm text-zinc-500':
              item.state === 'discarded',
          },
          'bg-zinc-800',
          'h-7',
        ]"
        v-model="item.title"
        :disabled="!editable"
        placeholder="change me"
      />
      <button
        class="text-pink-700 visible opacity-50 px-px py-1"
        :class="{ 'invisible ': !editable }"
        @click="emit('deleteOption', index)"
      >
        ✘
      </button>
    </div>
    <button
      v-if="editable"
      @click="emit('new')"
      class="w-full bg-zinc-700 hover:bg-zinc-600 p-2 rounded"
    >
      +
    </button>
  </div>
</template>
