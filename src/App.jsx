import { Route } from "react-router-dom";
import { useMyNotifs } from "./utilsComponents/Notif/useNotifs";
import { useDefaultTheme } from "./themes/Theme";
import { AnimatePresence } from "framer-motion";
import Sign from "./components/Sign/Sign";
import Navbar from "./components/Navbar/Navbar";
import NavPage from "./pages/NavPage";
import useAuth from "./hooks/useAuth";
import "./App.sass";

function App() {
  useAuth();
  useDefaultTheme();
  const { notifs } = useMyNotifs();
  return (
    <div className="App">
      {notifs.map((notif) => notif)}
      <AnimatePresence mode="wait">
        <Navbar key={"nav"} />
      </AnimatePresence>
      <NavPage key={"nav_page"}>
        <Route path="/sign" element={<Sign />} />
      </NavPage>
    </div>
  );
}

export default App;
