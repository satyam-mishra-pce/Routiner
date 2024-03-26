import React, { useState } from "react";
import CurrentAction from "./CurrentAction";
import { Action, Basic } from "../../RoutineItem";
import { Button } from "../../ui/button";
import OtherAction from "./OtherAction";

type Navigator = {
  data: Action<Basic>[];
  onComplete: () => void;
};

const Navigator = ({ data, onComplete }: Navigator) => {
  const [currentActionIndex, setCurrentActionIndex] = useState<number>(0);

  const playPreviousAction = () => {
    window.speechSynthesis.cancel();
    setCurrentActionIndex((i) => Math.max(i - 1, 0));
  };
  const playNextAction = () => {
    window.speechSynthesis.cancel();
    setCurrentActionIndex((i) => {
      if (i === data.length - 1) {
        onComplete();
      }
      return Math.min(i + 1, data.length - 1);
    });
  };

  return (
    <div className="p-4 flex flex-col flex-1 gap-2">
      <Button
        variant={"outline"}
        className="flex flex-row items-center justify-start bg-background/60 text-primary hover:bg-primary/60 hover:text-primary-foreground px-4"
        onClick={playPreviousAction}
        disabled={currentActionIndex <= 0}
      >
        <i className="fa-regular fa-chevron-left text-lg mr-2"></i>
        {currentActionIndex > 0 ? (
          <OtherAction actionType={data[currentActionIndex - 1].data.type} />
        ) : (
          <></>
        )}
      </Button>
      <CurrentAction
        action={data[currentActionIndex]}
        onComplete={() => playNextAction()}
      />
      {currentActionIndex < data.length - 1 ? (
        <Button
          variant={"outline"}
          className="flex flex-row items-center justify-end bg-background/60 text-primary hover:bg-primary/60 hover:text-primary-foreground px-4"
          onClick={playNextAction}
          disabled={currentActionIndex >= data.length - 1}
        >
          <OtherAction actionType={data[currentActionIndex + 1].data.type} />
          <i className="fa-regular fa-chevron-right text-lg ml-2"></i>
        </Button>
      ) : (
        <Button
          className="flex flex-row items-center justify-center px-4"
          onClick={onComplete}
        >
          Finish <i className="fa-regular fa-arrow-right ml-2"></i>
        </Button>
      )}
    </div>
  );
};

export default Navigator;
