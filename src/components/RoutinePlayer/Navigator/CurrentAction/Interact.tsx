import React from "react";

type InteractProps = {
  onComplete: () => void;
};

const Interact = ({ onComplete }: InteractProps) => {
  return (
    <div
      className="relative flex flex-col items-center justify-center gap-2 py-2 px-4 rounded-xl flex-grow-[0.7] overflow-hidden"
      onClick={onComplete}
    >
      <span className="font-bold text-9xl text-center">
        <i className="fa-solid fa-hand-back-point-up animate-pulse"></i>
      </span>
      <div className="absolute aspect-square w-1/2 rounded-full bg-primary/40 animate-ping"></div>
      <span className="font-bold text-2xl text-center">
        Touch the screen to continue.
      </span>
    </div>
  );
};

export default Interact;
