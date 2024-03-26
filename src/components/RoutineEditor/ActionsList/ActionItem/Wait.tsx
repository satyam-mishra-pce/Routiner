import { Action, Wait as WaitType } from "@/components/RoutineItem";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

type WaitProps = {
  data: WaitType;
  onChange: (data: WaitType) => void;
};

const Wait = ({ data, onChange }: WaitProps) => {
  const [duration, setDuration] = useState(data.duration);

  useEffect(() => {
    setDuration(data.duration);
  }, [data.duration]);
  useEffect(() => {
    onChange({ ...data, duration });
  }, [duration]);

  return (
    <div className="pt-4 flex flex-col w-full gap-1">
      <div className="text-muted-foreground text-sm">
        Enter time in seconds to wait for.
      </div>
      <Input
        type="number"
        value={duration}
        onChange={(evt) => setDuration(parseInt(evt.target.value))}
      />{" "}
    </div>
  );
};

export default Wait;
