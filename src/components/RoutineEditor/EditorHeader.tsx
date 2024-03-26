import React from "react";
import { Action, Routine } from "../RoutineItem";
import { Button } from "../ui/button";
import JSONDialog from "./JSONDialog";

type EditorHeader = {
  name: string;
  actions: Action[];
  setActions: React.Dispatch<React.SetStateAction<Action[]>>;
  back: () => void;
};

const EditorHeader = ({ name, actions, setActions, back }: EditorHeader) => {
  return (
    <div className="z-20 w-full flex items-center justify-between px-4 bg-background/70 backdrop-blur-lg text-xl text-primary fixed top-0 left-0 right-0 h-14 shadow-lg">
      <div className="flex items-center">
        <span className="mr-2">
          <Button onClick={back} variant={"ghost"}>
            <i className="fa-regular fa-arrow-left"></i>
          </Button>
        </span>
        <span className="font-bold">Edit {name}</span>
      </div>
      <div className="flex items-center">
        <JSONDialog
          routineObj={actions}
          editRoutine={(data: object) => {
            setActions(data as Action[]);
          }}
        />
      </div>
    </div>
  );
};

export default EditorHeader;
