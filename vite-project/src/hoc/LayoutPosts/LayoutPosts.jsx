import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Container, Row, Col } from "react-bootstrap";
import "../Layout.css";
import "../../index.css";
import PropTypes from "prop-types";

/**
 *
 * @param {{children: React.ReactNode}} props
 * @returns {JSX.Element}
 */
export default function LayoutPosts({ children }) {
  const { user } = useContext(AppContext);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navigation />
      <main className="d-flex flex-row h-full w-full flex-grow body-bg m-0">
        <Container fluid className="p-0 m-0">
          <Row className="p-0 w-100 h-100 m-0">
            {user ? (
              <>
                <Col xs={1} className="m-0 p-0 h-full bg-dark">
                  <Sidebar />
                </Col>
                <Col
                  xs={11}
                  className="d-flex flex-column justify-content-center align-items-center m-0 p-0 w-full gap-4"
                >
                  {children}
                </Col>
              </>
            ) : (
              <Col
                xs={12}
                className="d-flex flex-column justify-content-center align-items-center m-0 p-0 w-100 h-100 gap-4"
              >
                {children}
              </Col>
            )}
          </Row>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

LayoutPosts.propTypes = {
  children: PropTypes.node.isRequired,
};
