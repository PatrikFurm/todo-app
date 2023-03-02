<template>
  <!-- use link only in main item -->
  <div v-if="itemId">
    <router-link :to="`/${itemId}`" class="flex-grow-1 todo-list-item-header-link">
      <ItemDescription :title="title" :description="description"/>
    </router-link>
    <DeadlineButton @deadline-delete="emit('deadlineDelete')" :deadline="deadline"/>
  </div>

  <div v-else>
    <ItemDescription :title="title" :description="description"/>
    <DeadlineButton @deadline-delete="emit('deadlineDelete')" :deadline="deadline"/>
  </div>
</template>

<script setup>
/**
 * Imports
 */

import ItemDescription from "@/components/ItemDescription.vue";
import DeadlineButton from "@/components/DeadlineButton.vue";

/**
 * Props
 */

const props = defineProps({
  itemId: {
    type: [String, Number],
    default: null,
  },
  isParent: {
    type: Boolean,
    default: false,
  },
  isStandAlone: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  deadline: {
    type: Number,
    default: ''
  }
})

/**
 * Emits
 */

const emit = defineEmits(['deadlineDelete'])
</script>