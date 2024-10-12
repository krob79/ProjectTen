import { createContext, useState } from "react";
import Cookies from "js-cookie";
import { api } from "../utils/apiHelper";

const UserContext = createContext(null);

console.log("----IMPORTING USER CONTEXT");

export const UserProvider = (props) => {
  const cookie = Cookies.get("authenticatedUser");
  const cCookie = Cookies.get("credentials");
  const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);
  const [credentials, setCredentials] = useState(cCookie ? JSON.parse(cCookie) : null);
  
  const signIn = async (credentials) => {
    const response = await api("/users", "GET", null, credentials);
      if (response.status === 200) {
        const user = await response.json();
        setAuthUser(user);
        setCredentials(credentials);
        Cookies.set("authenticatedUser", JSON.stringify(user),{expires: 1});
        Cookies.set("credentials", JSON.stringify(credentials),{expires: 1});
        return user
      } else if (response.status === 401) {
        return null
      } else {
        throw new Error();
      }
  }

  const signOut = () => {
    setAuthUser(null);
    Cookies.remove("authenticatedUser");
    Cookies.remove("credentials");
  }

  return (
    <UserContext.Provider value={{
      authUser,
      credentials,
      actions: {
        signIn,
        signOut
      }
    }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;