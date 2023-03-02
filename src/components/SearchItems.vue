<template>
  <div class="search-items position-relative d-inline-block w-100">
    <input
      class="input w-100"
      type="text"
      placeholder="Search"
      v-model="searchQuery"
      @keydown.esc="searchQuery = ''"
    >
    <div v-if="searchQuery" class="position-absolute search-items-remove p-2 d-flex">
      <BIconXLg
        @click="searchQuery = ''"
        class=""
      />
    </div>
  </div>
</template>

<script setup>
/**
 * Imports
 */

import {ref, watch} from 'vue'
import {BIconXLg} from 'bootstrap-icons-vue'

/**
 * emits
 */

const emit = defineEmits(['searchQueryChanged'])

/**
 * Search
 */

const searchQuery = ref('')
watch(searchQuery, (newValue, oldValue) => {
  emit('searchQueryChanged', newValue)
})
</script>