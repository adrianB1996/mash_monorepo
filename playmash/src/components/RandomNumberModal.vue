<script setup lang="ts">
import { useGameStateStore } from '@/stores/gameState'
import { ref } from 'vue'
import ShakingPhone from './ShakingPhone.vue'
import ComputerMouse from './ComputerMouse.vue'

const state = useGameStateStore()

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['close'])

const isOpen = ref(props.isOpen)
const shakeable = ref(false)

function open() {
  isOpen.value = true
  window.addEventListener('devicemotion', generateNumber)
}

function close() {
  isOpen.value = false
  window.removeEventListener('devicemotion', generateNumber)
  emit('close')
}

function generateNumber(e?: Event | DeviceMotionEvent | undefined) {
  if (e instanceof DeviceMotionEvent) {
    shakeable.value = true
    if ((e.acceleration?.x || 0) < 3) {
      return // Not enough shaking!!
    }
  }
  state.mashNumber = Math.max(3, Math.floor(Math.random() * 12))
}

defineExpose({
  open,
  close,
})
</script>

<template>
  <div class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-20" v-if="isOpen">
    <div
      class="absolute w-full h-full bg-zinc-900 opacity-90"
      @click="
        () => {
          isOpen = false
        }
      "
    ></div>

    <div class="absolute w-80 select-none">
      <div class="bg-zinc-800 overflow-hidden rounded flex flex-col p-4">
        <div
          style="font-family: Modak"
          class="border border-zinc-600 rounded cursor-move h-72 flex flex-col justify-center items-center text-violet-500 text-8xl"
          @click="close"
          @mousemove="generateNumber"
        >
          {{ state.mashNumber === -1 ? '?' : state.mashNumber }}
        </div>
        <div class="flex flex-row">
          <div class="text-center w-full mt-4 h-10">
            <button
              @click="close"
              v-if="state.mashNumber > 0"
              class="text-white bg-teal-500 py-2 px-4 rounded cursor-pointer"
            >
              I'm ready!
            </button>

            <ShakingPhone
              v-if="shakeable"
              class="size-8 absolute bottom-4 right-4 fill-zinc-500 animate-wobble"
            />
            <ComputerMouse
              v-else
              class="size-4 absolute bottom-4 right-4 fill-zinc-500 animate-eight"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
