import React, { useState, useEffect } from 'react'
import '../css/Reminders.css'
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';


function Reminders() {
    // The useHook useState is used for state management of variables to be able to update them
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState<string[]>([]); // an array of strings called tasks that will have their state set
    const localStorageData = localStorage.getItem('tasks');

    // Retrieves data from localStorage upon mount
    useEffect(() => {
        if (localStorageData) {
            setTasks(JSON.parse(localStorageData));
        }
    }, []);
    
    // sets item in localStorage so it doesn't vanish upon refresh
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }, [tasks]);

      const clearLocalStorage = () =>{
        localStorage.removeItem('tasks');
        setTasks([]);
      }

    
    const addReminder = (taskReminder: string) => {
        setTasks([...tasks, taskReminder]);  // updates the state variable tasks by adding a new element taskReminder to the array
        setTask('');
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // prevents refreshing of page and form submission
        if (task !== '') { // verifies that the string isn't empty
            addReminder(task); // adds task to tasks
        }
        console.log(task)
    };
    
    // returns the form  
    return (
        <div>
            <form className="reminders" onSubmit={handleSubmit} >
                <h1>Reminders.</h1>
                <input
                    type="text"
                    className="reminder-input"
                    placeholder="Add a reminder"
                    value={task}
                    onChange={(e) => setTask(e.target.value)} // sets the state as the input value
                />
                <div> {/* the tasks array is iterated by map() wherein the task variable has its index representation */}
                    {tasks.map((task, index) => (
                        <div className='task'
                            key={index}>
                                {task} {/*that which will be rendered*/}
                            <div className='editTask'>
                                <FaEdit />
                                <FaRegTrashAlt />
                            </div>
                        </div>
                    ))}
                </div>
                <button type="submit" className="taskButton">
                    Add Task
                </button>
                <button type="button" className="taskButton" onClick={clearLocalStorage}>
                    Clear reminders
                </button>
            </form>
        </div>
    );
}

export default Reminders;