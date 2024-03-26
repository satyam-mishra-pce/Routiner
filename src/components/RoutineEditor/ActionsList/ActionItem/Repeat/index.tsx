import { Action, Repeat as RepeatType } from "@/components/RoutineItem";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import ActionsList from "./ActionList";

type RepeatProps = {
  data: RepeatType;
  onChange: (data: RepeatType) => void;
  utils: {
    index: number;
    addActionAtIndex: (action: Action, index: number) => void;
  };
};

const Repeat = ({ data, onChange, utils }: RepeatProps) => {
  const [actions, setActions] = useState(data.actions);
  const [times, setTimes] = useState(data.times);

  const addActionAbove = (action: Action) => {
    utils.addActionAtIndex(action, utils.index - 1);
  };
  const addActionBelow = (action: Action) => {
    utils.addActionAtIndex(action, utils.index + 1);
  };

  useEffect(() => {
    setActions(data.actions);
  }, [data.actions]);
  useEffect(() => {
    setTimes(data.times);
  }, [data.times]);

  useEffect(() => {
    onChange({ ...data, actions, times });
  }, [actions, times]);

  return (
    <div className="pt-4 flex flex-col w-full gap-1">
      {actions.length === 0 ? (
        <div className="bg-foreground/10 rounded-md p-2 mb-2 text-muted-foreground text-center text-sm">
          Create and move actions here to repeat.
        </div>
      ) : (
        <div className="bg-foreground/5 rounded-md p-2 mb-2">
          <ActionsList
            actionsData={actions}
            setActionsData={setActions}
            utils={{ addActionAbove, addActionBelow }}
          />
        </div>
      )}
      <div className="text-muted-foreground text-sm">
        Enter number of times to repeat.
      </div>
      <Input
        type="number"
        value={times}
        onChange={(evt) => setTimes(parseInt(evt.target.value))}
      />{" "}
    </div>
  );
};

export default Repeat;
