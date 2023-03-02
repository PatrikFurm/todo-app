<template>
  <span v-if="deadline" class="todo-list-item-deadline border rounded p-1 px-2 d-inline-flex align-items-center">
    <BIconCalendarEvent class="me-2"/>
    {{deadlineFormatted}}
    <BIconXCircle @click="emit('deadlineDelete')" class="ms-2 todo-list-item-deadline-delete"/>
  </span>
</template>

<script setup>
/**
 * Imports
 */

import {BIconCalendarEvent, BIconXCircle} from 'bootstrap-icons-vue'
import {computed} from "vue";
import {DATETIME} from "@/helpers/DateHelper";

/**
 * Props
 */

const props = defineProps({
  deadline: {
    type: [String, Number],
    default: ''
  }
})

/**
 * Emits
 */

const emit = defineEmits(['deadlineDelete'])

/**
 * Deadline formatter
 */

const deadlineFormatted = computed(() => {
  return DATETIME.valueFormatter(props.deadline)
})
</script>