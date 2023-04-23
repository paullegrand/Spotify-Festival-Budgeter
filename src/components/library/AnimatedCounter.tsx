import { useEffect, useRef, useState } from "react";
import { formatCurrency } from "../../filters";

interface AnimatedCounterProps {
  value: number;
  animationLength?: number;
  frames?: number;
  isCurrency: boolean;
}

// Hook to track previous state
const usePrevious = (value: number): number => {
  // Mutable container with 'current' property
  const ref = useRef<number>(0);

  // Store the previous value when `value` changes
  useEffect(() => {
    ref.current = value;
  }, [value]);

  // Return the previous value
  return ref.current;
};

// Animated comopnent counter
// Takes three params
// value: the target we want to reach
// animationLength: how long we want the counter to animate for
// frames: how many frames we want in the animation
const AnimatedCounter = ({
  value = 0,
  animationLength = 1000,
  frames = 100,
  isCurrency = false,
}: AnimatedCounterProps) => {
  // Keep track of our previous value using a `usePrevious` hook, defined above
  const previousValue = usePrevious(value);
  // Set our state w/ the current value, so we know where we're at in the increment process
  const [currentValue, setCurrentValue] = useState<number>(previousValue);

  useEffect(() => {
    // Save our start and end values, so we know where to go to/from
    // If there is no change, don't do anything and return now
    let start = previousValue;
    const end = value;
    if (start === end) return;

    // Get the frame duration and how much to increment by each interval
    const frameDuration = animationLength / frames;
    const increment = (end - start) / frames;

    // Set up an interval to increment the number
    const timer = setInterval(() => {
      start += increment;
      setCurrentValue(start);

      // Have we reached the end? Yipee! Let's clear this puppy out.
      const shouldClear = increment > 0 ? start >= end : start <= end;
      if (shouldClear) {
        clearInterval(timer);
        // Sometimes we get rounding errors, so just make sure we reached our fianl value
        start = end;
      }
      // Our interval is the frame duration
    }, frameDuration);
  });

  return (
    <>
      {isCurrency ? formatCurrency(currentValue, 0) : Math.round(currentValue)}
    </>
  );
};

export default AnimatedCounter;
