import ReactSwitch from "react-switch";
import useLocalStorage from "use-local-storage";

const Header = () => {
  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
    "isDarkMode",
    false
  );

  return (
    <>
      <div className="z-20 w-full flex items-center justify-between px-4 bg-background/30 backdrop-blur-md text-xl text-primary fixed top-0 left-0 right-0 h-14 shadow-lg">
        <div>
          <span className="mr-2">
            <i className="fa-solid fa-clock"></i>
          </span>
          <span className="font-bold">Routiner</span>
        </div>
        <ReactSwitch
          checked={isDarkMode}
          uncheckedHandleIcon={
            <div className="w-full h-full flex items-center justify-center">
              <i className="fa-solid fa-moon text-sm"></i>
            </div>
          }
          checkedHandleIcon={
            <div className="w-full h-full flex items-center justify-center">
              <i className="fa-solid fa-moon text-sm"></i>
            </div>
          }
          onColor="#7c3aed"
          offColor="#aaaaaa"
          checkedIcon={false}
          uncheckedIcon={false}
          onChange={(value) => setDarkMode(value)}
        />
      </div>
    </>
  );
};

export default Header;
