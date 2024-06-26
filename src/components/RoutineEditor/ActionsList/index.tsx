import React, { useEffect, useRef, useState } from "react";
import ActionCreatorPopover from "./ActionCreatorPopover";
import { Action } from "@/components/RoutineItem";
import { Button } from "@/components/ui/button";
import ActionItem from "./ActionItem";
import autoAnimate from "@formkit/auto-animate";

type ActionList = {
  actionsData: Action[];
  setActionsData: React.Dispatch<React.SetStateAction<Action[]>>;
  placeholder?: React.ReactNode;
};
const ActionsList = ({
  actionsData,
  setActionsData,
  placeholder,
}: ActionList) => {
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
  const addAction = (action: Action) => {
    setActionsData([...actionsData, action]);
  };

  const removeActionById = (id: string) => {
    setActionsData(actionsData.filter((action) => action.id !== id));
  };

  const moveUp = (index: number) => {
    if (index <= 0) return;
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
    if (index >= actionsData.length - 1) return;
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
        <>
          {placeholder === undefined ? (
            <div className="flex flex-col items-center justify-center min-h-full w-full pt-14 gap-2">
              <i className="fa-regular fa-heart-crack text-6xl text-primary/50"></i>
              <span className="text-muted-foreground">No actions added.</span>
              <ActionCreatorPopover
                trigger={
                  <Button
                    //   className="h-10 w-10 rounded-full"
                    variant={"secondary"}
                    className="px-4"
                  >
                    <i className="fa-regular fa-plus-circle mr-2"></i>
                    <span>Add Action</span>
                  </Button>
                }
                addAction={addAction}
              />
            </div>
          ) : (
            placeholder
          )}
        </>
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
          <ActionCreatorPopover
            trigger={
              <Button
                className="h-10 w-10 rounded-full mt-2"
                variant={"secondary"}
              >
                <i className="fa-solid fa-plus"></i>
              </Button>
            }
            addAction={addAction}
          />
        </div>
      )}
    </>
  );
};

export default ActionsList;
