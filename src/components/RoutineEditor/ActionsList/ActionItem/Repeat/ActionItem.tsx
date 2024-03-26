import {
  Action,
  Interact as InteractType,
  Wait as WaitType,
  SpeakCount,
  SpeakText,
  Repeat as RepeatType,
} from "@/components/RoutineItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import React, { useEffect, useState } from "react";
import Speak from "../Speak";
import Wait from "../Wait";
import Interact from "../Interact";
import Repeat from ".";

type ActionItem = {
  data: Action;
  utils: {
    index: number;
    length: number;
    moveUp: (index: number) => void;
    moveDown: (index: number) => void;
    onDelete: (id: string) => void;
    saveAction: (index: number, action: Action) => void;
    addActionAtIndex: (action: Action, index: number) => void;
  };
};

const actionDataTypeMapper: {
  [key: string]: {
    title: string;
    icon: string;
  };
} = {
  speak: {
    title: "Speak",
    icon: "fa-regular fa-megaphone",
  },
  wait: {
    title: "Wait",
    icon: "fa-regular fa-clock",
  },
  interact: {
    title: "Interact",
    icon: "fa-regular fa-hand-back-point-up",
  },
  repeat: {
    title: "Repeat",
    icon: "fa-regular fa-repeat",
  },
};

const switchMap = (
  key: string,
  map: {
    [key: string]: React.ReactNode;
  }
): React.ReactNode => {
  return map[key];
};

const ActionItem = ({ data, utils }: ActionItem) => {
  const [actionData, setActionData] = useState<
    SpeakText | SpeakCount | WaitType | InteractType | RepeatType
  >(data.data);
  const [actionDataType, setActionDataType] = useState<string[]>(
    actionData.type.split("/")
  );
  useEffect(() => {
    setActionData(data.data);
  }, [data.data]);
  useEffect(() => {
    utils.saveAction(utils.index, { ...data, data: actionData });
    setActionDataType(actionData.type.split("/"));
  }, [actionData]);

  return (
    <div className="flex flex-col border border-border rounded-lg p-2 w-full shadow-md">
      <div className="flex flex-row items-center justify-between pl-1">
        <span className="font-bold w-40">
          <i
            className={`${
              actionDataTypeMapper[actionDataType[0]].icon
            } mr-1 w-6`}
          ></i>
          {actionDataTypeMapper[actionDataType[0]].title}
        </span>
        <div>
          <Button variant={"ghost"} onClick={() => utils.moveUp(utils.index)}>
            <i className="fa-regular fa-chevron-up"></i>
          </Button>
          <Button variant={"ghost"} onClick={() => utils.moveDown(utils.index)}>
            <i className="fa-regular fa-chevron-down"></i>
          </Button>
          <Button
            variant={"ghostDestructive"}
            onClick={() => utils.onDelete(data.id)}
          >
            <i className="fa-regular fa-trash"></i>
          </Button>
        </div>
      </div>
      {switchMap(actionDataType[0], {
        speak: (
          <Speak
            data={actionData as SpeakCount | SpeakText}
            onChange={(data) => {
              setActionData(data);
            }}
          />
        ),
        wait: (
          <Wait
            data={actionData as WaitType}
            onChange={(data) => {
              setActionData(data);
            }}
          />
        ),
        interact: <Interact />,
        repeat: (
          <Repeat
            data={actionData as RepeatType}
            onChange={(data) => setActionData(data)}
            utils={{
              index: utils.index,
              addActionAtIndex: utils.addActionAtIndex,
            }}
          />
        ),
      })}
    </div>
  );
};

export default ActionItem;
