import React, { useState } from "react";
import { Action, Routine } from "../RoutineItem";
import EditorHeader from "./EditorHeader";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TextArea } from "../ui/textarea";
import ActionsList from "./ActionsList";

type RoutineEditor = {
  data: Routine;
  back: () => void;
  save: (data: Routine) => void;
};

const RoutineEditor = ({ data, back, save }: RoutineEditor) => {
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [actions, setActions] = useState<Action[]>(
    data.actions ? data.actions : []
  );

  return (
    <>
      <EditorHeader
        name={name}
        actions={actions}
        setActions={setActions}
        back={back}
      />
      <div className="w-full flex flex-col items-center justify-start">
        <div className="flex flex-col max-w-[400px] w-full p-4 py-20 gap-2 items-center">
          <Input
            placeholder="Routine Name"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
            className=""
          />
          <TextArea
            value={description}
            onChange={(evt) => setDescription(evt.target.value)}
            placeholder="Routine Description"
            className="resize-none"
          />
          <ActionsList actionsData={actions} setActionsData={setActions} />
        </div>
        <div className="fixed bottom-0 left-0 right-0 w-full p-4 bg-background/30 backdrop-blur-md border-t border-t-border flex items-center justify-center">
          <Button
            className="w-full max-w-[400px]"
            onClick={() => {
              save({
                name,
                id: data.id,
                description,
                actions,
              });
              back();
            }}
          >
            <i className="fa-solid fa-floppy-disk mr-2"></i>Save Routine
          </Button>
        </div>
      </div>
    </>
  );
};

export default RoutineEditor;
