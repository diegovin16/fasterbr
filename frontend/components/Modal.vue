<template>
  <fwb-modal v-if="isShowModal" @close="closeModal">
    <template #header>
      <div class="flex items-center text-2xl font-bold">{{ title }}</div>
    </template>
    <template #body>
      <slot name="body" />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </fwb-modal>
</template>

<script lang="ts" setup>
import { FwbModal } from 'flowbite-vue'

const { title, isShowModal } = defineProps({
  title: {
    type: String,
    required: true,
  },
  isShowModal: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

function closeModal() {
  emit('close')
}
</script>
