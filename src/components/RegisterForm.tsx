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
      <div className=" flex flex-col items-center gap-5 my-4">
        <h3 className=" text-3xl text-center">Register</h3>
        <form onSubmit={handleSubmit} className=" flex flex-col py-6 px-3 border rounded">
          <div className=" flex justify-between items-center">
            <label className=" p-3" htmlFor="UserWithLevelname">Username</label>
            <input
              className=" text-slate-950 w-96 m-3 rounded p-2 border-slate-500"
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
          <div className=" flex justify-between items-center">
            <label className=" p-3" htmlFor="loginpassword">Password</label>
            <input
              className=" text-slate-950 w-96 m-3 rounded p-2 border-slate-500"
              name="password"
              type="password"
              id="password"
              onChange={handleInputChange}

              autoComplete="current-password"
            />
          </div>
          <div className=" flex justify-between items-center">
            <label className=" p-3" htmlFor="email">Email</label>
            <input
              className=" text-slate-950 w-96 m-3 rounded p-2 border-slate-500"
              name="email"
              type="email"
              id="email"
              onChange={handleInputChange}
              onBlur={handleEmailBlur}
              autoComplete="email"
            />
          </div>
          <button className="m-3 w-1/3 rounded-md bg-slate-700 p-3 self-center" type="submit">Register</button>
        </form>
      </div>
    </>
  );
}

export default RegisterForm;
