import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useEffect, useState } from "react";
export type JSONDIalogProps = {
  routineObj: object;
  editRoutine: (json: object) => void;
} & React.HTMLAttributes<HTMLButtonElement>;

const JSONDialog = ({ routineObj, editRoutine, ...props }: JSONDIalogProps) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [jsonStr, setJsonStr] = useState(JSON.stringify(routineObj));
  const handleEditRoutine = (json: object) => {
    editRoutine(json);
    setDrawerOpen(false);
  };

  useEffect(() => {
    setJsonStr(JSON.stringify(routineObj));
  }, [routineObj]);

  const safeParse = (jsonStr: string): object => {
    try {
      return JSON.parse(jsonStr);
    } catch {
      return [];
    }
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={(open) => setDrawerOpen(open)}>
      <DrawerTrigger asChild>
        <Button variant={"ghost"} {...props}>
          <i className="fa-regular fa-brackets-curly"></i>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex items-center">
        <div className="max-w-[400px]">
          <DrawerHeader>
            <DrawerTitle>Manual Routine Editor</DrawerTitle>
            <DrawerDescription>
              Modify the following JSON to edit the Routine.
            </DrawerDescription>
          </DrawerHeader>
          <textarea
            value={jsonStr}
            onChange={(evt) => setJsonStr(evt.target.value)}
            className="w-full resize-none rounded-md bg-transparent border border-border h-[48vw] max-h-80 p-2 font-mono"
          ></textarea>
          <DrawerFooter>
            <Button onClick={() => handleEditRoutine(safeParse(jsonStr))}>
              Done
            </Button>
            <DrawerClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default JSONDialog;
