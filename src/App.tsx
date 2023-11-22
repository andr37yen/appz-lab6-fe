import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CabinetPage from "./pages/Cabinet/Cabinet";
import NotificationsPage from "./pages/Notifications/Notification";
import LoginPage from "./pages/Login/Login";
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

