import React, { useState, useEffect } from 'react'
import '../css/Reminders.css'
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';

// Interface to create the wanted structure to the task object
interface Task {
    task: string;
    isCompleted: boolean;
  }

function Reminders() {
    // The useHook useState is used for state management of variables to be able to update them
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]); // an empty array of Task objects called tasks that will have their state set
    const [editIndex, setEditIndex] = useState<number>(-1);
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

    // Clears the localStorage which clears all the tasks from the list
    const clearLocalStorage = () => {
        localStorage.removeItem('tasks');
        setTasks([]);
    }

    // Adds a task/reminder
    const addReminder = (taskReminder: string) => {
        const newTask: Task = { task: taskReminder, isCompleted: false }; // creates the object
        setTasks([...tasks, newTask]);  // updates the state variable tasks by adding a new element newTask to the array
        setTask('');
    }

    // when a task is submitted
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    if (task !== '') {
      if (editIndex !== -1) { // This checks if the variable is not -1 to detrmine if a new post is being added or if it is being edited.
        const updatedTasks = [...tasks];
        updatedTasks[editIndex].task = task;
        setTasks(updatedTasks);
        setEditIndex(-1);
      } else {
        addReminder(task);
      }
      setTask('');
      }
    };

    // Edits task by opening up a prompt to edit task in the tasks array
    const handleEditTask = (index: number) => {
        const updatedTask = prompt('Edit task:', tasks[index].task);
        if (updatedTask) {
          const updatedTasks = [...tasks];
          updatedTasks[index].task = updatedTask;
          setTasks(updatedTasks);
        }
      };
    
    // Event handler function to toggle between completed and incompleted tasks according to its index from the tasks array
    const completedTask = (index: number): React.MouseEventHandler => {
        return () => {
          const updatedTasks = [...tasks];
          updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
          setTasks(updatedTasks);
        };
      };

    // Event handler function to delete a task according to its index from the tasks array
    const deleteTask = (index: number): React.MouseEventHandler => {
        return () => {        
            const updatedTasks = [...tasks];
            updatedTasks.splice(index, 1); // removes 1 element (task) with the specified index from the updatedTask array
            setTasks(updatedTasks);
        };
    };

    // returns the form  
    return (
        <div className='remindersContainer'>
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
                            key={index} 
                            style={{
                                backgroundColor: task.isCompleted ? 'green' : '',
                              }}
                              >
                                {task.task} {/*that which will be rendered, the task (item in the array) property of the task object*/}
                            <div className='editTask'>
                                <FaEdit onClick={() => handleEditTask(index)} /> 
                                <FaRegTrashAlt onClick={deleteTask(index)} />
                                <input type="checkbox" className='taskCompletedCheckbox' 
                              onClick={completedTask(index)} />
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