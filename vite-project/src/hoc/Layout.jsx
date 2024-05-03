import Navigation from '../components/Navigation/Navigation'
import Footer from '../components/Footer/Footer'

export default function Layout({ children }) {
  //  TODO: Create footer and stick under main section
  
  return (
  <div className='d-flex flex-column justify-content-center min-vh-100'>
    <Navigation />
    <main className='d-flex flex-column align-self-center h-full'>
      {children}
    </main>
    <Footer />
  </div>
  )
}