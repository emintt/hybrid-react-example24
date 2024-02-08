/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useUser } from "../hooks/apiHooks";
import { UserResponse } from "../types/MessageTypes";

const Profile = () => {
 // moi dau no ko co gia tri userresponse, phai doi, tuy vao mang, nen de gia tri cua no ban dau la null
  const [user, setUser] = useState<UserResponse['user'] | null>(null);
  const {getUserByToken} = useUser();

  const getUser = async () => {
    const token = localStorage.getItem('token');
    const userResponse = await getUserByToken(token!);
    setUser(userResponse.user);
  }

  useEffect(() => {
    getUser();
  }, []);
  // getUser(); tää aja ikuisesti
  return (
    <>
      <h2>Profile page</h2>
      {user && (
        <>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Created: {new Date(user.created_at).toLocaleDateString('fi-FI')}</p>
        </>
      )}
    </>

  );
}

export default Profile;
