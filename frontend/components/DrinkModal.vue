<script lang="ts" setup>
const { selectedDrink, showModal } = defineProps({
  selectedDrink: {
    type: Object,
    default: () => ({}),
  },
  showModal: {
    type: Boolean,
    default: false,
  },
})
const { data: drink } = useNuxtData(selectedDrink?.id)
const { data, pending } = await useLazyFetch(
  `http://localhost:4000/drinks/${selectedDrink?.id}`,
  {
    key: selectedDrink.id,
  },
)
const emit = defineEmits(['close'])
const closeModal = () => {
  emit('close')
}
</script>
<template>
  <Modal
    :title="selectedDrink?.name"
    :is-show-modal="showModal"
    @close="closeModal"
  >
    <template #body>
      <div v-if="pending && !drink">Carregando...</div>
      <div v-else>
        <nuxt-img
          class="mx-auto mb-16"
          :src="drink.image"
          width="300px"
          height="300px"
        />
        {{ drink.description }}
      </div>
    </template>
    <template #footer>
      <div class="w-full">
        <button
          @click="closeModal"
          class="bg-blue-100 text-blue-500 font-bold text-center p-4 w-full rounded-lg transition-all hover:bg-blue-500 hover:text-white"
        >
          Fechar
        </button>
      </div>
    </template>
  </Modal>
</template>
