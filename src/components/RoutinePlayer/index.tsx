import React, { useState } from "react";
import { Action, Routine } from "../RoutineItem";
import { Button } from "../ui/button";
import Navigator from "./Navigator";
import ExitPlayerDialog from "./ExitPlayerDialog";

type RoutinePlayer = {
  data: Routine;
  exit: () => void;
};

const RoutinePlayer = ({ data, exit }: RoutinePlayer) => {
  const [isExitPlayerDialogOpen, setExitPlayerDialogOpen] = useState(false);
  const endRoutine = () => {
    window.speechSynthesis.cancel();
    exit();
  };
  const showExitPlayerDialog = () => {
    setExitPlayerDialogOpen(true);
  };
  return (
    <div className="w-full h-full bg-accent flex items-start justify-center">
      <div className="w-full max-w-[400px] h-full flex flex-col">
        <div className="w-full h-20 px-4 flex items-center justify-between">
          <span className="font-bold text-3xl text-primary">
            {data.name.length > 0 ? data.name : "Routine"}
          </span>
          <Button
            variant={"ghost"}
            onClick={() => {
              window.speechSynthesis.cancel();
              exit();
            }}
          >
            <i className="fa-regular fa-xmark text-3xl text-primary"></i>
          </Button>
        </div>
        <Navigator
          data={data.actions as Action[]}
          onComplete={showExitPlayerDialog}
        />
        <ExitPlayerDialog
          isOpen={isExitPlayerDialogOpen}
          setOpen={setExitPlayerDialogOpen}
          exitPlayer={endRoutine}
        />
      </div>
    </div>
  );
};

export default RoutinePlayer;
