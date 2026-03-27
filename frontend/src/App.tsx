import { BrowserRouter, Routes, Route } from "react-router";
import DashBoardPage from "./pages/DashBoardPage";
import { Toaster } from "sonner";
import LogInPage from "./pages/LogInPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<DashBoardPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
