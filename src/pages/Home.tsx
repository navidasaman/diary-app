import React from 'react'
import '../css/Home.css'
import { FaSkullCrossbones } from 'react-icons/fa';
import BinderClip from '../img/binderclip.png'

function Home() {
  return (
    <div className='homeContainer'>
        <div className="planner">
          <div className="planner-cover">
          {/* <div className='paperclipDiv'> <span className="paper-clip"></span></div> */}
            <div className="binderClip"><img src={BinderClip} alt="Binder clip" /></div>
            <div>
              <h1 className='homeTitle'>< FaSkullCrossbones />  My Planner. < FaSkullCrossbones /></h1>
              <ul className='list'>
                <li>Create, edit, delete diary posts</li>
                <li>Create, update and delete calendar events</li>
                <li>Create, delete, edit, check & drag and drop reminders</li>
                <li>Contact us</li>
                <li>Toggle between 4 different theme colors</li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Home
