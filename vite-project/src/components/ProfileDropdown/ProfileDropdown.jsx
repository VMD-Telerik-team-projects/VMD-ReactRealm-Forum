import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../context/AppContext";

export default function ProfileDropdown() {
  const { userData } = useContext(AppContext);

  return (
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

        <DropdownItem as="div">
          <Link
            to="/my-profile"
            className="link-underline link-underline-opacity-0 text-black"
          >
            <p className="fs-6 fw-light m-0">My profile</p>
          </Link>
        </DropdownItem>

        <DropdownItem as="div">
          <Link
            to="/my-posts"
            className="link-underline link-underline-opacity-0 text-black"
          >
            <p className="fs-6 fw-light m-0">My posts</p>
          </Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
