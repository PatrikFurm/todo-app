<template>
  <Datepicker v-model="dateFormatted" dark :is-24="true" :format="format">
    <template #trigger>
      <BIconCalendarEvent/>
    </template>
  </Datepicker>

</template>

<script setup>
/**
 * Imports
 */
import { computed } from 'vue';
import {BIconCalendarEvent} from 'bootstrap-icons-vue'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {DATETIME} from "@/helpers/DateHelper";

/**
 * Props
 */

const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: null,
  },
})

/**
 * Emits
 */

const emit = defineEmits(["update:modelValue"]);

/**
 * Format
 */

const format = (date) => {
  return DATETIME.valueFormatter(date)
}

/**
 * Model Value
 */

const dateFormatted = computed({
  get: function () {
    return props.modelValue
  },
  set: function (modifiedValue) {
    emit('update:modelValue', modifiedValue.getTime())
  }
})
</script>

<style>
.dp__main div[aria-label="Datepicker input"] {
    line-height: 0 !important;
  }

</style>