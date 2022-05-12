import { useContext } from "react";
import { auth, googleProvider } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { UserContext } from "../contexts/UserContext";

const useAuthentication = () => {
  const { setUser } = useContext(UserContext);

  const loginSocial = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return { loginSocial };
};

export default useAuthentication;
