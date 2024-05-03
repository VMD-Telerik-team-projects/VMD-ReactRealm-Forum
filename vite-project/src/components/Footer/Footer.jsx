import './Footer.css'
import CIcon from '@coreui/icons-react';
import { cibGithub, cibGmail, cibFacebook } from '@coreui/icons';

export default function Footer() {
  //  TODO: Replace <p> placeholders with icons
  //  TODO: Fix icons

  return (
    <div
      className="d-flex flex-nowrap w-full flex-row justify-content-center text-white gap-4 mt-auto py-3 fs-5 fw-light border border-3 bg-black">
      {/* <img src="public/icons/github_PNG40.png" alt="github" className='icon-github icon-styles' />
      <img src="public/icons/Gmail-PNG-File-Download-Free.png" alt="gmail" className='icon-gmail icon-styles' />
      <img src="public/icons/R.png" alt="contacts" className='icon-phone icon-styles' /> */}      
      <CIcon icon={cibGithub} className='icon-styles' />
      <CIcon icon={cibGmail} className='icon-styles' />
      <CIcon icon={cibFacebook} className='icon-styles' />
    </div>
  )
}