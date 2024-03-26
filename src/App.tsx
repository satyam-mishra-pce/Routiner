import useLocalStorage from "use-local-storage";
import "./App.css";
import RoutinesList from "./components/RoutinesList";
import { useEffect } from "react";

function App() {
  const [isDarkMode] = useLocalStorage("isDarkMode", false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <div className="w-full h-full">
      <RoutinesList />
    </div>
  );
}

export default App;
