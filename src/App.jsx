import React, { useContext, useEffect, useState } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { AuthContext } from '../AuthContext/AuthProvider';
import UseAxiosSecure from '../hooks/UseAxiosSecure';
import { IoMdClose } from "react-icons/io";
import { CgDetailsMore } from "react-icons/cg";
import { DragDropContext,Droppable, Draggable } from '@hello-pangea/dnd';

const Home = () => {
    const { user } = useContext(AuthContext);
    const email = user?.email;
    const axiosSecure = UseAxiosSecure();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [task, setTask] = useState({});
    const [fetch, setRefetch] = useState(false);
    document.title="Dashboard"
    const [editedTask, setEditedTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        category: ''
    });

    useEffect(() => {
        setLoading(true);
        axiosSecure.get(`/tasks?email=${email}`)
            .then((res) => {
                setTasks(res?.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log('error', error.message);
                setLoading(false);
            });
    }, [axiosSecure, email]);

    const todoTasks = tasks.filter(task => task.category === "To-Do");
    const inProgressTasks = tasks.filter(task => task.category === "In Progress");
    const doneTasks = tasks.filter(task => task.category === "Done");

    const handleDetailsShow = (id) => {
        document.getElementById('my_modal_5').showModal();
        setLoading(true);
        axiosSecure.get(`/task/${id}`)
            .then((res) => {
                setTask(res?.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log('Error', error.message);
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        axiosSecure.delete(`/task/${id}`)
            .then((res) => {
                setTasks(tasks.filter(task => task._id !== id));
            })
            .catch((error) => {
                console.log('error', error.message);
            });
    };

    const handleEdit = (id) => {
        const taskToEdit = tasks.find(task => task._id === id);
        if (taskToEdit) {
            setEditedTask(taskToEdit);
            document.getElementById('edit_modal').showModal();
        }
    };

    const handleSaveChanges = () => {
        axiosSecure.patch(`/task/${editedTask._id}`, editedTask)
            .then((res) => {
                setTasks(prevTasks => prevTasks.map(task => task._id === editedTask._id ? editedTask : task));
                document.getElementById('edit_modal').close();
            })
            .catch((error) => {
                console.log('Error updating task:', error.message);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask({
            ...editedTask,
            [name]: value,
        });
    };

    const onDragEnd = (result) => {
        if (!result.destination) return; // If there's no destination, exit the function.
    
        const { source, destination, draggableId } = result;
    
        // If the dragged item is dropped in the same position and category, do nothing
        if (source.index === destination.index && source.droppableId === destination.droppableId) return;
    
        // Get the dragged task by its ID
        const draggedTask = tasks.find((task) => task._id === draggableId);
        if (!draggedTask) return; // Exit if no task found.
    
        // Clone the current tasks to ensure we are not directly modifying the state
        const updatedTasks = [...tasks];
    
        // Update the task's category if it’s moved across lists
        draggedTask.category = destination.droppableId;
    
        // Remove the task from its original position
        const filteredTasks = updatedTasks.filter(task => task._id !== draggableId);
    
        // Insert the task at the new position in the destination category
        filteredTasks.splice(destination.index, 0, draggedTask);
    
        // Reorder tasks if needed, based on the category and index
        const reorderedTasks = reorder(filteredTasks, source.index, destination.index);
    
        setTasks(reorderedTasks); // Update the state with the new tasks array
    
        // Send the updated category information to the backend
        axiosSecure.patch(`/task/update/${draggedTask._id}`, { category: draggedTask.category })
            .catch(error => console.error('Error updating task:', error.message));
    };
    
    // Helper function to reorder tasks within the same category
    const reorder = (tasks, startIndex, endIndex) => {
        if (startIndex === endIndex) return tasks; // No need to reorder
        if (startIndex < 0 || endIndex < 0 || startIndex >= tasks.length || endIndex >= tasks.length) {
            console.error("Invalid indices");
            return tasks;
        }
    
        const result = [...tasks];
        const [movedTask] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, movedTask);
        return result;
    };
    
      
    return (
        <div className='w-full mx-auto min-h-screen shadow-2xl rounded-lg p-10 max-sm:p-2'>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className='grid grid-cols-3 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1'>
                    {/* To-Do Column */}
                    <div className="bg-[#426DC6] min-h-96 p-6 rounded-lg shadow-lg">
                        <h3 className="text-center font-bold text-xl text-white uppercase tracking-wide">To Do</h3>
                        <div className="border-t-2 border-white/50 my-3"></div>
                        <Droppable droppableId="To-Do" className="py-10">
                            {(provided) => (
                                <ul className="space-y-4" ref={provided.innerRef} {...provided.droppableProps}>
                                    {todoTasks.length === 0 ? (
                                        <p className="text-white text-center">{loading? "Loading..." : "No tasks available"}</p>
                                    ) : (
                                        todoTasks.map((task, index) => (
                                            <Draggable key={String(task._id)} draggableId={String(task._id)} index={index}>
                                                {(provided) => (
                                                    <li
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="hover:bg-white px-5 bg-black py-4  text-lg text-white rounded-lg shadow-lg hover:text-black cursor-pointer  transition duration-500">
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="font-semibold">{task.title}</h4>
                                                            <div className="flex gap-4">
                                                                <CgDetailsMore onClick={() => handleDetailsShow(task?._id)} title='See Details' className="text-xl cursor-pointer hover:text-black transition" />
                                                                <FaRegEdit onClick={() => handleEdit(task?._id)} title={`Edit ${task?.title}`}className="text-xl cursor-pointer hover:text-black transition" />
                                                                <MdOutlineDelete onClick={() => handleDelete(task?._id)} title={`Delete ${task?.title}`} className="text-xl cursor-pointer hover:text-black transition" />
                                                            </div>
                                                        </div>
                                                    </li>
                                                )}
                                            </Draggable>
                                        ))
                                    )}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </div>

                    {/* In Progress Column */}
                    <div className="bg-[#426DC6] min-h-96 p-6 rounded-lg shadow-lg">
                        <h3 className="text-center font-bold text-xl text-white uppercase tracking-wide">In Progress</h3>
                        <div className="border-t-2 border-white/50 my-3"></div>
                        <Droppable droppableId="In Progress" className="py-10">
                            {(provided) => (
                                <ul className="space-y-4" ref={provided.innerRef} {...provided.droppableProps}>
                                    {inProgressTasks.length === 0 ? (
                                        <p className="text-white text-center">{loading? "Loading..." : "No tasks available"}</p>
                                    ) : (
                                        inProgressTasks.map((task, index) => (
                                            <Draggable key={String(task._id)} draggableId={String(task._id)} index={index}>
                                                {(provided) => (
                                                    <li
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="hover:bg-white px-5 py-4 text-lg text-white rounded-lg shadow-lg hover:text-black cursor-pointer bg-[black] transition duration-500">
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="font-semibold">{task.title}</h4>
                                                            <div className="flex gap-4">
                                                                <CgDetailsMore onClick={() => handleDetailsShow(task?._id)} title='See Details' className="text-xl cursor-pointer hover:text-black transition" />
                                                                <FaRegEdit onClick={() => handleEdit(task?._id)} title={`Edit ${task?.title}`} className="text-xl cursor-pointer hover:text-black transition" />
                                                                <MdOutlineDelete onClick={() => handleDelete(task?._id)} title={`Delete ${task?.title}`} className="text-xl cursor-pointer hover:text-black transition" />
                                                            </div>
                                                        </div>
                                                    </li>
                                                )}
                                            </Draggable>
                                        ))
                                    )}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </div>

                    {/* Done Column */}
                    <div className="bg-[#426DC6] min-h-96 p-6 rounded-lg shadow-lg">
                        <h3 className="text-center font-bold text-xl text-white uppercase tracking-wide">Done</h3>
                        <div className="border-t-2 border-white/50 my-3"></div>
                        <Droppable droppableId="Done" className="py-10">
                            {(provided) => (
                                <ul className="space-y-4" ref={provided.innerRef} {...provided.droppableProps}>
                                    {doneTasks.length === 0 ? (
                                        <p className="text-white text-center">{loading? "Loading..." : "No tasks available"}</p>
                                    ) : (
                                        doneTasks.map((task, index) => (
                                            <Draggable key={String(task._id)} draggableId={String(task._id)} index={index}>
                                                {(provided) => (
                                                    <li
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="hover:bg-white px-5 py-4 text-lg text-white rounded-lg shadow-lg hover:text-black cursor-pointer bg-[black] transition duration-500">
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="font-semibold">{task.title}</h4>
                                                            <div className="flex gap-4">
                                                                <CgDetailsMore onClick={() => handleDetailsShow(task?._id)} title='See Details' className="text-xl cursor-pointer hover:text-black transition" />
                                                                <FaRegEdit onClick={() => handleEdit(task?._id)} title={`Edit ${task?.title}`} className="text-xl cursor-pointer hover:text-black transition" />
                                                                <MdOutlineDelete onClick={() => handleDelete(task?._id)} title={`Delete ${task?.title}`} className="text-xl cursor-pointer hover:text-black transition" />
                                                            </div>
                                                        </div>
                                                    </li>
                                                )}
                                            </Draggable>
                                        ))
                                    )}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </div>
                </div>
            </DragDropContext>

            {/* Details Modal */}
            <dialog id="my_modal_5" className="modal modal-center">
                <div className="modal-box w-11/12 max-w-3xl">
                    <form method="dialog">
                        <button className="text-2xl btn-ghost absolute cursor-pointer right-5 top-5"><IoMdClose /></button>
                    </form>
                    {loading ? (
                        <p className='text-center'>Details are loading...</p>
                    ) : (
                        <div className='flex flex-col items-center gap-2'>
                            <h3 className="font-bold text-center text-lg">{task?.title}</h3>
                            <p className='font-bold '>Description: </p>
                            <p className='text-gray-500'>{task?.description}</p>
                            <p className='font-bold text-blue-500'>Task Created: {task?.timestamp}</p>
                            <p className='font-bold text-red-500'>Due Time: {task?.dueDate}</p>
                        </div>
                    )}
                </div>
            </dialog>

            {/* Edit Modal */}
            <dialog id="edit_modal" className="modal modal-center">
                <div className="modal-box w-11/12 max-w-2xl">
                    <form method="dialog">
                        <button className="text-2xl btn-ghost absolute cursor-pointer right-5 top-5">
                            <IoMdClose />
                        </button>
                    </form>

                    <div>
                        <h2 className="font-bold text-xl text-center text-black">Edit Task</h2>

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700">Task Title</label>
                            <input
                                type="text"
                                name="title"
                                value={editedTask.title}
                                onChange={handleChange}
                                className="input w-full"
                                placeholder="Task Title"
                            />
                        </div>
                        <div className="mt-6">
    <label className="block text-sm font-medium text-gray-700">Category</label>
    <select
        name="category"
        value={editedTask.category}
        onChange={handleChange}
        className="select w-full"
    >
        <option value="To-Do">To-Do</option>
        <option value="In Progress">In Progress</option>
    <option value="Done">Done</option>
    </select>
</div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={editedTask.description}
                                onChange={handleChange}
                                className="textarea w-full"
                                placeholder="Task Description"
                                />
                                </div>
        
                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700">Due Date</label>
                                    <input
                                        type="date"
                                        name="dueDate"
                                        value={editedTask.dueDate}
                                        onChange={handleChange}
                                        className="input w-full"
                                    />
                                </div>
        
                                <div className="mt-6 flex justify-center gap-5">
                                    <button
                                        onClick={handleSaveChanges}
                                        className="btn bg-blue-500 hover:bg-blue-600 text-white w-32"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </dialog>
                </div>
            );
        };
        
        export default Home;
        
