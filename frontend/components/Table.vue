import type { Logo } from '#build/components'; import type {
routerViewLocationKey } from 'vue-router'; import type { routerViewLocationKey }
from 'vue-router';
<script lang="ts" setup>
const { rows, headers } = defineProps({
  headers: {
    type: [String],
    default: () => [],
  },
  rows: {
    type: [],
    default: () => [],
  },
})
const emit = defineEmits(['click-row'])
const handleClickRow = (row) => {
  emit('click-row', row)
}
</script>

<template>
  <div class="relative overflow-x-auto overflow-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-xs text-slate-800 uppercase bg-slate-100">
        <tr>
          <th
            scope="col"
            class="px-6 py-3"
            v-for="header in headers"
            :key="header"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b cursor-pointer hover:bg-slate-100"
          v-for="row in rows"
          :key="row.id"
          @click="handleClickRow(row)"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {{ row.name }}
          </th>
          <td class="px-6 py-4">{{ row.category.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
