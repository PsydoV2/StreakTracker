import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Dimensions } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

export type StreakConfettiHandle = {
  fire: () => void;
};

/**
 * Owns the show/hide + timeout lifecycle for the celebratory confetti burst
 * shown after tracking or restarting a streak. Call `.fire()` via ref.
 */
const StreakConfetti = forwardRef<StreakConfettiHandle>((_, ref) => {
  const [show, setShow] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    fire: () => {
      setShow(true);
      timer.current = setTimeout(() => setShow(false), 3000);
    },
  }));

  if (!show) return null;

  return (
    <ConfettiCannon
      count={80}
      origin={{ x: screenWidth / 2, y: 0 }}
      fallSpeed={3000}
      explosionSpeed={0}
      fadeOut
      autoStart
    />
  );
});

StreakConfetti.displayName = "StreakConfetti";

export default StreakConfetti;
