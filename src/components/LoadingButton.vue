<template>
  <button class="btn position-relative loading-button">
    <span
      :class="[isLoading ? 'loading-button-spinner--active' : '']"
      class="d-flex justify-content-center position-absolute loading-button-spinner"
    >
      <span
        class="spinner-border"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </span>
    </span>

    <span
      :class="[!isLoading ? 'loading-button-text--active' : '']"
      class="loading-button-text"
    >
      <slot/>
    </span>
  </button>
</template>

<script setup>
/**
 * Props
 */

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})
</script>