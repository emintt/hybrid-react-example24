import { useState } from "react";
import { useUser } from "../hooks/apiHooks";
import { useForm } from "../hooks/formHooks";

const RegisterForm = () => {
  const {postUser} = useUser();

  const [usernameAvailable, setUsernameAvailable] = useState<boolean>(true);
  const [emailAvailable, setEmailAvailable] = useState<boolean>(true);

  const initValues = {username: '', password: '', email: ''};
  const doRegister = async () => {
    try {
      console.log(inputs);
      if (usernameAvailable && emailAvailable) {
        await postUser(inputs);
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  }

  const {handleSubmit, handleInputChange, inputs} = useForm(doRegister, initValues);

  const {getUsernameAvailable, getEmailAvailable} = useUser();

  const handleUsernameBlur = async () => {
    const result = await getUsernameAvailable(inputs.username);
    setUsernameAvailable(result.available);
  }

  const handleEmailBlur = async (
    event: React.SyntheticEvent<HTMLInputElement>
    ) => {
    console.log(event.currentTarget.value);
    const result = await getEmailAvailable(event.currentTarget.value);
    setEmailAvailable(result.available);
  }

  return (
    <>
      <h3>Register</h3>
      <form onSubmit={handleSubmit} className=" flex flex-col text-center">
        <div className=" flex w-4/5">
          <label className=" w-1/3 p-6 text-end" htmlFor="UserWithLevelname">Username</label>
          <input
            className=" m-3 text-slate-950"
            name="username"
            type="text"
            id="UserWithLevelname"
            onChange={handleInputChange}
            onBlur={handleUsernameBlur}
            autoComplete="username"
          />
        </div>
        {!usernameAvailable && (
          <div className=" flex w-4/5 justify-end pr-4">
            <p className=" text-red-500">Username not available</p>
          </div>
        )}
        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            className=" m-3 text-slate-950"
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
            className=" m-3 text-slate-950"
            name="email"
            type="email"
            id="email"
            onChange={handleInputChange}
            onBlur={handleEmailBlur}
            autoComplete="email"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default RegisterForm;
