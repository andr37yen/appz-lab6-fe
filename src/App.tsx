import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CabinetPage from "./pages/Cabinet/CabinetPage";
import NotificationsPage from "./pages/Notifications/NotificationPage";
import LoginPage from "./pages/Login/LoginPage";
import "./styles/styles.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" Component={LoginPage} />
        <Route path="/cabinet" Component={CabinetPage} />
        <Route path="/notifications" Component={NotificationsPage} />
      </Routes>
    </Router>
  );
}

export default App;

