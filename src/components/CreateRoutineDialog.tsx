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
import { Input } from "./ui/input";
import { useState } from "react";
export type CreateRoutineDialogProps = {
  createRoutine: (name: string) => void;
} & React.HTMLAttributes<HTMLButtonElement>;

const CreateRoutineDialog = ({
  createRoutine,
  ...props
}: CreateRoutineDialogProps) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [routineName, setRoutineName] = useState("");
  const handleCreateRoutine = (routineName: string) => {
    createRoutine(routineName);
    setDrawerOpen(false);
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={(open) => setDrawerOpen(open)}>
      <DrawerTrigger asChild>
        <Button {...props}>
          <i className="fa-regular fa-plus-circle mr-2"></i> Create Routine
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex items-center">
        <div className="max-w-[400px]">
          <DrawerHeader>
            <DrawerTitle>Create Routine</DrawerTitle>
            <DrawerDescription>Enter a name for the routine.</DrawerDescription>
          </DrawerHeader>
          <Input
            value={routineName}
            onChange={(evt) => setRoutineName(evt.target.value)}
          />
          <DrawerFooter>
            <Button onClick={() => handleCreateRoutine(routineName)}>
              Create
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

export default CreateRoutineDialog;
