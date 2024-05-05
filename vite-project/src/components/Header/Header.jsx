import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { logoutUser } from "../../services/auth.service";
import './Header.css';

export default function Header () {
    const { user, userData, setAppState } = useContext(AppContext);

    const logout = async() => {
        await logoutUser();
        setAppState({ user: null, userData: null})
    };

    return (
        <header className="header">
            { user 
            ? (
                <>
                    {`😉 Welcome on board, ${userData ? userData.handle : 'Unknown'} `}
                    <Button className="logout-button" onClick={logout}>Sign Out</Button>
                </>
            )
            : <>
            </>}
        </header>
    )
}
