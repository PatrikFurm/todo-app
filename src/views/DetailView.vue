<template>
  <div
    v-if="isLoading"
    class="d-flex justify-content-center mt-5"
  >
    <div
      class="spinner-border text-primary"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-else>
    <router-link
      to="/"
      tag="button"
      class="btn btn-outline-warning d-inline-flex align-items-center"
    >
      <BIconCaretLeft class="me-2"/>
      Back
    </router-link>

    <TodoListItems v-model="filteredItems" :is-detail="true"/>
  </div>
</template>

<script setup>
/**
 * Imports
 */

import {useRoute, useRouter} from 'vue-router'
import {BIconCaretLeft} from 'bootstrap-icons-vue';
import {useTodoStore} from "@/stores";
import {computed, ref} from "vue";
import AddNewItem from "@/components/AddNewItem.vue";
import TodoListItem from "@/components/TodoListItem.vue";
import TodoListItems from "@/components/TodoListItems.vue";
import {deburr} from "lodash";
import DateInput from "@/components/Form/DateInput.vue";

/**
 * Router
 */

const router = useRouter()
const route = useRoute()

/**
 * Stores
 */

const isLoading = ref(true)
const todoStore = useTodoStore()
todoStore.setActiveTodo(route.params.id)
  .then(res => {
    if (res === undefined) router.push({name: 'error'})
  }).finally(() => {
  isLoading.value = false
})

/**
 * Sorted and filtered Items
 */

const filteredItems = computed(() => {
  return [todoStore.todos[todoStore.todo]]
})
</script>