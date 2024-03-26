import { Action, SpeakCount as SpeakCountType } from "@/components/RoutineItem";
import React, { useEffect, useState } from "react";

type SpeakProps = {
  data: Action<SpeakCountType>;
  onComplete: () => void;
};

const SpeakCount = ({ data, onComplete }: SpeakProps) => {
  const generateSpeech = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 2.5;
    window.speechSynthesis.speak(speech);
  };

  const [count, setCount] = useState<number>(data.data.start);

  useEffect(() => {
    console.log("generating speech for", count);
    generateSpeech(count.toString());
    const { start, end, interval } = data.data;
    const jump = data.data.jump ? data.data.jump : 1;
    const counter = setTimeout(() => {
      setCount((prev) => {
        const addition = start < end ? jump : -jump;
        const newcount = prev + addition;
        const isValidCount = () => {
          if (start < end) {
            return start <= newcount && newcount <= end;
          }
          return end <= newcount && newcount <= start;
        };
        if (isValidCount()) return newcount;
        onComplete();
        return prev;
      });
    }, interval * 1000);
    return () => clearTimeout(counter);
  }, [count]);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <span className="font-bold text-9xl">{count}</span>
    </div>
  );
};

export default SpeakCount;
