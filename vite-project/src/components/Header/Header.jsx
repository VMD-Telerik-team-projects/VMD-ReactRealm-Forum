import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import AppContext from "../../context/AppContext";
import { logoutUser } from "../../services/auth.service";
import "./Header.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "react-bootstrap";

export default function Header() {
  const { user, userData, setAppState } = useContext(AppContext);

  const logout = async () => {
    await logoutUser();
    setAppState({ user: null, userData: null });
  };

  return (
    <header className="header d-flex flex-row gap-4 me-4 justify-content-end">
      {user ? (
        <>
          <Dropdown>
            <DropdownToggle
              aria-expanded={false}
              className="bg-transparent border-0 p-0 mx-4"
            >
              <img
                src="img/logo-color.png"
                style={{ width: "50px", height: "50px", margin: 0, padding: 0 }}
                className="rounded-circle"
                alt="pic"
              />
            </DropdownToggle>
            <DropdownMenu className="mt-2">
              <DropdownItem className="mb-1">
                <h4>{userData ? userData.handle : ""}</h4>
              </DropdownItem>
              
              <DropdownItem>
                <Link to="/my-profile" className="link-underline link-underline-opacity-0 text-black" >
                  <p className="fs-6 fw-light m-0">My profile</p>
                </Link>
              </DropdownItem>
              
              
              <DropdownItem>
                <Link to='/my-posts' className="link-underline link-underline-opacity-0 text-black">
                  <p className="fs-6 fw-light m-0">My posts</p>
                </Link>
              </DropdownItem>
              
            </DropdownMenu>
          </Dropdown>

          <Button className="logout-button" onClick={logout}>
            Sign Out
          </Button>
        </>
      ) : (
        <></>
      )}
    </header>
  );
}
