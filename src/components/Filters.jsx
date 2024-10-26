import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { filterTasks, searchByTitle } from '../store/slices/tasksSlice'
import { useForm } from 'react-hook-form'

const Filters = () => {
    const dispatch = useDispatch()
    const { register, watch } = useForm()
    const priority = watch("priority")
    const state = watch("state")

    const search = (e) => {
        dispatch(searchByTitle(e.target.value))
    }

    useEffect(() => {
        const filters = {
            priority,
            state,
        }
        dispatch(filterTasks(filters))
    }, [priority, state])

    return (
        <div className='filters flex mt-8 items-center gap-4 justify-between max-md:flex-col'>
            <label className='relative w-1/3 max-md:w-full'>
                <Icon icon="fluent:search-12-regular" className='absolute top-1/2 -translate-y-1/2 left-5' fontSize={18}></Icon>
                <input type="search" placeholder='Search by name...' className='rounded-full p-2 ps-12' onInput={search} />
            </label>
            <div className='flex items-center gap-2 w-full justify-end max-md:justify-start'>
                <span className='me-2'>Filter by</span>
                <select className='w-fit bg-slate-800' defaultValue="" {...register("priority")}>
                    <option value="" disabled>Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <select className='w-fit bg-slate-800' defaultValue="" {...register("state")}>
                    <option value="" disabled>State</option>
                    <option value="todo">Todo</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                </select>
            </div>
        </div>
    )
}

export default Filters