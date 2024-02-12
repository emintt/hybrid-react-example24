/* eslint-disable react-hooks/exhaustive-deps */
import { useUserContext } from "../hooks/contextHooks";

const Profile = () => {
 // moi dau no ko co gia tri userresponse, phai doi, tuy vao mang, nen de gia tri cua no ban dau la null
  // const [user, setUser] = useState<UserResponse['user'] | null>(null);
  // const {getUserByToken} = useUser();

  // useEffect(() => {
  //   const getUser = async () => {
  //     const token = localStorage.getItem('token');
  //     const userResponse = await getUserByToken(token!);
  //     setUser(userResponse.user);
  //   }

  //   getUser();
  // }, []);

  // user on tallennettu contextiin, haetaan vaan user state
  const {user} = useUserContext();



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
