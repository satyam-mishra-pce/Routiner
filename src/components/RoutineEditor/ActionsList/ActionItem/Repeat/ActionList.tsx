import React, { useEffect, useRef, useState } from "react";
import { Action } from "@/components/RoutineItem";
import autoAnimate from "@formkit/auto-animate";
import ActionItem from "./ActionItem";

type ActionList = {
  actionsData: Action[];
  setActionsData: React.Dispatch<React.SetStateAction<Action[]>>;
  utils: {
    addActionAbove: (action: Action) => void;
    addActionBelow: (action: Action) => void;
  };
};
const ActionsList = ({ actionsData, setActionsData, utils }: ActionList) => {
  const listRef = useRef<HTMLDivElement>(null);

  const addActionAtIndex = (action: Action, index: number) => {
    const list = actionsData.slice(0);
    if (index === list.length - 1) {
      list.push(action);
    } else {
      list.splice(index, 0, action);
    }
    setActionsData(list);
  };

  const removeActionById = (id: string) => {
    setActionsData(actionsData.filter((action) => action.id !== id));
  };

  const moveUp = (index: number) => {
    if (index <= 0) {
      utils.addActionAbove(actionsData[index]);
      const list = actionsData.slice(0);
      list.splice(0, 1);
      setActionsData(list);
      return;
    }
    let list = actionsData.slice(0);
    const thisAction = list[index];
    const aboveAction = list[index - 1];
    if (aboveAction.data.type === "repeat") {
      aboveAction.data.actions.push(thisAction);
      list.splice(index, 1);
    } else {
      [list[index - 1], list[index]] = [thisAction, aboveAction];
    }
    setActionsData(list);
  };

  const moveDown = (index: number) => {
    if (index >= actionsData.length - 1) {
      utils.addActionBelow(actionsData[index]);
      const list = actionsData.slice(0);
      list.pop();
      setActionsData(list);
      return;
    }
    let list = actionsData.slice(0);
    const thisAction = list[index];
    const belowAction = list[index + 1];
    if (belowAction.data.type === "repeat") {
      belowAction.data.actions.splice(0, 0, thisAction);
      list.splice(index, 1);
    } else {
      [list[index], list[index + 1]] = [belowAction, thisAction];
    }
    setActionsData(list);
  };

  const saveAction = (index: number, action: Action) => {
    let list = actionsData.slice(0);
    list[index] = action;
    setActionsData(list);
  };

  useEffect(() => {
    listRef.current && autoAnimate(listRef.current);
  }, [listRef, actionsData]);

  return (
    <>
      {actionsData.length === 0 ? (
        <></>
      ) : (
        <div
          className="flex flex-col items-center justify-center min-h-full pt-2 w-full gap-2"
          ref={listRef}
        >
          {actionsData.map((action, index) => {
            return (
              <ActionItem
                key={action.id}
                data={action}
                utils={{
                  index,
                  length: actionsData.length,
                  moveUp: (index) => moveUp(index),
                  moveDown: (index) => moveDown(index),
                  saveAction,
                  onDelete: (id) => removeActionById(id),
                  addActionAtIndex,
                }}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default ActionsList;
