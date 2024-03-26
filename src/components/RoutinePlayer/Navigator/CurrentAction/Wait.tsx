import { Action } from "@/components/RoutineItem";
import React, { useEffect, useState } from "react";
import type { Wait as WaitType } from "@/components/RoutineItem";

type Wait = {
  data: Action<WaitType>;
  onComplete: () => void;
};

const Wait = ({ data, onComplete }: Wait) => {
  const [duration, setDuration] = useState<number>(data.data.duration);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setDuration((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [duration]);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <span className="font-bold text-9xl">{duration}</span>
      <span className="text-primary/90">seconds</span>
    </div>
  );
};

export default Wait;
