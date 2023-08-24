import React, { useState } from 'react';
import '../css/SwitchButton.css'

interface SwitchButtonProps {
  isCollapsed: boolean;
  handleToggleSidebar: () => void;
}

  const SwitchButton: React.FC<SwitchButtonProps> = ({ isCollapsed, handleToggleSidebar }) => {
    const [isChecked, setIsChecked] = useState(true);

    const handleToggle = () => {
      setIsChecked(!isChecked);
  };

  return (
    <label className="toggleButton">
      <input
        className='switchButton'
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
      />
      <div className="slider" />
    </label>
  );
};

export default SwitchButton;