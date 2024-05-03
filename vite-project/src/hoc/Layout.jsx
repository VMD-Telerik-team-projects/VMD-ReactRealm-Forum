import Navigation from '../components/Navigation/Navigation'
import Footer from '../components/Footer/Footer'
import './Layout.css'

export default function Layout({ children }) {
  //  TODO: Create footer and stick under main section

  return (
    <div className='d-flex flex-column min-vh-100 body-div'>
      <Navigation />
      <main className='d-flex flex-column h-full flex-grow d-flex justify-content-center align-items-center'>
        {children}
      </main>
      <Footer />
    </div>
  )
}