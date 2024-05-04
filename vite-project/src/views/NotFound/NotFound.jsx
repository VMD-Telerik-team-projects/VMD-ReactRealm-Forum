import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div>
      <h1>404 - Page not found</h1>
      <img
    src="/img/R.png"
          width="300px"
          alt="Error"
          />
      <p>Oops! The page you're looking for does not exist.</p>
      <NavLink className={styles.link} to="/">
      <Button className={styles.button}>Go to Home Page</Button>
      </NavLink>
      
    </div>
  )
}