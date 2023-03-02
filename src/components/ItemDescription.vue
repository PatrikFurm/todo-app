<template>
  <div class="d-flex flex-column pb-2 align-items-start">
    <span class="todo-list-item-title fw-semibold">{{ title }}</span>
    <span class="todo-list-item-desc">{{ description }}</span>
  </div>
</template>

<script setup>

/**
 * Props
 */

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
})
</script>