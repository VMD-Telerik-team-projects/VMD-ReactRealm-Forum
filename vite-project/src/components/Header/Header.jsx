import { useContext } from "react";
import { Button } from "react-bootstrap";
import AppContext from "../../context/AppContext";
import { logoutUser } from "../../services/auth.service";
import "./Header.css";

import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";

export default function Header() {
  const { user, userData, setAppState } = useContext(AppContext);

  const logout = () => {
    logoutUser(userData.handle);
    setAppState({ user: null, userData: null });
  };

  return (
    <header className="header d-flex flex-row gap-2 me-4 justify-content-end">
      {user ? (
        <>
          <ProfileDropdown />
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
