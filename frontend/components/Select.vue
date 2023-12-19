<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  name: {
    type: String,
    required: true,
  },
})
const { label, options, name } = props
const handleChange = (e) => {
  emit('change', e)
}
const emit = defineEmits(['change'])
</script>

<template>
  <div>
    <label
      v-if="!!label"
      :for="name"
      class="block mb-2 text-sm font-medium text-gray-900"
      >{{ label }}</label
    >
    <select
      @change="handleChange"
      :id="name"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 min-w-[100px] md:min-w-[180px] h-10"
      v-bind="$attrs"
    >
      <option selected value="">Todas categorias</option>

      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
