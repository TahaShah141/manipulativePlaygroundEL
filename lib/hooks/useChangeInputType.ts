import { useEffect } from "react";

export const useChangeInputType = (onTouch: () => void, onMouse: () => void) => {
  useEffect(() => {

    const handleMouse = () => {
      console.log("Mouse")
      onMouse()
    }

    const handleTouch = () => {
      console.log("Touch")
      onTouch()
    }

    // Add touch event listeners
    window.addEventListener("touchmove", handleTouch);

    // Add mouse event listeners
    window.addEventListener("mousemove", handleMouse);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);
}
