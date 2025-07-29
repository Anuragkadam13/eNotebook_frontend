import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ThemeProvider } from "@/components/theme-provider";
import LoaderState from "./context/Loader/LoaderState";
import Loader from "./components/Loader";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <LoaderState>
          <NoteState>
            <Navbar />
            <Loader />
            <div className="px-5 pt-20">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </div>
          </NoteState>
        </LoaderState>
      </ThemeProvider>
    </>
  );
}

export default App;
