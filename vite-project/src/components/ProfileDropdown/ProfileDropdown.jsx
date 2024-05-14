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
    if (user && userData && userData.handle) {
      getProfilePic(userData.handle)
        .then((url) => {
          setProfilePic(url);
        })
        .catch((error) => {
          if (error.code === "storage/object-not-found") {
            // Use default picture if the user does not have a profile picture
            setProfilePic("img/default.jpg");
          } else {
            // Re-throw any other errors
            throw error;
          }
        });
    }
  }, [user, userData]);

  return (
    <Dropdown className={className}>
      <DropdownToggle
        aria-expanded={false}
        className="bg-transparent border-0 p-0 mx-4"
      >
        <ProfilePic
          profilePic={profilePic}
          widthAndHeight="2.6dvw"
        ></ProfilePic>
      </DropdownToggle>
      <DropdownMenu className="mt-2">
        <DropdownItem className="mb-1">
          <Link
            to={`/profile/${userData.handle || "/error"}`}
            className="link-underline link-underline-opacity-0 text-black"
          >
            <h3>{userData ? userData.handle : ""}</h3>
          </Link>
          
        </DropdownItem>

        <DropdownItem as="div">
          <Link
            to={`/profile/${userData.handle || "/error"}`}
            className="link-underline link-underline-opacity-0 text-black"
          >
            <p className="fs-6 fw-light m-0">My profile</p>
          </Link>
        </DropdownItem>

        <DropdownItem as="div">
          <Link
            to="/delete-account"
            className="link-underline link-underline-opacity-0 text-black"
          >
            <p className="fs-6 fw-light m-0">Delete Account</p>
          </Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

ProfileDropdown.propTypes = {
  className: PropTypes.string,
};
