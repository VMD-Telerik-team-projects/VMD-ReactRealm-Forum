import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AppContext from "../../context/AppContext";
import { getProfilePic } from "../../services/users.service";
import ProfilePic from "../ProfilePic/ProfilePic";
import PropTypes from "prop-types";

export default function ProfileDropdown({ className }) {
  const { user, userData } = useContext(AppContext);
  const [profilePic, setProfilePic] = useState("img/default.jpg");

  useEffect(() => {
    if (user && userData) {
      getProfilePic(userData.handle).then((url) => {
        setProfilePic(url);
      });
    }
  }, [userData])

  return (
    <Dropdown className={className}>
      <DropdownToggle
        aria-expanded={false}
        className="bg-transparent border-0 p-0 mx-4"
      >
        <ProfilePic profilePic={profilePic} widthAndHeight='2.6dvw'></ProfilePic>
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

ProfileDropdown.propTypes = {
  className: PropTypes.string,
};
