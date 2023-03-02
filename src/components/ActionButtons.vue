<template>
  <div
    v-if="showActions"
    class="action-buttons justify-content-between d-flex align-items-start"
  >
    <span @click="emit('editItem')" class="p-2 d-flex action-buttons-item">
      <BIconPen/>
    </span>
    <span class="p-2 d-flex action-buttons-item">
      <DateInput v-model="date"/>
    </span>

    <!-- delete -->
    <span
      v-if="!isDeleting"
      @click="emit('removeItem', itemId)"
      class="p-2 d-flex action-buttons-item"
    >
      <BIconXCircle/>
    </span>

    <span v-else class="p-2 d-flex action-buttons-item action-buttons-item--loading">
      <BIconArrowClockwise/>
    </span>
  </div>
</template>

<script setup>
/**
 * Imports
 */

import {ref, watch} from 'vue';
import {BIconPen, BIconXCircle, BIconArrowClockwise} from 'bootstrap-icons-vue'
import DateInput from "@/components/Form/DateInput.vue";

/**
 * Emits
 */

const emit = defineEmits(['removeItem', 'editItem', 'deadlineUpdate'])

/**
 * Props
 */

const props = defineProps({
  itemId: {
    type: [Number, String],
    required: true,
  },
  showActions: {
    type: Boolean,
    default: false
  },
  isDeleting: {
    type: Boolean,
    default: true,
  },
  deadline: {
    type: [Number, String],
    default: null
  }
})

/**
 * Date model
 */

const date = ref(props.deadline)

watch(date, () => {
  emit('deadlineUpdate', date.value)
})
</script>