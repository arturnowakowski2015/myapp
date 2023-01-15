import { useState, useEffect } from "react";

const useAnimation = () => {
  const [displayAnimated, setDisplayAnimated] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
  ]);
  const [settAnimation, setSettAnimation] = useState({
    ii: 0,
    time: 0,
    str: "",
  });

  const changedisplayAnimated = (ii, time) => {
    const d = displayAnimated;
    const timer = setTimeout(() => {
      d[ii] = settAnimation.str;
      setDisplayAnimated(d);
      changedisplayAnimated(++ii, time);
    }, time);
    if (ii > 6) clearTimeout(timer);
  };

  useEffect(() => {
    changedisplayAnimated(++settAnimation.ii, settAnimation.time);
  }, [settAnimation]);

  return [setSettAnimation, displayAnimated];
};

export { useAnimation };
