import { useUser } from "../hooks/apiHooks";
import { useForm } from "../hooks/formHooks";

const RegisterForm = () => {
  const {postUser} = useUser();
  const initValues = {username: '', password: '', email: ''};
  const doRegister = async () => {
    try {
      console.log(inputs);
      await postUser(inputs);
    } catch (error) {
      console.log((error as Error).message);
    }
  }

  const {handleSubmit, handleInputChange, inputs} = useForm(doRegister, initValues);

  return (
    <>
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="UserWithLevelname">Username</label>
          <input
            name="username"
            type="text"
            id="UserWithLevelname"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="password"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            id="email"
            onChange={handleInputChange}
            autoComplete="email"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default RegisterForm;
