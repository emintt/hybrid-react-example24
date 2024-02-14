import { useUserContext } from "../hooks/contextHooks";
import { useForm } from "../hooks/formHooks";
import { Credentials } from "../types/Localtypes";

const LoginForm = () => {
  const {handleLogin} = useUserContext();
  const initValues: Credentials = {username: '', password: ''};

  // ham doLogin la parameter cua useForm, cu the la parameter callback cua useForm
  // trong handleSubmit callback dc goi, co nghia la khi form submit, goi callback
  // = send form data to API, doLogin
  const doLogin = async () => {
    handleLogin(inputs as Credentials);
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(doLogin, initValues);

  return (
    <>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="loginUsername">Username</label>
            <input
              className=" text-slate-950"
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
              className=" text-slate-950"
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
