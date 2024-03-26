import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Action } from "@/components/RoutineItem";
import { generateUniqueString } from "@/lib/utils";

type ActionCreatorPopover = {
  trigger: React.ReactNode;
  addAction: (action: Action) => void;
};

const ActionCreatorPopover = ({ trigger, addAction }: ActionCreatorPopover) => {
  const [isOpen, setOpen] = useState(false);

  const defaultSpeakData = {
    type: "speak/count" as "speak/count",
    start: 1,
    jump: 1,
    end: 10,
    interval: 1,
  };

  const defaultWaitData = {
    type: "wait" as "wait",
    duration: 10,
  };

  const defaultInteractData = {
    type: "interact" as "interact",
  };

  const defaultRepeatData = {
    type: "repeat" as "repeat",
    actions: [],
    times: 1,
  };

  const buttons = [
    {
      text: "Speak",
      icon: "fa-solid fa-megaphone",
      onClick: () => {
        addAction({
          id: generateUniqueString(),
          data: defaultSpeakData,
        });
      },
    },
    {
      text: "Wait",
      icon: "fa-solid fa-clock",
      onClick: () => {
        addAction({
          id: generateUniqueString(),
          data: defaultWaitData,
        });
      },
    },
    {
      text: "Interact",
      icon: "fa-solid fa-hand-back-point-up",
      onClick: () => {
        addAction({
          id: generateUniqueString(),
          data: defaultInteractData,
        });
      },
    },
    {
      text: "Repeat",
      icon: "fa-solid fa-repeat",
      onClick: () => {
        addAction({
          id: generateUniqueString(),
          data: defaultRepeatData,
        });
      },
    },
  ];

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2 flex flex-col items-center">
            <h4 className="font-medium leading-none">Create Action</h4>
            <p className="text-sm text-muted-foreground">
              Choose a type of action to create.
            </p>
          </div>
          <div className="flex flex-row flex-wrap justify-center gap-2">
            {buttons.map((buttonData, index) => {
              return (
                <Button
                  className="flex flex-col items-center h-20 w-20"
                  variant={"outline"}
                  onClick={() => {
                    buttonData.onClick();
                    setOpen(false);
                  }}
                  key={index}
                >
                  <i className={`${buttonData.icon} text-xl text-primary`}></i>
                  <span className="mt-2">{buttonData.text}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ActionCreatorPopover;
