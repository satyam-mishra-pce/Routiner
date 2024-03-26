import { Action, SpeakCount, SpeakText } from "@/components/RoutineItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { generateUniqueString } from "@/lib/utils";
import React, { useEffect, useState } from "react";

type SpeakCountForm = {
  countData: SpeakCount;
  setCountData: React.Dispatch<React.SetStateAction<SpeakCount>>;
};
const SpeakCountForm = ({ countData, setCountData }: SpeakCountForm) => {
  const [id] = useState(generateUniqueString());
  return (
    <div className="grid grid-cols-[100px_auto] gap-2">
      <span id={id + "-start"}>Start</span>
      <Input
        aria-describedby={id + "-start"}
        type="number"
        value={countData.start}
        onChange={(evt) =>
          setCountData({ ...countData, start: parseInt(evt.target.value) })
        }
      />
      <span id={id + "-end"}>End</span>
      <Input
        aria-describedby={id + "-end"}
        type="number"
        value={countData.end}
        onChange={(evt) =>
          setCountData({ ...countData, end: parseInt(evt.target.value) })
        }
      />
      <span id={id + "-jump"}>Jump by</span>
      <Input
        aria-describedby={id + "-jump"}
        type="number"
        value={countData.jump}
        onChange={(evt) =>
          setCountData({ ...countData, jump: parseInt(evt.target.value) })
        }
      />
      <span id={id + "-interval"}>Interval</span>
      <Input
        aria-describedby={id + "-interval"}
        type="number"
        value={countData.interval}
        onChange={(evt) =>
          setCountData({
            ...countData,
            interval: parseInt(evt.target.value),
          })
        }
      />
    </div>
  );
};

type SpeakTextForm = {
  textData: SpeakText;
  setTextData: React.Dispatch<React.SetStateAction<SpeakText>>;
};
const SpeakTextForm = ({ textData, setTextData }: SpeakTextForm) => {
  const [id] = useState(generateUniqueString());
  return (
    <div className="flex flex-col w-full">
      <TextArea
        aria-describedby={id + "-start"}
        value={textData.text}
        onChange={(evt) => setTextData({ ...textData, text: evt.target.value })}
        className="resize-none"
      />
    </div>
  );
};

type Speak = {
  data: SpeakCount | SpeakText;
  onChange: (data: SpeakCount | SpeakText) => void;
};

const Speak = ({ data, onChange }: Speak) => {
  const getSpeakType = (data: SpeakCount | SpeakText) => {
    if (data.type === "speak/count") {
      return 0;
    } else {
      return 1;
    }
  };

  const [speakType, setSpeakType] = useState<0 | 1>(getSpeakType(data));

  const [countData, setCountData] = useState<SpeakCount>(
    speakType === 0
      ? (data as SpeakCount)
      : {
          start: 1,
          end: 10,
          jump: 1,
          interval: 1,
          type: "speak/count",
        }
  );
  const [textData, setTextData] = useState<SpeakText>(
    speakType === 1
      ? (data as SpeakText)
      : {
          type: "speak/text",
          text: "Hello world!",
        }
  );

  useEffect(() => {
    const dataSpeakType = getSpeakType(data);
    setSpeakType(dataSpeakType);
    if (dataSpeakType === 0) {
      setCountData(data as SpeakCount);
    } else {
      setTextData(data as SpeakText);
    }
  }, [data]);

  useEffect(() => {
    if (speakType === 0) {
      onChange(countData);
    } else {
      onChange(textData);
    }
  }, [speakType, countData, textData]);

  return (
    <div className="pt-4 flex flex-col w-full gap-1">
      <div className="text-muted-foreground text-sm">
        Speak a sequence of numbers or some text.
      </div>
      <div>
        <span className="font-medium text-sm">Choose what to speak:</span>
        <div className="flex items-center justify-center w-full p-1 gap-1 mb-2">
          <Toggle
            size={"sm"}
            pressed={speakType === 0}
            onPressedChange={() => setSpeakType(0)}
          >
            Count
          </Toggle>
          <Toggle
            size={"sm"}
            pressed={speakType === 1}
            onPressedChange={() => setSpeakType(1)}
          >
            Text
          </Toggle>
        </div>
      </div>
      {/* <div className="text-muted-foreground text-sm">
          Select the range of numbers to count in the desired equal intervals.
        </div> */}
      {speakType === 0 ? (
        <SpeakCountForm countData={countData} setCountData={setCountData} />
      ) : (
        <SpeakTextForm textData={textData} setTextData={setTextData} />
      )}
    </div>
  );
};

export default Speak;
