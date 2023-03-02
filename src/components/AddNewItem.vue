<template>
  <span v-if="!isFormOpen" @click="isFormOpen = true" class="d-flex align-items-center">
    <BIconPlus class="me-1 text-danger"/>
    {{props.text}}
  </span>

  <CreateEditItem v-else :is-opened="isFormOpen" :parent-id="parentId" @close-form="isFormOpen = false"/>
</template>

<script setup>
/**
 * Imports
 */

import {BIconPlus} from 'bootstrap-icons-vue';
import CreateEditItem from "@/components/CreateEditItem.vue";
import {ref} from "vue";

/**
 * Props
 */

const props = defineProps({
  text: {
    type: String,
    default: 'Add Item'
  },
  parentId: {
    type: [String, Number],
    default: null,
  }
})

const isFormOpen = ref(false)

</script>