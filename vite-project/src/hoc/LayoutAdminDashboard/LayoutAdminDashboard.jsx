import "../Layout.css";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
import PropTypes from "prop-types";

/**
 *
 * @param {{children: React.ReactNode}} props
 * @returns {JSX.Element}
 */
export default function LayoutAdminDashboard({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navigation />
      <Container fluid className="layout">
        <Row>
          <Col md={1} className="sidebar bg-dark min-vh-100">
            <Sidebar />
          </Col>
          <Col md={11} className="content">
            <div className="p-2">
              {children}
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

LayoutAdminDashboard.propTypes = {
  children: PropTypes.node.isRequired,
};
