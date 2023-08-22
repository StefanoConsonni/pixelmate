import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { COOLDOWN_SECONDS } from "../utils/constants";

const useCooldown = () => {
  const [canChangeColor, setCanChangeColor] = useState(true);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    // Check if there's a previous timestamp in localStorage
    const lastSubmitTime = localStorage.getItem("lastSubmitTime");

    if (lastSubmitTime) {
      // Calculate the time elapsed since the last submission
      const currentTime = Date.now();
      const timeElapsed = Math.floor((currentTime - parseInt(lastSubmitTime)) / 1000);

      if (timeElapsed < COOLDOWN_SECONDS) {
        // If still in cooldown period, don't allow to change color and start the countdown
        setCanChangeColor(false);
        setCooldown(COOLDOWN_SECONDS - timeElapsed);
      }
    }
  }, []);

  const startCooldown = useCallback(() => {
    // Disable the possibility to change color and start the cooldown
    setCanChangeColor(false);
    setCooldown(COOLDOWN_SECONDS);
    // Start the countdown timer
    const timer = setInterval(() => {
      setCooldown((prevCooldown) => prevCooldown - 1);
    }, 1000);
    // Clear the timer after the cooldown ends
    setTimeout(() => {
      setCanChangeColor(true);
      clearInterval(timer);
      toast.success("Cooldown finally off!");
    }, 1000 * COOLDOWN_SECONDS);
  }, []);

  return {
    canChangeColor,
    cooldown,
    startCooldown,
  };
};

export default useCooldown;
