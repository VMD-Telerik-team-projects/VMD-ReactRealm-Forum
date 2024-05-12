import { Card , Button} from "react-bootstrap";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { deleteUser } from "firebase/auth";
import { auth } from "../../config/firebase-config";

export default function DeleteAccount() {
    //TODO: edit the deleteUserData

    const { user, setUser } = useContext(AppContext);

    const deleteAccount = async () => {
        if (user) {
          const confirmed = window.confirm(
            "Are you sure you want to permanently delete your account? This action cannot be undone."
          );
      
          if (confirmed) {
            try {
              await deleteUser(auth.currentUser);
              alert("User deleted");
              setUser(null); 
            } catch (error) {
              if (error.message.includes('auth/requires-recent-login')) {
                alert('Please sign in again to delete your account.');
              } else {
                console.error("Error deleting user:", error);
              }
            }
          }
        }
      };
  
  return (
    <Card className="p-5 rounded">
      <Card.Title className="mb-5 text-black fs-1 fw-light">
        Here you can permanently delete your profile.
      </Card.Title>
      <p className="text-black fs-2 fw-light">
      Please note that this action is irreversible.
    </p>
    <p>If you wish to delete your profile, chose one option: </p>
      <Card.Body className="d-flex flex-column align-items-center">
      <Button
      variant="danger"
      className="mb-3"
      onClick={deleteAccount}
      >
    Delete Account
  </Button>
  <Button
  variant="warning"
  className="mb-3"
 // onClick={deleteUserData}
  >
    Delete Account and User Data from Forum
    </Button>
    </Card.Body>
    </Card>
  );
}
