import { Icon } from '@iconify/react/dist/iconify.js'
import { useClickAway } from '@uidotdev/usehooks'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Delete from './Delete'
import Edit from './Edit'


const TaskMenu = ({ task }) => {
    const [openTaskMenu, setOpenTaskMenu] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const taskMenuRef = useClickAway(() => {
        setOpenTaskMenu(false)
    })
    
    const openMenu = (type) => {
        if (type === 'edit') {
            setOpenEdit(true)
            setOpenTaskMenu(false)
        } else {
            setOpenDelete(true)
            setOpenTaskMenu(false)
        }
    }
    return (
        <div className='task-menu absolute top-2 right-2' ref={taskMenuRef}>
            <button className='rounded-md border p-1 transition-all ease-in-out hover:bg-white hover:text-black'
                onClick={() => setOpenTaskMenu(prev => !prev)}>
                <Icon icon="uim:ellipsis-h" fontSize={20}></Icon>
            </button>
            <AnimatePresence>
                {
                    openTaskMenu &&
                    <motion.div
                        key="task-menu"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ ease: "easeOut", duration: 0.1 }}
                        className="menu border bg-white text-black shadow-md w-[150px] rounded-lg flex p-1 flex-col absolute top-10 right-0"
                    >
                        <button className='p-1.5 px-3 rounded-md transition-all ease-in-out flex items-center gap-2 hover:bg-neutral-200' onClick={() => openMenu("edit")}>
                            <Icon icon="fluent:edit-32-filled" fontSize={18}></Icon>
                            <span>Edit</span>
                        </button>
                        <button className='p-1.5 px-3 rounded-md transition-all ease-in-out flex items-center text-rose-700 gap-2 hover:bg-rose-200' onClick={() => openMenu("delete")}>
                            <Icon icon="mynaui:trash-solid" fontSize={18}></Icon>
                            <span>Delete</span>
                        </button>
                    </motion.div>
                }
            </AnimatePresence>
            <Edit openEdit={openEdit} setOpenEdit={setOpenEdit} task={task}></Edit>
            <Delete openDelete={openDelete} setOpenDelete={setOpenDelete} task={task}></Delete>
        </div>
    )
}

export default TaskMenu