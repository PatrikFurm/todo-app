<template>
  <ul
    class="list-unstyled todo-list mt-5"
  >
    <li
      v-for="(item, index) in dataValue"
      :key="item.id"
      class="py-2 todo-list-item mb-2 position-relative"
      :class="[dataValue.length > 1 ? 'border-bottom' : '']"
    >
      <TodoListItem
        v-model="dataValue[index]"
        :is-parent="true"
        :is-stand-alone="dataValue.length === 1"
        :initial-height="item.expanded ? 'auto' : 0"
      >
        <ul class="list-unstyled ms-5 mt-3 todo-list--child">
          <li
            v-for="(child, childIndex) in item.children"
            :key="child.id"
            class="d-flex align-items-start"
          >
            <TodoListItem v-model="item.children[childIndex]"/>
          </li>
          <li
            :key="'addChild'"
            class="todo-list-item-add todo-list-item-add--child"
          >
            <AddNewItem
              :parent-id="item.id"
              text="Add Task"
            />
          </li>
        </ul>
      </TodoListItem>
    </li>

    <li
      v-if="!isDetail"
      class="todo-list-item-add"
    >
      <AddNewItem/>
    </li>
  </ul>
</template>

<script setup>
/**
 * Imports
 */

import {computed} from "vue";
import TodoListItem from "@/components/TodoListItem.vue";
import AddNewItem from "@/components/AddNewItem.vue";

/**
 * Props
 */

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  isDetail: {
    type: Boolean,
    default: false,
  },
})

/**
 * Emits
 */

const emit = defineEmits(['update:modelValue'])

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