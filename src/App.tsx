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

function App() {
  const { state } = useAuthContext();
  const { user } = state;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={user ? <LoginPage /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/signup"
          element={user ? <SignupPage /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={user ? <MainDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/calendar"
          element={user ? <CalendarPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
