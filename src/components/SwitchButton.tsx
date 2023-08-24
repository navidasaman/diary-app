import React, { useState } from 'react';
import '../css/SwitchButton.css'
import '../css/Sidebar.css'

// Props to determine if sidebar is collapsed or not
interface SwitchButtonProps {
  isCollapsed: boolean;
  handleToggleSidebar: () => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ isCollapsed, handleToggleSidebar }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () =>{
    setTheme((curr) => (curr === 'dark' ? 'light' : 'dark'));
    console.log("från switch: " + theme);
  };

  const handleSwitchToggleButton = () => {
    setIsChecked(!isChecked);
    console.log(isChecked)
  };

  return (
    <div className={`${isChecked ? 'dark' : 'light'}`}>
    <label className="toggleButton">
      <input
        className='switchButton'
        type="checkbox"
        checked={isChecked}
        onChange={handleSwitchToggleButton}
        onClick={toggleTheme}
      />
      <div className="slider" />
    </label>
    </div>
  );
};

export default SwitchButton;