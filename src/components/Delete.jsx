import { Icon } from '@iconify/react/dist/iconify.js'
import { useClickAway } from '@uidotdev/usehooks'
import { AnimatePresence, motion } from 'framer-motion'
import { deleteTask } from '../store/slices/tasksSlice'
import { useDispatch } from 'react-redux'

const Delete = ({ openDelete, setOpenDelete, task }) => {
    const dispatch = useDispatch()
    const deleteRef = useClickAway(() => {
        setOpenDelete(false)
    })

    const submitDeletion = () => {
        setOpenDelete(false)
        dispatch(deleteTask(task))
    }

    return (
        <AnimatePresence>
            {
                openDelete &&
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ ease: "easeOut", duration: 0.1 }}
                    className="overlay"
                    key="overlay"
                >
                    <motion.div
                        key="deleteMenu"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ ease: "easeOut", duration: 0.1 }}
                        ref={deleteRef}
                        className="delete relative rounded-lg text-white border-slate-500 bg-slate-800 shadow-md border p-5 md:w-[650px] w-[calc(100%-15px)]"
                    >
                        <Icon icon='ic:round-close' className="absolute right-2 top-2 cursor-pointer transition-all ease-in-out hover:text-neutral-300" fontSize={20} onClick={() => setOpenDelete(false)}></Icon>
                        <h2 className='text-xl font-bold'>You are about to delete this task. Are you sure you want to delete it ?</h2>
                        <p className='text-neutral-300 mt-2'>By deleting this task, this action can't be rolled back and this task will be deleted from our servers permenantely.</p>
                        <div className="mt-4 flex items-center gap-2 justify-end">
                            <button className="second-btn" onClick={() => setOpenDelete(false)}>Cancel</button>
                            <button className="main-btn !bg-rose-700 hover:!bg-rose-500" onClick={submitDeletion}>Confirm</button>
                        </div>
                    </motion.div>
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default Delete