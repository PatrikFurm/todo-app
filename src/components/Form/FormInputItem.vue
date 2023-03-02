<template>
  <div class="position-relative">
    <label
      v-if="label"
      :for="name"
      class="form-label"
      :class="{'required': isRequired}"
    >
      {{label}}
    </label>

    <slot/>

    <div class="invalid-feedback mt-0 position-absolute">
      <Transition name="scale">
      <span v-if="error">
        {{error}}
      </span>
      </Transition>
    </div>
  </div>
</template>

<script setup>

/**
 * Imports
 */
import {provide, toRef} from 'vue'

/**
 * Props
 */

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ""
  },
  error: {
    type: String,
    default: ""
  },
  isRequired: {
    type: Boolean,
    default: false
  }
})

/**
 * Provide variables to child input
 */

provide('name', toRef(props, 'name'))
provide('error', toRef(props, 'error'))

</script>

<style>
.scale-enter-active,.scale-leave-active {
  transition: all 0.5s ease;
}
.scale-enter-from,.scale-leave-to {
  opacity: 0;  transform: scale(0.9);
}
</style>