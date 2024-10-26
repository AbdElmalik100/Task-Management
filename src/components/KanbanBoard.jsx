import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import TaskCard from './TaskCard';
import { Icon } from '@iconify/react/dist/iconify.js';
import { moveTask } from '../store/slices/tasksSlice';

const KanbanBoard = () => {
    const dispatch = useDispatch();
    const { todo, doing, done } = useSelector(state => state.tasks);

    const handleDrop = (e, targetState) => {
        const target = e.target
        if (target.className.includes("board")) target.classList.remove("bg-slate-500")

        const taskId = e.dataTransfer.getData('taskId');
        dispatch(moveTask({ taskId, targetState }));

        e.preventDefault();
    };

    const allowDrop = (e) => {
        const target = e.target
        if (target.className.includes("todo-board") || target.className.includes("done-board") || target.className.includes("doing-board")) target.classList.add("bg-slate-500")

        e.preventDefault();
    };

    const drageLeave = (e) => {
        const target = e.target
        if (target.className.includes("board")) target.classList.remove("bg-slate-500")

        e.preventDefault();
    };


    return (
        <div className='flex items-start md:flex-row flex-col gap-5 mt-8'>
            {/* Todo Board */}
            <motion.div
                className='todo-board h-full border rounded-lg w-full p-3 transition-all ease-in-out'
                onDrop={(e) => handleDrop(e, 'todo')}
                onDragOver={allowDrop}
                onDragLeave={drageLeave}
                layout // Enables smooth layout animations
            >
                <h2 className='bg-slate-600 p-3 px-5 rounded-md text-white font-bold uppercase'>
                    Todo <span className='text-xs text-neutral-300 font-normal'>({todo.length})</span>
                </h2>
                {
                    todo.length > 0 && (
                        <div className='tasks mt-4 flex flex-col gap-4'>
                            {todo.map((task, index) => (
                                <TaskCard key={index} index={index} task={task} />
                            ))}
                        </div>
                    )
                }
                <div className='pt-3 w-full pointer-events-none'>
                    <Icon icon="fe:plus" className='mx-auto' fontSize={20}></Icon>
                </div>
            </motion.div>

            {/* Doing Board */}
            <motion.div
                className='doing-board h-full border rounded-lg w-full p-3 transition-all ease-in-out'
                onDrop={(e) => handleDrop(e, 'doing')}
                onDragOver={allowDrop}
                onDragLeave={drageLeave}
                layout
            >
                <h2 className='bg-slate-600 p-3 px-5 rounded-md text-white font-bold uppercase'>
                    Doing <span className='text-xs text-neutral-300 font-normal'>({doing.length})</span>
                </h2>
                {
                    doing.length > 0 && (
                        <div className='tasks mt-4 flex flex-col gap-4'>
                            {doing.map((task, index) => (
                                <TaskCard key={index} index={index} task={task} />
                            ))}
                        </div>
                    )
                }
                <div className='pt-3 w-full pointer-events-none'>
                    <Icon icon="fe:plus" className='mx-auto' fontSize={20}></Icon>
                </div>
            </motion.div>

            {/* Done Board */}
            <motion.div
                className='done-board h-full border rounded-lg w-full p-3 transition-all ease-in-out'
                onDrop={(e) => handleDrop(e, 'done')}
                onDragOver={allowDrop}
                onDragLeave={drageLeave}
                layout
            >
                <h2 className='bg-slate-600 p-3 px-5 rounded-md text-white font-bold uppercase'>
                    Done <span className='text-xs text-neutral-300 font-normal'>({done.length})</span>
                </h2>
                {
                    done.length > 0 && (
                        <div className='tasks mt-4 flex flex-col gap-4'>
                            {done.map((task, index) => (
                                <TaskCard key={index} index={index} task={task} />
                            ))}
                        </div>
                    )
                }
                <div className='pt-3 w-full pointer-events-none'>
                    <Icon icon="fe:plus" className='mx-auto' fontSize={20}></Icon>
                </div>
            </motion.div>
        </div>
    );
};

export default KanbanBoard;
