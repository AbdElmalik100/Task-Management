
import TaskMenu from './TaskMenu';
import { motion } from 'framer-motion'

const TaskCard = ({ task, index }) => {
    const handleDragStart = (e) => {
        e.dataTransfer.setData('taskId', task.id);        
    };
    return (
        task &&
        <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 25 }}
            draggable
            onDragStart={handleDragStart}
            whileDrag={{ scale: 1.05 }} // Scale the card while dragging
            transition={{ ease: "easeOut", delay: 0.1 * index }}
            className='rounded-lg p-2 border text-white flex flex-col cursor-grab'
        >
            <div className="image h-[200px] relative overflow-hidden rounded-lg">
                {
                    task.image
                        ?
                        <img className='object-cover object-[50%,20%] w-full h-full' src={task.image} alt="Task image" />
                        :
                        <div className='bg-slate-800 grid place-items-center h-full'>
                            <img className='w-20' src="/notes.png" alt="Notes" />
                        </div>
                }
                <span className={`w-16 uppercase h-16 shadow-md grid place-items-center text-xs rounded-full absolute top-2 left-2 ${task.priority === 'low' ? 'bg-green-600' : task.priority === 'medium' ? 'bg-yellow-600' : 'bg-red-600'}`}>
                    {task.priority}
                </span>
                <TaskMenu task={task}></TaskMenu>
            </div>
            <div className="info mt-4 p-2 flex flex-col flex-1">
                <h2 className='text-xl font-bold capitalize'>{task.title}</h2>
                <p className='text-neutral-300 capitalize mt-1 mb-3'>{task.description}</p>
                <span className='text-end block text-neutral-400 text-xs mt-auto'>{new Date(task.created_at).toDateString()}</span>
            </div>
        </motion.div>
    )
}

export default TaskCard