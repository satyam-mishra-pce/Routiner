import { Action, SpeakText as SpeakTextType } from "@/components/RoutineItem";
import React, { useEffect, useState } from "react";

type SpeakTextProps = {
  data: Action<SpeakTextType>;
  onComplete: () => void;
};

const SpeakText = ({ data, onComplete }: SpeakTextProps) => {
  const generateSpeech = (text: string, onEnd: () => void) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 2.5;
    speech.onend = onEnd;
    window.speechSynthesis.speak(speech);
  };

  const text = data.data.text;

  useEffect(() => {
    generateSpeech(text, onComplete);
  }, [text]);

  return (
    <div className="flex flex-col items-center justify-center gap-2 py-2 px-4">
      <span className="font-bold text-2xl text-center">{text}</span>
    </div>
  );
};

export default SpeakText;
