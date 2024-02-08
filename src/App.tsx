import Home from "./views/Home"
import Profile from "./views/Profile";
import Single from "./views/Single";
import Upload from "./views/Upload";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./views/Layout";
import Example from "./components/Example";
import Login from "./views/Login";
import Logout from "./views/Logout";

const App = () => {
  return (
    <>
      <Example></Example>
      <Router basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/single" element={<Single />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />

          </Route>
        </Routes>
      {/* TODO: Implement browser for switching between views */}
      </Router>
    </>
  )
}

export default App;
