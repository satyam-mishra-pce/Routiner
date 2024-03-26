import React from "react";
import { Button } from "./ui/button";

export type SpeakCount = {
  start: number;
  end: number;
  jump?: number;
  interval: number;
  type: "speak/count";
};

export type SpeakText = {
  text: string;
  type: "speak/text";
};

export type Speak<T> = T;

export type Wait = {
  duration: number;
  type: "wait";
};

export type Interact = {
  type: "interact";
};

export type Action<T = SpeakText | SpeakCount | Wait | Interact> = {
  id: string;
  data: T;
};

export type Routine = {
  name: string;
  id: string;
  description?: string;
  actions: Action[];
};

type RoutineItem = {
  data: Routine;
  edit: (routineEditorData: Routine) => void;
  play: (routineEditorData: Routine) => void;
  deleteRoutine: () => void;
};
const RoutineItem = ({ data, edit, play, deleteRoutine }: RoutineItem) => {
  return (
    <div className="p-2 rounded-md border border-border max-w-[400px] w-full">
      <div className="flex items-start justify-between">
        <span className="font-medium text-lg text-primary">{data.name}</span>
        <Button variant={"ghostDestructive"} onClick={deleteRoutine}>
          <i className="fa-regular fa-trash"></i>
        </Button>
      </div>
      <div className="text-muted-foreground mb-2">
        {data.description ? data.description : "No description."}
      </div>
      <div className="flex items-center gap-2 justify-end w-full">
        <Button
          variant={"outline"}
          onClick={() => {
            edit(data);
          }}
        >
          <i className="fa-regular fa-edit mr-2"></i>
          Edit
        </Button>
        <Button
          onClick={() => {
            data.actions.length > 0 && play(data);
          }}
          disabled={data.actions.length === 0}
        >
          <i className="fa-solid fa-play mr-2"></i>
          Start
        </Button>
      </div>
    </div>
  );
};

export default RoutineItem;
