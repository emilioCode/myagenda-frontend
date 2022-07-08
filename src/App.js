import "./App.css";
import NavBar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Agenda from "./pages/Agenda";
import NotFound from "./pages/404";

function App() {
  const app = {
    title: "react-agenda",
    routes: [
      {
        name: "Bio",
        path: "https://bio.link/emiliomendez_",
        component: null,
      },
      {
        name: "GitHub",
        path: "https://github.com/emilioCode",
        component: null,
      },
      { name: "Agenda", path: "/agenda", component: <Agenda /> },
    ],
  };

  return (
    <div>
      <Router>
        <NavBar routes={app.routes} />
        <br />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            {app.routes.map((a, index) => {
              return <Route path={a.path} element={a.component} key={index} />;
            })}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
