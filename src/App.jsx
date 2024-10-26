import { useEffect, useState } from 'react'
import NewTask from './components/NewTask'
import { useDispatch, useSelector } from 'react-redux'
import TaskCard from './components/TaskCard'
import { getTasks } from './store/slices/tasksSlice'
import { Icon } from '@iconify/react/dist/iconify.js'
import { AnimatePresence, motion } from 'framer-motion'
import Filters from './components/Filters'
import KanbanBoard from './components/KanbanBoard'


function App() {
  const { tasks } = useSelector(state => state.tasks)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])

  return (
    <main className='task-management min-h-screen text-white bg-slate-900'>
      <header className='flex py-5 px-10 items-center gap-2 justify-between border-b'>
        <div className="logo">
          <h2 className='font-black text-2xl uppercase'>Task Management</h2>
        </div>
        <div className="user">
          <img src="https://placehold.co/100X100?text=?" className='rounded-full w-8' alt="User avatar" />
        </div>
      </header>
      <div className="container px-4 py-10">
        <div className="tasks-header flex items-center gap-2 justify-between">
          <h2 className="heading font-bold capitalize text-2xl">My tasks</h2>
          <NewTask></NewTask>
        </div>
        <Filters></Filters>
        {/* <div className="tasks mt-8 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {
            tasks.length > 0
              ?
              <AnimatePresence>
                {
                  tasks.map((task, index) => (
                    <TaskCard key={index} index={index} task={task}></TaskCard>
                  ))
                }
              </AnimatePresence>
              :
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ ease: "easeOut", duration: 0.2 }}
                className='py-32 grid place-items-center col-span-4'
              >
                <div className='flex flex-col gap-2 items-center'>
                  <img className='w-60' src="/notes.png" alt="Notes" />
                  <h3 className='text-2xl mt-4 text-neutral-200 font-medium'>No tasks yet</h3>
                  <p className='text-neutral-300 mb-4'>Create one now and save what's in your mind.</p>
                  <NewTask></NewTask>
                </div>
              </motion.div>
          }
        </div> */}
        <KanbanBoard></KanbanBoard>
      </div>
    </main>
  )
}

export default App
