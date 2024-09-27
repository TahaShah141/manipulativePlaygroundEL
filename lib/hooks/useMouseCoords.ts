import { useState, useEffect } from 'react';

export const useMouseCoords = () => {
  // State to store the coordinates for both mouse and touch
  const [coords, setCoords] = useState({ mouseX: 0, mouseY: 0 });

  // Effect to add and clean up event listeners
  useEffect(() => {
    // Handler to update the state with current mouse coordinates
    const updateMouseCoords = (event: MouseEvent) => {
      setCoords({
        mouseX: event.clientX,
        mouseY: event.clientY,
      });
    };

    // Handler to update the state with current touch coordinates
    const updateTouchCoords = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) {
        setCoords({
          mouseX: touch.clientX,
          mouseY: touch.clientY,
        });
      }
    };

    // Adding the mousemove and touchmove event listeners
    window.addEventListener('mousemove', updateMouseCoords);
    window.addEventListener('touchmove', updateTouchCoords);

    // Cleanup the event listeners on component unmount
    return () => {
      window.removeEventListener('mousemove', updateMouseCoords);
      window.removeEventListener('touchmove', updateTouchCoords);
    };
  }, []);

  // Return the coordinates
  return coords;
};
