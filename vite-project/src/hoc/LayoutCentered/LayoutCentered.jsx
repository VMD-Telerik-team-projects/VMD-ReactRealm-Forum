import Navigation from '../../components/Navigation/Navigation'
import Footer from '../../components/Footer/Footer'
import '../Layout.css'
import '../../index.css'
import PropTypes from 'prop-types';

export default function LayoutCentered({ children }) {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navigation />
      <main className='d-flex flex-column h-full flex-grow d-flex justify-content-center align-items-center body-bg'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

LayoutCentered.propTypes = {
  children: PropTypes.node.isRequired,
};