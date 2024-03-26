import React from "react";

type OtherActionProps = {
  actionType: string;
};

const OtherAction = ({ actionType }: OtherActionProps) => {
  const titleMap: { [key: string]: string } = {
    "speak/count": "Count",
    "speak/text": "Speak",
    wait: "Wait",
    interact: "Interact",
  };
  return <div>{titleMap[actionType]}</div>;
};

export default OtherAction;
