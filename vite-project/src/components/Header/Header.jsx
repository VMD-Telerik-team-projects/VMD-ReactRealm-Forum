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
    <header className="header d-flex flex-row gap-2 me-4 align-items-center justify-content-end">
      {user ? (
        <div className="d-flex flex-row align-items-center justify-content-center">
          <ProfileDropdown className='mt-1' />
          <Button className="logout-button" onClick={logout}>
            Sign Out
          </Button>
        </div>
      ) : (
        <></>
      )}
    </header>
  );
}
