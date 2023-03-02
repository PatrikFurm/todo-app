import {defineStore} from "pinia";

export const useTodoStore = defineStore({
    id: "todoState",
    state: () => ({
        todos: [],
        todo: null
    }),
    getters: {
        todosLength(state) {
            return state.todos.length
        },
    },
    actions: {
        async fetchTodos() {
            const {data, status} = await axios.get('/todos')
            if (status === 200) this.todos = data

            await this.fetchTasks()
        },

        async fetchTasks(todoId = null) {
            if (todoId === null) {
                // fetch tasks to all expanded todos
                for (const todo of this.todos) {
                    if (todo.expanded) {
                        const {data} = await axios.get(`/todos/${todo.id}/tasks`)
                        todo.children = data
                    }
                }
            } else {
                // fetch tasks to exact todo
                const {data} = await axios.get(`/todos/${todoId}/tasks`)
                this.todos[this.findTodoIndex(todoId)].children = data
            }
        },

        async updateItem(item) {
            if (item.hasOwnProperty('todoId')) {
                // update Child
                const {data} = await axios.put(`/todos/${item.todoId}/tasks/${item.id}`, item)

                const taskIndex = this.findTodoIndex(data.todoId)
                Object.assign(this.todos[taskIndex].children, this.todos[taskIndex].children.map(el => el.id === data.id ? data : el))
            } else {
                // update parent
                const {data} = await axios.put(`/todos/${item.id}`, {...item, children: []})
                data.children = item.children
                this.todos[this.findTodoIndex(data.id)] = data
            }
        },

        async removeItem(item) {
            if (item.hasOwnProperty('todoId')) {
                // remove child
                const {data} = await axios.delete(`/todos/${item.todoId}/tasks/${item.id}`)

                const taskIndex = this.findTodoIndex(data.todoId)
                this.todos[taskIndex].children = this.todos[taskIndex].children.filter(child => child.id !== data.id)
            } else {
                // remove parent
                const {data} = await axios.delete(`/todos/${item.id}`)
                this.todos = this.todos.filter(item => item.id !== data.id)
            }
        },

        async addNewItem(item) {
            if (item.hasOwnProperty('todoId')) {
                // add child
                const {data} = await axios.post(`/todos/${item.todoId}/tasks`, item)
                this.todos[this.findTodoIndex(data.todoId)].children.push(data)
            } else {
                // add parent
                const {data} = await axios.post(`/todos`, item)
                this.todos.push(data)
            }
        },

        findTodoIndex(id) {
            return this.todos.findIndex(todo => todo.id === id)
        },

        async setActiveTodo(id) {
            if (this.todosLength === 0) await this.fetchTodos()

            return this.todo = this.findTodoIndex(id)
        }
    },
});