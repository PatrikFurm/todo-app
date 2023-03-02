<template>

  <div class="row">
    <div class="col-lg-4 mb-2">
      <SearchItems @searchQueryChanged="search = $event"/>
    </div>

    <div class="col-lg-4 mb-2">
      Filter:
      <select v-model="filterDoneActiveAll">
        <option :value="[true, false]">All</option>
        <option :value="[false]">Active</option>
        <option :value="[true]">Done</option>
      </select>
    </div>

    <div class="col-lg-4  mb-2">
      Sort:
      <select v-model="sort">
        <option :value="(a, b) => 0">Default</option>
        <option :value="(a,b) => a.title.localeCompare(b.title)">Title</option>
        <option :value="(a,b) => new Date(b.deadline) - new Date(a.deadline)">Due Date</option>
      </select>
    </div>
  </div>

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


  <TodoListItems
    v-else
    v-model="filteredItems"
  />
</template>

<script setup>
/**
 * Imports
 */

import {computed, ref} from "vue";
import SearchItems from "@/components/SearchItems.vue";
import {deburr} from 'lodash';
import {useTodoStore} from "@/stores";
import TodoListItems from "@/components/TodoListItems.vue";

/**
 * Stores
 */

const isLoading = ref(false)
const todoStore = useTodoStore()
if (todoStore.todosLength === 0) {
  isLoading.value = true
  todoStore.fetchTodos().then(() => {
    isLoading.value = false;
  })
}


/**
 * Search
 */

const search = ref('')

/**
 * Sort
 */

const sort = ref((a, b) => 0)

/**
 * Filter
 */

const filterDoneActiveAll = ref([true, false])

/**
 * Sorted and filtered Items
 */

const filteredItems = computed(() => {
  // first search query
  const searchedData = todoStore.todos.filter(item => {
    const childrenFound = item.children.filter(child =>
      deburr(child.title.toLowerCase()).includes(deburr(search.value.toLowerCase()))
    )
    return deburr(item.title.toLowerCase()).includes(deburr(search.value.toLowerCase())) || childrenFound.length > 0;
  })

  // filter
  const filteredData = searchedData.filter(item => filterDoneActiveAll.value.includes(item.done))

  // sort
  return filteredData.sort(sort.value)
})
</script>