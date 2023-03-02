<template>
  <div class="input-group mb-1" :class="{'is-invalid' : !!error}">
    <slot name="beforeText"></slot>
    <input
      v-model="textValue"
      ref="input"
      :id="name"
      :type="type"
      class="form-control"
      :class="{'is-invalid' : !!error}"
      :placeholder="placeholder"
      :disabled="disabled"
    >
    <slot name="afterText"></slot>
  </div>
</template>

<script setup>
/**
 * Imports
 */
import {computed, inject, ref } from 'vue'
const error = inject('error')
const name = inject('name')

/**
 * Props
 */
const props = defineProps({
  modelValue: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: 'text'
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

/**
 * Emits
 */

const emit = defineEmits(["update:modelValue"]);


/**
 * Data
 */

const textValue = computed({
  get: () => {
    return props.modelValue;
  },
  set: (modifiedValue) => {
    emit("update:modelValue", modifiedValue);
  }
})
</script>