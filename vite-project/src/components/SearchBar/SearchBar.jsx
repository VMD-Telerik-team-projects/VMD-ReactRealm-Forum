import { Search } from "react-bootstrap-icons";
import { Button, Container } from "react-bootstrap";
import PropTypes from "prop-types";

/**
 *
 * @param {{ value: String, onChange: Function, className: string }} props
 * @returns
 */
export default function SearchBar({ value, onChange, className }) {
  const containerClassName = className ? `input-group ${className}` : "input-group";
  
  return (
    <Container className={containerClassName} style={{ width: "50dvw" }} fluid>
      <input
        type="search"
        className="form-control p-2"
        placeholder="Search"
        aria-label="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button variant="outline-none" className="bg-white" style={{ border: "2px solid lightblue", cursor: "default"}}>
        <Search />
      </Button>
    </Container>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};
