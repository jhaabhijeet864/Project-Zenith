import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSpring, animated } from '@react-spring/web';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  const properties = {
    dark: {
      r: 9,
      transform: 'rotate(40deg)',
      cx: 12,
      cy: 4,
      opacity: 0
    },
    light: {
      r: 5,
      transform: 'rotate(90deg)',
      cx: 30,
      cy: 0,
      opacity: 1
    },
    springConfig: { mass: 4, tension: 250, friction: 35 }
  };

  const { transform, opacity } = useSpring({
    to: theme === 'dark' ? properties.dark : properties.light,
    config: properties.springConfig
  });

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <animated.div
        style={{
          transform: transform.to(t => `${t} scale(1)`),
          opacity
        }}
      >
        {theme === 'light' ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-blue-400" />
        )}
      </animated.div>
    </button>
  );
};

export default ThemeToggle;