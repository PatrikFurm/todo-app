<template>
  <ToggleChildren
    v-if="isParent"
    v-model="modelValue.expanded"
  />

  <div
    @mouseover="hoveredItem = true"
    @mouseleave="hoveredItem = false"
    class="d-flex justify-content-between w-100 todo-list-item--inner rounded"
  >
    <div
      v-if="!isEditing"
      class="d-flex justify-content-between w-100"
    >

      <div
        class="todo-list-item-header d-flex align-items-start flex-grow-1"
        :class="[modelValue.done === true ? 'todo-list-item-header--done' : '']"
      >
        <input
          v-model="dataValue.done"
          :id="`done${index}${isParent ? '' : 'child'}`"
          class="form-check-input me-3 mt-2"
          type="checkbox"
        >

        <todoItemHeader
          :class="[!dataValue.done && dataValue.deadline !== null && dataValue.deadline <= new Date() ? 'text-danger' : '']"
          :item-id="isParent && !isStandAlone ? modelValue.id : null"
          :title="dataValue.title"
          :description="dataValue.description"
          :deadline="dataValue.deadline"
          @deadline-delete="dataValue.deadline = null"
        />

      </div>

      <ActionButtons
        :item-id="dataValue.id"
        :show-actions="isParent || hoveredItem"
        :is-deleting="isDeleting"
        :deadline="dataValue.deadline"
        @removeItem="removeItem()"
        @edit-item="isEditing = true"
        @deadline-update="updateDeadline"
      />
    </div>
    <CreateEditItem
      v-else
      :item="dataValue"
      @close-form="isEditing = false"
    />
  </div>

  <AnimateHeight
    v-if="isParent"
    :duration="500"
    :height="dataValue.expanded ? 'auto' : 0"
  >
    <div class="position-relative">
      <div
        v-if="isLoading"
        class="d-flex justify-content-center mb-4 position-absolute todo-list-item-loading"
      >
        <div
          class="spinner-border text-primary"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <slot></slot>
    </div>
  </AnimateHeight>
</template>

<script setup>
/**
 * Imports
 */

import {computed, ref, watch} from "vue"
import AnimateHeight from 'vue-animate-height';
import ToggleChildren from "@/components/ToggleChildren.vue";
import ActionButtons from "@/components/ActionButtons.vue";
import {useTodoStore} from "@/stores";
import {throttle} from "lodash";
import CreateEditItem from "@/components/CreateEditItem.vue";
import TodoItemHeader from "@/components/TodoItemHeader.vue";

/**
 * Stores
 */

const todoStore = useTodoStore()

/**
 * Loading state
 */

const isLoading = ref(false)

/**
 * Props
 */

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  isParent: {
    type: Boolean,
    default: false,
  },
  isStandAlone: {
    type: Boolean,
    default: false,
  },
  index: {
    type: Number,
    default: 0,
  },
  initialHeight: {
    type: [String, Number],
    default: 'auto'
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

/**
 * Update data
 */

const updateItemData = throttle(async (fetchChildren = false) => {
  await todoStore.updateItem(dataValue.value)

  if (fetchChildren && dataValue.value.hasOwnProperty('children') && dataValue.value.children.length === 0) {
    await todoStore.fetchTasks(dataValue.value.id)
    isLoading.value = false
  }
}, 500)

/**
 * Watch for changes
 */

watch([() => dataValue.value.expanded, () => dataValue.value.done, () => dataValue.value.deadline], (newValue, oldValue) => {
  if (newValue[0] === true && oldValue[0] === false && dataValue.value.hasOwnProperty('children') && dataValue.value.children.length === 0) isLoading.value = true
  updateItemData(newValue[0] === true && oldValue[0] === false)
})


/**
 * Show action on hover
 */

const hoveredItem = ref(false)

/**
 * Remove item
 */

const isDeleting = ref(false)
const removeItem = async () => {
  isDeleting.value = true
  await todoStore.removeItem(dataValue.value)
  isDeleting.value = false
}

const updateDeadline = (deadline) => {
  dataValue.value.deadline = deadline
}

/**
 * Edit State
 */

const isEditing = ref(false)
</script>