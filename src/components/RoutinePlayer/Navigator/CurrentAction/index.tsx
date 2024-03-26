import { Action } from "@/components/RoutineItem";
import React, { useEffect, useState } from "react";
import Wait from "./Wait";
import type {
  SpeakText as SpeakTextType,
  SpeakCount as SpeakCountType,
  Wait as WaitType,
  Interact as InteractType,
} from "@/components/RoutineItem";
import { generateUniqueString } from "@/lib/utils";
import SpeakCount from "./SpeakCount";
import SpeakText from "./SpeakText";
import Interact from "./Interact";

const titleMap = {
  "speak/count": "Count",
  "speak/text": "Speak",
  wait: "Wait",
  interact: "Interact",
};

const switchMap = (
  key: string,
  obj: {
    [key: string]: React.ReactNode;
  }
): React.ReactNode => {
  return obj[key];
};

type CurrentAction = {
  action: Action;
  onComplete: () => void;
};

const CurrentAction = ({ action, onComplete }: CurrentAction) => {
  const [id] = useState(generateUniqueString());
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-2 text-primary">
      <div className="text-4xl font-bold mb-2 w-full text-center">
        {titleMap[action.data.type]}
      </div>
      {switchMap(action.data.type, {
        wait: (
          <Wait
            data={action as Action<WaitType>}
            onComplete={onComplete}
            key={id}
          />
        ),
        "speak/count": (
          <SpeakCount
            data={action as Action<SpeakCountType>}
            onComplete={onComplete}
            key={id}
          />
        ),
        "speak/text": (
          <SpeakText
            data={action as Action<SpeakTextType>}
            onComplete={onComplete}
            key={id}
          />
        ),
        interact: <Interact onComplete={onComplete} key={id} />,
      })}
    </div>
  );
};

export default CurrentAction;
