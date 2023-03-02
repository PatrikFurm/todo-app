<template>
  <div class="border p-2 rounded add-new-item w-100">
    <form @submit="onSubmit" @keydown.enter="onSubmit">
      <div class="mb-3">
        <formInputItem
         name="title"
         label="Title"
         :error="titleError"
        >
          <TextInput
            v-model="title"
            placeholder="Title"
          />
        </formInputItem>
      </div>

      <div class="mb-3">
        <formInputItem
          name="description"
          label="Description"
          :error="descriptionError"
        >
          <TextInput
            v-model="description"
            placeholder="Description"
          />
        </formInputItem>
      </div>

      <div class="d-flex justify-content-end">
        <div class="d-flex">
          <button
            @click="resetNewItem"
            class="btn btn-secondary me-3"
          >
            Cancel
          </button>

          <LoadingButton
            :disabled="isSubmitting"
            type="submit"
            :is-loading="isSubmitting"
            class="btn-primary"
          >
            Add
          </LoadingButton>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
/**
 * Imports
 */

import LoadingButton from "@/components/LoadingButton.vue";
import {ref} from "vue";
import {useTodoStore} from "@/stores";
import {useField, useForm} from "vee-validate";
import FormInputItem from "@/components/Form/FormInputItem.vue";
import TextInput from "@/components/Form/TextInput.vue";
import { object, string } from 'yup';

/**
 * Stores
 */

const todoStore = useTodoStore()

/**
 * Emit
 */

const emit = defineEmits(['update:modelValue','closeForm'])

/**
 * Props
 */

const props = defineProps({
  isOpened: {
    type: Boolean,
    default: false,
  },
  parentId: {
    type: [String, Number],
    default: null
  },
  item: {
    type: Object,
    default: () => {
      return {
        title: '',
        description: '',
        deadline: null,
        expanded: false,
        children: [],
        done: false,
      }
    }
  },
})

const item = ref(props.item)
if (props.parentId !== null) item.value.todoId = props.parentId

/**
 * Forms
 */

const validationSchema = object({
  title: string().min(2).required().label('Title'),
});

const {handleSubmit, isSubmitting} = useForm({
  initialValues: item.value,
  validationSchema: validationSchema
});

const {value: title, errorMessage: titleError} = useField("title");
const {value: description, errorMessage: descriptionError} = useField("description");

/**
 * Add new item
 */

const resetNewItem = () => {
  emit('closeForm')
}

const addNewItem = async (values) => {
  await todoStore.addNewItem(values)
  resetNewItem()
}

const updateItem = async (values) => {
  await todoStore.updateItem(values)
  resetNewItem()
}


const onSubmit = handleSubmit(async (values, actions) => {
  if (item.value.id) await updateItem(values)
  else await addNewItem(values)
});
</script>