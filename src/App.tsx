import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import MainDashboard from "./pages/MainDashboard";
import CalendarPage from "./pages/CalendarPage";
import useAuthContext from "./hooks/useAuthContext";
import HomeNavBar from "./components/homePageComponents/HomeNavBar";

function App() {
  const { state } = useAuthContext();

  return (
    <Router>
      <HomeNavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={state.user ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={state.user ? <Navigate to="/" /> : <SignupPage />}
        />
        <Route
          path="/dashboard"
          element={state.user ? <MainDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/calendar"
          element={state.user ? <CalendarPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
