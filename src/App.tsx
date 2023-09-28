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
import Layout from "../src/components/Layout"; // Import the Layout component

function App() {
  const { state } = useAuthContext();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            state.user ? (
              <Navigate to="/" />
            ) : (
              <Layout>
                <LoginPage />
              </Layout>
            )
          }
        />
        <Route
          path="/signup"
          element={
            state.user ? (
              <Navigate to="/" />
            ) : (
              <Layout>
                <SignupPage />
              </Layout>
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            state.user ? (
              <Layout>
                <MainDashboard />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/calendar"
          element={
            state.user ? (
              <Layout>
                <CalendarPage />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
