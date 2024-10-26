import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
        todo: [],
        doing: [],
        done: []
    },
    reducers: {
        // Load tasks from localStorage and categorize them into todo, doing, and done.
        getTasks: (state) => {
            const tasks = JSON.parse(localStorage.getItem("tasks"))

            if (tasks) {
                state.tasks = tasks || []

                state.todo = tasks.filter(task => task.state === 'todo')
                state.doing = tasks.filter(task => task.state === 'doing')
                state.done = tasks.filter(task => task.state === 'done')
            }
        },

        // Create a new task and save it in both state and localStorage.
        createTask: (state, action) => {
            const newTask = [...state.tasks, action.payload]
            state.tasks = newTask

            state.todo = newTask.filter(task => task.state === 'todo')
            state.doing = newTask.filter(task => task.state === 'doing')
            state.done = newTask.filter(task => task.state === 'done')

            localStorage.setItem("tasks", JSON.stringify(newTask))
        },

        // Update an existing task, saving changes to both state and localStorage.
        updateTask: (state, action) => {
            // Replace the task with matching ID with the new data from action.payload
            state.tasks = state.tasks.map(task => task.id == action.payload.id ? action.payload : task)

            // Re-categorize tasks after the update
            state.todo = state.tasks.filter(task => task.state === 'todo')
            state.doing = state.tasks.filter(task => task.state === 'doing')
            state.done = state.tasks.filter(task => task.state === 'done')

            // Persist the updated tasks list in localStorage
            localStorage.setItem("tasks", JSON.stringify(state.tasks))
        },

        // Delete a task by ID and update localStorage and state categories accordingly.
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id != action.payload.id)

            // Re-categorize tasks after the update
            state.todo = state.tasks.filter(task => task.state === 'todo')
            state.doing = state.tasks.filter(task => task.state === 'doing')
            state.done = state.tasks.filter(task => task.state === 'done')

            // Persist the updated tasks list in localStorage
            localStorage.setItem("tasks", JSON.stringify(state.tasks))
        },

        // Search tasks by title and filter results across todo, doing, and done lists.
        searchByTitle: (state, action) => {
            const tasks = JSON.parse(localStorage.getItem("tasks"))
            if (action.payload) {
                state.tasks = tasks.filter(task => task.title.toLowerCase().includes(action.payload.toLowerCase()))

                state.todo = state.todo.filter(task => task.title.toLowerCase().includes(action.payload.toLowerCase()))
                state.doing = state.doing.filter(task => task.title.toLowerCase().includes(action.payload.toLowerCase()))
                state.done = state.done.filter(task => task.title.toLowerCase().includes(action.payload.toLowerCase()))
            } else {
                state.tasks = tasks

                state.todo = state.tasks.filter(task => task.state === 'todo')
                state.doing = state.tasks.filter(task => task.state === 'doing')
                state.done = state.tasks.filter(task => task.state === 'done')
            }
        },

        // Filter tasks by priority and/or state, updating each list accordingly.
        filterTasks: (state, action) => {
            const tasks = JSON.parse(localStorage.getItem("tasks"))
            const { priority, state: taskState } = action.payload;

            const hasPriorityFilter = priority !== undefined && priority !== '';
            const hasStateFilter = taskState !== undefined && taskState !== '';

            if (hasPriorityFilter || hasStateFilter) {
                state.tasks = tasks.length > 0
                    ? tasks.filter(task => {
                        const matchesPriority = hasPriorityFilter ? task.priority === priority : true;
                        const matchesState = hasStateFilter ? task.state === taskState : true;
                        return matchesPriority && matchesState;
                    })
                    : []
                state.todo = state.tasks.length > 0 ? state.tasks.filter(task => task.state === 'todo') : []
                state.doing = state.tasks.length > 0 ? state.tasks.filter(task => task.state === 'doing') : []
                state.done = state.tasks.length > 0 ? state.tasks.filter(task => task.state === 'done') : []
            } else {
                state.tasks = tasks || [];
                state.todo = state.tasks.length > 0 ? state.tasks.filter(task => task.state === 'todo') : []
                state.doing = state.tasks.length > 0 ? state.tasks.filter(task => task.state === 'doing') : []
                state.done = state.tasks.length > 0 ? state.tasks.filter(task => task.state === 'done') : []
            }
        },

        // Moving tasks from board to another board by mutating the states
        moveTask: (state, action) => {
            const { taskId, targetState } = action.payload;

            let taskToMove;
            if (state.todo.find((task) => task.id == taskId)) {
                taskToMove = state.todo.find((task) => task.id == taskId);
                state.todo = state.todo.filter((task) => task.id != taskId);
            } else if (state.doing.find((task) => task.id == taskId)) {
                taskToMove = state.doing.find((task) => task.id == taskId);
                state.doing = state.doing.filter((task) => task.id != taskId);
            } else if (state.done.find((task) => task.id == taskId)) {
                taskToMove = state.done.find((task) => task.id == taskId);
                state.done = state.done.filter((task) => task.id != taskId);
            }


            if (taskToMove) {
                if (targetState === 'todo') {
                    taskToMove.state = 'todo'
                    state.todo.push(taskToMove);
                    state.tasks = [...state.todo, ...state.doing, ...state.done]
                    localStorage.setItem("tasks", JSON.stringify([...state.todo, ...state.doing, ...state.done]))
                } else if (targetState === 'doing') {
                    taskToMove.state = 'doing'
                    state.doing.push(taskToMove);
                    state.tasks = [...state.todo, ...state.doing, ...state.done]
                    localStorage.setItem("tasks", JSON.stringify([...state.todo, ...state.doing, ...state.done]))
                } else if (targetState === 'done') {
                    taskToMove.state = 'done'
                    state.done.push(taskToMove);
                    state.tasks = [...state.todo, ...state.doing, ...state.done]
                    localStorage.setItem("tasks", JSON.stringify([...state.todo, ...state.doing, ...state.done]))
                }
            }
        },
    },

})

export const { getTasks, createTask, updateTask, deleteTask, searchByTitle, filterTasks, moveTask } = tasksSlice.actions

export default tasksSlice.reducer