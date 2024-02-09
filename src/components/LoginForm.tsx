// import { useNavigate } from "react-router-dom";
// import { useAuthentication } from "../hooks/apiHooks";
import { useForm } from "../hooks/formHooks";
import { Credentials } from "../types/Localtypes";
// import { UserContext, UserProvider } from "../contexts/UserContext";
import { useUserContext } from "../hooks/contextHooks";

const LoginForm = () => {
  // const {postLogin} = useAuthentication();
  // router sisältä, päästä navigointi objektin
  // const navigate = useNavigate();
  const initValues: Credentials = {username: '', password: ''};

  const { user, handleLogin, handleLogout, handleAutoLogin } = useUserContext();

  // ham doLogin la parameter cua useForm, cu the la parameter callback cua useForm
  // trong handleSubmit callback dc goi, co nghia la khi form submit, goi call back
  // = send form data to API, doLogin
  const doLogin = async () => {
    // try {
      // console.log('submit callback, inputs:', inputs);
      // use postLogin to authenticate with server
      // const loginResult = await postLogin(inputs as Credentials);
      // if (loginResult) {
      //   localStorage.setItem('token', loginResult.token);
      //   navigate('/');
      // }
      handleLogin
    // } catch (error) {
      // console.log((error as Error).message);
    // }
  };
  const {handleSubmit, handleInputChange, inputs} = useForm(doLogin, initValues);
  return (
    <>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="loginUsername">Username</label>
            <input
                name="username"
                type="text"
                id="loginUsername"
                onChange={handleInputChange}
                autoComplete="username"
            />
        </div>
        <div>
            <label htmlFor="loginpassword">Password</label>
            <input
                name="password"
                type="password"
                id="loginpassword"
                onChange={handleInputChange}
                autoComplete="current-password"
            />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default LoginForm;
