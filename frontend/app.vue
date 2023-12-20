<script setup lang="ts">
import type { CategoryType } from './types/category'
import type { DrinkType } from './types/drink'
const { data: categories } = useFetch('http://localhost:4000/categories', {
  lazy: true,
  transform: (categories: CategoryType[]) =>
    categories?.map((category) => ({
      label: category.name,
      value: category.id,
    })),
})

const isError = ref(false)
const selectedCategory = ref('')
const search = ref('')
const isLoading = ref(false)
const selectedDrink = ref<Partial<DrinkType> | null>(null)
const isFinished = ref(false)
const drinksList = ref<DrinkType[] | null>(null)
const showModal = ref(false)

const fetchDrinksByCategory = async (category?: string, search?: string) => {
  isLoading.value = true
  drinksList.value = []
  const { data: drinks } = await useFetch('http://localhost:4000/drinks', {
    query: {
      search,
      category,
    },
    server: false,
    onResponseError() {
      isError.value = true
    },
    onRequestError() {
      isError.value = true
    },
    onResponse() {
      isError.value = false
    },
  })
  isLoading.value = false
  drinksList.value = drinks.value as DrinkType[]
  isFinished.value = true
}

const handleSubmit = (e: any) => {
  const { categories, search: searchReceived } = e.target.elements
  fetchDrinksByCategory(categories.value, searchReceived.value)
  selectedCategory.value = categories.value
  search.value = searchReceived.value
}
const handleSelectDrink = async ({ id, name }: any) => {
  selectedDrink.value = {
    id,
    name,
  }
  showModal.value = true
}
const handleCloseModal = () => {
  showModal.value = false
  selectedDrink.value = null
}
</script>

<template>
  <div
    class="bg-slate-100 h-screen w-screen flex items-center flex-col overflow-x-hidden"
  >
    <DrinkModal
      v-if="selectedDrink?.id"
      :show-modal="showModal"
      :selected-drink="selectedDrink"
      @close="handleCloseModal"
    />

    <div class="mt-32 w-full max-w-3xl px-4 sm:px-16 flex flex-col gap-2 mb-16">
      <Logo />
      <Section>
        <SearchWithSelect
          name="search"
          placeholder="Pesquise o nome da bebida"
          @submit.prevent="handleSubmit"
        >
          <template #select>
            <Select
              name="categories"
              :options="categories || []"
              class="rounded-r-none"
            />
          </template>
        </SearchWithSelect>
      </Section>
      <p v-if="isError" class="text-red-400 text-sm text-center mt-4">
        Houve um erro, tente novamente mais tarde.
      </p>

      <Section v-if="!!drinksList" class="mt-2 flex-1">
        <div v-if="isLoading" class="w-full flex flex-col gap-4">
          <Skeleton class="w-full h-[40px]" v-for="_ in 4" />
        </div>
        <div v-else class="w-full">
          <p
            v-if="!drinksList?.length"
            class="text-sm text-slate-500 italic text-center my-4"
          >
            Nenhum resultado encontrado
          </p>
          <Table
            v-else
            :headers="['Nome da bebida', 'Categoria']"
            :rows="drinksList"
            @click-row="handleSelectDrink"
          />
        </div>
      </Section>
    </div>
  </div>
</template>
