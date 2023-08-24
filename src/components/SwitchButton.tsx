import React, { useState } from 'react';
import '../css/SwitchButton.css'

// Props to determine if sidebar is collapsed or not
interface SwitchButtonProps {
  isCollapsed: boolean;
  handleToggleSidebar: () => void;
}
  // Takes the props and determines the state of the switch
  const SwitchButton: React.FC<SwitchButtonProps> = ({ isCollapsed, handleToggleSidebar }) => {
    const [isChecked, setIsChecked] = useState(true);

    const handleSwitchToggleButton = () => {
      setIsChecked(!isChecked);
  };

  return (
    <label className="toggleButton">
      <input
        className='switchButton'
        type="checkbox"
        checked={isChecked}
        onChange={handleSwitchToggleButton}
      />
      <div className="slider" />
    </label>
  );
};

export default SwitchButton;