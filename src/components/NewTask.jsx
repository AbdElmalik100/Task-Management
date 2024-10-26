import { yupResolver } from "@hookform/resolvers/yup"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useClickAway } from "@uidotdev/usehooks"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { object, string } from "yup"
import { createTask } from '../store/slices/tasksSlice'
import { generateRandomNumber } from "../utils"

const NewTask = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const dispatch = useDispatch()
    const taskSchema = object({
        title: string().required("This field is required"),
        description: string().required("This field is required"),
        priority: string().required("This field is required"),
        state: string().required("This field is required")
    });
    const { register, handleSubmit, reset, setValue, clearErrors, formState: { errors } } = useForm({
        resolver: yupResolver(taskSchema),
        defaultValues: {
            id: generateRandomNumber(),
            created_at: Date.now(),
            image: null,
            title: "",
            description: "",
            priority: "",
            state: "",
        }
    })
    const menu = useClickAway(() => {
        setOpenMenu(false)
    })
    const [imagePreview, setImagePreview] = useState("")


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        
        setValue("image", URL.createObjectURL(file));
        setImagePreview(URL.createObjectURL(file));
    };


    const formSubmission = async (task) => {
        dispatch(createTask(task))
        close()
    }

    const close = () => {
        setOpenMenu(false)
        setImagePreview("")
        reset()
    }

    useEffect(() => {
        clearErrors()
        reset()
    }, [openMenu])

    return (
        <div className='new-task'>
            <button className="main-btn flex items-center gap-2" onClick={() => setOpenMenu(true)}>
                <Icon icon="fe:plus" fontSize={20}></Icon>
                <span>New Task</span>
            </button>
            <AnimatePresence>
                {
                    openMenu &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease: "easeOut", duration: 0.1 }}
                        className="overlay"
                        key="overlay"
                    >
                        <motion.div
                            key="menu"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ ease: "easeOut", duration: 0.1 }}
                            ref={menu}
                            className="new-task-menu relative rounded-lg text-white border-slate-500 bg-slate-800 shadow-md border p-5 md:w-[650px] w-[calc(100%-15px)]"
                        >
                            <Icon icon='ic:round-close' className="absolute right-2 top-2 cursor-pointer transition-all ease-in-out hover:text-neutral-300" fontSize={20} onClick={close}></Icon>
                            <h2 className="font-medium">Create new task</h2>
                            <p className="text-neutral-300 text-sm">Feel free to create your task, let's see what's in your mind.</p>
                            <form className="mt-5 flex flex-col gap-3" onSubmit={handleSubmit(formSubmission)}>
                                <label>
                                    <input type="file" accept="image/*" className="hidden" name="image" onChange={handleFileChange} />
                                    {
                                        imagePreview === ''
                                            ?
                                            <div className="image-placeholder cursor-pointer border border-dashed border-neutral-300 transition-all ease-in hover:border-neutral-200 rounded-lg p-5 py-10 grid place-items-center">
                                                <div className="flex flex-col gap-2 items-center text-center">
                                                    <Icon icon='mage:image-upload' fontSize={40}></Icon>
                                                    <h2 className="font-bold">Drag & drop your image here or, <span className="text-green-600 hover:underline">browse</span></h2>
                                                    <span className="text-neutral-300 text-xs">Accepts only (JPG, PNG, JPEG)</span>
                                                </div>
                                            </div>
                                            :
                                            <img className="rounded-lg w-48" src={imagePreview} alt="Task image" />
                                    }
                                    {errors.image && <span className="text-rose-700 block mt-1 italic">{errors.image.message}</span>}
                                </label>
                                <label>
                                    <span className="block mb-1">Title</span>
                                    <input type="text" name="title" {...register("title")} placeholder="Task title" />
                                    {errors.title && <span className="text-rose-700 block mt-1 italic">{errors.title.message}</span>}
                                </label>
                                <label>
                                    <span className="block mb-1">Description</span>
                                    <input type="text" name="description" {...register("description")} placeholder="Task description" />
                                    {errors.description && <span className="text-rose-700 block mt-1 italic">{errors.description.message}</span>}
                                </label>
                                <label>
                                    <span className="block mb-1">Task priority</span>
                                    <select name="priority" defaultValue="" {...register("priority")} className="bg-slate-800">
                                        <option value="" disabled>Choose task priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                    {errors.priority && <span className="text-rose-700 block mt-1 italic">{errors.priority.message}</span>}
                                </label>
                                <label>
                                    <span className="block mb-1">Task state</span>
                                    <select name="state" defaultValue="" {...register("state")} className="bg-slate-800">
                                        <option value="" disabled>Choose task state</option>
                                        <option value="todo">Todo</option>
                                        <option value="doing">Doing</option>
                                        <option value="done">Done</option>
                                    </select>
                                    {errors.state && <span className="text-rose-700 block mt-1 italic">{errors.state.message}</span>}
                                </label>
                                <div className="mt-4 flex items-center gap-2 justify-end">
                                    <button className="second-btn" onClick={close}>Cancel</button>
                                    <button type="submit" className="main-btn">Create task</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default NewTask