import Home from "./views/Home"
import Profile from "./views/Profile";
import Single from "./views/Single";
import Upload from "./views/Upload";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./views/Layout";

const App = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    {/* TODO: Implement browser for switching between views */}
    <Home />
      <Profile />
      <Single />
      <Upload />
    </Router>

  )
}

export default App;
