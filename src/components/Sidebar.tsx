import React, { useState, useEffect } from 'react';
import '../css/Sidebar.css'
import { FaHome, FaBookDead, FaRegCalendarAlt, FaLaughBeam, FaUserAlt, FaTimes, FaBars, FaMailBulk, FaComment } from 'react-icons/fa';

function Sidebar() {
  /*The state variable is set to false as the initial value*/ 
  const [isCollapsed, setIsCollapsed] = useState(false);

  /*To be able to toggle the sidebar between true and false to collapse/expand it */
  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    console.log(isCollapsed);
  };

  /* the useEffect hook is used alongside an event listener to automatically collapse 
  the sidebar if window size is under 900px by changing the state of the useState hook */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    /* Event listener for the resize event */
    window.addEventListener('resize', handleResize);

    /*Removing the event listener as it unmounts */
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /*Creates objects in an array for the items in the sidebar representing the title, icon and route link*/
  const SidebarData = [
        {
            title: "Home",
            icon: <FaHome />,
            link: "/Home"
        },
        {
            title: "Diary",
            icon: <FaBookDead />,
            link: "/Diary"
        },
        {
            title: "Calendar",
            icon: <FaRegCalendarAlt />,
            link: "/Calendar"
        },
        {
          title: "Reminders",
          icon: <FaComment />,
          link: "/Reminders"
      },
        {
            title: "Mood thermometre",
            icon: <FaLaughBeam />,
            link: "/Mood"
        },
        {
          title: "Contact us",
          icon: <FaMailBulk />,
          link: "/Contact"
      },
  ];

  /*Returns the sidebar containing the object from the SidebarData array and 
  the toggle button alongside conditions for when the sidebar is collapsed or not */
  return (
    <div className={`Sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="menuToggleButton" onClick={handleToggleSidebar}>{isCollapsed ? <FaBars /> : <FaTimes />}</button>
      <div className='MenuContainer'>
        <div className={`MenuTitle ${isCollapsed ? 'collapsed' : ''}`}><FaUserAlt /></div>
      </div>
      <div className="SidebarList">
        {SidebarData.map((val, key) => (
          <div key={key} className="SidebarRow" onClick={() => (window.location.pathname = val.link)}>
            <div className="SidebarIcon">{val.icon}</div> 
            <div className={`SidebarTitle ${isCollapsed ? 'collapsed' : ''}`}>{val.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar
