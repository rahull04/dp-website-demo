import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import type { RootState } from "../store";
import { logout } from "../store/slices/authSlice";

const Navbar = () => {
  const { pathname } = useLocation();
  const dropdownItems = ["admin", "company", "technician"];

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const dispatch = useDispatch();

  const linkClasses = (path: string) =>
    `block px-4 py-2 hover:bg-blue-100 capitalize ${
      pathname.includes(path) ? "bg-blue-50 font-medium" : ""
    }`;

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center relative z-50">
      <Link to="/" className="text-xl font-bold text-blue-700 hover:underline">
        DP Website
      </Link>

      <div className="flex space-x-6">
        {/* Login Dropdown */}
        {!isAuthenticated && (
          <div className="relative group">
            <button className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">
              Login
            </button>
            <div className="absolute top-full right-0 hidden group-hover:block bg-white border rounded-md shadow-lg w-40">
              {dropdownItems.map((role) => (
                <Link
                  key={role}
                  to={`/${role}/login`}
                  className={linkClasses(`/login/${role}`)}
                >
                  {role}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Register Dropdown */}
        {!isAuthenticated && (
          <div className="relative group">
            <button className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">
              Register
            </button>
            <div className="absolute top-full right-0 hidden group-hover:block bg-white border rounded-md shadow-lg w-40">
              {dropdownItems.slice(1).map((role) => (
                <Link
                  key={role}
                  to={`/${role}/register`}
                  className={linkClasses(`/register/${role}`)}
                >
                  {role}
                </Link>
              ))}
            </div>
          </div>
        )}

        {isAuthenticated && (
          <div
            onClick={() => {
              dispatch(logout());
              localStorage.removeItem('persist:root');
            }}
            className="text-xl font-bold text-blue-700 hover:underline cursor-pointer"
          >
            Log out
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
