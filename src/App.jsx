import { useEffect } from 'react'
import NewTask from './components/NewTask'
import { useDispatch } from 'react-redux'
import { getTasks } from './store/slices/tasksSlice'
import Filters from './components/Filters'
import KanbanBoard from './components/KanbanBoard'


function App() {
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
        <KanbanBoard></KanbanBoard>
      </div>
    </main>
  )
}

export default App
