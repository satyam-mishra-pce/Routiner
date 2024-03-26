import { Action, Basic, Complex, Routine } from "@/components/RoutineItem";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUniqueString(): string {
  return Math.random().toString(36).slice(2, 10);
}

export const compileRoutine = (routine: Routine<Complex>): Routine<Basic> => {
  const compiledActions: Action<Basic>[] = [];
  let idCounter = 0;

  const compileAction = (action: Action<Complex>) => {
    if (action.data.type === "repeat") {
      for (let i = 0; i < action.data.times; i++) {
        action.data.actions.forEach((subAction: Action<Complex>) => {
          compileAction({ ...subAction, id: `${subAction.id}-${idCounter++}` });
        });
      }
    } else {
      compiledActions.push(action as Action<Basic>);
    }
  };

  routine.actions.forEach((action: Action) => {
    compileAction(action);
  });

  return { ...routine, actions: compiledActions };
};
