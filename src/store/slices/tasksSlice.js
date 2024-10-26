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
        getTasks: (state) => {
            const tasks = JSON.parse(localStorage.getItem("tasks"))

            if (tasks) {
                state.tasks = tasks || []

                state.todo = tasks.filter(task => task.state === 'todo')
                state.doing = tasks.filter(task => task.state === 'doing')
                state.done = tasks.filter(task => task.state === 'done')
            }
        },
        createTask: (state, action) => {
            const newTask = [...state.tasks, action.payload]
            state.tasks = newTask

            state.todo = newTask.filter(task => task.state === 'todo')
            state.doing = newTask.filter(task => task.state === 'doing')
            state.done = newTask.filter(task => task.state === 'done')

            localStorage.setItem("tasks", JSON.stringify(newTask))
        },
        updateTask: (state, action) => {
            state.tasks = state.tasks.map(task => task.id === action.payload.id ? action.payload : task)

            state.todo = state.tasks.filter(task => task.state === 'todo')
            state.doing = state.tasks.filter(task => task.state === 'doing')
            state.done = state.tasks.filter(task => task.state === 'done')

            localStorage.setItem("tasks", JSON.stringify(state.tasks))
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id)

            state.todo = state.tasks.filter(task => task.state === 'todo')
            state.doing = state.tasks.filter(task => task.state === 'doing')
            state.done = state.tasks.filter(task => task.state === 'done')

            localStorage.setItem("tasks", JSON.stringify(state.tasks))
        },
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