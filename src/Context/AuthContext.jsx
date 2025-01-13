import { createContext, useEffect, useState } from "react";
import { auth } from "../Config/firebase.config";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  deleteUser,
  updateProfile,
} from "firebase/auth";
const UserContext = createContext();
import axios from "axios";

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const provider = new GoogleAuthProvider();

  const Registration = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const GoogleLogin = () => {
    return signInWithPopup(auth, provider);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const LogOut = () => {
    return signOut(auth);
  };

  const DeleteUser = (user) => {
    return deleteUser(user);
  };
  const UpdateProfile = (name, photo) => {
    if (!auth.currentUser) {
      toast.error("You are not logged in");
      return;
    }
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const Unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user?.email) {
        const email = user.email;
        axios
          .post(
            `${import.meta.env.VITE_API}/jwt`,
            { email },
            { withCredentials: true }
          )
          .then(({ data }) => {
            console.log(data);
            setIsloading(false);
          });
      } else {
        axios
          .post(
            `${import.meta.env.VITE_API}/logOut`,
            {},
            {
              withCredentials: true,
            }
          )
          .then(({ data }) => {
            console.log(data);
            setIsloading(false);
          });
      }
    });
    return () => {
      Unsubscribe;
    };
  }, [user]);

  const userinfo = {
    Registration,
    GoogleLogin,
    login,
    LogOut,
    user,
    setUser,
    setIsloading,
    isLoading,
    DeleteUser,
    UpdateProfile,
  };

  return (
    <UserContext.Provider value={userinfo}>{children}</UserContext.Provider>
  );
};

export default UserContext;
