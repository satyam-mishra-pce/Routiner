import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
export type ExitPlayerDialogProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  exitPlayer: () => void;
};

const ExitPlayerDialog = ({
  isOpen = false,
  setOpen,
  exitPlayer,
}: ExitPlayerDialogProps) => {
  return (
    <Drawer open={isOpen} onOpenChange={(open) => setOpen(open)}>
      <DrawerContent className="flex items-center">
        <div className="max-w-[400px]">
          <DrawerHeader>
            <DrawerTitle>Routine Complete</DrawerTitle>
            <DrawerDescription>
              The routine is complete now. Do you want to exit?
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              onClick={() => {
                exitPlayer();
              }}
            >
              Yes
            </Button>
            <DrawerClose asChild>
              <Button variant={"outline"} onClick={() => setOpen(false)}>
                No
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ExitPlayerDialog;
