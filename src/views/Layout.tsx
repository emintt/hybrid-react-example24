import { Link, Outlet } from "react-router-dom";
import { useUserContext } from "../hooks/contextHooks";


const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();
  if (!user) {
    handleAutoLogin();
  }
  return (
    <>
      <header>
        <h1>My app</h1>
        <nav>
          <ul className=" flex justify-end bg-slate-950">
            <li>
              <Link className=" block p-4 text-slate-50 hover:bg-slate-700" to="/">Home</Link>
            </li>
            {user ?
            <>
              <li>
                <Link className=" block p-4 text-slate-50 hover:bg-slate-700" to="/profile">Profile</Link>
              </li>
              <li>
                <Link className=" block p-4 text-slate-50 hover:bg-slate-700" to="/upload">Upload</Link>
              </li>
              <li>
                <Link   className=" block p-4 text-slate-50 hover:bg-slate-700" to="/logout">Logout</Link>
              </li>
            </>
            :
              <li>
                <Link className=" block p-4 text-slate-50 hover:bg-slate-700" to="/login">Login</Link>
              </li>
            }
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>Copyright 2024</p>
      </footer>
    </>
  );
}


export default Layout;
