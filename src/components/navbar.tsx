import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Dropdown, Button, Avatar } from "antd";
import { DownOutlined, LogoutOutlined } from "@ant-design/icons";
import type { RootState } from "../store";
import { logout } from "../store/slices/authSlice";

const { Header } = Layout;

const Navbar = () => {
  const dispatch = useDispatch();

  const userName = useSelector((state: RootState) => state.auth.user?.username);
  const userEmail = useSelector((state: RootState) => state.auth.user?.email);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const dropdownItems = ["admin", "company", "technician"];

  const handleLogout = () => {
    dispatch(logout());
  };

  const loginMenu = {
    items: dropdownItems.map((role) => ({
      key: role,
      label: (
        <Link to={`/${role}/login`} className="capitalize">
          {role}
        </Link>
      ),
    })),
  };

  const registerMenu = {
    items: dropdownItems.slice(1).map((role) => ({
      key: role,
      label: (
        <Link to={`/${role}/register`} className="capitalize">
          {role}
        </Link>
      ),
    })),
  };

  const avatarMenu = {
    items: [
      {
        key: "logout",
        label: (
          <Button
            type="text"
            icon={<LogoutOutlined />}
            danger
            onClick={handleLogout}
            className="w-full text-left"
          >
            Logout
          </Button>
        ),
      },
    ],
  };

  return (
    <Header
      style={{ backgroundColor: "white", color: "black" }}
      className="bg-white shadow-md px-8 flex justify-between items-center"
    >
      <Link
        to="/home"
        style={{ color: "black" }}
        className="text-2xl font-bold"
      >
        DP Website
      </Link>

      <div className="flex items-center gap-6">
        {!isAuthenticated && (
          <>
            <Dropdown menu={loginMenu} trigger={["hover"]}>
              <Button
                type="text"
                style={{ color: "black" }}
                className="hover:text-blue-700"
              >
                Login <DownOutlined />
              </Button>
            </Dropdown>
            <Dropdown menu={registerMenu} trigger={["hover"]}>
              <Button
                type="text"
                style={{ color: "black" }}
                className="hover:text-blue-700"
              >
                Register <DownOutlined />
              </Button>
            </Dropdown>
          </>
        )}

        {isAuthenticated && (
          <Dropdown
            menu={avatarMenu}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Avatar
              size="large"
              className="cursor-pointer hover:ring-2 hover:ring-blue-500"
              style={{
                color: "white",
                backgroundColor: "#1c1c1b",
                fontSize: 20,
              }}
            >
              {userEmail?.[0]?.toUpperCase() ?? userName?.[0]?.toUpperCase()}
            </Avatar>
          </Dropdown>
        )}
      </div>
    </Header>
  );
};

export default Navbar;
