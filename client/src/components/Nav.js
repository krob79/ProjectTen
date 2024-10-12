import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const Nav = () => {
  const { authUser } = useContext(UserContext);
  return (
    <nav>
      {authUser === null ?
        <>
          <Link className="signup headertext" to="/signup">Sign up</Link>
          <Link className="signin headertext" to="/signin">Sign in</Link>
        </>
        :
        <>
          <span>Welcome {authUser.firstName} {authUser.lastName}!</span>
          <Link className="settings headertext" to="/settings">Settings</Link>
          <Link className="signout headertext" to="/signout">Sign out</Link>
        </>
      }

    </nav>
  );
}

export default Nav;