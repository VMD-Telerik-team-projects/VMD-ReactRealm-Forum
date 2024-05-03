import Navigation from '../components/Navigation/Navigation'
import Footer from '../components/Footer/Footer'

export default function Layout({ children }) {
  //  TODO: Create footer and stick under main section
  
  return (
  <div className='d-flex flex-column min-vh-100'>
    <Navigation />
    <main>
      {children}
    </main>
    <Footer />
  </div>
  )
}