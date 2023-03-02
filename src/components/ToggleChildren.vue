<template>
  <div
    class="todo-list-item-toggle-height position-absolute"
    :class="[dataValue ? 'todo-list-item-toggle-height--active' : '']"
    @click="dataValue = !dataValue"
  >
    <BIconChevronRight/>
  </div>
</template>

<script setup>
/**
 * Imports
 */

import {BIconChevronRight} from 'bootstrap-icons-vue'
import {computed} from "vue";

/**
 * Props
 */

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})

/**
 * Emits
 */

const emit = defineEmits(["update:modelValue"]);


/**
 * Data
 */

const dataValue = computed({
  get: () => {
    return props.modelValue;
  },
  set: (modifiedValue) => {
    emit("update:modelValue", modifiedValue);
  }
})
</script>