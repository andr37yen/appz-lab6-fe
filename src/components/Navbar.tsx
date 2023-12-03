import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../providers/authProvider";

function Navbar() {
  const { user, signout } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/login");
  }

  return (
    <nav className="sticky top-0 z-100 bg-blue-500 w-full h-18 p-4">
      <div className="mx-auto h-full flex items-center justify-end px-4 w-full">
        {user ? (
          <>
            <div>
              <Link
                to="/notifications"
                className="text-lg text-white px-3 py-1 mx-2  hover:border-b-4 hover:border-blue-700 ">
                Notifications
              </Link>
              <Link
                to="/cabinet"
                className="text-lg text-white px-3 py-1 mx-2 hover:border-b-4 hover:border-blue-700">
                My Cabinet
              </Link>
            </div>
            <button
              onClick={() => signout()}
              className="btn-secondary">
              Sign out
            </button>
          </>
        ) : (
          <>
            <button
              onClick={redirectToLogin}
              className="btn-primary">
              Sign in
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

