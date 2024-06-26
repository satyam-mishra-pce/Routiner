import React from "react";
import { Button } from "./ui/button";
import { isRoutinePlayable } from "@/lib/utils";

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

export type Wait = {
  duration: number;
  type: "wait";
};

export type Interact = {
  type: "interact";
};

export type Repeat = {
  actions: Action[];
  times: number;
  type: "repeat";
};

export type Basic = SpeakText | SpeakCount | Wait | Interact;
export type Complex = Basic | Repeat;

export type Action<T = Complex> = {
  id: string;
  data: T;
};

export type Routine<T = Complex> = {
  name: string;
  id: string;
  description?: string;
  actions: Action<T>[];
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
            isRoutinePlayable(data) && play(data);
          }}
          disabled={!isRoutinePlayable(data)}
        >
          <i className="fa-solid fa-play mr-2"></i>
          Start
        </Button>
      </div>
    </div>
  );
};

export default RoutineItem;
