import React, { useState, useEffect } from 'react';
import '../index.css'
import { FaHome, FaBookDead, FaComments, FaRegCalendarAlt, FaLaughBeam, FaPalette, FaUserAlt, FaTimes, FaBars, FaMailBulk } from 'react-icons/fa';

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    console.log(isCollapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const SidebarData = [
        {
            title: "Home",
            icon: <FaHome />,
            link: "/"
        },
        {
            title: "Diary",
            icon: <FaBookDead />,
            link: "/Diary"
        },
        {
            title: "Reminders",
            icon: <FaComments />,
            link: "/Reminders"
        },
        {
            title: "Calendar",
            icon: <FaRegCalendarAlt />,
            link: "/Calendar"
        },
        {
            title: "Mood thermometre",
            icon: <FaLaughBeam />,
            link: "/Mood"
        },
        {
            title: "Theme",
            icon: <FaPalette />,
            link: "/Theme"
        },
        {
          title: "Contact us",
          icon: <FaMailBulk />,
          link: "/Contact"
      }
  ];

  return (
<div className={`Sidebar ${isCollapsed ? 'collapsed' : ''}`}>
    <button className="ToggleButton" onClick={handleToggleSidebar}>{isCollapsed ? <FaBars /> : <FaTimes />}</button>
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
