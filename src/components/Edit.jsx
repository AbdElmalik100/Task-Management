import { yupResolver } from "@hookform/resolvers/yup"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useClickAway } from "@uidotdev/usehooks"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { object, string } from "yup"
import { updateTask } from '../store/slices/tasksSlice'

const Edit = ({ openEdit, setOpenEdit, task }) => {
    const dispatch = useDispatch()

    // Define the validation schema for form fields using Yup
    const taskSchema = object({
        title: string().required("This field is required"),
        description: string().required("This field is required"),
        priority: string().required("This field is required"),
        state: string().required("This field is required")
    });

    // Configure react-hook-form with Yup resolver and set initial form values from task data
    const { register, handleSubmit, reset, setValue, clearErrors, formState: { errors } } = useForm({
        resolver: yupResolver(taskSchema),
        defaultValues: { ...task }
    })

    // Ref to close modal if clicking outside the component
    const editRef = useClickAway(() => {
        setOpenEdit(false)
    })
    const [imagePreview, setImagePreview] = useState(task.image)

    // Handle file input change, updating image preview and form value
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setValue("image", URL.createObjectURL(file));
        setImagePreview(URL.createObjectURL(file));
    };

    // Handle form submission, dispatching update task action
    const formSubmission = async (task) => {
        dispatch(updateTask(task))
        setOpenEdit(false)
    }

    // Close function to reset form and clear validation errors
    const close = () => {
        setOpenEdit(false)
        setImagePreview(task.image || "")
        reset(task)
        clearErrors()
    }

    // Reset the form and image preview when modal opens or closes
    useEffect(() => {
        setImagePreview(task.image || "")
        reset(task)
        clearErrors()
    }, [openEdit])


    return (
        <AnimatePresence>
            {
                openEdit &&
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ ease: "easeOut", duration: 0.1 }}
                    className="overlay"
                    key="overlay"
                >
                    <motion.div
                        key="editMenu"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ ease: "easeOut", duration: 0.1 }}
                        ref={editRef}
                        className="edit-task relative rounded-lg text-white border-slate-500 bg-slate-800 shadow-md border p-5 md:w-[650px] w-[calc(100%-15px)]"
                    >
                        <Icon icon='ic:round-close' className="absolute right-2 top-2 cursor-pointer transition-all ease-in-out hover:text-neutral-300" fontSize={20} onClick={close}></Icon>
                        <h2 className="font-medium">Edit your task</h2>
                        <p className="text-neutral-300 text-sm">Here you can edit your task information.</p>
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
                                <button type="button" className="second-btn" onClick={close}>Cancel</button>
                                <button type="submit" className="main-btn">Save changes</button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default Edit