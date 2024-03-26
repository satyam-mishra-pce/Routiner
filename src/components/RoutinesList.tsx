import React, { useEffect, useRef, useState } from "react";
import RoutineItem from "./RoutineItem";
import type { Routine } from "./RoutineItem";
import Header from "./Header";
import { v4 as uuid } from "uuid";
import CreateRoutineDialog from "./CreateRoutineDialog";
import type { CreateRoutineDialogProps } from "./CreateRoutineDialog";
import RoutineEditor from "./RoutineEditor";
import RoutinePlayer from "./RoutinePlayer";
import autoAnimate from "@formkit/auto-animate";
import useLocalStorage from "use-local-storage";
import { compileRoutine } from "@/lib/utils";

type EmptyList = CreateRoutineDialogProps;

const EmptyList = ({ createRoutine }: EmptyList) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-full pt-14 gap-2">
      <i className="fa-regular fa-heart-crack text-6xl text-primary/50"></i>
      <span className="text-muted-foreground">No routine found.</span>
      <CreateRoutineDialog createRoutine={createRoutine} />
    </div>
  );
};

const RoutinesList = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const [routines, setRoutines] = useLocalStorage<Routine[]>("routines", []);
  const [page, setPage] = useState<number>(0);

  const createRoutine = (name: string) => {
    setRoutines([...routines, { name, id: uuid(), actions: [] }]);
  };

  const deleteRoutineByIndex = (index: number) => {
    setRoutines([...routines.slice(0, index), ...routines.slice(index + 1)]);
  };

  const [routineEditorData, setRoutineEditorData] = useState<Routine>();

  const editRoutine = (routineData: Routine) => {
    setRoutineEditorData(routineData);
    setPage(1);
  };

  const exitRoutineEditor = () => {
    setPage(0);
  };

  const saveRoutineChanges = (data: Routine) => {
    let newRoutines = [];
    for (let i = 0; i < routines.length; i++) {
      if (routines[i].id === data.id) {
        newRoutines.push(data);
      } else {
        newRoutines.push(routines[i]);
      }
    }
    setRoutineEditorData(data);
    setRoutines(newRoutines);
  };

  const [routinePlayerData, setRoutinePlayerData] = useState<Routine>();

  const playRoutine = (routineData: Routine) => {
    setRoutinePlayerData(routineData);
    setPage(2);
  };

  const exitRoutinePlayer = () => {
    setPage(0);
  };

  useEffect(() => {
    listRef.current && autoAnimate(listRef.current);
  }, [listRef, routines]);
  return (
    <>
      {page === 0 ? (
        <>
          <Header />
          {routines.length > 0 ? (
            <>
              <div
                className="flex flex-col p-4 py-20 gap-2 items-center"
                ref={listRef}
              >
                {routines.map((routine, index) => {
                  return (
                    <RoutineItem
                      data={routine}
                      key={routine.id}
                      edit={editRoutine}
                      play={playRoutine}
                      deleteRoutine={() => {
                        deleteRoutineByIndex(index);
                      }}
                    />
                  );
                })}
              </div>
              <div className="fixed bottom-0 left-0 right-0 w-full p-4 bg-background/30 backdrop-blur-md border-t border-t-border flex items-center justify-center">
                <CreateRoutineDialog
                  createRoutine={createRoutine}
                  className="w-full max-w-[400px]"
                />
              </div>
            </>
          ) : (
            <EmptyList createRoutine={createRoutine} />
          )}
        </>
      ) : page === 1 ? (
        <RoutineEditor
          data={routineEditorData as Routine}
          back={exitRoutineEditor}
          save={saveRoutineChanges}
        />
      ) : routinePlayerData ? (
        <RoutinePlayer
          data={compileRoutine(routinePlayerData)}
          exit={exitRoutinePlayer}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default RoutinesList;
